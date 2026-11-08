import React, { useState, useEffect } from 'react';
import { X, ZoomIn, Eye, ShieldCheck } from 'lucide-react';
import { productDetails } from '../data/saurenaData';

interface PackagingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'pouch' | 'box' | 'kraft';
}

export const PackagingModal: React.FC<PackagingModalProps> = ({
  isOpen,
  onClose,
  initialType = 'pouch'
}) => {
  const [selectedType, setSelectedType] = useState<'pouch' | 'box' | 'kraft'>(initialType);
  const [activeSide, setActiveSide] = useState<'front' | 'back' | 'gussets'>('front');

  useEffect(() => {
    if (isOpen) {
      setSelectedType(initialType);
      setActiveSide('front');
    }
  }, [isOpen, initialType]);

  if (!isOpen) return null;

  const getTitle = () => {
    switch (selectedType) {
      case 'pouch':
        return 'Stand-Up Foil Pouch Artwork';
      case 'box':
        return 'Cardboard Box Packaging Artwork';
      case 'kraft':
        return 'Eco Kraft Stand-Up Pouch Artwork';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-saurena-ivory rounded-3xl border border-saurena-gold/40 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-saurena-gold/25 flex items-center justify-between bg-white/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-[1.5px] bg-saurena-gold" />
              <span className="text-[11px] font-mono tracking-widest text-saurena-gold uppercase font-bold">
                Authentic Packaging Inspection
              </span>
            </div>
            <h3 className="font-editorial text-2xl font-bold text-saurena-forest">
              {getTitle()}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-saurena-forest hover:bg-saurena-gold/20 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format & Side Switcher */}
        <div className="px-6 py-3 bg-saurena-ivory border-b border-saurena-gold/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-saurena-brown/80 font-bold uppercase tracking-wider text-[11px]">Format:</span>
            <button
              onClick={() => {
                setSelectedType('pouch');
                if (activeSide === 'gussets') setActiveSide('front');
              }}
              className={`px-3 py-1.5 rounded-full font-semibold transition-colors ${
                selectedType === 'pouch'
                  ? 'bg-saurena-forest text-white'
                  : 'bg-white/60 text-saurena-forest hover:bg-saurena-gold/20'
              }`}
            >
              Foil Pouch
            </button>
            <button
              onClick={() => {
                setSelectedType('box');
                if (activeSide === 'gussets') setActiveSide('front');
              }}
              className={`px-3 py-1.5 rounded-full font-semibold transition-colors ${
                selectedType === 'box'
                  ? 'bg-saurena-forest text-white'
                  : 'bg-white/60 text-saurena-forest hover:bg-saurena-gold/20'
              }`}
            >
              Cardboard Box
            </button>
            <button
              onClick={() => {
                setSelectedType('kraft');
                if (activeSide === 'gussets') setActiveSide('front');
              }}
              className={`px-3 py-1.5 rounded-full font-semibold transition-colors ${
                selectedType === 'kraft'
                  ? 'bg-saurena-forest text-white'
                  : 'bg-white/60 text-saurena-forest hover:bg-saurena-gold/20'
              }`}
            >
              Eco Kraft
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-saurena-brown/80 font-bold uppercase tracking-wider text-[11px]">View:</span>
            <button
              onClick={() => setActiveSide('front')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-colors ${
                activeSide === 'front'
                  ? 'bg-saurena-gold text-saurena-forest'
                  : 'bg-white/60 text-saurena-forest hover:bg-saurena-gold/20'
              }`}
            >
              Front Artwork
            </button>
            <button
              onClick={() => setActiveSide('back')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-colors ${
                activeSide === 'back'
                  ? 'bg-saurena-gold text-saurena-forest'
                  : 'bg-white/60 text-saurena-forest hover:bg-saurena-gold/20'
              }`}
            >
              Back Artwork
            </button>
            {selectedType !== 'box' && (
              <button
                onClick={() => setActiveSide('gussets')}
                className={`px-3 py-1.5 rounded-full font-semibold transition-colors ${
                  activeSide === 'gussets'
                    ? 'bg-saurena-gold text-saurena-forest'
                    : 'bg-white/60 text-saurena-forest hover:bg-saurena-gold/20'
                }`}
              >
                Side Gussets
              </button>
            )}
          </div>
        </div>

        {/* Content Viewer with High-Res Images */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col md:flex-row gap-6 items-center justify-center bg-[#FAF6F0]">
          {selectedType === 'pouch' && (
            <>
              {activeSide === 'front' && (
                <div className="max-w-sm rounded-2xl overflow-hidden shadow-xl border border-saurena-gold/30 bg-white">
                  <img
                    src="/assets/pouch_front.png"
                    alt="SAURÉNA Stand-Up Foil Pouch Front"
                    className="w-full h-auto object-contain max-h-[58vh]"
                  />
                </div>
              )}
              {activeSide === 'back' && (
                <div className="max-w-sm rounded-2xl overflow-hidden shadow-xl border border-saurena-gold/30 bg-white">
                  <img
                    src="/assets/pouch_back.png"
                    alt="SAURÉNA Stand-Up Foil Pouch Back"
                    className="w-full h-auto object-contain max-h-[58vh]"
                  />
                </div>
              )}
              {activeSide === 'gussets' && (
                <div className="flex gap-6 items-center justify-center">
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-saurena-gold/30 bg-white max-w-[140px]">
                    <img
                      src="/assets/pouch_left_gusset.png"
                      alt="Left Gusset Claims"
                      className="w-full h-auto object-contain max-h-[58vh]"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-saurena-gold/30 bg-white max-w-[140px]">
                    <img
                      src="/assets/pouch_right_gusset.png"
                      alt="Right Gusset Proudly From Gujarat"
                      className="w-full h-auto object-contain max-h-[58vh]"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {selectedType === 'box' && (
            <>
              {activeSide === 'front' && (
                <div className="max-w-sm rounded-2xl overflow-hidden shadow-xl border border-saurena-gold/30 bg-white">
                  <img
                    src="/assets/box_front.png"
                    alt="SAURÉNA Cardboard Box Front"
                    className="w-full h-auto object-contain max-h-[58vh]"
                  />
                </div>
              )}
              {activeSide === 'back' && (
                <div className="max-w-sm rounded-2xl overflow-hidden shadow-xl border border-saurena-gold/30 bg-white">
                  <img
                    src="/assets/box_back.png"
                    alt="SAURÉNA Cardboard Box Back"
                    className="w-full h-auto object-contain max-h-[58vh]"
                  />
                </div>
              )}
            </>
          )}

          {selectedType === 'kraft' && (
            <>
              {activeSide === 'front' && (
                <div className="max-w-sm rounded-2xl overflow-hidden shadow-xl border border-saurena-gold/30 bg-white">
                  <img
                    src="/assets/kraft_pouch_front.png"
                    alt="SAURÉNA Eco Kraft Stand-Up Pouch Front"
                    className="w-full h-auto object-contain max-h-[58vh]"
                  />
                </div>
              )}
              {activeSide === 'back' && (
                <div className="max-w-sm rounded-2xl overflow-hidden shadow-xl border border-saurena-gold/30 bg-white">
                  <img
                    src="/assets/kraft_pouch_back.png"
                    alt="SAURÉNA Eco Kraft Stand-Up Pouch Back"
                    className="w-full h-auto object-contain max-h-[58vh]"
                  />
                </div>
              )}
              {activeSide === 'gussets' && (
                <div className="flex gap-6 items-center justify-center">
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-saurena-gold/30 bg-white max-w-[140px]">
                    <img
                      src="/assets/kraft_gusset.png"
                      alt="Eco Kraft Gusset"
                      className="w-full h-auto object-contain max-h-[58vh]"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {/* Quick Packaging Spec Callout Panel */}
          <div className="w-full md:w-80 flex flex-col gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-white/80 border border-saurena-gold/25 shadow-sm">
              <span className="font-bold text-saurena-forest block mb-1">Authentic Packaging Preservation</span>
              <p className="text-saurena-forest/80 leading-relaxed text-[11px]">
                Preserves original supplied packaging artwork, graphics, barcode, and verified Gujarati regional labeling.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 border border-saurena-gold/25 shadow-sm">
              <span className="font-bold text-saurena-forest block mb-1">Nutritional Integrity</span>
              <p className="text-saurena-forest/80 leading-relaxed text-[11px]">
                Energy 370 kcal • Protein 11.5g • Carbs 50.2g • Dietary Fiber 18.0g • Sodium 68mg.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 border border-saurena-gold/25 shadow-sm">
              <span className="font-bold text-saurena-forest block mb-1">Packaging Net Weight</span>
              <p className="text-saurena-forest/80 leading-relaxed text-[11px]">
                Certified 100 g per unit • Resealable airtight zipper barrier.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
