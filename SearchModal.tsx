import React, { useState, useEffect, useRef } from 'react';
import { Product, CurrencyConfig } from '../types/clothing';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currency: CurrencyConfig;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  currency,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.reference.toLowerCase().includes(query.toLowerCase()) ||
          p.subCategory.toLowerCase().includes(query.toLowerCase()) ||
          p.composition.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const trendingTerms = [
    'OVERSIZED BLAZER',
    'WIDE-LEG TROUSERS',
    'RAW LINEN TRENCH',
    'CASHMERE SEAMLESS',
    'ASYMMETRIC SATIN DRESS',
    'KITTEN HEEL'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-white/98 backdrop-blur-lg flex flex-col p-6 md:p-12 overflow-y-auto animate-fade-in">
      {/* Header */}
      <div className="max-w-5xl w-full mx-auto flex items-center justify-between pb-8 border-b border-black/10">
        <span className="zara-brand-mark text-3xl">ZARA</span>
        <button
          onClick={onClose}
          className="p-2 text-neutral-600 hover:text-black transition-colors"
          aria-label="Close search"
        >
          <X size={24} />
        </button>
      </div>

      {/* Input Box */}
      <div className="max-w-5xl w-full mx-auto py-8">
        <div className="relative flex items-center border-b-2 border-black pb-3">
          <Search size={24} className="text-black mr-4 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH FOR GARMENTS, FABRICS, OR REFERENCES..."
            className="w-full text-lg md:text-2xl font-light uppercase tracking-wide focus:outline-none placeholder:text-neutral-400 placeholder:normal-case font-mono"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-neutral-400 hover:text-black uppercase font-mono ml-2"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Trending Searches */}
        {!query && (
          <div className="pt-8">
            <span className="block text-[10px] tracking-[0.25em] uppercase font-mono text-neutral-500 mb-3">
              TRENDING EDITORIAL SEARCHES
            </span>
            <div className="flex flex-wrap gap-3">
              {trendingTerms.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3.5 py-1.5 border border-black/20 text-xs tracking-wider uppercase font-medium hover:border-black hover:bg-black hover:text-white transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="pt-8">
            <div className="flex items-center justify-between pb-4">
              <span className="text-xs font-mono tracking-widest uppercase text-neutral-500">
                FOUND {filtered.length} {filtered.length === 1 ? 'RESULT' : 'RESULTS'} FOR "{query.toUpperCase()}"
              </span>
            </div>

            {filtered.length === 0 ? (
              <div className="py-12 text-center">
                <p className="font-zara-serif text-xl text-neutral-400 uppercase">
                  NO MATCHING PIECES FOUND
                </p>
                <p className="text-xs font-mono text-neutral-500 mt-2 uppercase">
                  Try searching for "Blazer", "Trousers", "Linen" or "Wool".
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectProduct(item);
                      onClose();
                    }}
                    className="cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="aspect-[3/4] bg-neutral-100 overflow-hidden relative">
                      <img
                        src={item.primaryImage}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="pt-2 text-xs space-y-0.5">
                      <p className="font-semibold uppercase truncate">{item.name}</p>
                      <p className="text-[10px] font-mono text-neutral-500">{item.reference}</p>
                      <p className="font-mono font-medium">
                        {currency.symbol}{Math.round(item.price * currency.rate)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
