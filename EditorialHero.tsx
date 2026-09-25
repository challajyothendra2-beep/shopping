import React, { useState } from 'react';
import { EDITORIAL_STORIES } from '../data/products';
import { ArrowRight, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { CurrencyConfig } from '../types/clothing';

interface EditorialHeroProps {
  onSelectProduct: (productId: string) => void;
  onExploreCollection: () => void;
  currency: CurrencyConfig;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({
  onSelectProduct,
  onExploreCollection,
  currency
}) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const story = EDITORIAL_STORIES[activeStoryIndex];

  const nextStory = () => {
    setActiveStoryIndex((prev) => (prev + 1) % EDITORIAL_STORIES.length);
    setActiveHotspot(null);
  };

  const prevStory = () => {
    setActiveStoryIndex((prev) => (prev - 1 + EDITORIAL_STORIES.length) % EDITORIAL_STORIES.length);
    setActiveHotspot(null);
  };

  return (
    <section className="relative w-full h-[85vh] min-h-[620px] max-h-[920px] bg-black text-white overflow-hidden select-none">
      {/* Editorial Background Image with Smooth Fade */}
      <div className="absolute inset-0">
        <img
          src={story.coverImage}
          alt={story.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-105 transition-all duration-1000 ease-out transform scale-100 hover:scale-[1.02]"
        />
        {/* Measured Scrim for legibility per WCAG */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
      </div>

      {/* Interactive Editorial Hotspots on the Model */}
      {story.hotspots.map((hotspot) => {
        const isHovered = activeHotspot === hotspot.productId;
        const convertedPrice = Math.round(hotspot.price * currency.rate);

        return (
          <div
            key={hotspot.productId}
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <button
              onClick={() => onSelectProduct(hotspot.productId)}
              onMouseEnter={() => setActiveHotspot(hotspot.productId)}
              onMouseLeave={() => setActiveHotspot(null)}
              className="relative group p-2 focus:outline-none"
              aria-label={`Shop ${hotspot.title}`}
            >
              {/* Pulsing ring */}
              <span className="absolute inset-0 rounded-full bg-white/40 animate-ping duration-1000" />
              {/* White Minimalist Hotspot Dot */}
              <div className="relative w-7 h-7 bg-white text-black flex items-center justify-center rounded-full shadow-2xl transition-transform duration-300 group-hover:scale-125">
                <Plus size={14} strokeWidth={2.5} />
              </div>
            </button>

            {/* Micro Popover on Hover/Focus */}
            <div
              className={`absolute left-9 top-1/2 -translate-y-1/2 bg-white text-black px-4 py-3 shadow-2xl transition-all duration-300 pointer-events-auto min-w-[200px] border border-black/10 ${
                isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
              }`}
            >
              <span className="block text-[9px] tracking-[0.2em] uppercase text-neutral-500 font-mono">
                SHOP THE LOOK
              </span>
              <p className="text-xs font-semibold tracking-wide uppercase mt-0.5 line-clamp-1">
                {hotspot.title}
              </p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/10">
                <span className="text-xs font-mono font-medium">
                  {currency.symbol}{convertedPrice}
                </span>
                <button
                  onClick={() => onSelectProduct(hotspot.productId)}
                  className="text-[10px] tracking-widest uppercase font-semibold text-black hover:opacity-70 flex items-center gap-1"
                >
                  VIEW <ArrowRight size={10} />
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Editorial Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-14 max-w-[1720px] mx-auto z-10 pointer-events-none">
        {/* Top Tag */}
        <div className="flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-white inline-block" />
            <span className="text-xs tracking-[0.25em] uppercase font-mono text-neutral-300">
              {story.tag}
            </span>
          </div>

          {/* Slide Indicator and Controls */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono tracking-widest text-neutral-300">
              0{activeStoryIndex + 1} / 0{EDITORIAL_STORIES.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={prevStory}
                className="w-9 h-9 border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                aria-label="Previous story"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextStory}
                className="w-9 h-9 border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                aria-label="Next story"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Hero Headline & Direct Route into Catalog */}
        <div className="max-w-3xl pointer-events-auto space-y-4">
          <h1 className="font-zara-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[0.95] text-balance">
            {story.title}
          </h1>
          <p className="text-xs md:text-sm text-neutral-300 max-w-xl font-light tracking-wide leading-relaxed">
            {story.subtitle}
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreCollection}
              className="px-8 py-3.5 bg-white text-black text-xs font-semibold tracking-[0.2em] uppercase hover:bg-neutral-200 transition-colors flex items-center gap-2"
            >
              EXPLORE COLLECTION
              <ArrowRight size={14} />
            </button>
            <span className="text-[11px] tracking-widest uppercase text-neutral-400 font-mono hidden sm:inline">
              CLICK HOTSPOTS TO DISCOVER SPECIFIC PIECES
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
