import dynamic from "next/dynamic";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import About from "@/components/About";

const ScrollFx = dynamic(() => import("@/components/ScrollFx"), { ssr: false });
const PointerFx = dynamic(() => import("@/components/PointerFx"), { ssr: false });
const Videos = dynamic(() => import("@/components/Videos"));
const Services = dynamic(() => import("@/components/Services"));
const Areas = dynamic(() => import("@/components/Areas"));
const Properties = dynamic(() => import("@/components/Properties"));
const DubaiIT = dynamic(() => import("@/components/DubaiIT"));
const Community = dynamic(() => import("@/components/Community"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));
const AshishGPT = dynamic(() => import("@/components/AshishGPT"), { ssr: false });

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
