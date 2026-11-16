import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onOpenInquiry: () => void;
  onExploreProduct: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenInquiry, onExploreProduct }) => {
  return (
    <section className="relative py-16 sm:py-28 md:py-36 bg-saurena-darkgreen text-saurena-ivory overflow-hidden">
      {/* Background radial gold glow and organic pattern */}
      <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-saurena-gold/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-12 text-center relative z-10">
        {/* Golden Emblem / Tag */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-saurena-gold/30 bg-saurena-forest/50 backdrop-blur-md text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-saurena-gold mb-6 sm:mb-8">
          <Sparkles className="w-3.5 h-3.5 text-saurena-gold" />
          <span>The Soul of Saurashtra</span>
        </div>

        {/* Large Editorial Heading */}
        <h2 className="font-editorial text-3xl sm:text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-white mb-4 sm:mb-6">
          BRING HOME <br />
          <span className="italic font-normal text-saurena-gold">THE TASTE OF SAURASHTRA.</span>
        </h2>

        {/* Supporting Text */}
        <p className="text-sm sm:text-lg md:text-xl text-saurena-ivory/80 max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10 font-normal">
          Celebrate authentic regional flavours with SAURÉNA. Crafted with tradition and brought to your kitchen.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto w-full sm:w-auto">
          <button
            onClick={onExploreProduct}
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-saurena-gold text-saurena-darkgreen text-xs font-bold tracking-widest uppercase hover:bg-white transition-all duration-300 shadow-2xl hover:shadow-saurena-gold/30 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>Discover SAURÉNA</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenInquiry}
            className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-full border border-saurena-gold/50 text-saurena-ivory text-xs font-semibold tracking-widest uppercase hover:bg-saurena-gold/15 transition-all duration-300 backdrop-blur-sm text-center"
          >
            Contact Us & Enquire
          </button>
        </div>

        {/* Origin Signature */}
        <div className="mt-10 sm:mt-16 pt-6 sm:pt-10 border-t border-saurena-gold/20 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-[10px] sm:text-xs text-saurena-gold/80 tracking-widest uppercase font-mono">
          <span>GIR LION HERITAGE</span>
          <span className="hidden sm:inline">•</span>
          <span>JUNAGADH INSPIRATION</span>
          <span className="hidden sm:inline">•</span>
          <span>100% REGIONAL GUJARAT SPICES</span>
        </div>
      </div>
    </section>
  );
};

