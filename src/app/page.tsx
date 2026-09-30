import Preloader from "@/components/Preloader";
import ScrollFx from "@/components/ScrollFx";
import PointerFx from "@/components/PointerFx";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Areas from "@/components/Areas";
import Process from "@/components/Process";
import Community from "@/components/Community";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
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
        <Hero />
        <Marquee />
        <About />
        <Stats />
        <Services />
        <Areas />
        <Process />
        <Community />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
