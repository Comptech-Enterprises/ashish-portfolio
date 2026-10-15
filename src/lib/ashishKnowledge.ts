export interface CommunityMetric {
  id: string;
  name: string;
  slug: string;
  grossYieldApartments: number; // percentage, e.g. 7.8
  grossYieldVillas?: number;
  averagePricePerSqft: number; // AED
  medianRent1Bed: number; // AED / year
  medianRent2Bed: number; // AED / year
  capitalAppreciation1Yr: number; // percentage
  investmentProfile: "high-yield" | "capital-growth" | "luxury-prestige" | "balanced";
  highlights: string[];
  advisoryNote: string;
}

export const DUBAI_COMMUNITY_METRICS: CommunityMetric[] = [
  {
    id: "jvc",
    name: "Jumeirah Village Circle (JVC)",
    slug: "jumeirah-village-circle",
    grossYieldApartments: 8.2,
    grossYieldVillas: 6.4,
    averagePricePerSqft: 1250,
    medianRent1Bed: 68000,
    medianRent2Bed: 95000,
    capitalAppreciation1Yr: 14.5,
    investmentProfile: "high-yield",
    highlights: [
      "Consistent #1 for highest transaction volume in Dubai",
      "High rental demand among mid-income expatriate workforce",
      "Lower entry ticket: 1-beds starting 750k - 950k AED"
    ],
    advisoryNote: "Prime choice for pure cash-flow and rental yield. Focus on well-maintained buildings with established developer reputations near exits to Al Khail Road."
  },
  {
    id: "business-bay",
    name: "Business Bay",
    slug: "business-bay",
    grossYieldApartments: 7.1,
    averagePricePerSqft: 2200,
    medianRent1Bed: 105000,
    medianRent2Bed: 160000,
    capitalAppreciation1Yr: 16.8,
    investmentProfile: "balanced",
    highlights: [
      "Bordering Downtown Dubai and Dubai Canal",
      "Strong demand for short-term and holiday home conversions",
      "Fast capital appreciation with ongoing luxury branded residences"
    ],
    advisoryNote: "Excellent balance of yield (especially when managed as short-term holiday homes) and strong capital appreciation driven by Downtown proximity."
  },
  {
    id: "dubai-marina",
    name: "Dubai Marina",
    slug: "dubai-marina",
    grossYieldApartments: 6.8,
    averagePricePerSqft: 1950,
    medianRent1Bed: 98000,
    medianRent2Bed: 155000,
    capitalAppreciation1Yr: 12.2,
    investmentProfile: "balanced",
    highlights: [
      "World-renowned waterfront living with perennial global tenant demand",
      "Fully established infrastructure with metro and tram connectivity",
      "Liquid resale market"
    ],
    advisoryNote: "Perennial tenant liquidity. Always inspect building maintenance records and chiller charges before committing."
  },
  {
    id: "downtown-dubai",
    name: "Downtown Dubai",
    slug: "downtown-dubai",
    grossYieldApartments: 5.6,
    averagePricePerSqft: 2800,
    medianRent1Bed: 125000,
    medianRent2Bed: 210000,
    capitalAppreciation1Yr: 18.4,
    investmentProfile: "luxury-prestige",
    highlights: [
      "Home to Burj Khalifa, Dubai Mall, and Dubai Opera",
      "Trophy asset status with ultra-high global liquidity",
      "Premier wealth preservation and premium tenant profile"
    ],
    advisoryNote: "Do not buy Downtown purely for yield percentages. You buy Downtown for wealth preservation, trophy asset liquidity, and capital appreciation."
  },
  {
    id: "palm-jumeirah",
    name: "Palm Jumeirah",
    slug: "palm-jumeirah",
    grossYieldApartments: 5.3,
    grossYieldVillas: 4.2,
    averagePricePerSqft: 3600,
    medianRent1Bed: 175000,
    medianRent2Bed: 280000,
    capitalAppreciation1Yr: 24.1,
    investmentProfile: "luxury-prestige",
    highlights: [
      "Global ultra-luxury benchmark with beachfront access",
      "Consistent high-net-worth migration inflow",
      "Constrained supply driving record-setting capital gains"
    ],
    advisoryNote: "The undisputed capital of Dubai ultra-luxury. Yield percentages are lower due to elevated asset values, but capital gains have outperformed every other sector."
  },
  {
    id: "dubai-hills-estate",
    name: "Dubai Hills Estate",
    slug: "dubai-hills-estate",
    grossYieldApartments: 6.9,
    grossYieldVillas: 5.5,
    averagePricePerSqft: 2100,
    medianRent1Bed: 95000,
    medianRent2Bed: 160000,
    capitalAppreciation1Yr: 19.3,
    investmentProfile: "capital-growth",
    highlights: [
      "Master-planned Emaar community around an 18-hole championship golf course",
      "Premier family neighborhood with top international schools and Dubai Hills Mall",
      "Highest tenant retention rate among professional families"
    ],
    advisoryNote: "The modern benchmark for family living. High tenant stickiness and very low vacancy rates year-round."
  },
  {
    id: "dubai-south",
    name: "Dubai South (Al Maktoum Airport / Expo)",
    slug: "dubai-south",
    grossYieldApartments: 8.5,
    averagePricePerSqft: 980,
    medianRent1Bed: 52000,
    medianRent2Bed: 75000,
    capitalAppreciation1Yr: 21.0,
    investmentProfile: "high-yield",
    highlights: [
      "Direct beneficiary of the 128 Billion AED Al Maktoum Airport expansion",
      "Lowest entry barrier for off-plan and high-rental-yield investments",
      "Long-term structural growth vector for Dubai 2040 Urban Master Plan"
    ],
    advisoryNote: "A long-horizon high-growth play. Yields are strong today, and the airport expansion ensures progressive capital uplift over the next 5 to 10 years."
  }
];

export interface KnowledgeChunk {
  id: string;
  category: "yields" | "golden-visa" | "off-plan" | "nri-tax" | "fees-costs" | "general";
  title: string;
  content: string;
  keywords: string[];
}

export const ASHISH_ADVISORY_KNOWLEDGE: KnowledgeChunk[] = [
  {
    id: "kb-yields-ranking",
    category: "yields",
    title: "Dubai Rental Yields Overview and Ranking",
    content: "Rental yields in Dubai are among the highest in global metropolitan cities, typically ranging from 5.2% to 8.5% gross. High-yield communities include Dubai South (8.5%), Jumeirah Village Circle / JVC (8.2%), and Arjan / Silicon Oasis (7.5% - 8.5%). Balanced areas offering 6.5% - 7.2% with solid liquidity include Business Bay, Dubai Marina, and Dubai Hills Estate. Ultra-luxury areas like Palm Jumeirah (4.5% - 5.3%) and Downtown Dubai (5.4% - 5.8%) deliver lower percentage yields because property valuations are high, but they deliver the city's strongest capital appreciation and wealth preservation.",
    keywords: ["rental yield", "highest yield", "roi", "returns", "best areas", "yield", "investment"]
  },
  {
    id: "kb-golden-visa",
    category: "golden-visa",
    title: "UAE 10-Year Golden Visa via Real Estate",
    content: "To qualify for the 10-Year UAE Golden Visa through real estate, the total property value must be at least AED 2,000,000 (approx. USD 545,000). Key rules: 1) You can combine multiple properties to reach the 2M AED threshold. 2) Mortgaged properties qualify provided the equity or down payment paid to the bank/developer is at least AED 2M, evidenced by a bank NOC. 3) Off-plan properties qualify if the total purchase price on the Oqood (pre-title deed) is at least AED 2M and payment milestones meet the required developer threshold. 4) The visa covers the investor, spouse, children of any age, and domestic staff.",
    keywords: ["golden visa", "2 million", "residency", "visa requirements", "investor visa", "oqood", "mortgage golden visa"]
  },
  {
    id: "kb-purchase-costs",
    category: "fees-costs",
    title: "Standard Real Estate Transaction Costs and Fees in Dubai",
    content: "When purchasing property in Dubai, buyers should budget approximately 6% to 7% above the agreed purchase price for upfront closing costs: 1) Dubai Land Department (DLD) transfer fee: 4% of property purchase price + AED 580 admin fee. 2) DLD Registration Trustee Fee: AED 4,000 + 5% VAT (for properties over AED 500,000) or AED 2,000 + VAT (below 500,000). 3) Real Estate Agency / Advisory Brokerage Fee: 2% of purchase price + 5% VAT. 4) Mortgage registration fee (if financing): 0.25% of the loan amount + AED 290. 5) Valuation fee (for mortgages): AED 2,500 - 3,500 + VAT.",
    keywords: ["fees", "costs", "dld fee", "closing costs", "taxes", "transfer fee", "commission", "hidden costs"]
  },
  {
    id: "kb-nri-buyers",
    category: "nri-tax",
    title: "Guide for Non-Resident Indians (NRIs) and International Buyers",
    content: "Foreign nationals and NRIs can purchase property in designated Freehold areas in Dubai with 100% foreign ownership. Key points: 1) Physical presence in Dubai is not mandatory to buy; contracts and Oqood can be executed digitally or via Power of Attorney (POA). 2) Zero property tax, zero capital gains tax, and zero rental income tax are levied by Dubai or the UAE. 3) For Indian residents/NRIs, funds can be remitted from India under the Liberalised Remittance Scheme (LRS) up to USD 250,000 per financial year per individual, or through NRE/NRO/international banking channels. 4) Rental income can be fully repatriated overseas.",
    keywords: ["nri", "india", "foreign buyer", "lrs", "repatriation", "tax free", "freehold", "can foreigners buy"]
  },
  {
    id: "kb-offplan-vs-ready",
    category: "off-plan",
    title: "Off-Plan vs Ready Property Advisory",
    content: "Ashish Lalwani's advisory framework compares off-plan vs ready based on investment objectives: Choose Off-Plan if your goal is capital leverage, flexible payment plans (such as 60/40, 70/30, or post-handover payment plans), and buying below future market value at launch prices. Funds are protected by mandatory DLD Escrow accounts under Law No. 8 of 2007. Choose Ready Property if you want immediate rental income on day one, prefer to visually inspect the exact quality and view, or require immediate Golden Visa eligibility with an issued title deed.",
    keywords: ["off-plan", "ready", "payment plan", "escrow", "which is better", "launch", "under construction"]
  }
];
