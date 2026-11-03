"use client";

import { useRef, useState, useCallback, useEffect } from "react";

export default function ImageCompare({
  before,
  after,
  beforeLabel = "Then",
  afterLabel = "Now",
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  useEffect(() => {
    function onMove(e: MouseEvent | TouchEvent) {
      if (!dragging.current) return;
      e.preventDefault();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      updatePosition(clientX);
    }
    function onUp() {
      dragging.current = false;
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove as EventListener);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [updatePosition]);

  function onDown(e: React.MouseEvent | React.TouchEvent) {
    dragging.current = true;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    updatePosition(clientX);
  }

  return (
    <div
      ref={containerRef}
      className="img-compare"
      onMouseDown={onDown}
      onTouchStart={onDown}
    >
      <img src={after} alt={afterLabel} className="img-compare__after" draggable={false} />
      <div className="img-compare__before" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={before} alt={beforeLabel} draggable={false} />
      </div>
      <div className="img-compare__slider" style={{ left: `${position}%` }}>
        <div className="img-compare__line" />
        <div className="img-compare__handle">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
          </svg>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ transform: "scaleX(-1)" }}>
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
          </svg>
        </div>
      </div>
      <span className="img-compare__label img-compare__label--before">{beforeLabel}</span>
      <span className="img-compare__label img-compare__label--after">{afterLabel}</span>
    </div>
  );
}
