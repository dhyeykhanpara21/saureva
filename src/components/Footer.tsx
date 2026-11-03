import React, { useState } from 'react';
import { ArrowUpRight, Mail, Phone, MapPin, Check } from 'lucide-react';

interface FooterProps {
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const navLinks = [
    { name: 'Our Story', href: '#heritage' },
    { name: 'What’s Inside', href: '#ingredients' },
    { name: 'Our Product', href: '#product' },
    { name: 'Taste of Kathiyawad', href: '#taste' },
    { name: 'Our Approach', href: '#approach' },
  ];

  return (
    <footer id="footer" className="relative bg-[#0D2217] text-saurena-ivory pt-20 pb-12 border-t border-saurena-gold/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-saurena-gold/20">
          {/* Col 1: Brand Info & Official Logo (4 cols) */}
          <div className="lg:col-span-4">
            <div className="inline-block p-3.5 bg-saurena-ivory rounded-2xl shadow-lg border border-saurena-gold/30 mb-6">
              <img
                src="/assets/saurena_logo_cropped.png"
                alt="SAURÉNA — The Taste of Saurashtra"
                className="w-44 sm:w-48 h-auto object-contain"
              />
            </div>
            <p className="text-xs text-saurena-ivory/70 leading-relaxed mb-6 max-w-sm">
              Authentic regional Indian food products inspired by the timeless culinary heritage of Saurashtra, Gujarat. Bringing the warmth of ancestral kitchens to the modern world.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-saurena-gold/30 flex items-center justify-center text-saurena-gold hover:bg-saurena-gold hover:text-saurena-darkgreen transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-saurena-gold/30 flex items-center justify-center text-saurena-gold hover:bg-saurena-gold hover:text-saurena-darkgreen transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.688 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-saurena-gold/30 flex items-center justify-center text-saurena-gold hover:bg-saurena-gold hover:text-saurena-darkgreen transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-saurena-gold/30 flex items-center justify-center text-saurena-gold hover:bg-saurena-gold hover:text-saurena-darkgreen transition-all"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2">
            <span className="font-mono text-xs uppercase tracking-widest text-saurena-gold font-bold block mb-4">
              Explore
            </span>
            <ul className="space-y-3 text-xs text-saurena-ivory/80">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-saurena-gold transition-colors block py-0.5"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Packaging Specifications (3 cols) */}
          <div className="lg:col-span-3">
            <span className="font-mono text-xs uppercase tracking-widest text-saurena-gold font-bold block mb-4">
              Direct Contact
            </span>
            <ul className="space-y-3 text-xs text-saurena-ivory/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-saurena-gold shrink-0 mt-0.5" />
                <span>Saurashtra Spice Corridor, Gujarat, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-saurena-gold shrink-0" />
                <a href="mailto:care@saurenafoods.com" className="hover:text-saurena-gold transition-colors">
                  care@saurenafoods.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-saurena-gold shrink-0" />
                <span>+91-XXXXXXXXXX</span>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenInquiry}
                  className="text-xs text-saurena-gold font-semibold uppercase tracking-wider hover:underline flex items-center gap-1"
                >
                  <span>Wholesale & Distribution Enquiry</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Exclusive Spice Dispatches (3 cols) */}
          <div className="lg:col-span-3">
            <span className="font-mono text-xs uppercase tracking-widest text-saurena-gold font-bold block mb-4">
              The Kathiyawadi Table
            </span>
            <p className="text-xs text-saurena-ivory/70 mb-4 leading-relaxed">
              Subscribe for regional Gujarati culinary stories, seasonal recipes, and limited single-estate spice harvests.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 rounded-full bg-saurena-forest/50 border border-saurena-gold/30 text-xs text-white placeholder-saurena-ivory/40 focus:outline-none focus:border-saurena-gold transition-colors pr-12"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-full bg-saurena-gold text-saurena-darkgreen hover:bg-white transition-colors flex items-center justify-center"
                aria-label="Subscribe"
              >
                {subscribed ? <Check className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-saurena-gold mt-2 animate-fade-in">
                Thank you for welcoming Saurashtra to your kitchen!
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-saurena-ivory/60 gap-4">
          <p>© {new Date().getFullYear()} SAURÉNA Foods. All Rights Reserved. The Taste of Saurashtra.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-saurena-gold cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-saurena-gold cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-saurena-gold cursor-pointer transition-colors">FSSAI Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
