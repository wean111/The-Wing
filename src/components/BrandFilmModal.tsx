import React, { useEffect, useState } from 'react';
import { X, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BRAND_FILM_CHAPTERS } from '../data/wingData';

interface BrandFilmModalProps {
  open: boolean;
  onClose: () => void;
  onExploreProducts: () => void;
}

export const BrandFilmModal: React.FC<BrandFilmModalProps> = ({
  open,
  onClose,
  onExploreProducts,
}) => {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!open || !isPlaying) return;
    const timer = window.setInterval(() => {
      setChapterIndex((prev) => (prev + 1) % BRAND_FILM_CHAPTERS.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [open, isPlaying]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  const chapter = BRAND_FILM_CHAPTERS[chapterIndex];

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="brand-film-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#111816]/85 backdrop-blur-md cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl bg-[#111816] text-[#F9FAF9] rounded-xl border border-white/15 overflow-hidden shadow-2xl"
          >
            {/* Header Bar */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#FF6B00]">
                  The Wing Labs · Brand Story Reel
                </span>
                <span className="text-xs text-[#F9FAF9]/50 font-mono tabular-nums">
                  {chapter.index} / 0{BRAND_FILM_CHAPTERS.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying((p) => !p)}
                  aria-label={isPlaying ? 'Pause story reel' : 'Play story reel'}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/8 hover:bg-white/14 rounded-md text-[#F9FAF9] cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Play</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close brand film"
                  className="w-9 h-9 rounded-md border border-white/15 flex items-center justify-center text-[#F9FAF9] hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Reel Stage */}
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-7 relative aspect-[4/3] md:aspect-auto md:min-h-[400px] bg-[#283734] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={chapter.id}
                    src={chapter.image}
                    alt={chapter.title}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0.3, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.3 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#111816]/80 via-transparent to-transparent"
                />
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-widest text-[#F9FAF9]/65">
                      {chapter.telemetryLabel}
                    </p>
                    <p className="text-sm font-bold text-[#FF6B00] tabular-nums">
                      {chapter.telemetryValue}
                    </p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-[#F9FAF9]/55">
                    {chapter.subtitle}
                  </p>
                  <h3
                    id="brand-film-title"
                    className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F9FAF9]"
                  >
                    {chapter.title}
                  </h3>
                  <p className="mt-4 text-sm sm:text-base text-[#F9FAF9]/75 leading-relaxed">
                    {chapter.narrative}
                  </p>
                </div>

                {/* Chapter Timeline & Controls */}
                <div className="mt-8 pt-6 border-t border-white/10 space-y-5">
                  <div className="grid grid-cols-4 gap-2">
                    {BRAND_FILM_CHAPTERS.map((item, idx) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setChapterIndex(idx);
                          setIsPlaying(false);
                        }}
                        aria-label={`Jump to chapter ${item.index}: ${item.title}`}
                        className="text-left group cursor-pointer"
                      >
                        <div
                          className={`h-1 rounded-full transition-colors ${
                            idx === chapterIndex
                              ? 'bg-[#FF6B00]'
                              : 'bg-white/15 group-hover:bg-white/35'
                          }`}
                        />
                        <span className="mt-1.5 block text-[11px] font-mono tabular-nums text-[#F9FAF9]/60">
                          {item.index}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setChapterIndex(
                            (prev) =>
                              (prev - 1 + BRAND_FILM_CHAPTERS.length) %
                              BRAND_FILM_CHAPTERS.length
                          )
                        }
                        aria-label="Previous chapter"
                        className="w-9 h-9 rounded-md border border-white/15 flex items-center justify-center hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setChapterIndex(
                            (prev) => (prev + 1) % BRAND_FILM_CHAPTERS.length
                          )
                        }
                        aria-label="Next chapter"
                        className="w-9 h-9 rounded-md border border-white/15 flex items-center justify-center hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onExploreProducts();
                      }}
                      className="px-4 py-2 text-xs font-semibold uppercase tracking-wide bg-[#FF6B00] text-white rounded-md hover:bg-[#e56000] transition-colors cursor-pointer"
                    >
                      Explore Series 01
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
