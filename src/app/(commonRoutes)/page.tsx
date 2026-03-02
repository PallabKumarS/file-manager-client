import { CtaSection } from "@/components/home/CtaSection";
import { FeaturesSection } from "@/components/home/FeatureSection";
import { HeroSection } from "@/components/home/HeroSection";
import { PricingSection } from "@/components/home/PricingSection";
import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | FileBox",
  description: "FileBox - Your Ultimate File Management Solution",
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <CtaSection />
    </main>
  );
}
