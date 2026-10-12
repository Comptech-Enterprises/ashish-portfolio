"use client";

import { useEffect } from "react";

const DURATION = 2200;

export default function Preloader() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 200 : DURATION;
    const timer = setTimeout(() => {
      document.documentElement.setAttribute("data-ready", "");
    }, total);
    return () => clearTimeout(timer);
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
    </div>
  );
}
