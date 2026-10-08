import Image from "next/image";
import { SITE } from "@/lib/content";
import Reveal from "./Reveal";

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
            aria-label="Instagram @ashishlalwanidubai"
          >
            <Image src="/assets/social/instagram.png" alt="Instagram" width={560} height={560} className="social-logo" />
          </a>
          <a
            className="social-card-btn"
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <Image src="/assets/social/linkedin.png" alt="LinkedIn" width={433} height={434} className="social-logo" />
          </a>
        </div>
      </div>
    </section>
  );
}
