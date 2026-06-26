import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { HowIWork } from "@/components/HowIWork";
import { Team } from "@/components/Team";
import { Rates } from "@/components/Rates";
import { Work } from "@/components/Work";
import { Stack } from "@/components/Stack";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SnackToast } from "@/components/SnackToast";

export default function Home() {
  return (
    <>
      <div className="zigzag" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Services />
        <HowIWork />
        <Team />
        <Rates />
        <Work />
        <Stack />
        <Contact />
      </main>
      <Footer />
      <SnackToast />
    </>
  );
}
