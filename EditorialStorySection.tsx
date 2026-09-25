import React from 'react';
import { ArrowRight } from 'lucide-react';

interface EditorialStorySectionProps {
  onExploreArchive: () => void;
}

export const EditorialStorySection: React.FC<EditorialStorySectionProps> = ({ onExploreArchive }) => {
  return (
    <section className="border-t border-black/10 py-16 md:py-24 bg-neutral-50/50">
      <div className="max-w-[1720px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Manifesto */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-black" />
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-neutral-500">
                JOIN LIFE / 2026 ARCHIVE
              </span>
            </div>

            <h2 className="font-zara-serif text-3xl md:text-5xl font-bold tracking-tight uppercase text-black leading-[1.05] text-balance">
              THE PURITY OF RAW LINEN & SPUN ARCHITECTURAL WOOL
            </h2>

            <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-light">
              Crafted in collaboration with heritage mills across Galicia and Northern Italy. Our 2026 collection embraces unbleached natural fibers, seamless circular knit engineering, and deconstructed masculine tailoring for fluid silhouettes.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-black/10 font-mono text-xs">
              <div>
                <span className="text-neutral-400 text-[10px] uppercase block">FIBER ORIGIN</span>
                <span className="font-semibold text-black uppercase mt-1 block">100% Certified Flax</span>
                <span className="text-neutral-500 text-[10px] mt-0.5 block">Normandy & Flanders</span>
              </div>
              <div>
                <span className="text-neutral-400 text-[10px] uppercase block">TAILORING AUDIT</span>
                <span className="font-semibold text-black uppercase mt-1 block">Zero-Waste Pattern</span>
                <span className="text-neutral-500 text-[10px] mt-0.5 block">100% Circular standard</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onExploreArchive}
                className="px-6 py-3 bg-black text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-neutral-800 transition-colors inline-flex items-center gap-2"
              >
                <span>EXPLORE STUDIO PIECES</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* Editorial Double Imagery */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] bg-neutral-200 overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
                alt="Editorial Craftsmanship"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase">
                FIGURE 01 · DRAPED CREPE SILK
              </div>
            </div>

            <div className="relative aspect-[3/4] bg-neutral-200 overflow-hidden group sm:translate-y-8">
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop"
                alt="Architectural Tailoring"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase">
                FIGURE 02 · HIGH-RISE DOUBLE PLEATS
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
