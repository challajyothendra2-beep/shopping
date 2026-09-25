import React from 'react';
import { Product, CurrencyConfig } from '../types/clothing';
import { X, Trash2, ShoppingBag } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  currency: CurrencyConfig;
  onRemoveFromWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  currency,
  onRemoveFromWishlist,
  onQuickView,
  onAddToCart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between border-l border-black/10 animate-slide-left">
        {/* Header */}
        <div className="p-5 border-b border-black/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-zara-serif text-xl font-bold tracking-tight uppercase">
              SAVED PIECES
            </span>
            <span className="text-xs font-mono text-neutral-500">
              ({wishlistProducts.length})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-600 hover:text-black"
            aria-label="Close saved items"
          >
            <X size={20} />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {wishlistProducts.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <span className="font-zara-serif text-2xl text-neutral-400 uppercase">
                NO SAVED PIECES
              </span>
              <p className="text-xs text-neutral-500 font-mono tracking-widest uppercase">
                Tap the heart icon on any garment to keep it here.
              </p>
            </div>
          ) : (
            wishlistProducts.map((product) => {
              const convertedPrice = Math.round(product.price * currency.rate);

              return (
                <div key={product.id} className="flex gap-4 pb-5 border-b border-black/5">
                  <div
                    className="w-20 h-28 bg-neutral-100 overflow-hidden shrink-0 cursor-pointer"
                    onClick={() => {
                      onQuickView(product);
                      onClose();
                    }}
                  >
                    <img
                      src={product.primaryImage}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            onQuickView(product);
                            onClose();
                          }}
                          className="text-xs font-semibold tracking-wide uppercase text-black line-clamp-1 cursor-pointer hover:opacity-75"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product)}
                          className="text-neutral-400 hover:text-black transition-colors"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-[10px] font-mono text-neutral-500 uppercase mt-0.5">
                        {product.reference}
                      </p>
                      <p className="text-xs font-mono font-medium text-black mt-1">
                        {currency.symbol}{convertedPrice}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const defaultSize = product.sizes.find((s) => s.stockCount > 0)?.size || product.sizes[0].size;
                        const defaultColor = product.colors[0]?.name || '';
                        onAddToCart(product, defaultSize, defaultColor);
                        onRemoveFromWishlist(product);
                      }}
                      className="w-full py-2 bg-black text-white text-[10px] tracking-[0.2em] uppercase font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag size={12} />
                      <span>MOVE TO BAG</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-black/10">
          <button
            onClick={onClose}
            className="w-full py-3 border border-black text-black text-xs font-semibold tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors"
          >
            CONTINUE BROWSING
          </button>
        </div>
      </div>
    </div>
  );
};
