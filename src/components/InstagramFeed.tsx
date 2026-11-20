import React, { useState, useEffect } from 'react';
import { Instagram, ArrowUpRight, Heart, X, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INSTAGRAM_FEED, InstagramPost, WING_PRODUCTS, WingProduct } from '../data/wingData';

interface InstagramFeedProps {
  onInspectProduct: (product: WingProduct, colorwayId: string) => void;
}

export const InstagramFeed: React.FC<InstagramFeedProps> = ({
  onInspectProduct,
}) => {
  const [activePost, setActivePost] = useState<InstagramPost | null>(null);

  useEffect(() => {
    if (!activePost) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePost(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activePost]);

  const featuredProduct = activePost
    ? WING_PRODUCTS.find((p) => p.id === activePost.featuredProductId) ?? null
    : null;

  return (
    <section
      id="the-lab"
      className="bg-[#283734] text-[#F9FAF9] py-20 lg:py-28 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/12">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#FF6B00] mb-3">
              The Lab Community · @thewing_labs
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-[-0.03em] text-[#F9FAF9]">
              Field Dispatches In Motion
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#F9FAF9]/75 max-w-xl leading-relaxed">
              Follow our ongoing lab notes, material stress tests, and daily carry
              profiles straight from the @thewing_labs Instagram feed.
            </p>
          </div>

          <a
            href="https://www.instagram.com/thewing_labs/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#FF6B00] rounded-md hover:bg-[#e56000] hover:shadow-[0_8px_28px_rgba(255,107,0,0.38)] transition-all duration-200 whitespace-nowrap shrink-0 self-start md:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
          >
            <Instagram className="w-4 h-4" aria-hidden="true" />
            <span>Follow @thewing_labs on Instagram</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        {/* 6-Tile Editorial Community Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INSTAGRAM_FEED.map((post) => (
            <motion.button
              key={post.id}
              type="button"
              onClick={() => setActivePost(post)}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="group relative text-left rounded-xl overflow-hidden bg-[#111816] border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#111816]/90 via-[#111816]/25 to-transparent"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-[#F9FAF9]/65 mb-2">
                  <span className="text-[#FF6B00] truncate">{post.missionTag}</span>
                  <span className="inline-flex items-center gap-1 tabular-nums shrink-0">
                    <Heart className="w-3 h-3" aria-hidden="true" />
                    {post.likes}
                  </span>
                </div>
                <p className="text-sm text-[#F9FAF9]/90 leading-snug line-clamp-2">
                  {post.caption}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-[#F9FAF9]/55">
                  <span>{post.location}</span>
                  <span className="group-hover:text-[#FF6B00] transition-colors font-medium">
                    Read Dispatch →
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Community Post Lightbox Modal */}
      <AnimatePresence>
        {activePost && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ig-modal-title"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePost(null)}
              className="fixed inset-0 bg-[#111816]/85 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-3xl bg-[#111816] text-[#F9FAF9] rounded-xl border border-white/15 overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12"
            >
              <div className="md:col-span-6 relative aspect-[4/5] bg-[#1b2421]">
                <img
                  src={activePost.image}
                  alt={activePost.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
                    <div>
                      <p
                        id="ig-modal-title"
                        className="text-sm font-bold text-[#F9FAF9]"
                      >
                        {activePost.handle}
                      </p>
                      <p className="text-xs text-[#F9FAF9]/55">
                        {activePost.location} · {activePost.date}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActivePost(null)}
                      aria-label="Close Instagram dispatch"
                      className="w-9 h-9 rounded-md border border-white/15 flex items-center justify-center text-[#F9FAF9] hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="mt-5 text-xs font-mono uppercase tracking-widest text-[#FF6B00]">
                    {activePost.missionTag}
                  </p>
                  <p className="mt-3 text-sm sm:text-base text-[#F9FAF9]/85 leading-relaxed">
                    {activePost.caption}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-white/10 space-y-3">
                  {featuredProduct && (
                    <button
                      type="button"
                      onClick={() => {
                        setActivePost(null);
                        onInspectProduct(
                          featuredProduct,
                          featuredProduct.colorways[0].id
                        );
                      }}
                      className="w-full inline-flex items-center justify-between px-4 py-3 text-xs font-semibold bg-[#283734] hover:bg-[#FF6B00] text-white rounded-md transition-colors cursor-pointer"
                    >
                      <span className="inline-flex items-center gap-2">
                        <SlidersHorizontal className="w-4 h-4" />
                        Inspect {featuredProduct.name}
                      </span>
                      <span className="font-mono tabular-nums">
                        ${featuredProduct.price}
                      </span>
                    </button>
                  )}

                  <a
                    href="https://www.instagram.com/thewing_labs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#F9FAF9]/85 border border-white/15 rounded-md hover:border-white/40 transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Open on Instagram</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
