import React, { useState } from 'react';
import { Product, CurrencyConfig, GridViewMode } from '../types/clothing';
import { EditorialImage } from './EditorialImage';
import { Heart, Eye, Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  currency: CurrencyConfig;
  gridView: GridViewMode;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  gridView,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [quickSizeMenuOpen, setQuickSizeMenuOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [justAddedSize, setJustAddedSize] = useState<string | null>(null);

  const convertedPrice = Math.round(product.price * currency.rate);

  const handleQuickAdd = (size: string) => {
    onAddToCart(product, size, selectedColor);
    setJustAddedSize(size);
    setTimeout(() => {
      setJustAddedSize(null);
      setQuickSizeMenuOpen(false);
    }, 900);
  };

  // Magazine View Layout (1-column full editorial layout)
  if (gridView === 'single') {
    return (
      <article className="border-b border-black/10 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 relative group">
          <EditorialImage
            primarySrc={product.primaryImage}
            secondarySrc={product.secondaryImage}
            alt={product.name}
            aspectRatio="4/3"
            isHovered={isHovered}
          />
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => onToggleWishlist(product)}
              className="p-2.5 bg-white/90 backdrop-blur-sm text-black hover:bg-black hover:text-white transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={() => onQuickView(product)}
              className="p-2.5 bg-white/90 backdrop-blur-sm text-black hover:bg-black hover:text-white transition-colors"
              aria-label="Quick View"
            >
              <Eye size={16} />
            </button>
          </div>
        </div>

        <div className="md:col-span-5 space-y-5">
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-neutral-500 uppercase">
            <span>{product.reference}</span>
            <span>·</span>
            <span>{product.edition || 'COLLECTION 2026'}</span>
            {product.isSustainable && (
              <>
                <span>·</span>
                <span className="text-neutral-800 font-semibold">JOIN LIFE</span>
              </>
            )}
          </div>

          <h2 className="font-zara-serif text-2xl md:text-3xl font-bold tracking-tight uppercase text-black">
            {product.name}
          </h2>

          <div className="text-lg font-mono font-medium text-black">
            {currency.symbol}{convertedPrice}
          </div>

          <p className="text-xs text-neutral-600 leading-relaxed font-light line-clamp-3">
            {product.description}
          </p>

          <div className="pt-2">
            <span className="block text-[10px] tracking-[0.2em] uppercase font-mono text-neutral-500 mb-2">
              SELECT SIZE & ADD TO BAG
            </span>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s.size}
                  disabled={s.stockCount === 0}
                  onClick={() => handleQuickAdd(s.size)}
                  className={`px-4 py-2 text-xs font-mono border transition-all ${
                    s.stockCount === 0
                      ? 'border-neutral-200 text-neutral-300 cursor-not-allowed line-through'
                      : justAddedSize === s.size
                      ? 'bg-black text-white border-black font-bold'
                      : 'border-black/30 hover:border-black hover:bg-black hover:text-white'
                  }`}
                >
                  {justAddedSize === s.size ? 'ADDED' : s.size}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3">
            <button
              onClick={() => onQuickView(product)}
              className="text-xs tracking-[0.2em] uppercase font-semibold text-black hover:opacity-60 underline underline-offset-4"
            >
              VIEW GARMENT SPECIFICATIONS & ARCHIVE DETAILS
            </button>
          </div>
        </div>
      </article>
    );
  }

  // Duo & Quad Grid Views (Standard ZARA lookbook cards)
  return (
    <article
      className="group relative flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setQuickSizeMenuOpen(false);
      }}
    >
      {/* Visual Asset Container */}
      <div className="relative overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <EditorialImage
          primarySrc={product.primaryImage}
          secondarySrc={product.secondaryImage}
          alt={product.name}
          aspectRatio="3/4"
          isHovered={isHovered}
        />

        {/* Top Floating Actions: Wishlist & Edition Tag */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <div className="pointer-events-auto">
            {product.isNew && (
              <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-black bg-white/90 backdrop-blur-xs px-2 py-0.5 font-semibold">
                NEW
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className="pointer-events-auto p-2 bg-white/80 backdrop-blur-xs hover:bg-black hover:text-white text-black transition-colors"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              size={15}
              fill={isWishlisted ? 'currentColor' : 'none'}
              strokeWidth={1.8}
            />
          </button>
        </div>

        {/* Hover Action Bar: Quick Size Selector & Quick View */}
        <div
          className={`absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md p-3 transition-transform duration-300 border-t border-black/10 z-20 ${
            isHovered ? 'translate-y-0' : 'translate-y-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {quickSizeMenuOpen ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-neutral-500">
                <span>SELECT SIZE:</span>
                <button
                  onClick={() => setQuickSizeMenuOpen(false)}
                  className="hover:text-black uppercase"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    disabled={s.stockCount === 0}
                    onClick={() => handleQuickAdd(s.size)}
                    className={`py-1.5 text-[11px] font-mono border text-center transition-colors ${
                      s.stockCount === 0
                        ? 'border-neutral-200 text-neutral-300 line-through cursor-not-allowed'
                        : justAddedSize === s.size
                        ? 'bg-black text-white border-black font-bold'
                        : 'border-black/30 hover:border-black hover:bg-black hover:text-white'
                    }`}
                  >
                    {justAddedSize === s.size ? <Check size={11} className="mx-auto" /> : s.size}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuickSizeMenuOpen(true)}
                className="flex-1 py-2 bg-black text-white text-[10px] tracking-[0.2em] uppercase font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus size={12} />
                <span>ADD TO BAG</span>
              </button>
              <button
                onClick={() => onQuickView(product)}
                className="px-2.5 py-2 border border-black/30 text-black hover:border-black hover:bg-neutral-100 transition-colors"
                title="Quick View"
                aria-label="Quick View Details"
              >
                <Eye size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Clean Unboxed Metadata per Zero-Pill Discipline */}
      <div className="pt-3 pb-1 space-y-1">
        {/* Category & Edition indicator */}
        <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-neutral-500 uppercase">
          <span>{product.reference}</span>
          {product.isSustainable && (
            <span className="text-neutral-700 font-medium">JOIN LIFE</span>
          )}
        </div>

        {/* Product Name */}
        <h3
          onClick={() => onQuickView(product)}
          className="text-xs font-semibold tracking-wide uppercase text-black truncate cursor-pointer hover:opacity-75 transition-opacity"
        >
          {product.name}
        </h3>

        {/* Price in tabular numerals */}
        <div className="flex items-center justify-between pt-0.5">
          <span className="text-xs font-mono font-medium text-black tabular-nums">
            {currency.symbol}{convertedPrice}
          </span>

          {/* Color Swatch Dots */}
          <div className="flex items-center gap-1">
            {product.colors.map((c) => (
              <span
                key={c.name}
                style={{ backgroundColor: c.hex }}
                title={c.name}
                className="w-2.5 h-2.5 rounded-full border border-black/20"
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
