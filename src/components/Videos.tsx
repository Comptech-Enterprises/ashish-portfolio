import { VIDEOS } from "@/lib/content";
import Reveal from "./Reveal";

export default function Videos() {
  return (
    <section className="videos" id="videos" aria-label="Featured videos">
      <div className="wrap videos__grid">
        {VIDEOS.map((v, i) => (
          <Reveal key={v.title} delay={i * 100} className="video-card">
            <div className="video-card__frame">
              {v.src ? (
                <video src={v.src} controls playsInline preload="metadata" />
              ) : (
                <div className="video-card__placeholder">
                  <span className="video-card__play" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                  <span className="video-card__soon">Video coming soon</span>
                </div>
              )}
            </div>
            <p className="video-card__title">{v.title}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
