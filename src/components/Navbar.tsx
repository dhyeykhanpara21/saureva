import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenInquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Web Audio API ambient drone synthesizer (authentic warm Indian tanpura/acoustic harmony)
  const toggleAmbientAudio = () => {
    if (!isPlayingAudio) {
      try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        
        // Root base note (D2 ~ 73.4Hz warm drone)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const osc3 = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(73.4, ctx.currentTime); // D2

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(110.0, ctx.currentTime); // A2 (fifth)

        osc3.type = 'sine';
        osc3.frequency.setValueAtTime(146.8, ctx.currentTime); // D3 (octave)

        // Subtle gentle low pass filter
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 3);

        osc1.connect(filter);
        osc2.connect(filter);
        osc3.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc1.start();
        osc2.start();
        osc3.start();

        setAudioCtx(ctx);
        setIsPlayingAudio(true);
      } catch (e) {
        console.error('Audio could not be initialized:', e);
      }
    } else {
      if (audioCtx) {
        audioCtx.close();
        setAudioCtx(null);
      }
      setIsPlayingAudio(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Our Story', href: '#heritage' },
    { name: 'What’s Inside', href: '#ingredients' },
    { name: 'Our Product', href: '#product' },
    { name: 'Taste of Kathiyawad', href: '#taste' },
    { name: 'Our Approach', href: '#approach' },
    { name: 'Contact', href: '#footer' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? 'glass-panel shadow-sm py-3.5 border-b border-saurena-gold/20'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* SAURÉNA Official Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <img
              src="/assets/saurena_logo_transparent.png"
              alt="SAURÉNA — The Taste of Saurashtra"
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-widest uppercase font-medium text-saurena-forest/90">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="relative py-1 hover:text-saurena-gold transition-colors duration-200 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-saurena-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Ambient Sound Toggle */}
            <button
              onClick={toggleAmbientAudio}
              title={isPlayingAudio ? 'Mute ambient soundscape' : 'Play ambient Saurashtra soundscape'}
              className="p-2.5 rounded-full border border-saurena-gold/30 hover:border-saurena-gold text-saurena-forest hover:text-saurena-gold transition-colors duration-200 bg-white/40 backdrop-blur-sm"
              aria-label="Toggle ambient sound"
            >
              {isPlayingAudio ? (
                <Volume2 className="w-4 h-4 text-saurena-gold animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 text-saurena-forest/60" />
              )}
            </button>

            {/* Enquire Now CTA */}
            <button
              onClick={onOpenInquiry}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-saurena-forest text-saurena-ivory text-xs font-semibold tracking-wider uppercase hover:bg-saurena-gold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>Enquire Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={toggleAmbientAudio}
              className="p-2 rounded-full border border-saurena-gold/30 text-saurena-forest"
              aria-label="Toggle audio"
            >
              {isPlayingAudio ? (
                <Volume2 className="w-4 h-4 text-saurena-gold" />
              ) : (
                <VolumeX className="w-4 h-4 text-saurena-forest/60" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-saurena-forest hover:text-saurena-gold focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-30 lg:hidden bg-saurena-ivory/95 backdrop-blur-xl transition-all duration-500 flex flex-col justify-between p-8 pt-28 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-6 text-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="font-editorial text-2xl text-saurena-forest hover:text-saurena-gold transition-colors tracking-wide"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-4 items-center">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenInquiry();
            }}
            className="w-full max-w-xs py-3.5 rounded-full bg-saurena-forest text-saurena-ivory text-xs font-semibold tracking-widest uppercase hover:bg-saurena-gold transition-colors text-center"
          >
            Enquire Now
          </button>
          <p className="text-[11px] text-saurena-brown/70 tracking-widest uppercase">
            SAURÉNA — The Taste of Saurashtra
          </p>
        </div>
      </div>
    </>
  );
};

