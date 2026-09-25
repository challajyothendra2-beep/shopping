import React, { useState } from 'react';
import { CartItem, CurrencyConfig } from '../types/clothing';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Truck, CreditCard, Banknote } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyConfig;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onClearCart
}) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [fullName, setFullName] = useState('Helena Vance');
  const [email, setEmail] = useState('helena.vance@studio-archive.com');
  const [phone, setPhone] = useState('+91 98201 44892');
  const [address, setAddress] = useState('Flat 4B, The Monolith Towers, Altamount Road');
  const [city, setCity] = useState('Mumbai');
  const [postalCode, setPostalCode] = useState('400026');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const [orderRef, setOrderRef] = useState('ZR-2026-9812');

  if (!isOpen) return null;

  const rawSubtotalUSD = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const subtotal = Math.round(rawSubtotalUSD * currency.rate);
  const shippingFee = subtotal >= 150 * currency.rate ? 0 : Math.round(15 * currency.rate);
  const total = subtotal + shippingFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newRef = `ZR-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(100 + Math.random() * 900)}`;
    setOrderRef(newRef);
    setStep('success');
    onClearCart();
  };

  const handleFinish = () => {
    setStep('details');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-white w-full max-w-3xl shadow-2xl z-10 border border-black/10 animate-fade-in overflow-hidden">
        {step === 'details' ? (
          <div>
            {/* Header */}
            <div className="p-6 border-b border-black/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="zara-brand-mark text-3xl">ZARA</span>
                <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
                  / SECURE CHECKOUT
                </span>
              </div>
              <button onClick={onClose} className="p-1 hover:text-neutral-500">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitOrder} className="p-6 md:p-8 space-y-6">
              {/* Order items mini summary */}
              <div className="bg-neutral-50 p-4 border border-black/5 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-neutral-500 uppercase">ORDER CONTENT:</span>
                  <p className="font-semibold text-black mt-0.5">
                    {items.length} {items.length === 1 ? 'ITEM' : 'ITEMS'} ({items.reduce((acc, i) => acc + i.quantity, 0)} UNITS)
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-neutral-500 uppercase">TOTAL DUE:</span>
                  <p className="font-bold text-base text-black">
                    {currency.symbol}{total}
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <span className="block text-[10px] tracking-[0.2em] uppercase font-mono text-neutral-500 mb-3">
                  01. SHIPPING RECIPIENT & CONTACT
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-1">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs p-2.5 border border-black/20 focus:border-black font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-1">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs p-2.5 border border-black/20 focus:border-black font-mono"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-1">
                      MOBILE NUMBER (FOR DELIVERY PIN) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs p-2.5 border border-black/20 focus:border-black font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <span className="block text-[10px] tracking-[0.2em] uppercase font-mono text-neutral-500 mb-3">
                  02. DELIVERY ADDRESS
                </span>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-1">
                      STREET & APARTMENT / SUITE *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full text-xs p-2.5 border border-black/20 focus:border-black font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-1">
                        CITY / PROVINCE *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full text-xs p-2.5 border border-black/20 focus:border-black font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-neutral-500 mb-1">
                        POSTAL CODE / ZIP *
                      </label>
                      <input
                        type="text"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full text-xs p-2.5 border border-black/20 focus:border-black font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <span className="block text-[10px] tracking-[0.2em] uppercase font-mono text-neutral-500 mb-3">
                  03. PAYMENT SELECTION
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3.5 border text-left flex items-start gap-3 transition-colors ${
                      paymentMethod === 'card' ? 'border-black bg-neutral-50 ring-1 ring-black' : 'border-neutral-200'
                    }`}
                  >
                    <CreditCard size={18} className="mt-0.5" />
                    <div>
                      <span className="block text-xs font-semibold uppercase">CARD / UPI</span>
                      <span className="text-[10px] text-neutral-500 font-mono">Instant encrypted auth</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 border text-left flex items-start gap-3 transition-colors ${
                      paymentMethod === 'cod' ? 'border-black bg-neutral-50 ring-1 ring-black' : 'border-neutral-200'
                    }`}
                  >
                    <Banknote size={18} className="mt-0.5" />
                    <div>
                      <span className="block text-xs font-semibold uppercase">PAY ON DELIVERY</span>
                      <span className="text-[10px] text-neutral-500 font-mono">Cash or contactless QR</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-black/10">
                <button
                  type="submit"
                  className="w-full py-4 bg-black text-white text-xs font-semibold tracking-[0.25em] uppercase hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                >
                  <span>AUTHORIZE & CONFIRM ORDER ({currency.symbol}{total})</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Order Confirmation Receipt (Per E-Commerce Guideline) */
          <div className="p-8 md:p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-black">
              <CheckCircle2 size={32} />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.3em] font-mono text-neutral-500 uppercase">
                ZARA ORDER DISPATCH INITIATED
              </span>
              <h3 className="font-zara-serif text-3xl md:text-4xl font-bold uppercase tracking-tight">
                THANK YOU, {fullName.toUpperCase()}
              </h3>
              <p className="text-xs font-mono text-neutral-600">
                ORDER NUMBER: <strong className="text-black font-mono">{orderRef}</strong>
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 bg-neutral-50 border border-black/10 text-left text-xs font-mono space-y-2">
              <div className="flex justify-between border-b border-black/5 pb-2">
                <span className="text-neutral-500">ESTIMATED DISPATCH</span>
                <span className="font-medium text-black">24-48 HOURS VIA EXPRESS</span>
              </div>
              <div className="flex justify-between border-b border-black/5 pb-2">
                <span className="text-neutral-500">DESTINATION</span>
                <span className="font-medium text-black">{city.toUpperCase()}, {postalCode}</span>
              </div>
              <div className="flex justify-between border-b border-black/5 pb-2">
                <span className="text-neutral-500">METHOD</span>
                <span className="font-medium text-black">
                  {paymentMethod === 'card' ? 'CREDIT CARD (AUTHORIZED)' : 'CASH ON DELIVERY'}
                </span>
              </div>
              <div className="flex justify-between pt-1 font-bold text-sm">
                <span>TOTAL CHARGE</span>
                <span>{currency.symbol}{total}</span>
              </div>
            </div>

            <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
              A comprehensive tracking dispatch link has been sent to <strong>{email}</strong>. You can inspect garment tailoring status anytime.
            </p>

            <button
              onClick={handleFinish}
              className="px-8 py-3.5 bg-black text-white text-xs font-semibold tracking-[0.2em] uppercase hover:bg-neutral-800 transition-colors"
            >
              RETURN TO STOREFRONT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
