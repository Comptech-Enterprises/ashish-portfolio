import { DUBAI_COMMUNITY_METRICS, ASHISH_ADVISORY_KNOWLEDGE, CommunityMetric, KnowledgeChunk } from "./ashishKnowledge";
import { SAMPLE_PROPERTIES } from "./sampleProperties";

export interface SearchFilters {
  community?: string;
  maxPrice?: number;
  minPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  propertyType?: string;
}

/**
 * Parses user question to extract bedrooms, budget, community, and intent
 */
export function parseQueryIntent(query: string): SearchFilters & { intent: string } {
  const lower = query.toLowerCase();
  const filters: SearchFilters = {};

  // Extract bedrooms (e.g. "3 bhk", "3bhk", "3 bed", "3 bedrooms", "studio")
  if (lower.includes("studio")) {
    filters.minBedrooms = 0;
    filters.maxBedrooms = 0;
  } else {
    const bedMatch = lower.match(/(\d+)\s*(?:bhk|bed|bedroom)/i);
    if (bedMatch) {
      const beds = parseInt(bedMatch[1], 10);
      filters.minBedrooms = beds;
      filters.maxBedrooms = beds;
    }
  }

  // Extract community
  for (const c of DUBAI_COMMUNITY_METRICS) {
    if (lower.includes(c.id) || lower.includes(c.slug) || lower.includes(c.name.toLowerCase())) {
      filters.community = c.name;
      break;
    }
  }
  if (!filters.community) {
    if (lower.includes("marina")) filters.community = "Dubai Marina";
    else if (lower.includes("downtown")) filters.community = "Downtown Dubai";
    else if (lower.includes("jvc")) filters.community = "Jumeirah Village Circle (JVC)";
    else if (lower.includes("business bay")) filters.community = "Business Bay";
    else if (lower.includes("palm")) filters.community = "Palm Jumeirah";
    else if (lower.includes("dubai hills")) filters.community = "Dubai Hills Estate";
  }

  // Extract property type
  if (lower.includes("villa")) filters.propertyType = "Villa";
  else if (lower.includes("townhouse")) filters.propertyType = "Townhouse";
  else if (lower.includes("penthouse")) filters.propertyType = "Penthouse";
  else if (lower.includes("apartment") || lower.includes("flat")) filters.propertyType = "Apartment";

  // Extract budget
  const priceMatchM = lower.match(/(?:under|below|max|budget)\s*(?:aed|inr|\$)?\s*(\d+(?:\.\d+)?)\s*(?:m|million)/i);
  if (priceMatchM) {
    filters.maxPrice = parseFloat(priceMatchM[1]) * 1000000;
  }

  let intent = "general";
  if (filters.minBedrooms !== undefined || filters.propertyType || filters.maxPrice) {
    intent = "property_search";
  } else if (lower.includes("yield") || lower.includes("roi") || lower.includes("return")) {
    intent = "rental_yield";
  } else if (lower.includes("golden visa") || lower.includes("visa")) {
    intent = "golden_visa";
  } else if (lower.includes("fee") || lower.includes("cost") || lower.includes("tax") || lower.includes("dld")) {
    intent = "fees_taxes";
  } else if (lower.includes("nri") || lower.includes("india") || lower.includes("foreign")) {
    intent = "nri_buyer";
  }

  return { ...filters, intent };
}

/**
 * Fast in-memory structured query engine for numerical queries
 */
export function queryCommunityMetrics(criteria: {
  community?: string;
  sortByYield?: boolean;
  minYield?: number;
}): CommunityMetric[] {
  let list = [...DUBAI_COMMUNITY_METRICS];

  if (criteria.community) {
    const term = criteria.community.toLowerCase().replace(/[^a-z0-9]/g, "");
    list = list.filter((c) => {
      const cNorm = c.name.toLowerCase().replace(/[^a-z0-9]/g, "");
      const sNorm = c.slug.toLowerCase().replace(/[^a-z0-9]/g, "");
      return cNorm.includes(term) || sNorm.includes(term);
    });
  }

  if (criteria.minYield) {
    list = list.filter((c) => c.grossYieldApartments >= criteria.minYield!);
  }

  if (criteria.sortByYield) {
    list.sort((a, b) => b.grossYieldApartments - a.grossYieldApartments);
  }

  return list;
}

/**
 * Filter properties by numerical and categorical criteria
 */
export function queryProperties(filters: SearchFilters) {
  return SAMPLE_PROPERTIES.filter((p) => {
    if (filters.community) {
      const match = p.community.toLowerCase().includes(filters.community.toLowerCase());
      if (!match) return false;
    }
    if (filters.maxPrice && p.price > filters.maxPrice) return false;
    if (filters.minPrice && p.price < filters.minPrice) return false;
    if (filters.minBedrooms !== undefined && p.bedrooms !== filters.minBedrooms) return false;
    if (filters.propertyType && !p.propertyType.toLowerCase().includes(filters.propertyType.toLowerCase())) {
      return false;
    }
    return true;
  });
}

/**
 * Hybrid retrieval: BM25/keyword token overlap + category matching
 */
export function queryAdvisoryKnowledge(query: string, maxResults = 3): KnowledgeChunk[] {
  const tokens = query
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);

  const scored = ASHISH_ADVISORY_KNOWLEDGE.map((chunk) => {
    let score = 0;
    const contentLower = chunk.content.toLowerCase();
    const titleLower = chunk.title.toLowerCase();

    for (const kw of chunk.keywords) {
      if (query.toLowerCase().includes(kw)) {
        score += 8;
      }
    }

    for (const token of tokens) {
      if (titleLower.includes(token)) score += 5;
      if (contentLower.includes(token)) score += 1;
    }

    return { chunk, score };
  });

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map((item) => item.chunk);
}
