import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { StoryScroll3D } from './components/StoryScroll3D';
import { Heritage } from './components/Heritage';
import { Ingredients } from './components/Ingredients';
import { ProductShowcase } from './components/ProductShowcase';
import { TasteOfKathiyawad } from './components/TasteOfKathiyawad';
import { BrandPillars } from './components/BrandPillars';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { PackagingModal } from './components/PackagingModal';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [packagingModalOpen, setPackagingModalOpen] = useState(false);
  const [packagingModalType, setPackagingModalType] = useState<'pouch' | 'box'>('pouch');

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  const handleOpenPackagingModal = (type: 'pouch' | 'box') => {
    setPackagingModalType(type);
    setPackagingModalOpen(true);
  };

  const scrollToProduct = () => {
    const el = document.getElementById('product');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-saurena-ivory text-saurena-forest selection:bg-saurena-gold selection:text-white">
      {/* Initial Loading Screen */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Persistent Navigation */}
      <Navbar onOpenInquiry={() => setInquiryModalOpen(true)} />

      <main>
        {/* SECTIONS 01 & 02: CINEMATIC HERO & SCROLL-CONTROLLED 3D PRODUCT STORY */}
        <StoryScroll3D
          onOpenInquiry={() => setInquiryModalOpen(true)}
          onExploreProduct={scrollToProduct}
        />

        {/* SECTION 03: OUR HERITAGE */}
        <Heritage />

        {/* SECTION 04: WHAT'S INSIDE */}
        <Ingredients />

        {/* SECTION 05: PRODUCT SHOWCASE */}
        <ProductShowcase
          onOpenInquiry={() => setInquiryModalOpen(true)}
          onOpenPackagingModal={handleOpenPackagingModal}
        />

        {/* SECTION 06: TASTE OF KATHIYAWAD */}
        <TasteOfKathiyawad />

        {/* SECTION 07: OUR APPROACH */}
        <BrandPillars />

        {/* SECTION 08: FINAL CTA */}
        <FinalCTA
          onOpenInquiry={() => setInquiryModalOpen(true)}
          onExploreProduct={scrollToProduct}
        />
      </main>

      {/* BRAND FOOTER */}
      <Footer onOpenInquiry={() => setInquiryModalOpen(true)} />

      {/* INTERACTIVE MODALS */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />

      <PackagingModal
        isOpen={packagingModalOpen}
        onClose={() => setPackagingModalOpen(false)}
        initialType={packagingModalType}
      />
    </div>
  );
};

