import React from 'react';
import { StaggerTestimonials } from '@/components/ui/stagger-testimonials';
import { brandPillars } from '../data/saurenaData';
import { Compass, CheckCircle2, ShieldCheck, Box, Star, Quote } from 'lucide-react';

const saurenaTestimonials = [
  {
    tempId: 0,
    testimonial: "The roasted coriander and clove aromatics in SAURÉNA transform ordinary Ringan no Oro into authentic Kathiyawadi village dining.",
    by: "Chef Jaydeep, Executive Chef at Saurashtra Heritage",
    imgSrc: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&q=80"
  },
  {
    tempId: 1,
    testimonial: "Authentic Kathiyawadi taste without artificial colors. Our patrons love the natural warmth and aroma in every sabzi.",
    by: "Hansaben Patel, Traditional Home Cook, Gondal",
    imgSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"
  },
  {
    tempId: 2,
    testimonial: "Finally, a real Kathiyawadi blend that captures the true smoky aroma of a clay chulha. Essential in our kitchen.",
    by: "Rajeshbhai Vora, Head Caterer, Rajkot",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
  },
  {
    tempId: 3,
    testimonial: "The balance of Gondal red chilli and roasted cumin is phenomenal. Perfect for undhiyu and sev tameta.",
    by: "Meenakshi Dave, Gujarati Food Writer, Ahmedabad",
    imgSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
  },
  {
    tempId: 4,
    testimonial: "Every pinch smells as fresh as freshly ground spices. Our guests constantly ask for our secret ingredient!",
    by: "Vikramaditya Singh, Heritage Resort, Junagadh",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
  },
  {
    tempId: 5,
    testimonial: "Takes me right back to my grandmother's kitchen in Jamnagar. The aroma while tempering in groundnut oil is unforgettable.",
    by: "Pooja Trivedi, Culinary Explorer, Mumbai",
    imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
  },
  {
    tempId: 6,
    testimonial: "We use SAURÉNA across all our Kathiyawadi dhaba branches. Consistent quality, pure spice oils, zero chemicals.",
    by: "Bhupatbhai Ahir, Kathiyawadi Dhaba Owner, Surat",
    imgSrc: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80"
  },
  {
    tempId: 7,
    testimonial: "The multi-barrier packaging keeps the volatile oils intact. Even after 3 months, it smells freshly ground.",
    by: "Ananya Mehta, Culinary Instructor, Vadodara",
    imgSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80"
  }
];

export const BrandPillars: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'regional-inspiration':
        return <Compass className="w-5 h-5 text-saurena-gold" />;
      case 'careful-selection':
        return <CheckCircle2 className="w-5 h-5 text-saurena-gold" />;
      case 'quality-assurance':
        return <ShieldCheck className="w-5 h-5 text-saurena-gold" />;
      case 'thoughtful-packaging':
        return <Box className="w-5 h-5 text-saurena-gold" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-saurena-gold" />;
    }
  };

  return (
    <section id="approach" className="relative py-16 sm:py-24 md:py-32 bg-[#F8F4ED] overflow-hidden">
      {/* Background grain and ambient golden glow */}
      <div className="absolute inset-0 bg-grain pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-saurena-gold/10 rounded-t-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1.5px] bg-saurena-gold" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-saurena-gold">
              Culinary Praise & Tradition
            </span>
            <span className="w-6 h-[1.5px] bg-saurena-gold" />
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-saurena-forest font-bold tracking-tight">
            TRADITION IN <br />
            <span className="italic font-normal text-saurena-brown">EVERY DETAIL.</span>
          </h2>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-saurena-forest/80 max-w-xl mx-auto leading-relaxed">
            From the fertile soils of Gujarat to modern culinary kitchens, hear from chefs, home cooks, and food lovers who trust SAURÉNA for unwavering purity and authentic regional taste.
          </p>
        </div>

        {/* Stagger Testimonials Interactive Stage */}
        <div className="relative rounded-3xl overflow-hidden border border-saurena-gold/30 shadow-2xl glass-panel mb-12 sm:mb-16">
          <StaggerTestimonials
            testimonials={saurenaTestimonials}
            height={560}
            className="bg-transparent"
          />
        </div>

        {/* 4 Pillars Quality Trust Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {brandPillars.map((pillar) => (
            <div
              key={pillar.id}
              className="glass-panel p-4 sm:p-5 rounded-2xl border border-saurena-gold/20 flex items-center gap-3.5 transition-all duration-300 hover:border-saurena-gold/50 hover:bg-white/90"
            >
              <div className="w-10 h-10 rounded-xl bg-saurena-gold/15 flex items-center justify-center shrink-0">
                {getIcon(pillar.id)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-editorial text-sm sm:text-base font-bold text-saurena-forest truncate">
                    {pillar.title}
                  </span>
                </div>
                <span className="text-[11px] text-saurena-brown block truncate">
                  {pillar.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
