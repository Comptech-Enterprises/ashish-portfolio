import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Reveal from "./Reveal";

export default function About() {
  const hasPhoto = fs.existsSync(path.join(process.cwd(), "public/assets/ashish.jpg"));
  return (
    <section className="about section" id="about">
      <div className="wrap about__grid">
        <Reveal variant="mask" className="about__portrait">
          <div className="portrait" data-tilt>
            <div className="portrait__fallback"><span>AL</span></div>
            {hasPhoto && <Image src="/assets/ashish.jpg" alt="Ashish Lalwani" fill sizes="(max-width:860px) 100vw, 45vw" style={{ objectFit: "cover", zIndex: 2 }} />}
            <div className="portrait__badge"><b>23</b>years in Dubai real estate</div>
          </div>
          <div className="rotor" aria-hidden="true">
            <svg viewBox="0 0 200 200">
              <defs><path id="circ" d="M100 100m-80 0a80 80 0 1 1 160 0a80 80 0 1 1-160 0" /></defs>
              <text><textPath href="#circ">DUBAI · REAL ESTATE · DUBAI · REAL ESTATE · </textPath></text>
            </svg>
            <b>✦</b>
          </div>
        </Reveal>
        <div className="about__text">
          <Reveal><p className="eyebrow">About</p></Reveal>
          <Reveal delay={100}><h2 className="h2">Real estate,<br />done <em>right.</em></h2></Reveal>
          <Reveal delay={200}>
            <p className="lead">Ashish Lalwani is a Dubai property advisor with Vibgyor Real Estate, guiding clients with 23 years of results in the market.</p>
          </Reveal>
          <Reveal delay={300}>
            <p>For 23 years he has helped families, NRIs, HNIs and first-time developers make decisions that feel right, not just profitable — bringing clarity instead of 200 listings, and explaining demand, cycles and risk instead of chasing the deal of the day. His filter is simple: Right Property, Right Reason, Right Time. If it doesn&apos;t pass all three, it doesn&apos;t go to a client.</p>
          </Reveal>
          <Reveal delay={400}>
            <ul className="ticks"><li>23 years of market experience</li><li>Trusted by NRIs &amp; HNIs worldwide</li><li>Clarity over confusion</li></ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
