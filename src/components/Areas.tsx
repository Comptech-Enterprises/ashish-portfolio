import Image from "next/image";
import { AREAS } from "@/lib/content";
import Reveal from "./Reveal";
import LogoLoop, { type LogoItem } from "./reactbits/LogoLoop";

const DEVELOPER_PARTNERS: LogoItem[] = [
  {
    node: (
      <div className="dev-partner-badge" title="Emaar Properties">
        <svg viewBox="0 0 24 24" className="dev-partner-badge__icon" fill="currentColor">
          <path d="M12 2L3 9v13h6v-8h6v8h6V9L12 2zm0 3.5l5 3.9v9.6h-2v-8H9v8H7V9.4l5-3.9z" />
        </svg>
        <span className="dev-partner-badge__name">EMAAR</span>
      </div>
    ),
    title: "Emaar Properties",
  },
  {
    node: (
      <div className="dev-partner-badge" title="Nakheel">
        <svg viewBox="0 0 24 24" className="dev-partner-badge__icon" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
        <span className="dev-partner-badge__name">NAKHEEL</span>
      </div>
    ),
    title: "Nakheel",
  },
  {
    node: (
      <div className="dev-partner-badge" title="DAMAC Properties">
        <svg viewBox="0 0 24 24" className="dev-partner-badge__icon" fill="currentColor">
          <path d="M12 2L2 9l10 7 10-7-10-7zm0 15L4 10.5V17l8 5 8-5v-6.5L12 17z" />
        </svg>
        <span className="dev-partner-badge__name">DAMAC</span>
      </div>
    ),
    title: "DAMAC Properties",
  },
  {
    node: (
      <div className="dev-partner-badge" title="Sobha Realty">
        <svg viewBox="0 0 24 24" className="dev-partner-badge__icon" fill="currentColor">
          <path d="M12 2l2.4 7.4h7.8l-6.3 4.6 2.4 7.4-6.3-4.6-6.3 4.6 2.4-7.4-6.3-4.6h7.8z" />
        </svg>
        <span className="dev-partner-badge__name">SOBHA REALTY</span>
      </div>
    ),
    title: "Sobha Realty",
  },
  {
    node: (
      <div className="dev-partner-badge" title="Meraas">
        <svg viewBox="0 0 24 24" className="dev-partner-badge__icon" fill="currentColor">
          <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zm-9 9h7v7H4v-7zm9 0h7v7h-7v-7z" />
        </svg>
        <span className="dev-partner-badge__name">MERAAS</span>
      </div>
    ),
    title: "Meraas",
  },
  {
    node: (
      <div className="dev-partner-badge" title="Omniyat">
        <svg viewBox="0 0 24 24" className="dev-partner-badge__icon" fill="currentColor">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" fill="currentColor" />
        </svg>
        <span className="dev-partner-badge__name">OMNIYAT</span>
      </div>
    ),
    title: "Omniyat",
  },
  {
    node: (
      <div className="dev-partner-badge" title="Ellington Properties">
        <svg viewBox="0 0 24 24" className="dev-partner-badge__icon" fill="currentColor">
          <path d="M5 4h14v3H8v4h10v3H8v6H5V4z" />
        </svg>
        <span className="dev-partner-badge__name">ELLINGTON</span>
      </div>
    ),
    title: "Ellington Properties",
  },
  {
    node: (
      <div className="dev-partner-badge" title="Aldar Properties">
        <svg viewBox="0 0 24 24" className="dev-partner-badge__icon" fill="currentColor">
          <path d="M12 3L2 21h20L12 3zm0 4.8l6.2 11.2H5.8L12 7.8z" />
        </svg>
        <span className="dev-partner-badge__name">ALDAR</span>
      </div>
    ),
    title: "Aldar Properties",
  },
  {
    node: (
      <div className="dev-partner-badge" title="Binghatti">
        <svg viewBox="0 0 24 24" className="dev-partner-badge__icon" fill="currentColor">
          <path d="M6 3h7a5 5 0 0 1 0 10H6V3zm3 3v4h4a2 2 0 1 0 0-4H9zm-3 7h8a5 5 0 0 1 0 10H6v-10zm3 3v4h5a2 2 0 1 0 0-4H9z" />
        </svg>
        <span className="dev-partner-badge__name">BINGHATTI</span>
      </div>
    ),
    title: "Binghatti",
  },
  {
    node: (
      <div className="dev-partner-badge" title="Danube Properties">
        <svg viewBox="0 0 24 24" className="dev-partner-badge__icon" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
        <span className="dev-partner-badge__name">DANUBE</span>
      </div>
    ),
    title: "Danube Properties",
  },
];

export default function Areas() {
  const areaLogos: LogoItem[] = AREAS.map((area, idx) => ({
    node: (
      <div className="area-card-loop">
        <div className="area-card-loop__media">
          <Image
            src={area.image}
            alt={area.name}
            fill
            sizes="(max-width: 768px) 260px, 320px"
            style={{ objectFit: "cover" }}
          />
          <div className="area-card-loop__gradient" />
          <span className="area-card-loop__index">0{idx + 1}</span>
        </div>
        <div className="area-card-loop__info">
          <h3 className="area-card-loop__title">{area.name}</h3>
          <p className="area-card-loop__desc">{area.text}</p>
        </div>
      </div>
    ),
    title: area.name,
  }));

  return (
    <section className="areas section" id="areas">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Where we work</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="h2">
            Prime <em>addresses.</em>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="lead">
            Curated advisory across Dubai&apos;s highest-demand micro-markets and master developments.
          </p>
        </Reveal>
      </div>

      <div className="areas__loop-wrap">
        <LogoLoop
          logos={areaLogos}
          speed={45}
          direction="left"
          gap={24}
          logoHeight={220}
          pauseOnHover={true}
          hoverSpeed={10}
          fadeOut={true}
          fadeOutColor="#F5F5F5"
          scaleOnHover={false}
          ariaLabel="Prime Dubai Communities"
        />
      </div>

      <div className="wrap">
        <div className="areas__partners">
          <p className="areas__partners-label">OFFICIAL DEVELOPER PARTNERSHIPS</p>
        </div>
      </div>

      <div className="areas__partners-loop-wrap">
        <LogoLoop
          logos={DEVELOPER_PARTNERS}
          speed={32}
          direction="right"
          gap={32}
          logoHeight={42}
          pauseOnHover={true}
          hoverSpeed={8}
          fadeOut={true}
          fadeOutColor="#F5F5F5"
          scaleOnHover={false}
          ariaLabel="Official Developer Partnerships"
        />
      </div>
    </section>
  );
}
