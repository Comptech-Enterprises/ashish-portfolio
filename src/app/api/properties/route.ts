import { NextRequest, NextResponse } from "next/server";
import { SAMPLE_PROPERTIES } from "@/lib/sampleProperties";

const ACTOR = "crawlerbros~property-finder-scraper";
const MAX_ITEMS = 20;

const EMIRATES = new Set([
  "",
  "dubai",
  "abu-dhabi",
  "sharjah",
  "ajman",
  "ras-al-khaimah",
  "fujairah",
  "umm-al-quwain",
]);

export type PropertyListing = {
  propertyId: string;
  title: string;
  description: string;
  propertyType: string;
  offeringType: string;
  price: number;
  currency: string;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  furnished: string;
  fullAddress: string;
  city: string;
  community: string;
  agentName: string;
  brokerName: string;
  listingUrl: string;
  listedDate: string;
  images?: string[];
};

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const emirateRaw = params.get("emirate") ?? "dubai";
  const emirate = EMIRATES.has(emirateRaw) ? emirateRaw : "dubai";
  const community = (params.get("community") ?? "").toLowerCase().replace(/-/g, " ");
  const minBedrooms = Number(params.get("minBedrooms"));

  const rapidApiKey = process.env.RAPIDAPI_KEY;
  const rapidApiHost = process.env.RAPIDAPI_HOST || "uae-real-estate-api.p.rapidapi.com";

  if (rapidApiKey) {
    try {
      const location = community
        ? community.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
        : emirate.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

      const searchParams = new URLSearchParams({
        location,
        purpose: "buy",
        platform: "propertyfinder",
        page: "1",
      });

      if (Number.isInteger(minBedrooms) && minBedrooms > 0) {
        searchParams.set("bedrooms", String(minBedrooms));
      }

      const res = await fetch(
        `https://${rapidApiHost}/search-properties?${searchParams.toString()}`,
        {
          headers: {
            "x-rapidapi-host": rapidApiHost,
            "x-rapidapi-key": rapidApiKey,
          },
          signal: AbortSignal.timeout(15_000),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const rawProperties = data?.data?.properties || data?.properties || [];

        if (Array.isArray(rawProperties) && rawProperties.length > 0) {
          const items: PropertyListing[] = rawProperties.map((p: any) => ({
            propertyId: String(p.property_id || p.id),
            title: p.title || "Luxury UAE Property",
            description: p.description || "",
            propertyType: p.property_type || "Apartment",
            offeringType: "forSale",
            price: p.price?.value || p.price || 0,
            currency: p.price?.currency || "AED",
            bedrooms: Number(p.bedrooms) || 0,
            bathrooms: Number(p.bathrooms) || 0,
            areaSqft: p.size?.value || p.floor_plan_area || 0,
            furnished: p.furnished === "YES" ? "Furnished" : "Unfurnished",
            fullAddress: p.address?.full_name || "",
            city: p.location_tree?.[0]?.name || "Dubai",
            community: p.location_tree?.[1]?.name || "",
            agentName: "Ashish Lalwani",
            brokerName: "Vibgyor Real Estate",
            listingUrl: `#property-${p.property_id || p.id}`,
            listedDate: p.listed_date || "",
            images: Array.isArray(p.images) ? p.images : [],
          }));

          return NextResponse.json({ items });
        }
      }
    } catch (err) {
      console.warn("RapidAPI fetch failed, falling back to portfolio listings:", err);
    }
  }

  // Fallback to curated portfolio properties
  let items = SAMPLE_PROPERTIES.filter((p) => {
    const pEmirate = p.city.toLowerCase().replace(/\s+/g, "-");
    if (emirate && pEmirate !== emirate && !p.city.toLowerCase().includes(emirateRaw.replace(/-/g, " "))) {
      return false;
    }
    if (community && !p.community.toLowerCase().includes(community)) {
      return false;
    }
    if (Number.isInteger(minBedrooms) && minBedrooms >= 0 && p.bedrooms < minBedrooms) {
      return false;
    }
    return true;
  });

  if (items.length === 0) {
    items = SAMPLE_PROPERTIES.filter((p) => {
      if (Number.isInteger(minBedrooms) && minBedrooms >= 0) {
        return p.bedrooms >= minBedrooms;
      }
      return true;
    });
  }

  return NextResponse.json({ items });
}
