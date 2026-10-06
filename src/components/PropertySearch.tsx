"use client";

import { useRef, useState, FormEvent, PointerEvent } from "react";
import type { PropertyListing } from "@/app/api/properties/route";
import { COMMUNITIES } from "@/lib/content";
import PropertyDetailModal from "./PropertyDetailModal";

const EMIRATES = [
  { value: "dubai", label: "Dubai" },
  { value: "abu-dhabi", label: "Abu Dhabi" },
  { value: "sharjah", label: "Sharjah" },
];

const BEDROOM_OPTIONS = [0, 1, 2, 3, 4, 5];

function formatPrice(price: number, currency: string) {
  return `${currency} ${price.toLocaleString()}`;
}

const MODE = "forSale";

function useSlider() {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });

  const by = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".prop-card");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 22), behavior: "smooth" });
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !track.current) return;
    drag.current = { active: true, startX: e.clientX, startLeft: track.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.active || !track.current) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 5) d.moved = true;
    track.current.scrollLeft = d.startLeft - dx;
  };
  const end = () => {
    drag.current.active = false;
  };
  // swallow the click that follows a drag so cards don't open by accident
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      drag.current.moved = false;
    }
  };

  return { track, by, handlers: { onPointerDown, onPointerMove, onPointerUp: end, onPointerLeave: end, onClickCapture } };
}

function PropertySlider({
  items,
  onSelectProperty,
}: {
  items: PropertyListing[];
  onSelectProperty: (p: PropertyListing) => void;
}) {
  const { track, by, handlers } = useSlider();
  return (
    <div className="prop-slider">
      <div className="prop-slider__bar">
        <span>{items.length} properties</span>
        <div className="prop-slider__nav">
          <button type="button" aria-label="Previous properties" onClick={() => by(-1)}>←</button>
          <button type="button" aria-label="Next properties" onClick={() => by(1)}>→</button>
        </div>
      </div>
      <div className="prop-slider__track" ref={track} data-cursor="Drag" {...handlers}>
        {items.map((item) => (
          <div
            key={item.propertyId}
            onClick={() => onSelectProperty(item)}
            className="prop-card"
            style={{ cursor: "pointer" }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectProperty(item);
              }
            }}
          >
            <div className="prop-card__body">
              {item.images && item.images.length > 0 && (
                <div style={{ borderRadius: "14px", overflow: "hidden", marginBottom: "16px", height: "180px", background: "#f0ede8" }}>
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    loading="lazy"
                  />
                </div>
              )}
              <span className="prop-card__price">{formatPrice(item.price, item.currency)}</span>
              <h3>{item.title}</h3>
              <p className="prop-card__meta">
                {item.propertyType} · {item.bedrooms > 0 ? `${item.bedrooms} bd` : "Studio"} · {item.bathrooms} ba · {item.areaSqft ? `${item.areaSqft.toLocaleString()} sqft` : ""}
              </p>
              <p className="prop-card__location">{item.community ? `${item.community}, ` : ""}{item.city}</p>
              <span className="prop-card__cta">View &amp; Inquire →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PropertySearch() {
  const [emirate, setEmirate] = useState("dubai");
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(null);
  const [community, setCommunity] = useState("");
  const [minBedrooms, setMinBedrooms] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [results, setResults] = useState<PropertyListing[]>([]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const params = new URLSearchParams({ mode: MODE, emirate });
    if (community) params.set("community", community);
    if (minBedrooms) params.set("minBedrooms", minBedrooms);

    try {
      // Update URL query parameters cleanly without reload
      const newUrl = `${window.location.pathname}?${params.toString()}#search`;
      window.history.replaceState(null, "", newUrl);

      const res = await fetch(`/api/properties?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Search failed.");
      setResults(data.items ?? []);
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed.");
      setStatus("error");
    }
  }

  return (
    <div className="prop-search">
      <form className="prop-search__form" onSubmit={handleSubmit}>
        <div className="prop-search__fields">
          <label>
            <span>Emirate</span>
            <select name="emirate" value={emirate} onChange={(e) => setEmirate(e.target.value)}>
              {EMIRATES.map((em) => (
                <option key={em.value} value={em.value}>
                  {em.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Community</span>
            <select name="community" value={community} onChange={(e) => setCommunity(e.target.value)}>
              {COMMUNITIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Min. bedrooms</span>
            <select name="minBedrooms" value={minBedrooms} onChange={(e) => setMinBedrooms(e.target.value)}>
              <option value="">Any</option>
              {BEDROOM_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n === 0 ? "Studio" : `${n}+`}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button type="submit" className="btn" disabled={status === "loading"}>
          <span>{status === "loading" ? "Searching…" : "Search properties"}</span>
        </button>
      </form>

      <div className="prop-search__results">
        {status === "loading" && (
          <p className="prop-search__status">
            Fetching live listings from PropertyFinder (this can take up to 30 seconds).
          </p>
        )}

        {status === "error" && <p className="prop-search__status prop-search__status--error">{error}</p>}

        {status === "done" && results.length === 0 && (
          <p className="prop-search__status">No properties matched your search. Try widening your filters.</p>
        )}

        {status === "done" && results.length > 0 && (
          <PropertySlider
            items={results}
            onSelectProperty={(prop) => setSelectedProperty(prop)}
          />
        )}
      </div>

      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
}
