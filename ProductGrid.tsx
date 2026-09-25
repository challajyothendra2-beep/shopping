import React from 'react';
import { Product, CurrencyConfig, GridViewMode } from '../types/clothing';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  currency: CurrencyConfig;
  gridView: GridViewMode;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  currency,
  gridView,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart
}) => {
  if (products.length === 0) {
    return (
      <div className="py-24 text-center select-none">
        <span className="font-zara-serif text-3xl font-light text-neutral-400 uppercase tracking-widest">
          NO MATCHING GARMENTS FOUND
        </span>
        <p className="text-xs text-neutral-500 font-mono tracking-widest mt-3 uppercase">
          Try clearing your filter parameters or exploring all collections.
        </p>
      </div>
    );
  }

  // Grid classes according to GridViewMode
  const gridClasses = {
    single: 'space-y-0',
    duo: 'grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-16',
    quad: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-6 gap-y-10 md:gap-y-14'
  }[gridView];

  return (
    <section className="max-w-[1720px] mx-auto px-4 md:px-8 py-8 md:py-12">
      <div className={gridClasses}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            currency={currency}
            gridView={gridView}
            isWishlisted={wishlistIds.includes(product.id)}
            onToggleWishlist={onToggleWishlist}
            onQuickView={onQuickView}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
};
