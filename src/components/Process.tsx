import { STEPS } from "@/lib/content";
import Reveal from "./Reveal";

export default function Process() {
  return (
    <section className="process section" id="process">
      <div className="wrap">
        <Reveal><p className="eyebrow">How it works</p></Reveal>
        <Reveal delay={100}><h2 className="h2">From hello to <em>keys.</em></h2></Reveal>
        <div className="steps" id="steps">
          <div className="steps__line"><span id="stepsFill" /></div>
          {STEPS.map((s, i) => (
            <Reveal key={s.title} variant={i % 2 ? "right" : "left"} className="step">
              <b>{i + 1}</b>
              <div><h3>{s.title}</h3><p>{s.text}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
