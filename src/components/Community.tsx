import type { CSSProperties } from "react";
import { SITE } from "@/lib/content";
import Reveal from "./Reveal";

const TILES = [215, 200, 225, 205, 220, 195, 230, 210, 200];

export default function Community() {
  return (
    <section className="community section" id="community">
      <div className="wrap community__grid">
        <div>
          <Reveal><p className="eyebrow">Community</p></Reveal>
          <Reveal delay={100}><h2 className="h2">Follow the <em>skyline</em> daily.</h2></Reveal>
          <Reveal delay={200}>
            <p className="lead">New launches, market moves, walkthroughs and Dubai life — shared every week with a community of 43K+ followers.</p>
          </Reveal>
          <a className="btn btn--gold" href={SITE.instagram} target="_blank" rel="noopener noreferrer" data-magnet>
            <span>@ashishlalwanidubai</span>
          </a>
        </div>
        <Reveal variant="scale">
          <div className="phone" data-tilt>
            <div className="phone__top"><i /><b>ashishlalwanidubai</b></div>
            <div className="phone__stats">
              <div><b>323</b>posts</div><div><b>43K</b>followers</div><div><b>1,633</b>following</div>
            </div>
            <div className="phone__grid">
              {TILES.map((h, i) => <i key={i} style={{ ["--h"]: h } as CSSProperties} />)}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
