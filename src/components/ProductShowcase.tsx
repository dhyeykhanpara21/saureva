import React, { useState } from 'react';
import { productDetails } from '../data/saurenaData';
import { SceneInteractiveViewer } from './Scene3D/SceneInteractiveViewer';
import { ShieldCheck, Package, Sparkles, Scale, Info, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ProductShowcaseProps {
  onOpenInquiry: () => void;
  onOpenPackagingModal: (type: 'pouch' | 'box' | 'kraft') => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  onOpenInquiry,
  onOpenPackagingModal
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'pouch' | 'box' | 'kraft'>('pouch');
  const [activeTab, setActiveTab] = useState<'overview' | 'nutrition' | 'usage'>('overview');

  const activePackaging = productDetails.packagingTypes.find((p) => p.id === selectedFormat) || productDetails.packagingTypes[0];

  return (
    <section id="product" className="relative py-28 md:py-36 bg-saurena-ivory overflow-hidden">
      {/* Background grain and light radial glow */}
      <div className="absolute inset-0 bg-grain pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-saurena-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1.5px] bg-saurena-gold" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-saurena-gold">
              Master Packaging & Specifications
            </span>
            <span className="w-6 h-[1.5px] bg-saurena-gold" />
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-saurena-forest font-bold tracking-tight">
            MEET YOUR NEW <br />
            <span className="italic font-normal text-saurena-brown">KITCHEN ESSENTIAL.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-saurena-forest/80 max-w-xl mx-auto leading-relaxed">
            SAURÉNA Kathiyawadi Masala is presented in three distinctive authentic formats: our everyday resealable stand-up foil pouch, our handcrafted rigid cardboard gift box, and our natural unbleached eco kraft pouch.
          </p>

          {/* Format Switcher Pills */}
          <div className="mt-8 inline-flex flex-wrap justify-center p-1.5 rounded-full bg-white/70 backdrop-blur-md border border-saurena-gold/30 shadow-md gap-1">
            <button
              onClick={() => setSelectedFormat('pouch')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                selectedFormat === 'pouch'
                  ? 'bg-saurena-forest text-saurena-ivory shadow-lg'
                  : 'text-saurena-forest/80 hover:text-saurena-forest'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Stand-Up Foil Pouch</span>
            </button>

            <button
              onClick={() => setSelectedFormat('box')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                selectedFormat === 'box'
                  ? 'bg-saurena-forest text-saurena-ivory shadow-lg'
                  : 'text-saurena-forest/80 hover:text-saurena-forest'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Artisan Cardboard Box</span>
            </button>

            <button
              onClick={() => setSelectedFormat('kraft')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                selectedFormat === 'kraft'
                  ? 'bg-saurena-forest text-saurena-ivory shadow-lg'
                  : 'text-saurena-forest/80 hover:text-saurena-forest'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Eco Kraft Pouch</span>
            </button>
          </div>
        </div>

        {/* Main Showcase Layout: 3D Canvas on Left/Center, Specs on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* 3D Interactive Model Viewer */}
          <div className="lg:col-span-7">
            <SceneInteractiveViewer packagingType={selectedFormat} />
          </div>

          {/* Product Details & Action Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-saurena-gold/30 shadow-xl">
              {/* Product Badge & Weight */}
              <div className="flex items-center justify-between pb-4 border-b border-saurena-gold/20">
                <span className="px-3 py-1 rounded-full bg-saurena-gold/20 text-saurena-forest text-xs font-bold uppercase tracking-widest">
                  {activePackaging.badge}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-saurena-gold">
                  <Scale className="w-3.5 h-3.5" />
                  <span>Net Weight: 100 g</span>
                </div>
              </div>

              {/* Title & Gujarati Typography */}
              <div className="mt-6">
                <h3 className="font-editorial text-3xl sm:text-4xl text-saurena-forest font-bold">
                  {productDetails.title}
                </h3>
                <span className="font-editorial text-2xl text-saurena-gold block mt-1">
                  {productDetails.gujaratiTitle}
                </span>
              </div>

              {/* Navigation Tabs (Overview / Nutrition / Usage) */}
              <div className="flex border-b border-saurena-gold/25 mt-6 mb-6">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2.5 px-3 text-xs font-bold tracking-wider uppercase transition-colors relative ${
                    activeTab === 'overview'
                      ? 'text-saurena-forest border-b-2 border-saurena-gold'
                      : 'text-saurena-forest/60 hover:text-saurena-forest'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('nutrition')}
                  className={`pb-2.5 px-3 text-xs font-bold tracking-wider uppercase transition-colors relative ${
                    activeTab === 'nutrition'
                      ? 'text-saurena-forest border-b-2 border-saurena-gold'
                      : 'text-saurena-forest/60 hover:text-saurena-forest'
                  }`}
                >
                  Nutrition (100g)
                </button>
                <button
                  onClick={() => setActiveTab('usage')}
                  className={`pb-2.5 px-3 text-xs font-bold tracking-wider uppercase transition-colors relative ${
                    activeTab === 'usage'
                      ? 'text-saurena-forest border-b-2 border-saurena-gold'
                      : 'text-saurena-forest/60 hover:text-saurena-forest'
                  }`}
                >
                  How to Use
                </button>
              </div>

              {/* Tab 1: Overview */}
              {activeTab === 'overview' && (
                <div className="space-y-4 text-xs text-saurena-forest/85 leading-relaxed">
                  <div className="p-3.5 rounded-2xl bg-saurena-gold/10 border border-saurena-gold/25 font-medium text-saurena-forest">
                    {activePackaging.description}
                  </div>
                  <p>{productDetails.description}</p>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-saurena-gold shrink-0" />
                      <span>100% Natural Spices, No Added Preservatives</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-saurena-gold shrink-0" />
                      <span>Authentic Gujarati Taste & Traditional Saurashtra Blend</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-saurena-gold shrink-0" />
                      <span>Perfect for Kathiyawadi Dishes, Sabzi, Undhiyu & Sev Tameta</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Nutrition */}
              {activeTab === 'nutrition' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {productDetails.nutrition.map((item) => (
                      <div
                        key={item.label}
                        className="p-2.5 rounded-xl bg-saurena-ivory/80 border border-saurena-gold/20 flex justify-between items-center"
                      >
                        <span className="text-saurena-brown/80 font-medium">{item.label}</span>
                        <span className="font-mono font-bold text-saurena-forest">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-saurena-brown/70 italic pt-1">
                    *Approximate nutritional values per 100g certified on official packaging.
                  </p>
                </div>
              )}

              {/* Tab 3: Usage & Storage */}
              {activeTab === 'usage' && (
                <div className="space-y-4 text-xs text-saurena-forest/85">
                  <div className="p-3.5 rounded-2xl bg-saurena-ivory/80 border border-saurena-gold/20">
                    <span className="font-bold text-saurena-brown block mb-1">Recommended Usage:</span>
                    <p>{productDetails.howToUse}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-saurena-ivory/80 border border-saurena-gold/20">
                    <span className="font-bold text-saurena-brown block mb-1">Storage Instructions:</span>
                    <p>{productDetails.storage}</p>
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="mt-8 pt-6 border-t border-saurena-gold/25 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenInquiry}
                  className="flex-1 min-w-[140px] py-3.5 px-6 rounded-full bg-saurena-forest text-saurena-ivory text-xs font-semibold tracking-wider uppercase hover:bg-saurena-gold transition-all duration-300 shadow-lg text-center flex items-center justify-center gap-2"
                >
                  <span>Enquire Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenPackagingModal(selectedFormat)}
                  className="py-3.5 px-5 rounded-full border border-saurena-gold/40 text-saurena-forest text-xs font-semibold tracking-wider uppercase hover:bg-saurena-gold/15 transition-colors flex items-center gap-2"
                >
                  <Info className="w-3.5 h-3.5 text-saurena-gold" />
                  <span>View Packaging</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

