import { STATS } from "@/lib/content";
import CountUp from "./CountUp";
import Reveal from "./Reveal";

export default function Stats() {
  return (
    <section className="stats">
      <div className="wrap stats__grid">
        {STATS.map((s, i) => (
          <Reveal key={s.title} delay={i * 100} className="stat-card">
            <span className="stat-card__tag">{s.tag}</span>
            <b className="stat-card__num"><CountUp value={s.value} />{s.suffix}</b>
            <h3 className="stat-card__title">{s.title}</h3>
            <p className="stat-card__label">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
