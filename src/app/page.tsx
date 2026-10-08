import Preloader from "@/components/Preloader";
import ScrollFx from "@/components/ScrollFx";
import PointerFx from "@/components/PointerFx";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Videos from "@/components/Videos";
import Services from "@/components/Services";
import Areas from "@/components/Areas";
import Properties from "@/components/Properties";
import DubaiIT from "@/components/DubaiIT";
import Community from "@/components/Community";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AshishGPT from "@/components/AshishGPT";

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
        <About />
        <Videos />
        <Services />
        <Areas />
        <Properties />
        <DubaiIT />
        <Community />
        <Contact />
      </main>
      <Footer />
      <AshishGPT />
    </>
  );
}
