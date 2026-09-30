import type { Metadata } from "next";
import Preloader from "@/components/Preloader";
import ScrollFx from "@/components/ScrollFx";
import PointerFx from "@/components/PointerFx";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertySearch from "@/components/PropertySearch";

export const metadata: Metadata = {
  title: "Search Properties — Ashish Lalwani",
  description: "Search live UAE property listings for sale or rent, powered by Ashish Lalwani, Dubai real estate advisor at Right Homes Real Estate.",
};

export default function PropertiesPage() {
  return (
    <>
      <Preloader />
      <ScrollFx />
      <PointerFx />
      <div className="progress" id="progress" />
      <div className="cursor" id="cursor">
        <span id="cursorLabel" />
      </div>
      <div className="sky" id="sky" />
      <div className="grain" />
      <Navbar />
      <main id="top">
        <section className="section prop-hero">
          <div className="wrap">
            <p className="eyebrow">Property Search</p>
            <h1 className="h2">Find your <em>next</em> address.</h1>
            <p className="lead">
              Live UAE listings for sale or rent — search by emirate, bedrooms and budget, refreshed on every search.
            </p>
            <PropertySearch />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
