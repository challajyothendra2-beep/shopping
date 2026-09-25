import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="border-t border-black/10 bg-white text-black pt-16 pb-12">
      <div className="max-w-[1720px] mx-auto px-4 md:px-8">
        {/* Top Newsletter & Manifesto Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-black/10">
          <div className="lg:col-span-6 space-y-4">
            <span className="font-zara-serif text-3xl md:text-4xl uppercase tracking-tighter font-bold">
              JOIN THE ARCHIVE NEWSLETTER
            </span>
            <p className="text-xs text-neutral-500 font-light max-w-md">
              Receive private previews of limited edition studio capsules, runway releases, and architectural tailoring collections.
            </p>

            <form onSubmit={handleSubscribe} className="pt-2 max-w-md">
              <div className="relative flex items-center border-b border-black pb-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL ADDRESS"
                  className="w-full text-xs uppercase tracking-wider font-mono focus:outline-none placeholder:text-neutral-400"
                />
                <button
                  type="submit"
                  className="text-xs font-mono font-semibold tracking-widest uppercase hover:opacity-70 flex items-center gap-1 shrink-0 ml-2"
                >
                  {subscribed ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <Check size={13} /> CONFIRMED
                    </span>
                  ) : (
                    <>
                      <span>SUBSCRIBE</span>
                      <ArrowRight size={13} />
                    </>
                  )}
                </button>
              </div>
              <p className="text-[9px] text-neutral-400 mt-2 font-mono">
                BY SUBSCRIBING, YOU AGREE TO OUR PRIVACY POLICY AND TERMS OF CURATION.
              </p>
            </form>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-mono">
            {/* Help */}
            <div className="space-y-3">
              <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 block font-semibold">
                HELP & ORDERS
              </span>
              <ul className="space-y-2 text-neutral-600">
                <li><a href="#" className="hover:text-black transition-colors">MY ZARA ACCOUNT</a></li>
                <li><a href="#" className="hover:text-black transition-colors">SHIPPING OPTIONS</a></li>
                <li><a href="#" className="hover:text-black transition-colors">PAYMENT & INVOICES</a></li>
                <li><a href="#" className="hover:text-black transition-colors">EXCHANGES & RETURNS</a></li>
                <li><a href="#" className="hover:text-black transition-colors">GIFT CARD LOOKUP</a></li>
              </ul>
            </div>

            {/* Collections */}
            <div className="space-y-3">
              <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 block font-semibold">
                CURATIONS
              </span>
              <ul className="space-y-2 text-neutral-600">
                <li><a href="#" className="hover:text-black transition-colors">STUDIO ARCHIVE</a></li>
                <li><a href="#" className="hover:text-black transition-colors">JOIN LIFE SUSTAINABILITY</a></li>
                <li><a href="#" className="hover:text-black transition-colors">ZARA ORIGINS</a></li>
                <li><a href="#" className="hover:text-black transition-colors">BEAUTY OLFACTIVE</a></li>
                <li><a href="#" className="hover:text-black transition-colors">STORE LOCATOR</a></li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 block font-semibold">
                CORPORATE
              </span>
              <ul className="space-y-2 text-neutral-600">
                <li><a href="#" className="hover:text-black transition-colors">ABOUT INDITEX</a></li>
                <li><a href="#" className="hover:text-black transition-colors">CAREERS IN ATELIER</a></li>
                <li><a href="#" className="hover:text-black transition-colors">ETHICAL SUPPLY CHAIN</a></li>
                <li><a href="#" className="hover:text-black transition-colors">PRESS ROOM</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Clean Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono tracking-wider text-neutral-500 uppercase">
          <div className="flex items-center gap-6">
            <span>INDIA / ENGLISH</span>
            <span>·</span>
            <span>COOKIES SETTINGS</span>
            <span>·</span>
            <span>PRIVACY AND COOKIES POLICY</span>
            <span>·</span>
            <span>TERMS OF PURCHASE</span>
          </div>

          <div>
            © 2026 ZARA. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};
