import { STATS } from "@/lib/content";
import CountUp from "./CountUp";
import Reveal from "./Reveal";

export default function Stats() {
  return (
    <section className="stats">
      <div className="wrap stats__grid">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 100} className="stat">
            <b><CountUp value={s.value} />{s.suffix}</b>
            <p>{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
