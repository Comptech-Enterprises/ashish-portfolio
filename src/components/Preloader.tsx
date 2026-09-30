"use client";

import { useEffect, useRef } from "react";

const DURATION = 2300;

export default function Preloader() {
  const bar = useRef<HTMLSpanElement>(null);
  const pct = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 200 : DURATION;
    const t0 = performance.now();
    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = (now: number) => {
      const p = Math.min(100, ((now - t0) / total) * 100);
      if (bar.current) bar.current.style.width = p + "%";
      if (pct.current) pct.current.textContent = String(Math.round(p));
      if (p < 100) raf = requestAnimationFrame(step);
      else timer = setTimeout(() => document.documentElement.setAttribute("data-ready", ""), 250);
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="loader" aria-hidden="true">
      <div className="loader__skyline">
        <svg viewBox="0 0 400 120">
          <path
            className="ld-draw"
            d="M0 118H40V70H52V50H60V30L64 8 68 30V50H76V118H100V80H120V118H150V60H170V118H200V20L205 0 210 20V118H240V72H270V118H300V90H330V50H350V118H400"
          />
        </svg>
      </div>
      <p className="loader__name">
        Ashish <em>Lalwani</em>
      </p>
      <div className="loader__bar">
        <span ref={bar} />
      </div>
      <p className="loader__pct" ref={pct}>
        0
      </p>
    </div>
  );
}
