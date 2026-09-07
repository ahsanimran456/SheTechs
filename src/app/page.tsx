import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Portfolio } from "@/components/sections/Portfolio";
import { Brands } from "@/components/sections/Brands";
import { PerformanceStats } from "@/components/sections/PerformanceStats";
import { PressRecognition } from "@/components/sections/PressRecognition";
import { SkillsServices } from "@/components/sections/SkillsServices";
import { WorkWithMe } from "@/components/sections/WorkWithMe";
import { Reveal } from "@/components/ui/Reveal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="section-divider" aria-hidden="true" />
      <Reveal>
        <About />
      </Reveal>
      <div className="section-divider" aria-hidden="true" />
      <Reveal delay={40}>
        <Portfolio />
      </Reveal>
      <div className="section-divider" aria-hidden="true" />
      <Reveal delay={40}>
        <Brands />
      </Reveal>
      <Reveal delay={60}>
        <PerformanceStats />
      </Reveal>
      <div className="section-divider" aria-hidden="true" />
      <Reveal>
        <PressRecognition />
      </Reveal>
      <Reveal delay={40}>
        <SkillsServices />
      </Reveal>
      <div className="section-divider" aria-hidden="true" />
      <Reveal delay={40}>
        <WorkWithMe />
      </Reveal>
    </>
  );
}
