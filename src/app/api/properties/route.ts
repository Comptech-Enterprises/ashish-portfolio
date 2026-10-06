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
};

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const emirateRaw = params.get("emirate") ?? "dubai";
  const emirate = EMIRATES.has(emirateRaw) ? emirateRaw : "dubai";
  const community = (params.get("community") ?? "").toLowerCase().replace(/-/g, " ");
  const minBedrooms = Number(params.get("minBedrooms"));

  const token = process.env.APIFY_TOKEN;
  if (!token) {
    // Return curated portfolio properties filtered by query parameters
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

    // If specific filters yielded zero matches in mock, return closest by emirate or all
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

  const mode = params.get("mode") === "forRent" ? "forRent" : "forSale";

  const input: Record<string, unknown> = { mode, emirate, maxItems: MAX_ITEMS };

  if (Number.isInteger(minBedrooms) && minBedrooms >= 0) {
    input.minBedrooms = minBedrooms;
  }

  const minPrice = Number(params.get("minPrice"));
  if (Number.isFinite(minPrice) && minPrice > 0) {
    input.minPrice = minPrice;
  }

  const maxPrice = Number(params.get("maxPrice"));
  if (Number.isFinite(maxPrice) && maxPrice > 0) {
    input.maxPrice = maxPrice;
  }

  try {
    const res = await fetch(
      `https://api.apify.com/v2/acts/${ACTOR}/run-sync-get-dataset-items?token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
        signal: AbortSignal.timeout(60_000),
      }
    );

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      return NextResponse.json(
        { error: body?.error?.message ?? "Search failed. Please try again." },
        { status: 502 }
      );
    }

    const items = (await res.json()) as PropertyListing[];
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json(
      { error: "The search timed out. Please try again." },
      { status: 504 }
    );
  }
}
