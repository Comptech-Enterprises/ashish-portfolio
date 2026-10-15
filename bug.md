# Bug Reports and Defect Log

**Target System:** Ashish Lalwani Real Estate Web Application  
**Target URL:** https://ashish-lalwani-website-ai.vercel.app/  
**Audit Date:** October 2026  
**Status:** Open / Documented  

---

## 1. Summary of Detected Defects

| Bug ID | Title | Component / File | Severity | Status |
| :--- | :--- | :--- | :--- | :--- |
| BUG-001 | Conversation History Not Transmitted or Appended in AshishGPT | [AshishChat.tsx](file:///c:/Users/RANBIR/Desktop/comptech_realestate_antigravity/src/components/AshishChat.tsx) / [chat/route.ts](file:///c:/Users/RANBIR/Desktop/comptech_realestate_antigravity/src/app/api/chat/route.ts) | High | Documented |
| BUG-002 | Non-Streaming LLM Execution Causes High Perceived Latency | [chat/route.ts](file:///c:/Users/RANBIR/Desktop/comptech_realestate_antigravity/src/app/api/chat/route.ts) / [AshishChat.tsx](file:///c:/Users/RANBIR/Desktop/comptech_realestate_antigravity/src/components/AshishChat.tsx) | Medium | Documented |
| BUG-003 | RapidAPI Properties Display Internal Placeholder Hash Links | [PropertyDetailModal.tsx](file:///c:/Users/RANBIR/Desktop/comptech_realestate_antigravity/src/components/PropertyDetailModal.tsx) | Low | Documented |
| BUG-004 | Inquire API Delivers Silent Mock Success Without Live Email Alerts | [inquire/route.ts](file:///c:/Users/RANBIR/Desktop/comptech_realestate_antigravity/src/app/api/inquire/route.ts) / [ContactSection.tsx](file:///c:/Users/RANBIR/Desktop/comptech_realestate_antigravity/src/components/ContactSection.tsx) | Medium | Documented |
| BUG-005 | Raw Integer Prices Lack Localized Thousands Separators in Detail Views | [PropertyDetailModal.tsx](file:///c:/Users/RANBIR/Desktop/comptech_realestate_antigravity/src/components/PropertyDetailModal.tsx) | Low | Documented |

---

## 2. Detailed Bug Reports

### BUG-001: Conversation History Not Transmitted or Appended in AshishGPT

* **Component:** Client Chat Component & Chat API Endpoint
* **Affected Files:**
  * [src/components/AshishChat.tsx](file:///c:/Users/RANBIR/Desktop/comptech_realestate_antigravity/src/components/AshishChat.tsx)
  * [src/app/api/chat/route.ts](file:///c:/Users/RANBIR/Desktop/comptech_realestate_antigravity/src/app/api/chat/route.ts)
* **Severity:** High
* **Current Behavior:**
  When a user asks a question in the AshishGPT floating drawer or inline widget, the client-side `ask` handler executes:
  ```typescript
  body: JSON.stringify({ question: q, email: userEmail || undefined })
  ```
  The prior conversation items stored in state (`messages`) are never sent in the payload. Furthermore, in `src/app/api/chat/route.ts`, the model prompt is constructed strictly from the latest question:
  ```typescript
  const prompt = `${SYSTEM_PROMPT}\n\nClient Question: "${question}"\n\nProvide your response as Ashish:`;
  ```
  If the user asks:
  1. "What 3-bedroom penthouses are available in Dubai Marina?"
  2. Follow-up: "What is the payment plan for the second property you mentioned?"
  The assistant has no reference to what the second property was, resulting in generic answers asking the user to clarify.
* **Expected Behavior:**
  The client should forward the last 4 to 8 conversational turns (user inputs and assistant outputs). The server route should inject this dialogue history into the Gemini context or initialize a multi-turn chat session using `ai.chats.create()`, allowing contextual follow-up questions.
* **Proposed Resolution:**
  1. In [AshishChat.tsx](file:///c:/Users/RANBIR/Desktop/comptech_realestate_antigravity/src/components/AshishChat.tsx), include `history: messages.slice(-6)` in the POST body.
  2. In [src/app/api/chat/route.ts](file:///c:/Users/RANBIR/Desktop/comptech_realestate_antigravity/src/app/api/chat/route.ts), parse `history` and construct a structured dialogue thread or pass it to `ai.chats.create({ history: formattedHistory })`.

---

### BUG-002: Non-Streaming LLM Execution Causes High Perceived Latency

* **Component:** Chat Backend API & Streaming Handler
* **Affected Files:**
  * [src/app/api/chat/route.ts](file:///c:/Users/RANBIR/Desktop/comptech_realestate_antigravity/src/app/api/chat/route.ts)
  * [src/components/AshishChat.tsx](file:///c:/Users/RANBIR/Desktop/comptech_realestate_antigravity/src/components/AshishChat.tsx)
* **Severity:** Medium
* **Current Behavior:**
  The server invokes `ai.models.generateContent` synchronously. Complex property comparisons or detailed yield breakdowns generate several hundred tokens, taking between 5.0 to 15.6 seconds on Vercel serverless execution. During this entire wait duration, the UI displays only a bouncing three-dot indicator, leading users to believe the application may have stalled.
* **Expected Behavior:**
  Tokens should stream incrementally to the browser. The first tokens should begin rendering within 600 to 1200 milliseconds of submission, creating an interactive, real-time consultation experience.
* **Proposed Resolution:**
  1. Migrate `ai.models.generateContent` to `ai.models.generateContentStream` in [src/app/api/chat/route.ts](file:///c:/Users/RANBIR/Desktop/comptech_realestate_antigravity/src/app/api/chat/route.ts).
  2. Return a `ReadableStream` with `text/event-stream` or raw text chunks.
  3. In [AshishChat.tsx](file:///c:/Users/RANBIR/Desktop/comptech_realestate_antigravity/src/components/AshishChat.tsx), read the response stream via `reader.read()` and update the active message state chunk by chunk.

---

### BUG-003: RapidAPI Properties Display Internal Placeholder Hash Links

* **Component:** Property Detail Modal and Action Buttons
* **Affected Files:**
  * [src/components/PropertyDetailModal.tsx](file:///c:/Users/RANBIR/Desktop/comptech_realestate_antigravity/src/components/PropertyDetailModal.tsx)
  * [src/components/PropertiesSection.tsx](file:///c:/Users/RANBIR/Desktop/comptech_realestate_antigravity/src/components/PropertiesSection.tsx)
* **Severity:** Low
* **Current Behavior:**
  For properties loaded dynamically from RapidAPI (Bayut API), the listing URL is mapped to `#property-[id]`. Inside [PropertyDetailModal.tsx](file:///c:/Users/RANBIR/Desktop/comptech_realestate_antigravity/src/components/PropertyDetailModal.tsx), clicking the external link button updates the browser URL hash without opening a property dossier or initiating a consultation.
* **Expected Behavior:**
  If an authentic external web link is provided by the API, the button should navigate to that URL in a new tab (`target="_blank" rel="noopener noreferrer"`). If the property is syndicated directly through Vibgyor Real Estate without an external URL, the primary button should trigger a WhatsApp consultation pre-populated with:  
  `Hello Ashish, I would like to inquire about the listing: [Property Title] (Ref: [ID]) priced at [Price].`
* **Proposed Resolution:**
  Update the action button in [PropertyDetailModal.tsx](file:///c:/Users/RANBIR/Desktop/comptech_realestate_antigravity/src/components/PropertyDetailModal.tsx) to check if `property.externalUrl` starts with `http`. If not, render a direct WhatsApp consultation trigger.

---

### BUG-004: Inquire API Delivers Silent Mock Success Without Live Email Alerts

* **Component:** Inquire API Route & Contact Form
* **Affected Files:**
  * [src/app/api/inquire/route.ts](file:///c:/Users/RANBIR/Desktop/comptech_realestate_antigravity/src/app/api/inquire/route.ts)
  * [src/components/ContactSection.tsx](file:///c:/Users/RANBIR/Desktop/comptech_realestate_antigravity/src/components/ContactSection.tsx)
* **Severity:** Medium
* **Current Behavior:**
  When `BREVO_API_KEY` is not present in Vercel environment variables, `/api/inquire` returns `{ success: true, mock: true }` and logs the lead details to standard output. The frontend [ContactSection.tsx](file:///c:/Users/RANBIR/Desktop/comptech_realestate_antigravity/src/components/ContactSection.tsx) displays:  
  "Inquiry received! We will be in touch shortly."  
  Because Vercel serverless logs are ephemeral and not continuously monitored, leads who do not subsequently click WhatsApp may never reach Ashish Lalwani's inbox.
* **Expected Behavior:**
  If email delivery cannot be dispatched due to an unconfigured API key, the UI should provide an explicit fallback notification:  
  "Inquiry recorded. For immediate priority scheduling with Ashish Lalwani, connect directly via WhatsApp."
* **Proposed Resolution:**
  In [ContactSection.tsx](file:///c:/Users/RANBIR/Desktop/comptech_realestate_antigravity/src/components/ContactSection.tsx), inspect the `mock` field in the API response. When `res.mock === true`, render an attention prompt with an active WhatsApp button to prevent orphaned leads.

---

### BUG-005: Raw Integer Prices Lack Localized Thousands Separators in Detail Views

* **Component:** Property Detail Modal
* **Affected Files:**
  * [src/components/PropertyDetailModal.tsx](file:///c:/Users/RANBIR/Desktop/comptech_realestate_antigravity/src/components/PropertyDetailModal.tsx)
* **Severity:** Low
* **Current Behavior:**
  RapidAPI listing payloads provide raw numbers (for example, `1850000` or `3200000`). While the main listing card formats the price string, secondary dialog badges and mortgage calculation summaries in [PropertyDetailModal.tsx](file:///c:/Users/RANBIR/Desktop/comptech_realestate_antigravity/src/components/PropertyDetailModal.tsx) display `AED 1850000` without commas.
* **Expected Behavior:**
  All currency figures should be formatted consistently using Dubai conventions: `AED 1,850,000`.
* **Proposed Resolution:**
  Utilize a shared helper function:
  ```typescript
  export const formatPrice = (value: number | string): string => {
    const numeric = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
    if (isNaN(numeric)) return String(value);
    return `AED ${numeric.toLocaleString('en-US')}`;
  };
  ```
