import React, { useState } from 'react';
import { kathiyawadiDishes } from '../data/saurenaData';
import { Dish } from '../types';
import { Utensils, Flame, ChevronRight, Sparkles } from 'lucide-react';

export const TasteOfKathiyawad: React.FC = () => {
  const [activeDish, setActiveDish] = useState<Dish>(kathiyawadiDishes[0]);

  return (
    <section id="taste" className="relative py-28 md:py-36 bg-[#F5EFE4] overflow-hidden">
      {/* Background grain and subtle decorative elements */}
      <div className="absolute inset-0 bg-grain pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-saurena-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1.5px] bg-saurena-gold" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-saurena-gold">
              Culinary Heritage & Food Art
            </span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-saurena-forest font-bold leading-[1.05] tracking-tight">
            BRING THE TASTE OF <br />
            <span className="italic font-normal text-saurena-brown">KATHIYAWAD HOME.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-saurena-forest/80 leading-relaxed font-normal">
            From clay griddles glowing over open wood flames to rich, spiced curries tempered with pure groundnut oil, 
            discover how SAURÉNA elevates authentic Kathiyawadi comfort dishes.
          </p>
        </div>

        {/* Dish Spotlight Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Main Visual Display */}
          <div className="lg:col-span-7 relative group">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-saurena-gold/30 aspect-[4/3] md:aspect-[16/10] bg-saurena-darkgreen">
              <img
                src={activeDish.image}
                alt={activeDish.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-saurena-darkgreen/90 via-saurena-darkgreen/30 to-transparent" />

              {/* Tag Badge */}
              <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-saurena-gold/40 text-xs font-semibold text-saurena-forest tracking-wider uppercase">
                <Utensils className="w-3.5 h-3.5 text-saurena-gold" />
                <span>Authentic Saurashtra Table</span>
              </div>

              {/* Inset Dish Details */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-saurena-gold mb-1">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{activeDish.spiceLevel}</span>
                </div>
                <h3 className="font-editorial text-3xl sm:text-4xl font-bold">
                  {activeDish.name}
                </h3>
                <span className="font-editorial text-xl text-saurena-gold/90 italic block mb-2">
                  {activeDish.gujarati}
                </span>
                <p className="text-xs sm:text-sm text-saurena-cream/90 max-w-xl line-clamp-2 sm:line-clamp-none">
                  {activeDish.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Culinary Pairing Note & Selector */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="glass-panel p-8 rounded-3xl border border-saurena-gold/30 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-saurena-gold mb-3">
                <Sparkles className="w-4 h-4 text-saurena-gold" />
                <span>Culinary Secret</span>
              </div>
              <h4 className="font-editorial text-2xl text-saurena-forest font-bold mb-3">
                How SAURÉNA Complements {activeDish.name}
              </h4>
              <p className="text-sm text-saurena-forest/80 leading-relaxed mb-6">
                {activeDish.pairingNote}
              </p>

              <div className="p-4 rounded-2xl bg-saurena-ivory/90 border border-saurena-gold/25 text-xs text-saurena-brown">
                <span className="font-bold block mb-1">Authentic Kathiyawadi Tip:</span>
                Bloom 1 teaspoon of SAURÉNA Masala in warm groundnut oil or A2 cow ghee for 10 seconds before stirring in garlic or tomatoes to fully open the roasted coriander and clove aromatics.
              </div>
            </div>

            {/* Quick Dish Selection Buttons */}
            <div className="grid grid-cols-2 gap-3">
              {kathiyawadiDishes.map((dish) => {
                const isSelected = activeDish.id === dish.id;
                return (
                  <button
                    key={dish.id}
                    onClick={() => setActiveDish(dish)}
                    className={`p-3.5 rounded-2xl text-left border transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-saurena-forest text-white border-saurena-gold shadow-md scale-[1.02]'
                        : 'glass-panel text-saurena-forest border-saurena-gold/20 hover:border-saurena-gold/50'
                    }`}
                  >
                    <span className="font-editorial text-sm font-bold truncate">
                      {dish.name}
                    </span>
                    <span
                      className={`text-[11px] font-gujarati mt-1 ${
                        isSelected ? 'text-saurena-gold' : 'text-saurena-brown/70'
                      }`}
                    >
                      {dish.gujarati}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

