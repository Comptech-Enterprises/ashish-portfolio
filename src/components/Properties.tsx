import PropertySearch from "./PropertySearch";
import Reveal from "./Reveal";

export default function Properties() {
  return (
    <section className="properties section" id="search">
      <div className="wrap">
        <Reveal><p className="eyebrow">Property search</p></Reveal>
        <Reveal delay={100}><h2 className="h2">Find your <em>next</em> address.</h2></Reveal>
        <Reveal delay={200}>
          <p className="lead prop-lead">Live UAE listings for sale. Search by emirate, community and bedrooms, refreshed on every search.</p>
        </Reveal>
        <Reveal delay={300}>
          <PropertySearch />
        </Reveal>
      </div>
    </section>
  );
}
