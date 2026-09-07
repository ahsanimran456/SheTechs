import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Portfolio } from "@/components/sections/Portfolio";
import { Brands } from "@/components/sections/Brands";
import { PerformanceStats } from "@/components/sections/PerformanceStats";
import { PressRecognition } from "@/components/sections/PressRecognition";
import { SkillsServices } from "@/components/sections/SkillsServices";
import { WorkWithMe } from "@/components/sections/WorkWithMe";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Portfolio />
      <Brands />
      <PerformanceStats />
      <PressRecognition />
      <SkillsServices />
      <WorkWithMe />
    </>
  );
}
