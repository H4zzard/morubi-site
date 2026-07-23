import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Problems } from "@/components/sections/problems";
import { Features } from "@/components/sections/features";
import { Platform } from "@/components/sections/platform";
import { Realtime } from "@/components/sections/realtime";
import { Results } from "@/components/sections/results";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Problems />
        <Features />
        <Platform />
        <Realtime />
        <Results />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
