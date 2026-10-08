import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Reveal from "./Reveal";

export default function About() {
  const hasPhoto = fs.existsSync(path.join(process.cwd(), "public/assets/ashish.webp"));
  return (
    <section className="about section" id="about">
      <div className="wrap about__grid">
        <Reveal variant="mask" className="about__portrait">
          <div className="portrait">
            <div className="portrait__fallback"><span>AL</span></div>
            {hasPhoto && (
              <Image
                src="/assets/ashish.webp"
                alt="Ashish Lalwani"
                fill
                priority
                sizes="(max-width:860px) 100vw, 45vw"
                style={{ objectFit: "cover", zIndex: 2 }}
              />
            )}
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
          <Reveal><p className="eyebrow">About Ashish</p></Reveal>
          <Reveal delay={100}>
            <h1 className="h2">Most people see options.<br />I see <em>responsibility.</em></h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="lead">For 23 years, I&apos;ve helped families, NRIs, HNIs and first-time developers make decisions that don&apos;t just feel profitable, but feel right. My name, Ashish, literally means blessing, and I carry that meaning into how I work every single day.</p>
          </Reveal>
          <Reveal delay={200}>
            <ul className="creed">
              <li><b>I don&apos;t overwhelm</b> my clients with 200 listings. I bring clarity.</li>
              <li><b>I don&apos;t push</b> the &ldquo;deal of the day.&rdquo; I explain demand, cycles, numbers and risks.</li>
              <li><b>I don&apos;t chase</b> transactions. I stand for trust, calm, and long-term guidance.</li>
            </ul>
          </Reveal>
          <Reveal delay={250}>
            <div className="formula">
              <p className="eyebrow">My approach</p>
              <div className="formula__steps"><span>Right Property</span><i>→</i><span>Right Reason</span><i>→</i><span>Right Time</span></div>
              <p>If it doesn&apos;t pass all three, it doesn&apos;t go to my clients.</p>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <p>One moment early in my career shaped everything: I waited outside a site office for hours for a client who never came. That day I realised two truths: no one owes you their trust, and once someone gives it to you, you protect it with everything you have. That&apos;s the standard I hold myself to.</p>
          </Reveal>
          <Reveal delay={350}>
            <p>Whether you&apos;re upgrading your home, building your first investment, or quietly expanding your portfolio from India, Africa, the UK, or anywhere in the world, my role is to remove the guesswork.</p>
          </Reveal>
          <Reveal delay={400}>
            <blockquote className="pull">
              <span>Clarity over confusion.</span>
              <span>Confidence over pressure.</span>
              <span>A <em>blessing,</em> not a gamble.</span>
            </blockquote>
          </Reveal>
          <Reveal delay={450}>
            <p>Five years from now, my goal is simple: a business that grows because of the values I built into it, even when I&apos;m not in the room.</p>
            <p className="about__close">If you want a calm, discreet advisor who treats your decision like his own, I&apos;m here to guide you.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
