import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SceneScrollController } from './Scene3D/SceneScrollController';
import { Sparkles, ShieldCheck, Flame, Leaf, ArrowDown, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StoryScroll3DProps {
  onOpenInquiry: () => void;
  onExploreProduct: () => void;
}

export const StoryScroll3D: React.FC<StoryScroll3DProps> = ({
  onOpenInquiry,
  onExploreProduct
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 3D Scene state controlled smoothly by GSAP ScrollTrigger
  const [sceneState, setSceneState] = useState(() => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    return {
      rotationY: 0,
      rotationX: 0,
      rotationZ: 0,
      positionX: isDesktop ? 1.4 : 0,
      positionY: isDesktop ? -0.28 : -1.12,
      scale: isDesktop ? 1.0 : 0.56,
      burstProgress: 0,
      openFactor: 0
    };
  });

  const [activeStep, setActiveStep] = useState(0);

  // Mouse tilt tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP ScrollTrigger scrubbing animation
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;

          // Determine active narrative card step (0: Hero, 1: Side gusset, 2: Back packaging, 3: Front return, 4: Spice burst)
          if (p < 0.18) setActiveStep(0);
          else if (p < 0.42) setActiveStep(1);
          else if (p < 0.68) setActiveStep(2);
          else if (p < 0.85) setActiveStep(3);
          else setActiveStep(4);

          const isDesktop = window.innerWidth >= 1024;

          let targetRotY = 0;
          let targetRotX = 0;
          let targetPosX = isDesktop ? 1.4 : 0;
          let targetPosY = isDesktop ? -0.28 : -1.12;
          let targetScale = isDesktop ? 1.0 : 0.56;
          let targetBurst = 0;
          let targetOpen = 0;

          if (p < 0.18) {
            // Stage 0: Hero
            const sub = p / 0.18;
            targetRotY = sub * 0.25;
            targetPosX = isDesktop ? 1.4 : 0;
            targetPosY = isDesktop ? -0.28 : -1.12;
            targetScale = isDesktop ? 1.0 : 0.56;
            targetBurst = 0;
          } else if (p < 0.42) {
            // Stage 1: Side profile stage (showing left gusset details)
            const sub = (p - 0.18) / 0.24;
            targetRotY = 0.25 + sub * (Math.PI * 0.5 - 0.25);
            targetPosX = isDesktop ? 1.15 : 0;
            targetPosY = isDesktop ? -0.25 : -0.7;
            targetScale = isDesktop ? 1.05 : 0.68;
            targetBurst = sub * 0.15;
          } else if (p < 0.68) {
            // Stage 2: Back reveal stage (showing nutrition and ingredients)
            const sub = (p - 0.42) / 0.26;
            targetRotY = Math.PI * 0.5 + sub * (Math.PI - Math.PI * 0.5);
            targetPosX = isDesktop ? -1.15 : 0;
            targetPosY = isDesktop ? -0.22 : -0.7;
            targetScale = isDesktop ? 1.08 : 0.68;
            targetBurst = 0.25;
          } else if (p < 0.85) {
            // Stage 3: Returning to front stage
            const sub = (p - 0.68) / 0.17;
            targetRotY = Math.PI + sub * Math.PI;
            targetPosX = isDesktop ? 1.15 * (1 - sub) : 0;
            targetPosY = isDesktop ? -0.28 : -0.68;
            targetScale = isDesktop ? 1.05 : 0.7;
            targetBurst = 0.35;
          } else {
            // Stage 4: Spice burst eruption stage
            const sub = (p - 0.85) / 0.15;
            targetRotY = Math.PI * 2 + sub * 0.25;
            targetRotX = sub * 0.08;
            targetPosX = 0;
            targetPosY = isDesktop ? -0.32 : -0.65;
            targetScale = isDesktop ? 1.12 : 0.72;
            targetBurst = Math.min(1.0, 0.4 + sub * 0.6);
            targetOpen = sub;
          }

          setSceneState({
            rotationY: targetRotY,
            rotationX: targetRotX,
            rotationZ: 0,
            positionX: targetPosX,
            positionY: targetPosY,
            scale: targetScale,
            burstProgress: targetBurst,
            openFactor: targetOpen
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} id="hero" className="relative h-[480vh] bg-saurena-ivory">
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Background decorative subtle textures and golden gradients */}
        <div className="absolute inset-0 bg-grain pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-saurena-gold/15 to-transparent blur-3xl pointer-events-none" />

        {/* 3D Canvas Layer */}
        <div className="absolute inset-0 z-10">
          <SceneScrollController scrollState={sceneState} mousePos={mousePos} />
        </div>

        {/* HTML UI OVERLAYS FOR THE 5 NARRATIVE STEPS */}
        <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-between pt-24 pb-12 pointer-events-none">
          {/* STEP 0: HERO (Visible when activeStep === 0) */}
          <div
            className={`transition-all duration-700 ${
              activeStep === 0
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-8 pointer-events-none absolute'
            } flex flex-col justify-start lg:justify-center pt-8 sm:pt-14 lg:pt-0 max-w-lg`}
          >
            {/* Regional heritage tag */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-[1.5px] bg-saurena-gold" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-saurena-gold">
                The Royal Heritage of Saurashtra
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-saurena-forest font-bold leading-[0.98] tracking-tight">
              THE SOUL OF <br />
              <span className="italic font-normal text-saurena-brown">SAURASHTRA.</span>
            </h1>

            {/* Supporting Text */}
            <p className="mt-6 text-base sm:text-lg text-saurena-forest/80 font-normal leading-relaxed max-w-md">
              Discover the authentic flavours of Saurashtra, crafted with tradition and brought to your kitchen.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreProduct}
                className="px-8 py-3.5 rounded-full bg-saurena-forest text-saurena-ivory text-xs font-semibold tracking-widest uppercase hover:bg-saurena-gold transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
              >
                Explore Product
              </button>
              <button
                onClick={onOpenInquiry}
                className="px-7 py-3.5 rounded-full border border-saurena-gold/40 text-saurena-forest text-xs font-semibold tracking-widest uppercase hover:bg-saurena-gold/15 transition-all duration-300 bg-white/30 backdrop-blur-sm"
              >
                Wholesale Inquiry
              </button>
            </div>

            {/* Authentic Brand Quality Seals */}
            <div className="mt-10 flex items-center gap-6 text-xs text-saurena-brown/90 font-medium">
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-saurena-forest" />
                <span>100% Natural Spices</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-saurena-gold" />
                <span>Zero Preservatives</span>
              </div>
            </div>
          </div>

          {/* STEP 1: SIDE GUSSET STORY (Visible when activeStep === 1) */}
          <div
            className={`transition-all duration-700 ${
              activeStep === 1
                ? 'opacity-100 translate-x-0 pointer-events-auto'
                : 'opacity-0 -translate-x-12 pointer-events-none absolute'
            } flex flex-col justify-center h-[70vh] max-w-md`}
          >
            <div className="glass-panel p-8 rounded-3xl shadow-xl border border-saurena-gold/30">
              <span className="text-[11px] font-mono tracking-widest text-saurena-gold font-bold uppercase">
                Phase 01 / Side Gusset Profile
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-saurena-forest mt-2 mb-4">
                Engineered for Freshness.
              </h2>
              <p className="text-sm text-saurena-forest/80 leading-relaxed mb-6">
                Our multi-layer foil barrier and hermetic side gussets shield volatile spice oils from oxygen, humidity, and direct sunlight.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs font-medium text-saurena-brown">
                <div className="p-3 rounded-xl bg-saurena-ivory/80 border border-saurena-gold/20 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-saurena-gold shrink-0" />
                  <span>No Added Preservatives</span>
                </div>
                <div className="p-3 rounded-xl bg-saurena-ivory/80 border border-saurena-gold/20 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-saurena-gold shrink-0" />
                  <span>No Artificial Colours</span>
                </div>
                <div className="p-3 rounded-xl bg-saurena-ivory/80 border border-saurena-gold/20 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-saurena-forest shrink-0" />
                  <span>100% Pure Natural</span>
                </div>
                <div className="p-3 rounded-xl bg-saurena-ivory/80 border border-saurena-gold/20 flex items-center gap-2">
                  <Award className="w-4 h-4 text-saurena-gold shrink-0" />
                  <span>Proudly From Gujarat</span>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: BACK PACKAGING REVEAL (Visible when activeStep === 2) */}
          <div
            className={`transition-all duration-700 ml-auto ${
              activeStep === 2
                ? 'opacity-100 translate-x-0 pointer-events-auto'
                : 'opacity-0 translate-x-12 pointer-events-none absolute'
            } flex flex-col justify-center h-[70vh] max-w-md`}
          >
            <div className="glass-panel p-8 rounded-3xl shadow-xl border border-saurena-gold/30">
              <span className="text-[11px] font-mono tracking-widest text-saurena-gold font-bold uppercase">
                Phase 02 / Packaging Transparency
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-saurena-forest mt-2 mb-3">
                Real Ingredients. Clear Nutrition.
              </h2>
              <p className="text-xs text-saurena-forest/80 mb-4 leading-relaxed">
                What you read on our back packaging is exactly what enters your cooking pot. No hidden fillers, no starch dilutions.
              </p>

              {/* Nutrition Quick Specs from Actual Packaging */}
              <div className="bg-saurena-ivory/90 rounded-2xl p-4 border border-saurena-gold/25 mb-4 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-saurena-gold/20 font-bold text-saurena-forest">
                  <span>Nutrition (per 100g)</span>
                  <span className="text-saurena-gold">Net Wt: 100g</span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-saurena-forest/90">
                  <div>
                    <span className="text-saurena-brown/70 block">Energy</span>
                    <span className="font-semibold">370 kcal</span>
                  </div>
                  <div>
                    <span className="text-saurena-brown/70 block">Protein</span>
                    <span className="font-semibold">11.5 g</span>
                  </div>
                  <div>
                    <span className="text-saurena-brown/70 block">Dietary Fiber</span>
                    <span className="font-semibold">18.0 g</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-saurena-brown flex items-center gap-2">
                <Flame className="w-3.5 h-3.5 text-saurena-terracotta" />
                <span>Usage: 1-2 tsp (5-10g) for 2-3 servings of authentic sabzi & undhiyu</span>
              </div>
            </div>
          </div>

          {/* STEP 3: RETURN TO FRONT & HARVEST (Visible when activeStep === 3) */}
          <div
            className={`transition-all duration-700 mx-auto text-center ${
              activeStep === 3
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-8 pointer-events-none absolute'
            } flex flex-col items-center justify-center h-[70vh] max-w-lg`}
          >
            <div className="glass-panel p-8 rounded-3xl shadow-xl border border-saurena-gold/30">
              <span className="text-[11px] font-mono tracking-widest text-saurena-gold font-bold uppercase">
                Phase 03 / Master Blending
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-saurena-forest mt-2 mb-3">
                Sun-Cured. Slow Ground.
              </h2>
              <p className="text-sm text-saurena-forest/80 leading-relaxed mb-4">
                Sourced from the fertile soil of Saurashtra and Gujarat's historic spice markets. Every spice is individually toasted at precise temperatures to release its natural essential oils.
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-saurena-gold tracking-widest uppercase">
                <span>Scroll to release the aroma stream</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </div>
            </div>
          </div>

          {/* STEP 4: SPICE ERUPTION STREAM (Visible when activeStep === 4) */}
          <div
            className={`transition-all duration-700 mx-auto text-center ${
              activeStep === 4
                ? 'opacity-100 scale-100 pointer-events-auto'
                : 'opacity-0 scale-95 pointer-events-none absolute'
            } flex flex-col items-center justify-center h-[70vh] max-w-xl`}
          >
            <div className="glass-panel p-8 md:p-10 rounded-3xl shadow-2xl border border-saurena-gold/40">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saurena-gold/20 text-saurena-forest text-xs font-bold uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5 text-saurena-gold" />
                Aroma Unleashed
              </div>
              <h2 className="font-editorial text-4xl sm:text-5xl text-saurena-forest font-bold mb-3">
                The Feast of Kathiyawad.
              </h2>
              <p className="text-sm sm:text-base text-saurena-forest/85 leading-relaxed mb-6">
                Golden turmeric embers, Gondal crimson chillies, toasted cumin, and royal cloves converge in a symphony of fragrance.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={onExploreProduct}
                  className="px-8 py-3.5 rounded-full bg-saurena-forest text-saurena-ivory text-xs font-semibold tracking-widest uppercase hover:bg-saurena-gold transition-colors shadow-lg"
                >
                  Inspect Packaging 360°
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Scroll Cue */}
          <div className="flex items-center justify-between text-[11px] tracking-widest uppercase text-saurena-forest/60 border-t border-saurena-gold/20 pt-4">
            <span className="hidden sm:inline">SAURÉNA KATHIYAWADI MASALA • 100G</span>
            <div className="flex items-center gap-2 mx-auto sm:mx-0">
              <span className="w-2 h-2 rounded-full bg-saurena-gold animate-ping" />
              <span>Scroll to navigate continuous 3D journey</span>
            </div>
            <span className="hidden sm:inline">GUJARAT • INDIA</span>
          </div>
        </div>
      </div>
    </div>
  );
};
