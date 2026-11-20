import React, { useEffect, useState } from 'react';
import { X, Check, ShoppingBag, ShieldCheck, Scale, Ruler } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WingProduct } from '../data/wingData';

interface QuickSpecsDrawerProps {
  product: WingProduct | null;
  colorwayId: string;
  onSelectColorway: (productId: string, colorwayId: string) => void;
  onClose: () => void;
  onAddToBag: (product: WingProduct, colorwayId: string) => void;
}

export const QuickSpecsDrawer: React.FC<QuickSpecsDrawerProps> = ({
  product,
  colorwayId,
  onSelectColorway,
  onClose,
  onAddToBag,
}) => {
  const [showSecondary, setShowSecondary] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setShowSecondary(false);
    setJustAdded(false);
  }, [product?.id, colorwayId]);

  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  const activeColorway = product
    ? product.colorways.find((c) => c.id === colorwayId) ?? product.colorways[0]
    : null;

  const displayedImage =
    activeColorway && showSecondary && activeColorway.secondaryImage
      ? activeColorway.secondaryImage
      : activeColorway?.image;

  const handleAdd = () => {
    if (!product || !activeColorway) return;
    onAddToBag(product, activeColorway.id);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <AnimatePresence>
      {product && activeColorway && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-specs-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#111816]/70 backdrop-blur-sm cursor-pointer"
          />

          {/* Slide-Over Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-xl bg-[#F9FAF9] text-[#111816] h-full overflow-y-auto shadow-2xl flex flex-col justify-between"
          >
            <div>
              {/* Drawer Header */}
              <div className="sticky top-0 z-20 bg-[#F9FAF9]/95 backdrop-blur-md px-6 py-4 border-b border-[#111816]/10 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-[#9E5331]">
                    Quick Specs · {product.category}
                  </p>
                  <h3
                    id="quick-specs-title"
                    className="text-lg font-bold tracking-tight text-[#111816]"
                  >
                    {product.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close specifications drawer"
                  className="w-10 h-10 rounded-md border border-[#111816]/12 flex items-center justify-center text-[#111816] hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Product Gallery Preview */}
              <div className="px-6 pt-6">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#ECEEED] border border-[#111816]/10">
                  {displayedImage && (
                    <img
                      src={displayedImage}
                      alt={`${product.name} — ${activeColorway.name}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  )}
                  {activeColorway.secondaryImage && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-[#111816]/85 backdrop-blur-md p-1 rounded-md">
                      <button
                        type="button"
                        onClick={() => setShowSecondary(false)}
                        className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors cursor-pointer ${
                          !showSecondary
                            ? 'bg-[#FF6B00] text-white'
                            : 'text-white/75 hover:text-white'
                        }`}
                      >
                        Primary
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowSecondary(true)}
                        className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors cursor-pointer ${
                          showSecondary
                            ? 'bg-[#FF6B00] text-white'
                            : 'text-white/75 hover:text-white'
                        }`}
                      >
                        In Field
                      </button>
                    </div>
                  )}
                </div>

                {/* Colorway Switcher Inside Specs Drawer */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#111816]/10">
                  <div>
                    <span className="text-xs font-medium text-[#111816]/55 block">
                      Selected Colorway
                    </span>
                    <span className="text-sm font-semibold text-[#111816]">
                      {activeColorway.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {product.colorways.map((color) => {
                      const selected = color.id === activeColorway.id;
                      return (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() => onSelectColorway(product.id, color.id)}
                          aria-label={`Switch to ${color.name}`}
                          className={`w-7 h-7 rounded-full transition-transform cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2 ${
                            selected
                              ? 'ring-2 ring-[#FF6B00] ring-offset-2 scale-105'
                              : 'ring-1 ring-black/15 hover:scale-110'
                          }`}
                          style={{ backgroundColor: color.hex }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <p className="mt-5 text-sm text-[#111816]/75 leading-relaxed">
                  {product.description}
                </p>

                {/* Weight / Dimensions / Fit Grid */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-lg bg-white border border-[#111816]/10">
                    <div className="flex items-center gap-1.5 text-xs text-[#111816]/55">
                      <Scale className="w-3.5 h-3.5 text-[#9E5331]" aria-hidden="true" />
                      <span>Weight</span>
                    </div>
                    <p className="mt-1 text-sm font-bold text-[#111816] tabular-nums">
                      {product.weight}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-white border border-[#111816]/10">
                    <div className="flex items-center gap-1.5 text-xs text-[#111816]/55">
                      <Ruler className="w-3.5 h-3.5 text-[#9E5331]" aria-hidden="true" />
                      <span>Dimensions</span>
                    </div>
                    <p className="mt-1 text-sm font-bold text-[#111816] tabular-nums">
                      {product.dimensions}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-white border border-[#111816]/10">
                    <div className="flex items-center gap-1.5 text-xs text-[#111816]/55">
                      <ShieldCheck
                        className="w-3.5 h-3.5 text-[#9E5331]"
                        aria-hidden="true"
                      />
                      <span>Fit Profile</span>
                    </div>
                    <p className="mt-1 text-xs font-semibold text-[#111816] leading-snug">
                      {product.fit}
                    </p>
                  </div>
                </div>

                {/* Materials Breakdown */}
                <div className="mt-6 pt-6 border-t border-[#111816]/10">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[#111816]/60 mb-3">
                    Materials & Construction
                  </h4>
                  <ul className="space-y-2">
                    {product.materials.map((material) => (
                      <li
                        key={material}
                        className="flex items-start gap-2.5 text-sm text-[#111816]/85"
                      >
                        <Check
                          className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{material}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Performance Scores */}
                <div className="mt-6 pt-6 border-t border-[#111816]/10 pb-6">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[#111816]/60 mb-4">
                    Lab Performance Benchmarks
                  </h4>
                  <div className="space-y-3.5">
                    {[
                      { label: 'Ergonomics', value: product.performance.ergonomics },
                      { label: 'Durability', value: product.performance.durability },
                      { label: 'Slim Profile', value: product.performance.slimness },
                      {
                        label: 'Weather Shield',
                        value: product.performance.weatherShield,
                      },
                    ].map((metric) => (
                      <div key={metric.label}>
                        <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                          <span className="text-[#111816]/80">{metric.label}</span>
                          <span className="font-mono tabular-nums font-semibold text-[#111816]">
                            {metric.value}/100
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-[#111816]/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${metric.value}%` }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            className="h-full bg-[#FF6B00] rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Bottom Purchase Bar */}
            <div className="sticky bottom-0 bg-white border-t border-[#111816]/10 px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#111816]/55">{activeColorway.name}</p>
                <p className="text-xl font-bold text-[#111816] tabular-nums">
                  ${product.price}
                </p>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-md transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] ${
                  justAdded
                    ? 'bg-[#283734] text-white'
                    : 'bg-[#FF6B00] text-white hover:bg-[#e56000] hover:shadow-[0_6px_24px_rgba(255,107,0,0.35)]'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" aria-hidden="true" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
