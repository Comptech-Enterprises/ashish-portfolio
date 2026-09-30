"use client";

import { useEffect } from "react";

/** Scroll-linked effects: progress bar, nav state, sky fade, parallax, pinned horizontal areas, process line. */
export default function ScrollFx() {
  useEffect(() => {
    const $ = <T extends HTMLElement>(s: string) => document.querySelector<T>(s);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const progress = $("#progress"), nav = $("#nav"), sky = $("#sky");
    const track = $("#areasTrack"), areas = $("#areas"), meter = $("#areasMeter");
    const steps = $("#steps"), fill = $("#stepsFill");
    const par = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
    let lastY = 0, ticking = false;

    const update = () => {
      ticking = false;
      const y = scrollY, vh = innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      if (progress) progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      if (nav) {
        nav.classList.toggle("is-stuck", y > 40);
        nav.classList.toggle("is-hidden", y > lastY && y > 400 && !document.body.classList.contains("menu-open"));
      }
      lastY = y;
      sky?.style.setProperty("--sky", Math.max(0, 1 - y / (vh * 0.9)).toFixed(3));

      if (!reduce) {
        par.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) return;
          el.style.transform = `translate3d(0,${(y * parseFloat(el.dataset.parallax || "0")).toFixed(1)}px,0)`;
        });
        if (areas && track && meter) {
          const ar = areas.getBoundingClientRect();
          const prog = Math.min(1, Math.max(0, -ar.top / (ar.height - vh)));
          const dist = track.scrollWidth - innerWidth + 80;
          track.style.transform = `translate3d(${(-prog * dist).toFixed(1)}px,0,0)`;
          meter.style.transform = `scaleX(${prog})`;
        }
      }
      if (steps && fill) {
        const sr = steps.getBoundingClientRect();
        fill.style.height = Math.min(1, Math.max(0, (vh * 0.6 - sr.top) / sr.height)) * 100 + "%";
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", update);
    update();
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", update);
    };
  }, []);

  return null;
}
