import React from 'react';
import { brandPillars } from '../data/saurenaData';
import { Compass, CheckCircle2, ShieldCheck, Box } from 'lucide-react';

export const BrandPillars: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'regional-inspiration':
        return <Compass className="w-6 h-6 text-saurena-gold" />;
      case 'careful-selection':
        return <CheckCircle2 className="w-6 h-6 text-saurena-gold" />;
      case 'quality-assurance':
        return <ShieldCheck className="w-6 h-6 text-saurena-gold" />;
      case 'thoughtful-packaging':
        return <Box className="w-6 h-6 text-saurena-gold" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-saurena-gold" />;
    }
  };

  return (
    <section id="approach" className="relative py-28 md:py-36 bg-[#F8F4ED] overflow-hidden">
      {/* Background grain and ambient golden glow */}
      <div className="absolute inset-0 bg-grain pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-saurena-gold/10 rounded-t-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1.5px] bg-saurena-gold" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-saurena-gold">
              The Four Pillars of Quality
            </span>
            <span className="w-6 h-[1.5px] bg-saurena-gold" />
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-saurena-forest font-bold tracking-tight">
            TRADITION IN <br />
            <span className="italic font-normal text-saurena-brown">EVERY DETAIL.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-saurena-forest/80 max-w-xl mx-auto leading-relaxed">
            From the fertile soils of Gujarat to modern culinary kitchens, our four guiding principles ensure unwavering purity, honesty, and authentic regional taste.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {brandPillars.map((pillar) => (
            <div
              key={pillar.id}
              className="glass-panel p-8 rounded-3xl border border-saurena-gold/25 shadow-lg hover:border-saurena-gold/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-saurena-gold/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {getIcon(pillar.id)}
                  </div>
                  <span className="font-mono text-xs font-bold text-saurena-gold/70 tracking-widest">
                    {pillar.number}
                  </span>
                </div>

                <h3 className="font-editorial text-2xl font-bold text-saurena-forest mb-1">
                  {pillar.title}
                </h3>
                <span className="text-xs font-semibold text-saurena-brown block mb-4">
                  {pillar.description}
                </span>

                <p className="text-xs text-saurena-forest/80 leading-relaxed">
                  {pillar.detail}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-saurena-gold/20 flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-saurena-gold font-bold">
                <span>Authentic SAURÉNA</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

