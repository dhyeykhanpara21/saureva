import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Wholesale & Retail Distribution',
    packaging: 'Both Stand-Up Pouch & Box',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-saurena-ivory rounded-3xl border border-saurena-gold/40 shadow-2xl overflow-hidden p-6 sm:p-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-saurena-forest hover:bg-saurena-gold/20 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-saurena-forest/10 flex items-center justify-center text-saurena-forest mb-4">
              <CheckCircle2 className="w-8 h-8 text-saurena-gold" />
            </div>
            <h3 className="font-editorial text-3xl font-bold text-saurena-forest mb-2">
              Inquiry Received
            </h3>
            <p className="text-sm text-saurena-forest/80 max-w-sm mx-auto leading-relaxed">
              Thank you for reaching out to SAURÉNA. Our regional culinary team will connect with you within 24 hours.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[1.5px] bg-saurena-gold" />
              <span className="text-[11px] font-mono tracking-widest text-saurena-gold uppercase font-bold">
                SAURÉNA Official Inquiry
              </span>
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl text-saurena-forest font-bold mb-2">
              Bring Saurashtra to Your Shelves & Table
            </h3>
            <p className="text-xs text-saurena-forest/75 mb-6 leading-relaxed">
              For retail orders, wholesale distribution, sample requests, or culinary partnerships, submit your details below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-saurena-brown uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-saurena-gold/30 text-xs text-saurena-forest placeholder-saurena-forest/40 focus:outline-none focus:border-saurena-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-saurena-brown uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-saurena-gold/30 text-xs text-saurena-forest placeholder-saurena-forest/40 focus:outline-none focus:border-saurena-gold transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-saurena-brown uppercase tracking-wider mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-saurena-gold/30 text-xs text-saurena-forest placeholder-saurena-forest/40 focus:outline-none focus:border-saurena-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-saurena-brown uppercase tracking-wider mb-1">
                    Format Interested In
                  </label>
                  <select
                    value={formData.packaging}
                    onChange={(e) => setFormData({ ...formData, packaging: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-saurena-gold/30 text-xs text-saurena-forest focus:outline-none focus:border-saurena-gold transition-colors"
                  >
                    <option>All 3 Formats (Foil Pouch, Box & Kraft)</option>
                    <option>Stand-Up Foil Pouch (100g)</option>
                    <option>Artisan Cardboard Box (100g)</option>
                    <option>Eco Kraft Stand-Up Pouch (100g)</option>
                    <option>Institutional / Bulk Spices</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-saurena-brown uppercase tracking-wider mb-1">
                  Message / Quantity Requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your culinary requirements, store location, or sample delivery address..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/80 border border-saurena-gold/30 text-xs text-saurena-forest placeholder-saurena-forest/40 focus:outline-none focus:border-saurena-gold transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-saurena-forest text-saurena-ivory text-xs font-bold tracking-widest uppercase hover:bg-saurena-gold transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
              >
                <span>Submit Inquiry</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

