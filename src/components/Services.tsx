import { SERVICES } from "@/lib/content";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section className="services section" id="services">
      <div className="wrap">
        <Reveal><p className="eyebrow">What we do</p></Reveal>
        <Reveal delay={100}><h2 className="h2">Three ways to <em>own</em> Dubai.</h2></Reveal>
        <div className="cards">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} as="article" delay={i * 150} className="card">
              <div data-tilt data-cursor="View" className="card__inner">
                <span className="card__no">0{i + 1}</span>
                <div className="card__icon"><svg viewBox="0 0 64 64"><path d={s.icon} /></svg></div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <span className="card__more">Explore →</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
