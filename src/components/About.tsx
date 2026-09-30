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
            <div className="portrait__badge"><b>43K</b>Instagram family</div>
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
            <p className="lead">Ashish Lalwani is a Dubai property advisor with the team at Right Homes Real Estate — a trusted name for residential, commercial and investment real estate.</p>
          </Reveal>
          <Reveal delay={300}>
            <p>From first-time buyers to portfolio investors, every client gets the same thing: honest numbers, sharp local knowledge and a partner who stays until the keys are in hand. Award-winning design, real community involvement and a long track record in the Dubai market sit behind the name.</p>
          </Reveal>
          <Reveal delay={400}>
            <ul className="ticks"><li>Design excellence</li><li>Community first</li><li>Market experience</li></ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
