import Image from "next/image";
import { AREAS } from "@/lib/content";
import Reveal from "./Reveal";
import LogoLoop, { type LogoItem } from "./reactbits/LogoLoop";

const DEVELOPER_PARTNERS: LogoItem[] = [
  {
    node: (
      <div className="dev-partner-badge" title="Emaar Properties">
        <Image
          src="/assets/developers/emaar.svg"
          alt="Emaar Properties"
          width={110}
          height={28}
          className="dev-partner-badge__logo"
        />
      </div>
    ),
    title: "Emaar Properties",
  },
  {
    node: (
      <div className="dev-partner-badge" title="Nakheel">
        <Image
          src="/assets/developers/nakheel.svg"
          alt="Nakheel"
          width={32}
          height={28}
          className="dev-partner-badge__logo"
          style={{ width: "auto" }}
        />
        <span className="dev-partner-badge__name">NAKHEEL</span>
      </div>
    ),
    title: "Nakheel",
  },
  {
    node: (
      <div className="dev-partner-badge" title="DAMAC Properties">
        <Image
          src="/assets/developers/damac.svg"
          alt="DAMAC Properties"
          width={110}
          height={26}
          className="dev-partner-badge__logo"
        />
      </div>
    ),
    title: "DAMAC Properties",
  },
  {
    node: (
      <div className="dev-partner-badge" title="Sobha Realty">
        <Image
          src="/assets/developers/sobha.svg"
          alt="Sobha Realty"
          width={110}
          height={28}
          className="dev-partner-badge__logo"
        />
      </div>
    ),
    title: "Sobha Realty",
  },
  {
    node: (
      <div className="dev-partner-badge" title="Meraas">
        <Image
          src="/assets/developers/meraas.svg"
          alt="Meraas"
          width={100}
          height={26}
          className="dev-partner-badge__logo"
        />
      </div>
    ),
    title: "Meraas",
  },
  {
    node: (
      <div className="dev-partner-badge" title="Omniyat">
        <Image
          src="/assets/developers/omniyat.svg"
          alt="Omniyat"
          width={110}
          height={22}
          className="dev-partner-badge__logo"
        />
      </div>
    ),
    title: "Omniyat",
  },
  {
    node: (
      <div className="dev-partner-badge" title="Ellington Properties">
        <Image
          src="/assets/developers/ellington.png"
          alt="Ellington Properties"
          width={115}
          height={26}
          className="dev-partner-badge__logo"
        />
      </div>
    ),
    title: "Ellington Properties",
  },
  {
    node: (
      <div className="dev-partner-badge" title="Aldar Properties">
        <Image
          src="/assets/developers/aldar.png"
          alt="Aldar Properties"
          width={28}
          height={28}
          className="dev-partner-badge__logo"
          style={{ width: "auto" }}
        />
        <span className="dev-partner-badge__name">ALDAR</span>
      </div>
    ),
    title: "Aldar Properties",
  },
  {
    node: (
      <div className="dev-partner-badge" title="Binghatti">
        <Image
          src="/assets/developers/binghatti.png"
          alt="Binghatti"
          width={110}
          height={26}
          className="dev-partner-badge__logo"
        />
      </div>
    ),
    title: "Binghatti",
  },
  {
    node: (
      <div className="dev-partner-badge" title="Danube Properties">
        <Image
          src="/assets/developers/danube.png"
          alt="Danube Properties"
          width={110}
          height={26}
          className="dev-partner-badge__logo"
        />
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
          speed={90}
          direction="left"
          gap={24}
          logoHeight={220}
          pauseOnHover={true}
          hoverSpeed={20}
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
