"use client";

import { useState, useEffect } from "react";
import { SERVICES } from "@/lib/content";
import Reveal from "./Reveal";

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState<number>(0);

  const total = SERVICES.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(timer);
  }, [paused, total]);

  const onTouchStart = (e: React.TouchEvent) => {
    setPaused(true);
    setTouchStartX(e.touches[0].clientX);
    setTouchDeltaX(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    setTouchDeltaX(e.touches[0].clientX - touchStartX);
  };

  const onTouchEnd = () => {
    setPaused(false);
    if (touchStartX === null) return;
    const threshold = 40;
    if (touchDeltaX < -threshold) {
      handleNext();
    } else if (touchDeltaX > threshold) {
      handlePrev();
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  return (
    <section className="services section" id="services">
      <div className="wrap">
        <Reveal><p className="eyebrow">What we do</p></Reveal>
        <Reveal delay={100}><h2 className="h2">Three ways to <em>own</em> Dubai.</h2></Reveal>

        <div
          className="services-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          role="region"
          aria-label="Services carousel"
        >
          <div className="services-carousel__viewport">
            <div
              className="services-carousel__track"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {SERVICES.map((s, i) => (
                <div key={s.title} className="services-carousel__slide">
                  <article className="card is-visible">
                    <div data-tilt data-cursor="View" className="card__inner">
                      <span className="card__no">0{i + 1}</span>
                      <div className="card__icon">
                        <svg viewBox="0 0 64 64"><path d={s.icon} /></svg>
                      </div>
                      <h3>{s.title}</h3>
                      <p>{s.text}</p>
                      <a
                        href="#contact"
                        className="card__more"
                        aria-label={`Explore ${s.title} advisory services`}
                      >
                        Explore →
                      </a>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div className="services-carousel__controls">
            <button
              type="button"
              className="services-carousel__btn"
              onClick={handlePrev}
              aria-label="Previous service"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="services-carousel__tabs" role="tablist">
              {SERVICES.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  role="tab"
                  aria-selected={i === activeIndex}
                  className={`services-carousel__tab ${i === activeIndex ? "is-active" : ""}`}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to ${s.title}`}
                >
                  <span className="services-carousel__tab-num">0{i + 1}</span>
                  <span className="services-carousel__tab-label">{s.title}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              className="services-carousel__btn"
              onClick={handleNext}
              aria-label="Next service"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
