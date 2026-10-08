import Reveal from "./Reveal";

const CHECKS = [
  "I look at the developer.",
  "I look at the track record.",
  "I look at what has been delivered.",
  "And I look at what Dubai is becoming next.",
];

export default function DubaiIT() {
  return (
    <section className="dubai-it section" id="dubai-it">
      <div className="wrap dubai-it__inner">
        <Reveal><p className="eyebrow">Dubai IT</p></Reveal>
        <Reveal delay={100}>
          <h2 className="h2">Say what you do.<br /><em>Do what you say.</em></h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="dubai-it__kicker">This statement is more than any brochure.</p>
        </Reveal>

        <div className="dubai-it__story">
          <Reveal delay={100}><p className="lead">I came to Dubai in 2003.</p></Reveal>
          <Reveal delay={150}>
            <p>Over the past 23+ years, I have watched this city turn ambition into reality, project after project, vision after vision.</p>
          </Reveal>
          <Reveal delay={200}>
            <p>And I&apos;ve learned that in Dubai, promises are easy. <strong>Delivery is what matters.</strong></p>
          </Reveal>
          <Reveal delay={250}>
            <p>That is why I don&apos;t judge a property opportunity by the brochure alone.</p>
          </Reveal>
          <Reveal delay={300}>
            <ul className="dubai-it__checks">
              {CHECKS.map((c) => (
                <li key={c}><i aria-hidden="true">✦</i>{c}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={350}>
            <p>Because when you&apos;re investing in Dubai, you&apos;re not just buying a property.</p>
            <p className="dubai-it__strong">You&apos;re investing in the city&apos;s future.</p>
          </Reveal>
          <Reveal delay={400}>
            <p>And for me, Dubai IT is simple:</p>
            <div className="dubai-it__motto">
              <span>Say what you do.</span>
              <span>Do what you say.</span>
            </div>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={450}>
          <blockquote className="dubai-it__quote">
            <span>Because in Dubai,</span>
            <b>delivery is the <em>real brochure.</em></b>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
