"use client";

import { useState } from "react";
import Navbar from "@/components/Header"; // Verifica se o ficheiro é Header.tsx ou Navbar.tsx
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import EnrollModal from "@/components/EnrollModal";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import InfoBanner from "@/components/InfoBanner";
import Features from "@/components/Features";
import BenefitsSection from "@/components/BenefitsSection";
import SkillsSection from "@/components/SkillsSection";
import InstructorsSection from "@/components/InstructorsSection";

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <InfoBanner />
      <Features />
      <BenefitsSection />
      <SkillsSection />
      <Pricing onOpenModal={() => setIsModalOpen(true)} />
      <InstructorsSection />
      <FAQ />
      <CTA onOpenModal={() => setIsModalOpen(true)} />
      <Footer />

      <EnrollModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
