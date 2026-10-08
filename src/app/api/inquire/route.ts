import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let { name, phone } = body;
    const { email, message, property, source } = body;
    if (source === "ashishgpt") {
      name = name || "AshishGPT visitor";
      phone = phone || "Not provided";
    }

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Name, phone, and email are required." },
        { status: 400 }
      );
    }

    const brevoApiKey = process.env.BREVO_API_KEY;
    const recipientEmail = process.env.LEAD_RECIPIENT_EMAIL || "ashish@vibgyorrealestate.com";
    const senderEmail = process.env.BREVO_SENDER_EMAIL || "info@vibgyorrealestate.com";
    const senderName = process.env.BREVO_SENDER_NAME || "Ashish Lalwani Website";

    // Format rich HTML for lead email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #b79b6f; border-bottom: 2px solid #b79b6f; padding-bottom: 10px;">
          🏡 New Property Inquiry Received
        </h2>
        
        <p style="font-size: 15px; color: #333;">
          A client has submitted an inquiry on your portfolio website.
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; font-weight: bold; width: 35%;">Client Name:</td>
            <td style="padding: 10px; color: #111;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold;">Phone / WhatsApp:</td>
            <td style="padding: 10px; color: #111;">
              <a href="tel:${phone}" style="color: #0A66C2; text-decoration: none;">${phone}</a>
              &nbsp;|&nbsp;
              <a href="https://wa.me/${phone.replace(/[^0-9]/g, "")}" style="color: #25D366; text-decoration: none;">WhatsApp Client</a>
            </td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; font-weight: bold;">Email:</td>
            <td style="padding: 10px; color: #111;">
              <a href="mailto:${email}" style="color: #0A66C2; text-decoration: none;">${email}</a>
            </td>
          </tr>
          ${
            message
              ? `<tr>
                  <td style="padding: 10px; font-weight: bold;">Message:</td>
                  <td style="padding: 10px; color: #555;">${message}</td>
                </tr>`
              : ""
          }
        </table>

        ${
          property
            ? `
          <h3 style="color: #111; margin-top: 25px; border-bottom: 1px solid #ddd; padding-bottom: 6px;">
            Inquired Property Details:
          </h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background-color: #fdfaf5;">
              <td style="padding: 8px; font-weight: bold; width: 35%;">Title:</td>
              <td style="padding: 8px;">${property.title || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Price:</td>
              <td style="padding: 8px; color: #8a6b3e; font-weight: bold;">
                ${property.currency || "AED"} ${(property.price || 0).toLocaleString()}
              </td>
            </tr>
            <tr style="background-color: #fdfaf5;">
              <td style="padding: 8px; font-weight: bold;">Location:</td>
              <td style="padding: 8px;">${property.community ? property.community + ", " : ""}${property.city || "Dubai"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Reference ID:</td>
              <td style="padding: 8px;">${property.propertyId || "N/A"}</td>
            </tr>
            <tr style="background-color: #fdfaf5;">
              <td style="padding: 8px; font-weight: bold;">Specs:</td>
              <td style="padding: 8px;">${property.bedrooms || 0} Beds · ${property.bathrooms || 0} Baths · ${(property.areaSqft || 0).toLocaleString()} sqft</td>
            </tr>
          </table>
        `
            : ""
        }

        <div style="margin-top: 30px; padding: 12px; background-color: #f5f5f5; border-radius: 6px; font-size: 12px; color: #777; text-align: center;">
          Sent automatically from Ashish Lalwani Real Estate Portfolio (via Brevo API)
        </div>
      </div>
    `;

    // If Brevo API key is present, send actual email via Brevo REST API
    if (brevoApiKey) {
      const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": brevoApiKey,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: { name: senderName, email: senderEmail },
          to: [{ email: recipientEmail, name: "Ashish Lalwani" }],
          replyTo: { email, name },
          subject: `⚡ New Lead: ${name} inquiring about ${property?.title || "Dubai Property"}`,
          htmlContent,
        }),
      });

      if (!brevoRes.ok) {
        const errorData = await brevoRes.json().catch(() => null);
        console.error("Brevo API error:", errorData);
        return NextResponse.json(
          { error: errorData?.message || "Failed to deliver email through Brevo." },
          { status: 502 }
        );
      }

      return NextResponse.json({ success: true, message: "Email sent successfully via Brevo." });
    }

    // Fallback if BREVO_API_KEY is not yet populated
    console.log("Mock lead recorded (BREVO_API_KEY not set):", { name, phone, email, property: property?.title });
    return NextResponse.json({
      success: true,
      mock: true,
      message: "Lead processed (BREVO_API_KEY pending).",
    });
  } catch (error) {
    console.error("Error in inquire route:", error);
    return NextResponse.json(
      { error: "Internal server error processing inquiry." },
      { status: 500 }
    );
  }
}
