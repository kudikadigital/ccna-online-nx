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

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <InfoBanner />
      <Features />
      <Pricing onOpenModal={() => setIsModalOpen(true)} />
      <FAQ />
      <CTA onOpenModal={() => setIsModalOpen(true)} />
      <Footer />

      <EnrollModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
