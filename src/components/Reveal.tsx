"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  variant?: "up" | "left" | "right" | "scale" | "mask";
};

/** Fades/slides children in once visible. Mask variant clips an inner wrapper so the observed node stays measurable. */
export default function Reveal({ children, as: Tag = "div", className = "", delay = 0, variant = "up" }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = delay ? { transitionDelay: `${delay}ms` } : undefined;

  if (variant === "mask") {
    return (
      <Tag ref={ref} className={className}>
        <div data-variant="mask" className={`reveal ${shown ? "is-visible" : ""}`} style={style}>
          {children}
        </div>
      </Tag>
    );
  }

  return (
    <Tag ref={ref} data-variant={variant} className={`reveal ${shown ? "is-visible" : ""} ${className}`} style={style}>
      {children}
    </Tag>
  );
}
