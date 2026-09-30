"use client";

import { useEffect } from "react";

/** Pointer effects: lagging cursor with labels, magnetic buttons, 3D tilt + spotlight. */
export default function PointerFx() {
  useEffect(() => {
    if (!matchMedia("(hover:hover)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cursor = document.getElementById("cursor");
    const label = document.getElementById("cursorLabel");
    if (!cursor || !label) return;

    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };
    addEventListener("mousemove", move);
    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      cursor.style.transform = `translate(${cx}px,${cy}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    const off: Array<() => void> = [];
    const on = (el: Element, ev: string, fn: (e: MouseEvent) => void) => {
      el.addEventListener(ev, fn as EventListener);
      off.push(() => el.removeEventListener(ev, fn as EventListener));
    };

    document.querySelectorAll<HTMLElement>("[data-cursor]").forEach((el) => {
      on(el, "mouseenter", () => {
        label.textContent = el.dataset.cursor || "";
        cursor.classList.add("is-big");
      });
      on(el, "mouseleave", () => cursor.classList.remove("is-big"));
    });
    document.querySelectorAll("a,button").forEach((el) => {
      on(el, "mouseenter", () => cursor.classList.add("is-link"));
      on(el, "mouseleave", () => cursor.classList.remove("is-link"));
    });
    document.querySelectorAll<HTMLElement>("[data-magnet]").forEach((el) => {
      on(el, "mousemove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px,${(e.clientY - r.top - r.height / 2) * 0.4}px)`;
      });
      on(el, "mouseleave", () => (el.style.transform = ""));
    });
    document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
      on(el, "mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 10}deg) rotateY(${(px - 0.5) * 12}deg)`;
        el.style.setProperty("--mx", px * 100 + "%");
        el.style.setProperty("--my", py * 100 + "%");
      });
      on(el, "mouseleave", () => (el.style.transform = ""));
    });

    return () => {
      removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      off.forEach((f) => f());
    };
  }, []);

  return null;
}
