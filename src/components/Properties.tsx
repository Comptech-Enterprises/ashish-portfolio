import PropertySearch from "./PropertySearch";
import AshishChat from "./AshishChat";
import Reveal from "./Reveal";

export default function Properties() {
  return (
    <section className="properties section" id="search">
      <div className="wrap">
        <Reveal><p className="eyebrow">AshishGPT</p></Reveal>
        <Reveal delay={100}><h2 className="h2">Ask <em>AshishGPT</em> anything.</h2></Reveal>
        <Reveal delay={200}>
          <p className="lead prop-lead">Ask me anything about Dubai property, or search live UAE listings below by emirate, community and bedrooms.</p>
        </Reveal>
        <Reveal delay={250}>
          <AshishChat />
        </Reveal>
        <Reveal delay={300}>
          <h3 className="prop-browse-title">Or browse <em>live</em> listings</h3>
          <PropertySearch />
        </Reveal>
      </div>
    </section>
  );
}
