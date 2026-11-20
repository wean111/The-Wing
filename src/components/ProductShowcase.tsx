import React, { useState } from 'react';
import { SlidersHorizontal, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  WING_PRODUCTS,
  WingProduct,
  ProductCategory,
} from '../data/wingData';

export type FilterTab = 'All' | ProductCategory;

const FILTER_TABS: FilterTab[] = ['All', 'Apparel', 'Gear', 'Lab Concepts'];

interface ProductShowcaseProps {
  selectedColorways: Record<string, string>;
  onSelectColorway: (productId: string, colorwayId: string) => void;
  onInspectProduct: (product: WingProduct, colorwayId: string) => void;
  bagCount: number;
  onOpenBag: () => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  selectedColorways,
  onSelectColorway,
  onInspectProduct,
  bagCount,
  onOpenBag,
}) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('All');

  const filteredProducts =
    activeTab === 'All'
      ? WING_PRODUCTS
      : WING_PRODUCTS.filter((p) => p.category === activeTab);

  return (
    <section
      id="products"
      className="bg-[#F9FAF9] text-[#111816] py-20 lg:py-28 border-t border-black/5"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#111816]/10">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#9E5331] mb-3">
              Interactive Product Showcase
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-[-0.03em] text-[#111816]">
              Precision Series 01
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#111816]/70 max-w-md leading-relaxed">
            Toggle colorways to inspect hide finishes in natural light, or open Quick
            Specs for material breakdowns and performance benchmarks.
          </p>
        </div>

        {/* Filter Tabs + Bag Trigger Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Product Categories"
            className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-[#111816]/6 rounded-lg"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] ${
                    isActive
                      ? 'text-white'
                      : 'text-[#111816]/70 hover:text-[#111816]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeProductFilterTab"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 bg-[#111816] rounded-md"
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onOpenBag}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#111816] bg-white border border-[#111816]/15 rounded-md hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            <span>Bag</span>
            <span className="font-mono tabular-nums text-xs px-1.5 py-0.5 bg-[#111816] text-white rounded">
              {bagCount}
            </span>
          </button>
        </div>

        {/* 3-Column Product Grid */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const activeColorId =
                selectedColorways[product.id] ?? product.colorways[0].id;
              const activeColorway =
                product.colorways.find((c) => c.id === activeColorId) ??
                product.colorways[0];

              return (
                <motion.article
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="group bg-white rounded-xl border border-[#111816]/10 overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(17,24,22,0.08)]"
                >
                  {/* Product Visual Stage */}
                  <button
                    type="button"
                    onClick={() => onInspectProduct(product, activeColorway.id)}
                    className="relative aspect-[4/5] w-full overflow-hidden bg-[#ECEEED] text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF6B00]"
                    aria-label={`Inspect quick specs for ${product.name} in ${activeColorway.name}`}
                  >
                    <img
                      src={activeColorway.image}
                      alt={`${product.name} in ${activeColorway.name}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />

                    {/* Subtle Hover Action Hint */}
                    <div className="absolute inset-x-4 bottom-4 flex items-center justify-between opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#111816]/90 backdrop-blur-md text-white rounded-md">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF6B00]" />
                        Quick Specs
                      </span>
                      <span className="w-8 h-8 rounded-md bg-white/90 backdrop-blur-md text-[#111816] flex items-center justify-center">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </button>

                  {/* Card Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Clean Unboxed Metadata */}
                      <div className="flex items-center justify-between gap-2 text-xs text-[#111816]/55 font-medium">
                        <span>{product.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{product.editionNote}</span>
                      </div>

                      <div className="mt-2 flex items-baseline justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => onInspectProduct(product, activeColorway.id)}
                          className="text-left text-lg font-bold tracking-tight text-[#111816] hover:text-[#FF6B00] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] rounded-sm"
                        >
                          {product.name}
                        </button>
                        <span className="text-base font-bold text-[#111816] tabular-nums shrink-0">
                          ${product.price}
                        </span>
                      </div>

                      <p className="mt-1.5 text-sm text-[#111816]/65 line-clamp-2">
                        {product.subtitle} — {product.weight}
                      </p>
                    </div>

                    {/* Interactive Colorway Selector & Quick Specs Trigger */}
                    <div className="mt-6 pt-4 border-t border-[#111816]/8 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="flex items-center gap-2"
                          role="radiogroup"
                          aria-label={`${product.name} colorways`}
                        >
                          {product.colorways.map((color) => {
                            const selected = color.id === activeColorway.id;
                            return (
                              <button
                                key={color.id}
                                type="button"
                                role="radio"
                                aria-checked={selected}
                                aria-label={`Select ${color.name} colorway`}
                                title={color.name}
                                onClick={() => onSelectColorway(product.id, color.id)}
                                className={`w-6 h-6 rounded-full transition-transform cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2 ${
                                  selected
                                    ? 'ring-2 ring-[#FF6B00] ring-offset-2 scale-105'
                                    : 'ring-1 ring-black/15 hover:scale-110'
                                }`}
                                style={{ backgroundColor: color.hex }}
                              />
                            );
                          })}
                        </div>
                        <span className="text-xs font-medium text-[#111816]/65 truncate max-w-[110px]">
                          {activeColorway.name}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onInspectProduct(product, activeColorway.id)}
                        className="text-xs font-semibold text-[#111816] hover:text-[#FF6B00] underline underline-offset-4 decoration-[#111816]/25 hover:decoration-[#FF6B00] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] rounded-sm"
                      >
                        Quick Specs
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
