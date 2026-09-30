import { SITE } from "@/lib/content";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="wrap">
        <Reveal><p className="eyebrow">Contact</p></Reveal>
        <Reveal variant="mask">
          <h2 className="contact__big">Let’s find<br />your <em>right</em> home.</h2>
        </Reveal>
        <div className="contact__row">
          <a className="btn btn--gold btn--xl" href={SITE.instagram} target="_blank" rel="noopener noreferrer" data-magnet><span>Message on Instagram</span></a>
          <a className="btn btn--ghost btn--xl" href={SITE.linkedin} target="_blank" rel="noopener noreferrer" data-magnet><span>LinkedIn</span></a>
          <a className="btn btn--ghost btn--xl" href={SITE.website} target="_blank" rel="noopener noreferrer" data-magnet><span>ashishlalwani.com</span></a>
        </div>
      </div>
    </section>
  );
}
