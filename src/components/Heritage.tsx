import React from 'react';
import { Compass, Flame, Heart, Sun } from 'lucide-react';

export const Heritage: React.FC = () => {
  return (
    <section id="heritage" className="relative py-28 md:py-36 bg-saurena-ivory overflow-hidden">
      {/* Subtle background grain & ornaments */}
      <div className="absolute inset-0 bg-grain pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-saurena-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1.5px] bg-saurena-gold" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-saurena-gold">
              Our Heritage & Origins
            </span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-saurena-forest font-bold leading-[1.05] tracking-tight">
            ROOTED IN TRADITION. <br />
            <span className="italic font-normal text-saurena-brown">CRAFTED WITH PASSION.</span>
          </h2>

          <p className="mt-8 text-lg sm:text-xl text-saurena-forest/85 leading-relaxed font-normal">
            SAURÉNA celebrates the timeless culinary heritage of Saurashtra. Inspired by traditional kitchens, regional ingredients and generations of flavour, we bring authentic food experiences to modern homes.
          </p>
        </div>

        {/* Cinematic Grid with Gujarat & Saurashtra Heritage Stories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Large Visual Card */}
          <div className="lg:col-span-7 relative group">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-saurena-gold/25 aspect-[4/3] md:aspect-[16/11]">
              <img
                src="/assets/images/heritage_gujarat.jpg"
                alt="Saurashtra Historic Architecture & Heritage"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-saurena-darkgreen/90 via-saurena-darkgreen/30 to-transparent" />

              {/* Inset Badge */}
              <div className="absolute top-6 left-6 px-4 py-2 rounded-full glass-panel border border-saurena-gold/40 text-xs font-semibold text-saurena-forest tracking-wider uppercase">
                Junagadh & Saurashtra Heartlands
              </div>

              {/* Story Inset */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-mono uppercase tracking-widest text-saurena-gold block mb-1">
                  The Land of Kathiyawad
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold leading-snug">
                  Where Bold Spices Meet Timeless Hospitality.
                </h3>
                <p className="text-xs sm:text-sm text-saurena-cream/80 mt-2 max-w-lg line-clamp-2 sm:line-clamp-none">
                  From the shadow of Mount Girnar to the coastal salt winds of Porbandar, Saurashtra's cooking has always been hearty, unpretentious, and fiercely flavorful.
                </p>
              </div>
            </div>
          </div>

          {/* Secondary Editorial Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Heritage Card 1: Traditional Chulha & Clay Stoves */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-saurena-gold/25 shadow-lg hover:border-saurena-gold/60 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-saurena-gold/15 flex items-center justify-center text-saurena-gold mb-4">
                <Flame className="w-6 h-6" />
              </div>
              <h4 className="font-editorial text-2xl text-saurena-forest font-bold mb-2">
                The Clay Chulha & Slow Roasting
              </h4>
              <p className="text-sm text-saurena-forest/80 leading-relaxed">
                In Kathiyawadi homes, spices were never rushed. Whole coriander, cumin, and dried red chillies were toasted over low embers of babool wood before being gently crushed on stone sil-battas.
              </p>
            </div>

            {/* Heritage Card 2: Hospitality & Generosity */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-saurena-gold/25 shadow-lg hover:border-saurena-gold/60 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-saurena-forest/10 flex items-center justify-center text-saurena-forest mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-editorial text-2xl text-saurena-forest font-bold mb-2">
                "Kathiyawadi Mehman-Nawazi"
              </h4>
              <p className="text-sm text-saurena-forest/80 leading-relaxed">
                Food in Saurashtra is a sacred gesture of honor. A stranger arriving at a village threshold is greeted with overflowing Bajra Rotlas, fresh white butter, and aromatic curries spiced with generous warmth.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Pillar Micro Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-saurena-gold/25">
          <div className="flex items-start gap-4">
            <Sun className="w-6 h-6 text-saurena-gold shrink-0 mt-1" />
            <div>
              <span className="font-editorial text-2xl font-bold text-saurena-forest">Sun-Dried</span>
              <p className="text-xs text-saurena-brown/90 mt-1">
                Naturally cured under the radiant Saurashtra sun to preserve intrinsic essential oil potency.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Compass className="w-6 h-6 text-saurena-gold shrink-0 mt-1" />
            <div>
              <span className="font-editorial text-2xl font-bold text-saurena-forest">Regional Provenance</span>
              <p className="text-xs text-saurena-brown/90 mt-1">
                Every batch reflects the microclimate and terroir of Western India's most celebrated spice corridors.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Flame className="w-6 h-6 text-saurena-gold shrink-0 mt-1" />
            <div>
              <span className="font-editorial text-2xl font-bold text-saurena-forest">Ancestral Ratios</span>
              <p className="text-xs text-saurena-brown/90 mt-1">
                Balanced according to time-tested Kathiyawadi culinary proportions — never overpowering, always comforting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

