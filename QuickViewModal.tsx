import React, { useState } from 'react';
import { Product, CurrencyConfig } from '../types/clothing';
import { X, Heart, ShieldCheck, MapPin, Ruler, Check, ChevronRight } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  currency: CurrencyConfig;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onOpenSizeGuide: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  currency,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenSizeGuide
}) => {
  if (!isOpen || !product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes.find((s) => s.stockCount > 0)?.size || ''
  );
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [storeCity, setStoreCity] = useState('Mumbai - Palladium');
  const [storeStatusChecked, setStoreStatusChecked] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const convertedPrice = Math.round(product.price * currency.rate);

  const handleAdd = () => {
    if (!selectedSize) return;
    onAddToCart(product, selectedSize, selectedColor);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
    }, 1500);
  };

  const images = product.galleryImages.length > 0 ? product.galleryImages : [product.primaryImage];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-5xl shadow-2xl z-10 my-auto overflow-hidden border border-black/10 animate-fade-in max-h-[92vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-xs hover:bg-black hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Left Column: Image Gallery with Angle Switcher */}
        <div className="md:w-1/2 bg-neutral-100 relative flex flex-col">
          <div className="flex-1 min-h-[380px] md:min-h-[520px] max-h-[580px] overflow-hidden relative">
            <img
              src={images[activeImageIndex]}
              alt={`${product.name} view ${activeImageIndex + 1}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-all duration-500"
            />
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="p-3 bg-white border-t border-black/10 flex gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-18 border overflow-hidden transition-all ${
                    activeImageIndex === idx ? 'border-black opacity-100 ring-1 ring-black' : 'border-neutral-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt="Thumbnail"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Garment Information & Purchase Module */}
        <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Tagline / Ref */}
            <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
              <span>{product.reference}</span>
              {product.edition && <span>{product.edition}</span>}
            </div>

            {/* Title & Price */}
            <div>
              <h2 className="font-zara-serif text-2xl md:text-3xl font-bold tracking-tight uppercase text-black">
                {product.name}
              </h2>
              <p className="text-base font-mono font-medium text-black mt-1">
                {currency.symbol}{convertedPrice}
              </p>
            </div>

            {/* Description */}
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Colorway Selection */}
            <div>
              <span className="block text-[10px] tracking-[0.2em] uppercase font-mono text-neutral-500 mb-2">
                COLOUR: <span className="text-black font-semibold">{selectedColor}</span>
              </span>
              <div className="flex items-center gap-2">
                {product.colors.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col.name)}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                    className={`w-6 h-6 rounded-full border transition-all ${
                      selectedColor === col.name
                        ? 'ring-2 ring-black ring-offset-2 scale-110'
                        : 'border-black/30 hover:scale-105'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-neutral-500">
                  SELECT SIZE
                </span>
                <button
                  onClick={onOpenSizeGuide}
                  className="text-[10px] tracking-wider uppercase underline font-mono text-neutral-600 hover:text-black flex items-center gap-1"
                >
                  <Ruler size={11} />
                  SIZE GUIDE
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((s) => {
                  const isOutOfStock = s.stockCount === 0;
                  const isSelected = selectedSize === s.size;
                  return (
                    <button
                      key={s.size}
                      disabled={isOutOfStock}
                      onClick={() => setSelectedSize(s.size)}
                      className={`py-2 text-xs font-mono border transition-colors relative ${
                        isOutOfStock
                          ? 'border-neutral-200 text-neutral-300 line-through cursor-not-allowed bg-neutral-50'
                          : isSelected
                          ? 'bg-black text-white border-black font-bold'
                          : 'border-black/25 hover:border-black text-black'
                      }`}
                    >
                      {s.size}
                      {s.stockCount > 0 && s.stockCount <= 3 && (
                        <span className="absolute -top-1.5 -right-1 bg-neutral-900 text-white text-[8px] px-1 rounded-xs">
                          {s.stockCount} left
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sustainable Fibers & Origin */}
            <div className="p-3 bg-neutral-50 border border-black/5 text-[11px] space-y-1.5 font-light">
              <p className="font-semibold text-neutral-900 font-mono tracking-wider uppercase text-[10px]">
                COMPOSITION & CARE
              </p>
              <p className="text-neutral-600">{product.composition}</p>
              <p className="text-neutral-500 font-mono text-[10px]">{product.care}</p>
              <p className="text-neutral-500 font-mono text-[10px]">{product.origin}</p>
            </div>

            {/* In-Store Availability Checker */}
            <div className="pt-1">
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-neutral-500" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-600">
                  CHECK IN-STORE AVAILABILITY:
                </span>
              </div>
              <div className="mt-1.5 flex gap-2">
                <select
                  value={storeCity}
                  onChange={(e) => {
                    setStoreCity(e.target.value);
                    setStoreStatusChecked(false);
                  }}
                  className="flex-1 text-xs px-2.5 py-1.5 border border-black/20 focus:border-black uppercase font-mono bg-white"
                >
                  <option value="Mumbai - Palladium Mall">MUMBAI — PALLADIUM MALL</option>
                  <option value="New Delhi - DLF Promenade">NEW DELHI — DLF PROMENADE</option>
                  <option value="Bengaluru - Phoenix Marketcity">BENGALURU — PHOENIX</option>
                  <option value="London - Regent Street">LONDON — REGENT STREET</option>
                  <option value="New York - 5th Avenue">NEW YORK — 5TH AVENUE</option>
                  <option value="Paris - Champs-Élysées">PARIS — CHAMPS-ÉLYSÉES</option>
                </select>
                <button
                  onClick={() => setStoreStatusChecked(true)}
                  className="px-3 py-1.5 border border-black text-black text-[10px] font-semibold tracking-wider uppercase hover:bg-black hover:text-white transition-colors"
                >
                  CHECK
                </button>
              </div>

              {storeStatusChecked && (
                <p className="text-[10px] text-emerald-800 font-mono tracking-wider mt-1.5 flex items-center gap-1">
                  ✓ IN STOCK AT {storeCity.toUpperCase()} (AISLE 04)
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-4 border-t border-black/10">
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                disabled={!selectedSize}
                className="flex-1 py-3.5 bg-black text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {addedNotice ? (
                  <>
                    <Check size={14} />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <span>ADD TO BAG</span>
                )}
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className="px-4 py-3.5 border border-black/30 hover:border-black text-black transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
