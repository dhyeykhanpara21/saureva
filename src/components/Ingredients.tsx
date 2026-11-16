import React, { useState } from 'react';
import { verifiedIngredients } from '../data/saurenaData';
import { Sparkles, MapPin, Wind, Utensils } from 'lucide-react';

export const Ingredients: React.FC = () => {
  const [selectedIngredient, setSelectedIngredient] = useState(verifiedIngredients[0]);

  return (
    <section id="ingredients" className="relative py-16 sm:py-28 md:py-36 bg-[#F8F4EC] overflow-hidden">
      {/* Background radial gold glow */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-saurena-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-saurena-forest/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1.5px] bg-saurena-gold" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-saurena-gold">
              Botanical Authenticity
            </span>
            <span className="w-6 h-[1.5px] bg-saurena-gold" />
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-saurena-forest font-bold tracking-tight">
            REAL INGREDIENTS. <br />
            <span className="italic font-normal text-saurena-brown">AUTHENTIC FLAVOUR.</span>
          </h2>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-saurena-forest/80 max-w-xl mx-auto leading-relaxed">
            Every ingredient in SAURÉNA Kathiyawadi Masala is strictly verified from our packaging. 
            Clean, unadulterated, sun-cured spices harmonized to culinary perfection.
          </p>
        </div>

        {/* Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Interactive Ingredient Selector Tabs (Horizontal scroll on mobile, vertical list on desktop) */}
          <div className="lg:col-span-5 flex lg:flex-col overflow-x-auto lg:overflow-y-auto gap-2.5 pb-2 lg:pb-0 lg:max-h-[560px] pr-0 lg:pr-2 custom-scrollbar scrollbar-none">
            {verifiedIngredients.map((ing) => {
              const isSelected = selectedIngredient.id === ing.id;
              return (
                <button
                  key={ing.id}
                  onClick={() => setSelectedIngredient(ing)}
                  className={`shrink-0 lg:shrink text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 border flex items-center justify-between min-w-[210px] sm:min-w-[250px] lg:min-w-0 ${
                    isSelected
                      ? 'bg-saurena-forest text-white border-saurena-gold shadow-lg scale-[1.01]'
                      : 'glass-panel text-saurena-forest border-saurena-gold/20 hover:border-saurena-gold/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shrink-0 border ${
                        isSelected ? 'border-saurena-gold ring-2 ring-saurena-gold/50 shadow-md' : 'border-saurena-gold/30'
                      }`}
                    >
                      <img
                        src={ing.image}
                        alt={ing.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="font-editorial text-base sm:text-lg font-bold">
                          {ing.name}
                        </span>
                        <span
                          className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-saurena-gold text-saurena-forest font-semibold'
                              : 'bg-saurena-gold/15 text-saurena-brown'
                          }`}
                        >
                          {ing.gujarati}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] sm:text-[11px] block truncate max-w-[150px] sm:max-w-[240px] ${
                          isSelected ? 'text-saurena-cream/80' : 'text-saurena-brown/70'
                        }`}
                      >
                        {ing.aroma}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-mono font-bold hidden sm:inline ${
                      isSelected ? 'text-saurena-gold' : 'text-saurena-forest/40'
                    }`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Spotlight Card */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-saurena-gold/35 shadow-2xl h-full flex flex-col justify-between relative overflow-hidden">
              {/* Background watermark motif */}
              <div className="absolute -bottom-10 -right-10 w-64 h-64 opacity-5 pointer-events-none">
                <img src="/assets/saurena_logo_cropped.png" alt="watermark" />
              </div>

              <div>
                {/* Header Tag */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-saurena-gold/25">
                  <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-saurena-gold font-bold">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Ingredient Spotlight</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-saurena-brown">
                    <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-saurena-gold" />
                    <span>Origin: {selectedIngredient.region}</span>
                  </div>
                </div>

                {/* Big Titles */}
                <div className="mt-4 sm:mt-6 flex flex-wrap items-baseline gap-2 sm:gap-4">
                  <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-saurena-forest font-bold">
                    {selectedIngredient.name}
                  </h3>
                  <span className="font-editorial text-xl sm:text-2xl text-saurena-gold italic">
                    ({selectedIngredient.gujarati})
                  </span>
                </div>

                {/* Botanical Photography Hero Showcase */}
                <div className="mt-4 sm:mt-5 relative h-40 sm:h-48 md:h-56 rounded-xl sm:rounded-2xl overflow-hidden border border-saurena-gold/30 shadow-md group">
                  <img
                    key={selectedIngredient.id}
                    src={selectedIngredient.image}
                    alt={selectedIngredient.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 animate-fade-in"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 sm:bottom-3 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between text-white">
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-saurena-goldPale font-bold">
                      {selectedIngredient.hindi} • {selectedIngredient.gujarati}
                    </span>
                    <span className="text-[9px] sm:text-[11px] bg-black/40 backdrop-blur-sm px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-saurena-gold/30 text-saurena-cream">
                      100% Whole & Pure Spice
                    </span>
                  </div>
                </div>

                <p className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-base text-saurena-forest/85 leading-relaxed">
                  {selectedIngredient.description}
                </p>

                {/* Detailed Spec Pills */}
                <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-saurena-ivory/80 border border-saurena-gold/20">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold text-saurena-brown uppercase tracking-wider mb-1">
                      <Wind className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-saurena-gold" />
                      <span>Aroma & Flavor Profile</span>
                    </div>
                    <p className="text-xs text-saurena-forest/90 leading-normal">
                      {selectedIngredient.aroma}
                    </p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-saurena-ivory/80 border border-saurena-gold/20">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold text-saurena-brown uppercase tracking-wider mb-1">
                      <Utensils className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-saurena-gold" />
                      <span>Role in Kathiyawadi Cuisine</span>
                    </div>
                    <p className="text-xs text-saurena-forest/90 leading-normal">
                      {selectedIngredient.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Packaging Guarantee Footer */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-saurena-gold/25 flex flex-wrap items-center justify-between text-[11px] sm:text-xs text-saurena-brown gap-2">
                <span className="font-semibold">
                  ✓ Verified from SAURÉNA Official Packaging
                </span>
                <span className="italic text-saurena-forest/70">
                  Zero Preservatives • Zero Artificial Colours
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

