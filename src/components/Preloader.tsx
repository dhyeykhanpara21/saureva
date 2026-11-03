import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onComplete, 800);
          }, 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 6;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-saurena-ivory transition-opacity duration-700 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background radial gold glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-saurena-gold/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Official SAURÉNA Logo */}
        <div className="w-56 md:w-64 mb-8 transform transition-transform duration-1000 scale-100">
          <img
            src="/assets/saurena_logo_transparent.png"
            alt="SAURÉNA — The Taste of Saurashtra"
            className="w-full h-auto drop-shadow-md"
          />
        </div>

        {/* Loading progress bar */}
        <div className="w-48 h-[2px] bg-saurena-gold/20 rounded-full overflow-hidden mb-4 relative">
          <div
            className="h-full bg-gradient-to-r from-saurena-gold to-saurena-forest transition-all duration-150 ease-out"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>

        {/* Percentage and Sanskrit/Gujarati welcoming note */}
        <div className="flex items-center justify-between w-48 text-[11px] font-medium tracking-widest text-saurena-forest/70 uppercase">
          <span>Crafting Experience</span>
          <span className="font-mono text-saurena-gold">{Math.min(100, progress)}%</span>
        </div>

        <p className="mt-6 text-xs text-saurena-brown/80 tracking-wider italic font-display">
          "The authentic flavours of Saurashtra, arriving at your table."
        </p>
      </div>
    </div>
  );
};

