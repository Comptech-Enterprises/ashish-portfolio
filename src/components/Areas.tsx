import type { CSSProperties } from "react";
import { AREAS } from "@/lib/content";

export default function Areas() {
  return (
    <section className="areas" id="areas">
      <div className="areas__pin">
        <div className="areas__head">
          <p className="eyebrow">Where we work</p>
          <h2 className="h2">Prime <em>addresses.</em></h2>
          <div className="areas__meter"><span id="areasMeter" /></div>
        </div>
        <div className="areas__track" id="areasTrack">
          {AREAS.map((a, i) => (
            <article key={a.name} className="area" style={{ ["--a"]: a.a, ["--b"]: a.b } as CSSProperties} data-cursor="Drag">
              <svg viewBox="0 0 300 200"><path d={a.path} /></svg>
              <span>0{i + 1}</span>
              <h3>{a.name}</h3>
              <p>{a.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
