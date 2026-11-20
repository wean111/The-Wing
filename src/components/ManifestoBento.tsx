import React, { useState } from 'react';
import { ArrowUpRight, Layers, Compass, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { WING_ASSETS } from '../data/wingData';

interface ManifestoBentoProps {
  onExploreProducts: () => void;
}

const LAB_LAYERS = [
  {
    id: 'hide',
    label: '01. CNC-Skived Hide',
    spec: '1.2 mm Full-Grain',
    detail:
      'Computer-calibrated split skiving trims bulk around fold creases while retaining full-grain surface tensile strength.',
  },
  {
    id: 'rfid',
    label: '02. Shielded Core',
    spec: '13.56 MHz Block',
    detail:
      'Ultralight copper-nickel micro-weave laminated inside the spine protects contactless cards without adding metallic rigidity.',
  },
  {
    id: 'stitch',
    label: '03. Vinymo Tensile',
    spec: '0.8 mm Waxed',
    detail:
      'High-tenacity Japanese bonded polyester thread heat-locked at stress anchors to resist fray across years of pocket friction.',
  },
];

export const ManifestoBento: React.FC<ManifestoBentoProps> = ({
  onExploreProducts,
}) => {
  const [activeLayerId, setActiveLayerId] = useState<string>(LAB_LAYERS[0].id);
  const activeLayer =
    LAB_LAYERS.find((layer) => layer.id === activeLayerId) ?? LAB_LAYERS[0];

  return (
    <section
      id="manifesto"
      className="bg-[#283734] text-[#F9FAF9] py-20 lg:py-28 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Apple-Style Storytelling Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pb-16 border-b border-white/12">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#FF6B00] mb-4">
              Brand Manifesto
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] leading-[1.06] text-[#F9FAF9]">
              Bridging ergonomic science and street culture.
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-4 text-base text-[#F9FAF9]/80 leading-relaxed">
            <p>
              The Wing Labs began with a simple friction point: traditional everyday carry
              was built for briefcases, not bodies in motion. Heavy seams, stiff
              linings, and boxy folds slowed down how we move through cities.
            </p>
            <p className="text-[#F9FAF9]/65">
              We treat a wallet and a technical layer like athletic hardware—stripping away
              excess grams while honoring tactile, earth-bound materials that age alongside
              you.
            </p>
          </div>
        </div>

        {/* 3 Key Pillars in Asymmetric Apple Bento-Grid */}
        <div id="innovations" className="pt-16">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#F9FAF9]/60 mb-2">
                Three Core Pillars
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F9FAF9]">
                Engineered inside The Wing Labs
              </h3>
            </div>

            <button
              type="button"
              onClick={onExploreProducts}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF6B00] hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] rounded-sm"
            >
              <span>Inspect the Series 01 Drop</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Pillar 1: Lab Engineered (Wide 7-col Card with Interactive Layer Anatomy) */}
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 rounded-xl bg-[#111816] border border-white/10 overflow-hidden flex flex-col justify-between"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 flex-1">
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <span className="text-xs font-mono uppercase tracking-widest text-[#FF6B00]">
                        Pillar 01 · Material Science
                      </span>
                      <Layers className="w-4 h-4 text-[#F9FAF9]/50" aria-hidden="true" />
                    </div>

                    <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F9FAF9]">
                      Lab Engineered
                    </h4>
                    <p className="mt-3 text-sm sm:text-base text-[#F9FAF9]/75 leading-relaxed">
                      Every millimeter is modeled under tension. Select a structural layer
                      below to inspect how we achieve a 6.8mm loaded carry profile.
                    </p>
                  </div>

                  {/* Interactive Material Anatomy Selector */}
                  <div className="mt-8">
                    <div
                      className="flex flex-wrap gap-2 mb-4"
                      role="tablist"
                      aria-label="Material Engineering Layers"
                    >
                      {LAB_LAYERS.map((layer) => {
                        const isActive = layer.id === activeLayer.id;
                        return (
                          <button
                            key={layer.id}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => setActiveLayerId(layer.id)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] ${
                              isActive
                                ? 'bg-[#FF6B00] text-white'
                                : 'bg-white/6 text-[#F9FAF9]/70 hover:text-white hover:bg-white/12'
                            }`}
                          >
                            {layer.label}
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <div className="flex items-baseline justify-between gap-4 mb-1.5">
                        <span className="text-sm font-semibold text-[#F9FAF9]">
                          {activeLayer.label}
                        </span>
                        <span className="text-xs font-mono tabular-nums text-[#FF6B00]">
                          {activeLayer.spec}
                        </span>
                      </div>
                      <p className="text-sm text-[#F9FAF9]/65 leading-relaxed">
                        {activeLayer.detail}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 relative min-h-[260px] md:min-h-full bg-[#1a2220]">
                  <img
                    src={WING_ASSETS.macroObsidianGrip}
                    alt="Close-up of Obsidian Black Wing wallet showing CNC-skived edge and debossed wing mark"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#111816]/70 via-transparent to-transparent md:bg-gradient-to-r md:from-[#111816]/60 md:via-transparent"
                  />
                </div>
              </div>
            </motion.article>

            {/* Pillar 2: Earth Bound (#9E5331 Warm Terracotta Craft Card) */}
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 rounded-xl bg-[#9E5331] text-[#F9FAF9] border border-white/15 overflow-hidden flex flex-col justify-between"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#F9FAF9]/85">
                    Pillar 02 · Craft & Patina
                  </span>
                  <Compass className="w-4 h-4 text-[#F9FAF9]/80" aria-hidden="true" />
                </div>

                <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Earth Bound
                </h4>
                <p className="mt-3 text-sm sm:text-base text-white/90 leading-relaxed">
                  Rooted in sustainable vegetable-tanned hides and natural beeswax edge
                  finishes. No synthetic plastic coatings—just raw organic grain that
                  records your journey with a richer terracotta patina every month.
                </p>
              </div>

              <div className="relative h-60 sm:h-64 overflow-hidden">
                <img
                  src={WING_ASSETS.terracottaTwoHands}
                  alt="Hands holding Warm Terracotta Wing leather wallet displaying natural grain and saddle stitching"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#9E5331]/85 via-transparent to-transparent"
                />
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-white/90 font-medium">
                  <span>100% Vegetable-Tanned Tuscan Shoulder</span>
                  <span className="font-mono tabular-nums">Chrome-Free</span>
                </div>
              </div>
            </motion.article>

            {/* Pillar 3: Limitless Flight (Full-Width Horizontal Community Showcase) */}
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-12 rounded-xl bg-[#111816] border border-white/10 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <span className="text-xs font-mono uppercase tracking-widest text-[#FF6B00]">
                        Pillar 03 · Community In Motion
                      </span>
                      <Users className="w-4 h-4 text-[#F9FAF9]/50" aria-hidden="true" />
                    </div>

                    <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F9FAF9]">
                      Limitless Flight
                    </h4>
                    <p className="mt-3 text-sm sm:text-base text-[#F9FAF9]/75 leading-relaxed">
                      Built for the founders, designers, street photographers, and
                      everyday runners of @thewing_labs. When your pocket carry weighs
                      less than a house key, nothing holds your stride back.
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xl font-bold text-[#F9FAF9] tabular-nums">
                        14 hrs
                      </p>
                      <p className="text-xs text-[#F9FAF9]/55 mt-0.5">
                        Daily Comfort Test
                      </p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-[#F9FAF9] tabular-nums">
                        50+
                      </p>
                      <p className="text-xs text-[#F9FAF9]/55 mt-0.5">
                        Prototype Iterations
                      </p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-[#FF6B00] tabular-nums">
                        Zero
                      </p>
                      <p className="text-xs text-[#F9FAF9]/55 mt-0.5">
                        Pocket Sagging
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3-Frame Editorial Triptych */}
                <div className="lg:col-span-7 grid grid-cols-3 gap-2 p-2 bg-[#161e1c]">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                    <img
                      src={WING_ASSETS.whiteKnitPortrait}
                      alt="Creator wearing white knit shirt carrying Wing wallet"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                    <img
                      src={WING_ASSETS.pocketSlideWide}
                      alt="Obsidian Wing wallet sliding effortlessly into black denim pocket"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                    <img
                      src={WING_ASSETS.gardenBenchPortrait}
                      alt="Community member on botanical terrace with Wing Zip Shell and wallet"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
};
