"use client";

import { useState } from "react";
import type { PropertyListing } from "@/app/api/properties/route";

export default function PropertyDetailModal({
  property,
  onClose,
}: {
  property: PropertyListing | null;
  onClose: () => void;
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!property) return null;

  const images = property.images && property.images.length > 0
    ? property.images
    : ["/assets/instagram/post-1.jpg"];

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Build personalized WhatsApp link for immediate direct connection
    const inquiryText = `Hello Ashish, I am interested in this property:
*${property.title}*
Price: ${property.currency} ${property.price.toLocaleString()}
Location: ${property.community ? property.community + ", " : ""}${property.city}
Reference: ${property.propertyId}

*My Contact Details:*
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Note: ${formData.message || "Please provide more details."}`;

    const whatsappUrl = `https://wa.me/971545821600?text=${encodeURIComponent(inquiryText)}`;

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      // Open WhatsApp automatically in a new window/tab to send the lead directly
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }, 600);
  };

  return (
    <div className="prop-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="prop-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="prop-modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="prop-modal-grid">
          {/* Left Column: Visual Gallery & Specs */}
          <div className="prop-modal-gallery">
            <div className="prop-modal-main-img">
              <img
                src={images[activeImageIndex]}
                alt={property.title}
                className="prop-modal-featured-img"
              />
              <span className="prop-modal-price-badge">
                {property.currency} {property.price.toLocaleString()}
              </span>
            </div>

            {images.length > 1 && (
              <div className="prop-modal-thumbs">
                {images.slice(0, 6).map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`prop-modal-thumb ${activeImageIndex === idx ? "is-active" : ""}`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img src={img} alt={`View ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}

            <div className="prop-modal-specs">
              <div className="prop-spec-chip">
                <span className="spec-label">Bedrooms</span>
                <b>{property.bedrooms > 0 ? property.bedrooms : "Studio"}</b>
              </div>
              <div className="prop-spec-chip">
                <span className="spec-label">Bathrooms</span>
                <b>{property.bathrooms}</b>
              </div>
              <div className="prop-spec-chip">
                <span className="spec-label">Area</span>
                <b>{property.areaSqft ? `${property.areaSqft.toLocaleString()} sqft` : "N/A"}</b>
              </div>
              <div className="prop-spec-chip">
                <span className="spec-label">Type</span>
                <b>{property.propertyType}</b>
              </div>
            </div>

            <div className="prop-modal-location">
              <p className="prop-loc-text">
                📍 {property.fullAddress || `${property.community ? property.community + ", " : ""}${property.city}`}
              </p>
              {property.description && (
                <p className="prop-desc-text">{property.description}</p>
              )}
            </div>
          </div>

          {/* Right Column: Ashish Lalwani Inquire Lead Form */}
          <div className="prop-modal-lead-col">
            <div className="prop-agent-header">
              <div className="prop-agent-avatar">
                <img src="/assets/ashish.webp" alt="Ashish Lalwani" />
              </div>
              <div>
                <h4>Ashish Lalwani</h4>
                <p className="prop-agent-title">Senior Advisor · Vibgyor Real Estate</p>
                <span className="prop-agent-exp">23+ Years in Dubai</span>
              </div>
            </div>

            {submitted ? (
              <div className="prop-lead-success">
                <div className="success-icon">✓</div>
                <h3>Inquiry Initiated</h3>
                <p>
                  Thank you, <b>{formData.name}</b>. Your inquiry for <b>{property.title}</b> is being forwarded directly to Ashish via WhatsApp & email.
                </p>
                <button
                  type="button"
                  className="btn btn--sm"
                  onClick={onClose}
                  style={{ marginTop: "16px", width: "100%" }}
                >
                  <span>Close Window</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="prop-lead-form">
                <h5>Schedule a Private Viewing or Inquire</h5>
                <p className="form-subtext">Direct advisory, zero broker spam.</p>

                <div className="lead-input-group">
                  <label htmlFor="lead-name">Your Full Name *</label>
                  <input
                    id="lead-name"
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma / David Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="lead-input-group">
                  <label htmlFor="lead-phone">Phone / WhatsApp Number *</label>
                  <input
                    id="lead-phone"
                    type="tel"
                    required
                    placeholder="+971 50 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="lead-input-group">
                  <label htmlFor="lead-email">Email Address *</label>
                  <input
                    id="lead-email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="lead-input-group">
                  <label htmlFor="lead-message">Message or Questions</label>
                  <textarea
                    id="lead-message"
                    rows={3}
                    placeholder="I am interested in viewing this property this week..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn--gold"
                  disabled={submitting}
                  style={{ width: "100%", marginTop: "10px" }}
                >
                  <span>{submitting ? "Connecting to Ashish…" : "Inquire with Ashish Lalwani →"}</span>
                </button>

                <p className="lead-privacy-note">
                  🔒 Your details remain private and go straight to Ashish Lalwani.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
