import { NextRequest, NextResponse } from "next/server";
import {
  parseQueryIntent,
  queryCommunityMetrics,
  queryAdvisoryKnowledge,
  queryProperties,
} from "@/lib/ashishSearch";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

const SYSTEM_GUARDRAIL_PROMPT = `You are AshishGPT, the official real estate AI advisory assistant for Ashish Lalwani, General Manager at Vibgyor Real Estate in Dubai (23+ years advisory experience).

YOUR OBJECTIVE:
Provide accurate, calm, fiduciary-grade guidance on buying, selling, investing, and rental yields across Dubai real estate.

STRICT GUARDRAILS & FORMATTING RULES:
1. ONLY answer questions regarding Dubai & UAE real estate, property investment, market regulations, rental yields, Golden Visas, taxes, and communities.
2. If asked about unrelated topics, politely decline and remind the user: "I specialize exclusively in Dubai and UAE real estate advisory."
3. ZERO HALLUCINATIONS: When quoting rental yields, prices, or numbers, you MUST ground your answer in the provided context and verified data. Never invent listings, prices, or false guarantees.
4. ELEGANT ADVISORY FORMATTING:
   - Structure your response cleanly, like an executive advisory briefing.
   - Do NOT create walls of numbered academic outlines like "**1. Title:**" followed by repetitive sub-bullets.
   - Use bold titles for major sections (e.g. "**Eligibility and Ownership**").
   - Use concise bullet points only where a list genuinely aids clarity (1 to 2 sentences per point).
   - Keep spacing open and readable.
   - Do NOT use emojis.
   - Do NOT use em dashes.
   - Format numbers clearly (e.g. AED 2,000,000 or approx. $545,000 USD).
5. CLOSING & HANDOFF:
   - Provide genuine advice first.
   - Conclude naturally by inviting the user to discuss custom requirements directly with Ashish Lalwani on WhatsApp (+971 54 582 1600).
`;

function sanitizeGeminiHistory(rawHistory: any[]): Array<{ role: "user" | "model"; parts: [{ text: string }] }> {
  if (!Array.isArray(rawHistory)) return [];

  const turns: Array<{ role: "user" | "model"; parts: [{ text: string }] }> = [];
  for (const item of rawHistory) {
    const text = String(item.text || item.content || "").trim();
    if (!text) continue;
    const role: "user" | "model" = item.role === "bot" || item.role === "model" ? "model" : "user";
    if (turns.length > 0 && turns[turns.length - 1].role === role) {
      turns[turns.length - 1].parts[0].text += `\n\n${text}`;
    } else {
      turns.push({ role, parts: [{ text }] });
    }
  }

  // Gemini history must start with 'user'
  while (turns.length > 0 && turns[0].role !== "user") {
    turns.shift();
  }

  // History preceding the new user prompt must end with 'model'
  while (turns.length > 0 && turns[turns.length - 1].role !== "model") {
    turns.pop();
  }

  return turns;
}

export async function POST(req: NextRequest) {
  try {
    const { question, history, email } = await req.json();

    if (!question || typeof question !== "string") {
      return new Response("Missing or invalid question", { status: 400 });
    }

    const cleanQuestion = question.trim();
    const lowerQ = cleanQuestion.toLowerCase();

    // Guardrail: Simple injection/jailbreak filter
    if (
      lowerQ.includes("ignore previous instructions") ||
      lowerQ.includes("system prompt") ||
      lowerQ.includes("developer mode")
    ) {
      return new Response(
        "I am designed solely to assist with Dubai real estate transactions and market advisory. How can I help you regarding your Dubai property goals?",
        {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }
      );
    }

    // 1. Parse Intent & Extract Numerical Filters (Bedrooms, Budget, Community)
    const parsed = parseQueryIntent(cleanQuestion);

    // 2. Structured Retrieval: Property Listings
    const matchedProperties = queryProperties({
      community: parsed.community,
      maxPrice: parsed.maxPrice,
      minBedrooms: parsed.minBedrooms,
      maxBedrooms: parsed.maxBedrooms,
      propertyType: parsed.propertyType,
    });

    // 3. Structured Retrieval: Community Metrics / Yields
    const matchingMetrics = queryCommunityMetrics({
      community: parsed.community,
      sortByYield: true,
    });

    // 4. Hybrid Knowledge Retrieval
    const relevantKnowledge = queryAdvisoryKnowledge(cleanQuestion, 3);

    // 5. Construct Grounded RAG Context
    let contextBlock = "### VERIFIED DUBAI MARKET DATA & ADVISORY CONTEXT:\n\n";

    if (matchedProperties.length > 0) {
      contextBlock += "MATCHING PORTFOLIO LISTINGS:\n";
      for (const p of matchedProperties) {
        contextBlock += `- ${p.title} (${p.community}): AED ${p.price.toLocaleString()} (${p.bedrooms} Beds, ${p.bathrooms} Baths, ${p.areaSqft.toLocaleString()} sqft, ${p.furnished}). Location: ${p.fullAddress}\n`;
      }
      contextBlock += "\n";
    }

    if (matchingMetrics.length > 0) {
      contextBlock += "COMMUNITY RENTAL YIELDS & BENCHMARKS:\n";
      for (const m of matchingMetrics.slice(0, 4)) {
        contextBlock += `- ${m.name}: Gross Yield ~${m.grossYieldApartments}% (1-Bed Rent: AED ${m.medianRent1Bed.toLocaleString()}/yr, 2-Bed: AED ${m.medianRent2Bed.toLocaleString()}/yr, Avg Price/sqft: AED ${m.averagePricePerSqft}). Note: ${m.advisoryNote}\n`;
      }
      contextBlock += "\n";
    }

    if (relevantKnowledge.length > 0) {
      contextBlock += "OFFICIAL ADVISORY POLICIES & KNOWLEDGE:\n";
      for (const k of relevantKnowledge) {
        contextBlock += `[${k.title}]: ${k.content}\n\n`;
      }
    }

    // 6. Gemini LLM Streaming Generation (if key is present)
    const geminiApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (geminiApiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey: geminiApiKey });
        const formattedHistory = sanitizeGeminiHistory(history);

        const chat = ai.chats.create({
          model: "gemini-2.5-flash",
          config: {
            systemInstruction: `${SYSTEM_GUARDRAIL_PROMPT}\n\n${contextBlock}`,
          },
          history: formattedHistory,
        });

        const responseStream = await chat.sendMessageStream({
          message: cleanQuestion,
        });

        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of responseStream) {
                if (chunk.text) {
                  controller.enqueue(encoder.encode(chunk.text));
                }
              }
              controller.close();
            } catch (streamError) {
              console.error("Stream generation error:", streamError);
              controller.error(streamError);
            }
          },
        });

        return new Response(stream, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
          },
        });
      } catch (geminiError) {
        console.warn("Gemini generation failed, falling back to deterministic answer:", geminiError);
      }
    }

    // 7. Dynamic Deterministic RAG Response (when API key is not yet set or fails)
    let dynamicAnswer = "";

    if (parsed.minBedrooms !== undefined && matchedProperties.length > 0) {
      const bedCount = parsed.minBedrooms === 0 ? "Studio" : `${parsed.minBedrooms}-Bedroom`;
      dynamicAnswer = `Here are prime verified ${bedCount} options currently in our Dubai portfolio:

${matchedProperties
  .map(
    (p, i) =>
      `${i + 1}. ${p.title}\n` +
      `   Price: AED ${p.price.toLocaleString()} | Size: ${p.areaSqft.toLocaleString()} sqft\n` +
      `   Community: ${p.community} (${p.furnished})\n` +
      `   Details: ${p.description}`
  )
  .join("\n\n")}

Advisory Note: For ${bedCount} residences, capital appreciation and tenant demand vary by community. Families typically favor Dubai Hills Estate and waterfront towers in Dubai Marina, while investors looking for rental yields look toward Business Bay.

Would you like floor plans or payment schedules for any of these? Ashish can send them directly via WhatsApp.`;
    } else if (parsed.intent === "rental_yield" || lowerQ.includes("yield")) {
      dynamicAnswer = `Based on current Dubai Land Department benchmarks, here are the top-performing areas by gross rental yield:

1. Jumeirah Village Circle (JVC): ~8.2% gross yield (average 1,250 AED/sqft). Very high tenant occupancy with 1-beds renting around 68,000 AED annually.
2. Business Bay: ~7.1% gross yield (average 2,200 AED/sqft). Prime central location bordering Downtown with strong demand for short-term and corporate stays.
3. Dubai Marina: ~6.8% gross yield (average 1,950 AED/sqft). Consistently high liquidity and international tenant demand.
4. Downtown Dubai & Palm Jumeirah: ~5.3% to 5.6% gross yields. While yields are lower due to higher capital value, they offer Dubai's highest wealth preservation and capital appreciation (18% to 24% annual appreciation).

Would you like to review specific high-yielding listings, or schedule a consultation with Ashish Lalwani to map out your target budget?`;
    } else if (parsed.intent === "golden_visa") {
      dynamicAnswer = `To qualify for the 10-Year UAE Golden Visa through property investment:

- Minimum Investment: AED 2,000,000 (approx. $545,000 USD).
- Combining Properties: You can purchase one or multiple properties to meet the 2M threshold.
- Mortgages & Off-Plan: Both qualify. Mortgaged properties require at least 2M AED paid in equity to the bank. Off-plan properties qualify if the registered Oqood contract value is 2M AED or more.
- Family Coverage: Includes your spouse, children of any age, and domestic staff sponsorship.

Ashish's team coordinates directly with DLD registration trustees to handle all documentation seamlessly.`;
    } else if (parsed.intent === "fees_taxes") {
      dynamicAnswer = `When purchasing property in Dubai, budget approximately 6% to 7% above the agreed purchase price for upfront closing costs:

1. Dubai Land Department (DLD) transfer fee: 4% of purchase price + AED 580 admin fee.
2. DLD Registration Trustee Fee: AED 4,000 + 5% VAT.
3. Advisory / Brokerage Fee: 2% of purchase price + 5% VAT.
4. Mortgage Registration (if financing): 0.25% of loan amount + AED 290.

Dubai levies 0% property tax, 0% capital gains tax, and 0% rental income tax.`;
    } else if (parsed.intent === "nri_buyer") {
      dynamicAnswer = `Key guidance for Non-Resident Indian (NRI) and international property buyers in Dubai:

1. 100% Freehold Ownership: Foreign nationals can buy with full ownership title deeds in designated freehold zones.
2. Remote Purchasing: Physical presence is not required. Contracts and Oqood can be executed digitally.
3. Remittance & Repatriation: Funds can be remitted from India under the Liberalised Remittance Scheme (LRS) up to USD 250,000 per financial year per individual, or via NRE/NRO accounts. Rental returns and capital gains can be fully repatriated overseas.
4. Zero Tax: No Dubai taxes on capital gains or rental income.`;
    } else {
      dynamicAnswer = `I can help you explore Dubai real estate opportunities tailored to your goals. You can ask me:

- Specific configurations: e.g. "best 3 bhk apartments", "villas in palm jumeirah", "properties under 2 million"
- Yield & investment: e.g. "which areas have the highest rental yield?", "off-plan vs ready"
- Regulations & process: e.g. "how does the golden visa work?", "what are DLD fees?"

What specific community, bedroom count, or budget are you targeting?`;
    }

    return new Response(dynamicAnswer, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err: any) {
    console.error("Chat API error:", err);
    return new Response("Internal server error processing inquiry", { status: 500 });
  }
}

