import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, Globe } from 'lucide-react';
import { MainCategory, CurrencyConfig, CurrencyCode } from '../types/clothing';
import { CURRENCIES } from '../data/products';

interface NavbarProps {
  currentCategory: MainCategory;
  onSelectCategory: (cat: MainCategory) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  currency: CurrencyConfig;
  onSelectCurrency: (code: CurrencyCode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCategory,
  onSelectCategory,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  currency,
  onSelectCurrency
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const categories: { id: MainCategory; label: string }[] = [
    { id: 'woman', label: 'WOMAN' },
    { id: 'man', label: 'MAN' },
    { id: 'studio', label: 'STUDIO' },
    { id: 'shoes-bags', label: 'SHOES & BAGS' },
    { id: 'beauty', label: 'BEAUTY' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-black/10 transition-all duration-300">
      {/* Editorial Announcement Bar (Slim, 28px) */}
      <div className="bg-black text-white text-[10px] tracking-[0.2em] uppercase py-1.5 px-4 text-center flex items-center justify-between border-b border-white/10">
        <span className="hidden md:inline font-mono opacity-60">EDITION 2026 // SPRING COLLECTION</span>
        <span className="mx-auto font-medium">COMPLIMENTARY EXPRESS DELIVERY ON ORDERS OVER {currency.symbol}{Math.round(150 * currency.rate)}</span>
        <div className="relative hidden md:block">
          <button
            onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
            className="flex items-center gap-1.5 text-[10px] tracking-widest text-neutral-300 hover:text-white uppercase font-mono transition-colors"
            aria-label="Select Currency"
          >
            <Globe size={11} />
            <span>{currency.code} ({currency.symbol})</span>
          </button>

          {currencyDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-28 bg-black border border-white/20 text-white z-50 py-1 text-left shadow-2xl">
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((cCode) => (
                <button
                  key={cCode}
                  onClick={() => {
                    onSelectCurrency(cCode);
                    setCurrencyDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-1 text-[10px] tracking-wider text-left hover:bg-neutral-800 transition-colors flex items-center justify-between ${
                    currency.code === cCode ? 'text-white font-bold bg-neutral-900' : 'text-neutral-400'
                  }`}
                >
                  <span>{cCode}</span>
                  <span className="font-mono">{CURRENCIES[cCode].symbol}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Top Bar 3-Zone Contract */}
      <div className="max-w-[1720px] mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
        {/* Zone 1: Single Brand Element */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-1.5 text-black hover:opacity-70 transition-opacity"
            aria-label="Open Navigation Menu"
          >
            <Menu size={22} />
          </button>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('woman');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="zara-brand-mark text-3xl md:text-4xl text-black hover:opacity-85 transition-opacity select-none"
            aria-label="ZARA Homepage"
          >
            ZARA
          </a>
        </div>

        {/* Zone 2: 4-6 Clean Text Nav Links (Single line, no pills) */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.18em] uppercase font-medium">
          {categories.map((cat) => {
            const isActive = currentCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`relative py-1 transition-colors ${
                  isActive
                    ? 'text-black font-semibold'
                    : 'text-neutral-500 hover:text-black'
                }`}
              >
                {cat.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-black" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Search, Wishlist, Cart Drawer) */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 text-[11px] tracking-widest text-neutral-800 hover:text-black transition-colors"
            aria-label="Search Collection"
          >
            <Search size={17} strokeWidth={1.8} />
            <span className="hidden lg:inline uppercase font-medium text-[10px]">SEARCH</span>
          </button>

          {/* Wishlist Trigger */}
          <button
            onClick={onOpenWishlist}
            className="relative text-neutral-800 hover:text-black transition-colors p-1"
            aria-label={`Wishlist (${wishlistCount} items)`}
          >
            <Heart size={18} strokeWidth={1.8} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-mono font-medium">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 text-black hover:opacity-75 transition-opacity"
            aria-label={`Shopping Bag (${cartCount} items)`}
          >
            <div className="relative">
              <ShoppingBag size={19} strokeWidth={1.8} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-mono font-medium">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-[11px] tracking-widest uppercase font-semibold">
              BAG {cartCount > 0 ? `(${cartCount})` : ''}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/60 md:hidden animate-fade-in">
          <div className="w-4/5 max-w-sm bg-white h-full p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-black/10">
                <span className="zara-brand-mark text-3xl">ZARA</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-neutral-700 hover:text-black"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="py-6 space-y-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left text-sm tracking-[0.2em] uppercase py-2 transition-colors ${
                      currentCategory === cat.id ? 'text-black font-bold pl-2 border-l-2 border-black' : 'text-neutral-500 hover:text-black'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-black/10 space-y-4 text-xs tracking-widest text-neutral-600">
              <div className="flex items-center justify-between py-1">
                <span>CURRENCY</span>
                <div className="flex gap-2">
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((cCode) => (
                    <button
                      key={cCode}
                      onClick={() => onSelectCurrency(cCode)}
                      className={`px-2 py-0.5 border ${
                        currency.code === cCode ? 'border-black text-black font-bold' : 'border-neutral-200 text-neutral-400'
                      }`}
                    >
                      {cCode}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-neutral-400 tracking-wider">
                ZARA ARCHIVE EDITION 2026. ALL RIGHTS RESERVED.
              </p>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
