import { NextRequest, NextResponse } from "next/server";

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
  const token = process.env.APIFY_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "Search is not configured." }, { status: 500 });
  }

  const params = request.nextUrl.searchParams;
  const mode = params.get("mode") === "forRent" ? "forRent" : "forSale";
  const emirateRaw = params.get("emirate") ?? "dubai";
  const emirate = EMIRATES.has(emirateRaw) ? emirateRaw : "dubai";

  const input: Record<string, unknown> = { mode, emirate, maxItems: MAX_ITEMS };

  const minBedrooms = Number(params.get("minBedrooms"));
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
