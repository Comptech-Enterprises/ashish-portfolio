const STARS = Array.from({ length: 70 }, (_, i) => {
  // deterministic pseudo-random so server and client markup match
  const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  return { left: r(1) * 100, top: r(2) * 60, d: 2 + r(3) * 4, delay: r(4) * 4 };
});

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__sun" data-parallax="0.25" />
      <div className="hero__stars">
        {STARS.map((s, i) => (
          <i
            key={i}
            className="star"
            style={{ left: `${s.left.toFixed(2)}%`, top: `${s.top.toFixed(2)}%`, ["--d" as string]: `${s.d.toFixed(2)}s`, animationDelay: `-${s.delay.toFixed(2)}s` }}
          />
        ))}
      </div>

      <div className="hero__content">
        <p className="eyebrow hero__eyebrow" data-split-in>Vibgyor Real Estate · Dubai</p>
        <h1 className="hero__title">
          <span className="line"><span>Always the</span></span>
          <span className="line"><span><em>right</em> investment.</span></span>
        </h1>
        <p className="hero__sub" data-split-in>
          Ashish Lalwani helps buyers, sellers and investors find their place in Dubai’s skyline: residential, commercial and everything worth owning.
        </p>
        <div className="hero__cta" data-split-in>
          <a href="#contact" className="btn" data-magnet><span>Book a consultation</span></a>
          <a href="#areas" className="btn btn--ghost" data-magnet><span>Explore areas</span></a>
        </div>
      </div>

      <div className="hero__city">
        <svg className="layer layer--3" data-parallax="-0.05" viewBox="0 0 1600 300" preserveAspectRatio="none"><path d="M0 300V190H60V150H110V200H170V120H230V180H300V90H360V170H430V140H500V200H570V110H640V180H700V70H770V160H850V130H920V190H1000V100H1070V170H1150V120H1220V200H1290V140H1360V180H1430V110H1500V190H1600V300Z" /></svg>
        <svg className="layer layer--2" data-parallax="-0.1" viewBox="0 0 1600 300" preserveAspectRatio="none"><path d="M0 300V210H80V130H130V90H160V210H240V160H300V110H340V200H420V70H460V200H540V150H620V210H700V100H760V180H830V210H920V120H980V180H1060V60H1100V190H1180V150H1260V210H1340V110H1400V190H1480V150H1600V300Z" /></svg>
        <svg className="layer layer--1" data-parallax="-0.16" viewBox="0 0 1600 300" preserveAspectRatio="none"><path d="M0 300V240H100V200H180V250H260V180H320V240H420V210H520V250H600V190H660V240H740V220H800V250H900V200H960V240H1050V210H1120V250H1200V190H1260V240H1360V210H1440V250H1520V220H1600V300Z" /></svg>
        <svg className="tower" data-parallax="-0.08" viewBox="0 0 60 400" aria-hidden="true"><path d="M30 0L33 60L38 120L44 200L52 300L60 400H0L8 300L16 200L22 120L27 60Z" /></svg>
      </div>

      <div className="hero__scroll"><span />Scroll</div>
    </section>
  );
}
