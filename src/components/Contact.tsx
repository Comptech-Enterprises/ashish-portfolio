import { SITE } from "@/lib/content";
import Reveal from "./Reveal";

function InstagramLogo() {
  return (
    <svg
      className="social-logo social-logo--ig"
      viewBox="0 0 210 50"
      height="40"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="ig-corner-grad" cx="20%" cy="100%" r="130%">
          <stop offset="0%" stopColor="#ffda65" />
          <stop offset="25%" stopColor="#ff5a43" />
          <stop offset="60%" stopColor="#d62976" />
          <stop offset="100%" stopColor="#962fbf" />
        </radialGradient>
        <linearGradient id="ig-word-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f58529" />
          <stop offset="45%" stopColor="#dd2a7b" />
          <stop offset="100%" stopColor="#8134af" />
        </linearGradient>
      </defs>

      {/* Instagram Camera Glyph */}
      <g transform="translate(1, 1)">
        <rect
          x="1"
          y="1"
          width="46"
          height="46"
          rx="13"
          stroke="url(#ig-corner-grad)"
          strokeWidth="4.5"
          fill="none"
        />
        <circle
          cx="24"
          cy="24"
          r="10.5"
          stroke="url(#ig-corner-grad)"
          strokeWidth="4.5"
          fill="none"
        />
        <circle cx="36" cy="12" r="2.8" fill="url(#ig-corner-grad)" />
      </g>

      {/* Instagram Wordmark */}
      <text
        x="60"
        y="35"
        fontFamily="'Brush Script MT', 'Bickham Script Pro', 'Grand Hotel', cursive, sans-serif"
        fontSize="34"
        fontWeight="700"
        fill="url(#ig-word-grad)"
        letterSpacing="0.3"
      >
        Instagram
      </text>
    </svg>
  );
}

function LinkedInLogo() {
  return (
    <svg
      className="social-logo social-logo--li"
      viewBox="0 0 84 21"
      height="40"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* White background under 'in' badge for high-contrast on any surface */}
      <path
        fill="#ffffff"
        d="M 82.479 0 H 64.583 C 63.727 0 63 0.677 63 1.511 V 19.488 C 63 20.323 63.477 21 64.333 21 H 82.229 C 83.086 21 84 20.323 84 19.488 V 1.511 C 84 0.677 83.336 0 82.479 0"
      />
      {/* 'in' badge with cutout letters */}
      <path
        fill="#0A66C2"
        d="M 82.479 0 H 64.583 C 63.727 0 63 0.677 63 1.511 V 19.488 C 63 20.323 63.477 21 64.333 21 H 82.229 C 83.086 21 84 20.323 84 19.488 V 1.511 C 84 0.677 83.336 0 82.479 0 Z M 71 8 h 2.827 v 1.441 h 0.031 C 74.289 8.664 75.562 7.875 77.136 7.875 80.157 7.875 81 9.479 81 12.45 V 18 H 78 V 12.997 C 78 11.667 77.469 10.5 76.227 10.5 74.719 10.5 74 11.521 74 13.197 V 18 h -3 z m -5 10 h 3 V 8 H 66 Z M 69.375 4.5 A 1.8745 1.8745 0 1 1 65.626 4.501 1.8745 1.8745 0 0 1 69.375 4.5 Z"
      />
      {/* 'e', 'd' letters in #0A66C2 */}
      <path
        fill="#0A66C2"
        d="m 60 18 h -2.8 v -1.191 h -0.03 c -0.623 0.722 -1.705 1.316 -3.539 1.316 -2.5 0 -4.653 -1.881 -4.653 -5.114 0 -3.08 2.122 -5.136 4.747 -5.136 1.625 0 2.634 0.578 3.245 1.316 H 57 V 3 h 3 z m -5.521 -7.875 c -1.715 0 -2.679 1.223 -2.679 2.849 0 1.627 0.964 2.901 2.679 2.901 1.717 0 2.721 -1.241 2.721 -2.901 0 -1.706 -1.004 -2.849 -2.721 -2.849 z m -6.818 6.264 c -0.708 0.917 -2.166 1.736 -4.52 1.736 -3.14 0 -5.14 -2.08 -5.14 -5.347 0 -2.903 1.811 -4.903 5.228 -4.903 2.951 0 4.771 1.938 4.771 5.347 0 0.34 -0.055 0.678 -0.055 0.678 h -7.114 l 0.017 0.309 c 0.197 0.862 0.848 1.916 2.342 1.916 1.304 0 2.198 -0.701 2.602 -1.25 l 1.87 1.514 z m -2.548 -4.39 c 0.02 -1.054 -0.754 -2.124 -1.974 -2.124 -1.452 0 -2.227 1.134 -2.308 2.125 h 4.282 z"
      />
      {/* 'L', 'i', 'n', 'k' letters in #0A66C2 */}
      <path
        fill="#0A66C2"
        d="M 38 8 H 34.5 L 31 12 V 3 h -3 v 15 h 3 v -5 l 3.699 5 h 3.542 L 34 12.533 Z M 16 8 h 2.827 v 1.441 h 0.031 C 19.289 8.664 20.562 7.875 22.136 7.875 25.157 7.875 26 9.792 26 12.45 V 18 H 23 V 12.997 C 23 11.525 22.469 10.5 21.227 10.5 19.719 10.5 19 11.694 19 13.197 V 18 h -3 z m -5 10 h 3 V 8 H 11 Z M 12.501 6.3 a 1.8 1.8 0 1 0 0 -3.599 1.8 1.8 0 0 0 0 3.599 z M 3 3 H 0 V 18 H 9 V 15 H 3 Z"
      />
    </svg>
  );
}

export default function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Contact</p>
        </Reveal>
        <Reveal variant="mask">
          <h2 className="contact__big">
            Let’s find<br />your <em>right</em> home.
          </h2>
        </Reveal>
        <div className="contact__row">
          <a
            className="social-card-btn"
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-magnet
            aria-label="Instagram @ashishlalwanidubai"
          >
            <InstagramLogo />
          </a>
          <a
            className="social-card-btn"
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-magnet
            aria-label="LinkedIn profile"
          >
            <LinkedInLogo />
          </a>
        </div>
      </div>
    </section>
  );
}
