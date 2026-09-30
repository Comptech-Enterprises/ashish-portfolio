import { MARQUEE } from "@/lib/content";

export default function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((w, i) => (
          <span key={i} style={{ display: "contents" }}>
            <span>{w}</span>
            <i>✦</i>
          </span>
        ))}
      </div>
    </section>
  );
}
