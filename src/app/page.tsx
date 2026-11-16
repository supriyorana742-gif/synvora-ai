import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { ServicesSection } from "@/components/home/ServicesSection";
import { HowWeWork } from "@/components/home/HowWeWork";
import { IndustrySection } from "@/components/home/IndustrySection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { FinalCTA } from "@/components/shared/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ServicesSection />
      <HowWeWork />
      <IndustrySection />
      <FeaturedProjects />
      <FinalCTA />
    </>
  );
}
