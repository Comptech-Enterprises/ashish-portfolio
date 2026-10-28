"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { VIDEOS } from "@/lib/content";
import Reveal from "./Reveal";

function VideoCard({
  src,
  title,
  delay,
  isUnmuted,
  onUnmute,
  onClick,
}: {
  src: string;
  title: string;
  delay: number;
  isUnmuted: boolean;
  onUnmute: () => void;
  onClick: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  function toggleMute(e: React.MouseEvent) {
    e.stopPropagation();
    if (!ref.current) return;
    if (ref.current.muted) {
      onUnmute();
      ref.current.muted = false;
    } else {
      ref.current.muted = true;
    }
  }

  if (ref.current && !isUnmuted) {
    ref.current.muted = true;
  }

  return (
    <Reveal delay={delay} className="video-card">
      <div className="video-card__frame" onClick={onClick} role="button" tabIndex={0}>
        <video
          ref={ref}
          src={src}
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
        />
        <button
          className="video-card__mute"
          onClick={toggleMute}
          aria-label={isUnmuted ? "Mute" : "Unmute"}
        >
          {!isUnmuted ? (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
      </div>
      <p className="video-card__title">{title}</p>
    </Reveal>
  );
}

function VideoLightbox({
  src,
  title,
  onClose,
}: {
  src: string;
  title: string;
  onClose: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  function toggleMute(e: React.MouseEvent) {
    e.stopPropagation();
    if (!ref.current) return;
    ref.current.muted = !ref.current.muted;
    setMuted(ref.current.muted);
  }

  return (
    <div className="video-lightbox" onClick={onClose}>
      <div className="video-lightbox__content" onClick={(e) => e.stopPropagation()}>
        <video
          ref={ref}
          src={src}
          autoPlay
          loop
          playsInline
          preload="auto"
        />
        <button
          className="video-lightbox__mute"
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
        <button className="video-lightbox__close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
        <p className="video-lightbox__title">{title}</p>
      </div>
    </div>
  );
}

export default function Videos() {
  const [activeAudio, setActiveAudio] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const handleUnmute = useCallback((index: number) => {
    setActiveAudio(index);
  }, []);

  return (
    <>
      <section className="videos" id="videos" aria-label="Featured videos">
        <div className="wrap videos__grid">
          {VIDEOS.map((v, i) =>
            v.src ? (
              <VideoCard
                key={v.title}
                src={v.src}
                title={v.title}
                delay={i * 100}
                isUnmuted={activeAudio === i}
                onUnmute={() => handleUnmute(i)}
                onClick={() => setLightbox(i)}
              />
            ) : (
              <Reveal key={v.title} delay={i * 100} className="video-card">
                <div className="video-card__frame">
                  <div className="video-card__placeholder">
                    <span className="video-card__play" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                    </span>
                    <span className="video-card__soon">Video coming soon</span>
                  </div>
                </div>
                <p className="video-card__title">{v.title}</p>
              </Reveal>
            )
          )}
        </div>
      </section>
      {lightbox !== null && VIDEOS[lightbox]?.src && (
        <VideoLightbox
          src={VIDEOS[lightbox].src}
          title={VIDEOS[lightbox].title}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
