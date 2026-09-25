import React, { useState } from 'react';
import { CartItem, CurrencyConfig } from '../types/clothing';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

interface ShoppingBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyConfig;
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: () => void;
}

export const ShoppingBagDrawer: React.FC<ShoppingBagDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const rawSubtotalUSD = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmountUSD = rawSubtotalUSD * appliedDiscount;
  const finalSubtotalUSD = Math.max(0, rawSubtotalUSD - discountAmountUSD);

  const subtotal = Math.round(rawSubtotalUSD * currency.rate);
  const discountAmount = Math.round(discountAmountUSD * currency.rate);
  const finalTotal = Math.round(finalSubtotalUSD * currency.rate);

  // Free shipping threshold = $150 USD
  const freeShippingThresholdUSD = 150;
  const freeShippingThreshold = Math.round(freeShippingThresholdUSD * currency.rate);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'ZARASTUDIO') {
      setAppliedDiscount(0.15); // 15% discount
      setPromoError('');
    } else if (promoCode.trim().toUpperCase() === 'FIRST10') {
      setAppliedDiscount(0.10);
      setPromoError('');
    } else {
      setPromoError('Invalid promotion code. Try "ZARASTUDIO"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Luxury Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between border-l border-black/10 animate-slide-left">
        {/* Header */}
        <div className="p-5 border-b border-black/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-zara-serif text-xl font-bold tracking-tight uppercase">
              SHOPPING BAG
            </span>
            <span className="text-xs font-mono text-neutral-500">
              ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-600 hover:text-black transition-colors"
            aria-label="Close bag"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Delivery Tracker */}
        <div className="bg-neutral-50 px-5 py-3 border-b border-black/5">
          <div className="flex items-center justify-between text-[10px] font-mono tracking-wider uppercase mb-1.5">
            {amountToFreeShipping === 0 ? (
              <span className="text-black font-semibold">
                ✓ QUALIFIED FOR COMPLIMENTARY EXPRESS DELIVERY
              </span>
            ) : (
              <span className="text-neutral-600">
                ADD {currency.symbol}{amountToFreeShipping} MORE FOR COMPLIMENTARY DELIVERY
              </span>
            )}
            <span className="text-neutral-400">{freeShippingPercent}%</span>
          </div>
          <div className="w-full h-1 bg-neutral-200 overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-500"
              style={{ width: `${freeShippingPercent}%` }}
            />
          </div>
        </div>

        {/* Items Scrollable List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <span className="font-zara-serif text-2xl text-neutral-400 uppercase">
                YOUR BAG IS EMPTY
              </span>
              <p className="text-xs text-neutral-500 font-mono tracking-widest uppercase">
                Browse our seasonal curation and select your size.
              </p>
            </div>
          ) : (
            items.map((item) => {
              const itemPrice = Math.round(item.product.price * currency.rate);
              const itemTotal = itemPrice * item.quantity;

              return (
                <div key={item.id} className="flex gap-4 pb-6 border-b border-black/5">
                  {/* Image */}
                  <div className="w-20 h-28 bg-neutral-100 overflow-hidden shrink-0">
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold tracking-wide uppercase text-black line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-neutral-400 hover:text-black transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase mt-0.5 space-y-0.5">
                        <p>{item.product.reference}</p>
                        <p>SIZE: {item.selectedSize} · {item.selectedColor}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Stepper */}
                      <div className="flex items-center border border-black/20">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-neutral-100 text-neutral-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="px-2 text-xs font-mono font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-neutral-100 text-neutral-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      <span className="text-xs font-mono font-semibold text-black tabular-nums">
                        {currency.symbol}{itemTotal}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer / Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-black/10 bg-white space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="PROMO CODE (e.g. ZARASTUDIO)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-3 py-2 text-xs border border-black/20 focus:border-black focus:outline-none uppercase font-mono"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-neutral-100 border border-black/20 text-black text-xs font-semibold hover:bg-black hover:text-white uppercase transition-colors"
              >
                APPLY
              </button>
            </form>
            {appliedDiscount > 0 && (
              <p className="text-[10px] text-emerald-700 font-mono tracking-wider">
                ✓ 15% VIP PROMOTION APPLIED (-{currency.symbol}{discountAmount})
              </p>
            )}
            {promoError && (
              <p className="text-[10px] text-red-600 font-mono tracking-wider">
                {promoError}
              </p>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-neutral-600 font-mono">
              <div className="flex justify-between">
                <span>SUBTOTAL</span>
                <span className="text-black tabular-nums">{currency.symbol}{subtotal}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>DISCOUNT</span>
                  <span>-{currency.symbol}{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>ESTIMATED DELIVERY</span>
                <span className="text-black uppercase">
                  {amountToFreeShipping === 0 ? 'COMPLIMENTARY' : `${currency.symbol}${Math.round(15 * currency.rate)}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-black/10 text-sm font-bold text-black">
                <span>TOTAL</span>
                <span className="tabular-nums">{currency.symbol}{finalTotal}</span>
              </div>
              <p className="text-[9px] text-neutral-400 tracking-wider">
                * INCLUDING ALL APPLICABLE IMPORT DUTIES AND TAXES
              </p>
            </div>

            {/* Checkout Action */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-4 bg-black text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
            >
              <span>CONTINUE TO CHECKOUT</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
