import React, { useEffect, useState } from 'react';
import { X, Plus, Minus, Trash2, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WingProduct } from '../data/wingData';

export interface BagItem {
  product: WingProduct;
  colorwayId: string;
  quantity: number;
}

interface BagDrawerProps {
  open: boolean;
  items: BagItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, colorwayId: string, delta: number) => void;
  onRemoveItem: (productId: string, colorwayId: string) => void;
  onClearBag: () => void;
}

export const BagDrawer: React.FC<BagDrawerProps> = ({
  open,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearBag,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState<string | null>(null);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!open) {
      setOrderConfirmed(null);
      setFormError('');
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const freeShippingThreshold = 150;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.includes('@')) {
      setFormError('Please enter your name and a valid email address.');
      return;
    }
    setFormError('');
    const orderNumber = `TW-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderConfirmed(orderNumber);
    onClearBag();
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="bag-drawer-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#111816]/70 backdrop-blur-sm cursor-pointer"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md bg-[#F9FAF9] text-[#111816] h-full flex flex-col justify-between shadow-2xl"
          >
            <div className="px-6 py-4 border-b border-[#111816]/10 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-widest text-[#9E5331]">
                  The Wing Labs · Order Bag
                </p>
                <h3 id="bag-drawer-title" className="text-lg font-bold text-[#111816]">
                  Your Carry Selection
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close bag drawer"
                className="w-10 h-10 rounded-md border border-[#111816]/12 flex items-center justify-center text-[#111816] hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {orderConfirmed ? (
                <div className="py-12 text-center">
                  <CheckCircle2
                    className="w-12 h-12 text-[#283734] mx-auto"
                    aria-hidden="true"
                  />
                  <h4 className="mt-4 text-xl font-bold text-[#111816]">
                    Reservation Confirmed
                  </h4>
                  <p className="mt-2 text-sm text-[#111816]/70 leading-relaxed">
                    Order <span className="font-mono font-semibold">{orderConfirmed}</span>{' '}
                    has been queued for inspection at The Wing Labs. A dispatch receipt
                    was prepared for <span className="font-medium">{customerEmail}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 px-6 py-2.5 text-xs font-semibold uppercase tracking-wide bg-[#111816] text-white rounded-md hover:bg-[#FF6B00] transition-colors cursor-pointer"
                  >
                    Return to Showcase
                  </button>
                </div>
              ) : items.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-base font-semibold text-[#111816]">
                    Your bag is currently empty.
                  </p>
                  <p className="mt-2 text-sm text-[#111816]/60">
                    Select any colorway from Series 01 and inspect Quick Specs to add an
                    item.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide bg-[#111816] text-white rounded-md hover:bg-[#FF6B00] transition-colors cursor-pointer"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Courier Threshold Notice */}
                  <div className="p-3 rounded-lg bg-[#283734]/8 text-xs text-[#283734] font-medium">
                    {remainingForFreeShipping === 0
                      ? 'Complimentary express dispatch unlocked.'
                      : `Add $${remainingForFreeShipping} more for complimentary express dispatch.`}
                  </div>

                  {items.map((item) => {
                    const colorway =
                      item.product.colorways.find((c) => c.id === item.colorwayId) ??
                      item.product.colorways[0];
                    return (
                      <div
                        key={`${item.product.id}-${item.colorwayId}`}
                        className="flex gap-4 p-3.5 bg-white rounded-xl border border-[#111816]/10"
                      >
                        <img
                          src={colorway.image}
                          alt={`${item.product.name} in ${colorway.name}`}
                          referrerPolicy="no-referrer"
                          className="w-20 h-24 object-cover rounded-lg shrink-0 bg-[#ECEEED]"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <h4 className="text-sm font-bold text-[#111816] truncate">
                                {item.product.name}
                              </h4>
                              <p className="text-xs text-[#111816]/60 mt-0.5">
                                {colorway.name}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                onRemoveItem(item.product.id, item.colorwayId)
                              }
                              aria-label={`Remove ${item.product.name}`}
                              className="text-[#111816]/40 hover:text-[#9E5331] transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="inline-flex items-center border border-[#111816]/15 rounded-md">
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateQuantity(item.product.id, item.colorwayId, -1)
                                }
                                aria-label="Decrease quantity"
                                className="w-8 h-8 flex items-center justify-center text-[#111816] hover:text-[#FF6B00] cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-7 text-center text-xs font-mono tabular-nums font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateQuantity(item.product.id, item.colorwayId, 1)
                                }
                                aria-label="Increase quantity"
                                className="w-8 h-8 flex items-center justify-center text-[#111816] hover:text-[#FF6B00] cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <span className="text-sm font-bold tabular-nums text-[#111816]">
                              ${item.product.price * item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {items.length > 0 && !orderConfirmed && (
              <form
                onSubmit={handleCheckout}
                className="border-t border-[#111816]/10 bg-white px-6 py-5 space-y-3"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#111816]/65">Subtotal</span>
                  <span className="text-lg font-bold tabular-nums text-[#111816]">
                    ${subtotal}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2.5 pt-1">
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Full name"
                    aria-label="Full name"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F9FAF9] border border-[#111816]/15 rounded-md focus:outline-none focus:border-[#FF6B00]"
                  />
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Email for dispatch confirmation"
                    aria-label="Email for dispatch confirmation"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F9FAF9] border border-[#111816]/15 rounded-md focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                {formError && (
                  <p className="text-xs text-[#9E5331] font-medium">{formError}</p>
                )}

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#FF6B00] rounded-md hover:bg-[#e56000] transition-colors cursor-pointer"
                >
                  <span>Reserve Series 01 Order</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </form>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
