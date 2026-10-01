import Image from "next/image";
import { SITE } from "@/lib/content";
import Reveal from "./Reveal";

const INSTA_POSTS = [
  {
    image: "/assets/instagram/post-1.jpg",
    tag: "Downtown Dubai",
    title: "Burj Khalifa & Opera District",
    desc: "Prime sky collection with private terrace views.",
    views: "38.4K",
  },
  {
    image: "/assets/instagram/post-2.jpg",
    tag: "Palm Jumeirah",
    title: "Waterfront Villa Walkthrough",
    desc: "Private beach access & custom infinity pool tour.",
    views: "46.2K",
  },
  {
    image: "/assets/instagram/post-3.jpg",
    tag: "Dubai Marina",
    title: "High-Floor Marina Duplex",
    desc: "Sunset panoramic yacht views & premium yield.",
    views: "29.1K",
  },
  {
    image: "/assets/instagram/post-4.jpg",
    tag: "Dubai Hills",
    title: "Golf Course Residence",
    desc: "Modern fairway mansion handover inspection.",
    views: "34.8K",
  },
  {
    image: "/assets/instagram/post-5.jpg",
    tag: "Business Bay",
    title: "Canal-Side Branded Living",
    desc: "Off-plan investor allocation & payment plan.",
    views: "21.5K",
  },
  {
    image: "/assets/instagram/post-6.jpg",
    tag: "Market Intel",
    title: "Freehold & Tax Advantage Brief",
    desc: "Strategic advisory for international property buyers.",
    views: "52.7K",
  },
];

export default function Community() {
  return (
    <section className="community section" id="community">
      <div className="wrap community__grid">
        <div className="community__intro">
          <Reveal><p className="eyebrow">Community &amp; Walkthroughs</p></Reveal>
          <Reveal delay={100}><h2 className="h2">Follow the <em>skyline</em> daily.</h2></Reveal>
          <Reveal delay={200}>
            <p className="lead">
              Private property walkthroughs, off-plan launch allocations, and weekly Dubai market intelligence, shared directly from the city&apos;s most coveted addresses.
            </p>
          </Reveal>
          <Reveal delay={250}>
            <div className="community__profile-badge">
              <div className="community__avatar">
                <span>AL</span>
              </div>
              <div>
                <div className="community__handle-line">
                  <b>ashishlalwanidubai</b>
                  <i className="verified-badge" aria-label="Verified">✦</i>
                </div>
                <p>43K+ followers · Weekly market analysis</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <a className="btn btn--gold" href={SITE.instagram} target="_blank" rel="noopener noreferrer" data-magnet>
              <span>Follow on Instagram</span>
            </a>
          </Reveal>
        </div>

        <div className="community__showcase">
          <div className="insta-grid">
            {INSTA_POSTS.map((post, i) => (
              <Reveal key={post.title} delay={i * 80} variant="scale" className="insta-card-wrap">
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="insta-card"
                  data-cursor="View"
                >
                  <div className="insta-card__image-box">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
                      className="insta-card__img"
                    />
                    <div className="insta-card__overlay" />
                    <span className="insta-card__tag">{post.tag}</span>
                    <span className="insta-card__play" aria-hidden="true">▶</span>
                  </div>
                  <div className="insta-card__body">
                    <h3 className="insta-card__title">{post.title}</h3>
                    <div className="insta-card__footer">
                      <span>{post.views} views</span>
                      <span className="insta-card__action">Watch →</span>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
