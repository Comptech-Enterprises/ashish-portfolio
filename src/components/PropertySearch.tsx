"use client";

import { useRef, useState, FormEvent, PointerEvent } from "react";
import type { PropertyListing } from "@/app/api/properties/route";

const EMIRATES = [
  { value: "dubai", label: "Dubai" },
  { value: "abu-dhabi", label: "Abu Dhabi" },
  { value: "sharjah", label: "Sharjah" },
  { value: "ajman", label: "Ajman" },
  { value: "ras-al-khaimah", label: "Ras Al Khaimah" },
  { value: "fujairah", label: "Fujairah" },
  { value: "umm-al-quwain", label: "Umm Al Quwain" },
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

function PropertySlider({ items }: { items: PropertyListing[] }) {
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
            <a
              key={item.propertyId}
              href={item.listingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="prop-card"
              draggable={false}
            >
              <div className="prop-card__body">
                <span className="prop-card__price">{formatPrice(item.price, item.currency)}</span>
                <h3>{item.title}</h3>
                <p className="prop-card__meta">
                  {item.propertyType} · {item.bedrooms} bd · {item.bathrooms} ba · {item.areaSqft.toLocaleString()} sqft
                </p>
                <p className="prop-card__location">{item.community ? `${item.community}, ` : ""}{item.city}</p>
                <span className="prop-card__cta">View listing →</span>
              </div>
            </a>
          ))}
        </div>
    </div>
  );
}

export default function PropertySearch() {
  const [emirate, setEmirate] = useState("dubai");
  const [minBedrooms, setMinBedrooms] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [results, setResults] = useState<PropertyListing[]>([]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const params = new URLSearchParams({ mode: MODE, emirate });
    if (minBedrooms) params.set("minBedrooms", minBedrooms);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    try {
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
            <select value={emirate} onChange={(e) => setEmirate(e.target.value)}>
              {EMIRATES.map((em) => (
                <option key={em.value} value={em.value}>
                  {em.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Min. bedrooms</span>
            <select value={minBedrooms} onChange={(e) => setMinBedrooms(e.target.value)}>
              <option value="">Any</option>
              {BEDROOM_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n === 0 ? "Studio" : `${n}+`}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Min. price (AED)</span>
            <input
              type="number"
              min={0}
              placeholder="No min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </label>

          <label>
            <span>Max. price (AED)</span>
            <input
              type="number"
              min={0}
              placeholder="No max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </label>
        </div>

        <button type="submit" className="btn" disabled={status === "loading"}>
          <span>{status === "loading" ? "Searching…" : "Search properties"}</span>
        </button>
      </form>

      <div className="prop-search__results">
        {status === "loading" && (
          <p className="prop-search__status">
            Fetching live listings from PropertyFinder — this can take up to 30 seconds.
          </p>
        )}

        {status === "error" && <p className="prop-search__status prop-search__status--error">{error}</p>}

        {status === "done" && results.length === 0 && (
          <p className="prop-search__status">No properties matched your search. Try widening your filters.</p>
        )}

        {status === "done" && results.length > 0 && <PropertySlider items={results} />}
      </div>
    </div>
  );
}
