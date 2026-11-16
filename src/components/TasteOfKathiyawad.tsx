import React, { useState } from 'react';
import { DishOrbitCarousel, Dish as CarouselDish } from '@/components/ui/dish-orbit-carousel';
import { Sparkles, X, CheckCircle2 } from 'lucide-react';

const carouselDishes: CarouselDish[] = [
  {
    title: 'Rustic Millet',
    subtitle: 'Bajra no Rotlo',
    eyebrow: '#1 Saurashtra Classic',
    label: 'Bajra Rotlo',
    image: '/assets/images/dish_rotlo.jpg',
    rating: 4.9,
    chef: 'Kathiyawadi Kitchen',
    kitchen: 'Charred on traditional clay griddle',
    description:
      'Hand-patted pearl millet flatbread slow-roasted over open babool wood flames. Served with freshly churned white butter, fiery garlic chutney, and organic jaggery.',
    likes: 1842,
    ingredients: ['Pearl Millet', 'SAURÉNA Masala', 'White Makhan', 'Garlic Chutney', 'Organic Jaggery'],
    accent: '#BD8A26'
  },
  {
    title: 'Fire-Roasted',
    subtitle: 'Ringan no Oro',
    eyebrow: '#2 Smoky Delicacy',
    label: 'Ringan Oro',
    image: '/assets/images/dish_eggplant.jpg',
    rating: 4.9,
    chef: 'Kathiyawadi Kitchen',
    kitchen: 'Smoked over glowing babool coals',
    description:
      'Smoky fire-roasted jumbo eggplants mashed and simmered in golden groundnut oil with generous heaps of spring garlic, green chillies, and aromatic spices.',
    likes: 1620,
    ingredients: ['Smoked Eggplant', 'SAURÉNA Masala', 'Spring Garlic', 'Groundnut Oil', 'Green Chillies'],
    accent: '#713A24'
  },
  {
    title: 'Highway Dhaba',
    subtitle: 'Sev Tameta',
    eyebrow: '#3 Sweet & Tangy',
    label: 'Sev Tameta',
    image: '/assets/images/dish_curry.jpg',
    rating: 4.8,
    chef: 'Kathiyawadi Kitchen',
    kitchen: 'Tempered in pure groundnut oil',
    description:
      'Juicy ripe tomatoes tempered with mustard seeds and curry leaves in a tangy, aromatic gravy, finished right before serving with a generous handful of spicy crunchy sev.',
    likes: 1435,
    ingredients: ['Country Tomatoes', 'Ratlami Sev', 'SAURÉNA Masala', 'Mustard Seeds', 'Fresh Coriander'],
    accent: '#C25E2E'
  },
  {
    title: 'Royal Banquet',
    subtitle: 'Kathiyawadi Thali',
    eyebrow: '#4 Grand Feast',
    label: 'Royal Thali',
    image: '/assets/images/dish_thali.jpg',
    rating: 5.0,
    chef: 'Kathiyawadi Kitchen',
    kitchen: 'A regal spread of Saurashtra hospitality',
    description:
      'The quintessential feast: steaming Bajra Rotlo, Ringan Oro, Lasaniya Bataka, Sev Tameta, fresh chaas (buttermilk), and pure cow ghee. United by the magic of SAURÉNA.',
    likes: 2190,
    ingredients: ['Bajra Rotlo', 'Ringan Oro', 'Sev Tameta', 'Lasan Chutney', 'Fresh Chaas', 'SAURÉNA Masala'],
    accent: '#153B27'
  }
];

export const TasteOfKathiyawad: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<CarouselDish | null>(null);

  const handleOrder = () => {
    const productSection = document.getElementById('product');
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlay = (dish: CarouselDish) => {
    setSelectedRecipe(dish);
  };

  return (
    <section id="taste" className="relative bg-[#F5EFE4] overflow-hidden">
      {/* Background grain and subtle decorative elements */}
      <div className="absolute inset-0 bg-grain pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-saurena-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="pt-20 sm:pt-28 md:pt-36 pb-6 max-w-7xl mx-auto px-5 sm:px-6 md:px-12 relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <span className="w-6 sm:w-8 h-[1.5px] bg-saurena-gold" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-saurena-gold">
              Culinary Heritage & Food Art
            </span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-saurena-forest font-bold leading-[1.05] tracking-tight">
            BRING THE TASTE OF <br />
            <span className="italic font-normal text-saurena-brown">KATHIYAWAD HOME.</span>
          </h2>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-saurena-forest/80 leading-relaxed font-normal">
            From clay griddles glowing over open wood flames to rich, spiced curries tempered with pure groundnut oil, 
            discover how SAURÉNA elevates authentic Kathiyawadi comfort dishes.
          </p>
        </div>
      </div>

      {/* Dish Orbit Carousel Stage */}
      <div className="relative z-10 border-y border-saurena-gold/20 shadow-inner">
        <DishOrbitCarousel
          dishes={carouselDishes}
          loop={true}
          height="100svh"
          onOrder={handleOrder}
          onPlay={handlePlay}
        />
      </div>

      {/* Culinary Secret Tip Bar */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 py-10 sm:py-14 relative z-10">
        <div className="glass-panel p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-saurena-gold/30 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-saurena-gold/15 text-saurena-gold shrink-0 mt-1">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-saurena-gold mb-1">
                Authentic Kathiyawadi Kitchen Secret
              </div>
              <h4 className="font-editorial text-lg sm:text-xl text-saurena-forest font-bold mb-1">
                Blooming the Masala in Hot Groundnut Oil
              </h4>
              <p className="text-xs sm:text-sm text-saurena-forest/80 leading-relaxed max-w-2xl">
                For authentic Saurashtra aroma, bloom 1 teaspoon of SAURÉNA Kathiyawadi Masala in warm groundnut oil or A2 cow ghee for 10 seconds before stirring in crushed garlic or country tomatoes.
              </p>
            </div>
          </div>

          <button
            onClick={handleOrder}
            className="px-6 py-3 rounded-full bg-saurena-forest hover:bg-saurena-darkgreen text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:scale-105 shadow-md shrink-0 border border-saurena-gold/40 flex items-center gap-2"
          >
            <span>Explore SAURÉNA Masala</span>
          </button>
        </div>
      </div>

      {/* Recipe Modal Preview */}
      {selectedRecipe && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            className="bg-[#FFFDF8] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-saurena-gold/40 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 text-saurena-forest/60 hover:text-saurena-forest transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-saurena-gold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{selectedRecipe.eyebrow}</span>
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-saurena-forest mb-1">
              {selectedRecipe.subtitle}
            </h3>
            <p className="text-xs text-saurena-brown font-medium mb-4">
              {selectedRecipe.kitchen}
            </p>

            <div className="rounded-2xl overflow-hidden mb-5 border border-saurena-gold/25 aspect-video relative">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.subtitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <span className="text-white text-xs font-medium">
                  {selectedRecipe.description}
                </span>
              </div>
            </div>

            <div className="mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-saurena-forest mb-2">
                Key Ingredients & Aromas:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedRecipe.ingredients?.map((ing) => (
                  <span
                    key={ing}
                    className="px-2.5 py-1 rounded-full text-xs bg-saurena-gold/15 text-saurena-forest font-medium flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3 text-saurena-gold" />
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedRecipe(null);
                handleOrder();
              }}
              className="w-full py-3 rounded-full bg-saurena-gold hover:bg-saurena-gold/90 text-saurena-forest font-bold text-xs uppercase tracking-widest shadow-md transition-all duration-300"
            >
              Get SAURÉNA Masala for this Dish
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
