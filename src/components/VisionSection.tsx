import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { trackEvent } from '../utils/analytics';

const MISSION_PHOTO =
  '/assets/aistudio/1795061370482_136075884671014566_1457331307374664060_4f1a4988d2a6a5f1efc37a156732b7f4_868edef3.jpg';

export const VisionSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      id="manifesto"
      aria-labelledby="wing-mission-heading"
      className="bg-[#283734] text-[#F9FAF9]"
    >
      {/* Band 1: Full-Width Quiet Editorial Statement */}
      <div className="border-b border-white/12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-20 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(0.875rem,3.1vw,2.45rem)] font-light tracking-[-0.015em] leading-[1.4] text-[#F9FAF9]"
          >
            <span className="block whitespace-nowrap">
              Tụi mình tạo ra những công cụ sử dụng hằng ngày,
            </span>
            <span className="block whitespace-nowrap">
              giúp bạn sống thoải mái hơn.
            </span>
          </motion.h2>
        </div>
      </div>

      {/* Band 2: Collapsible Mission & Full-Bleed Horizontal Editorial Showcase */}
      <div className="w-full py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex justify-center">
          <button
            type="button"
            onClick={() => {
              if (!isExpanded) {
                trackEvent('mission_expand', { section: 'wing_mission' });
              }
              setIsExpanded((prev) => !prev);
            }}
            aria-expanded={isExpanded}
            aria-controls="wing-mission-collapsible"
            className="group inline-flex items-center gap-2.5 px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-[#F9FAF9] border border-white/25 rounded-md bg-transparent hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
          >
            <span>{isExpanded ? 'Thu gọn' : 'Xem thêm'}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                isExpanded ? 'rotate-180 text-[#FF6B00]' : 'group-hover:translate-y-0.5'
              }`}
              aria-hidden="true"
            />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              id="wing-mission-collapsible"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-12 sm:pt-16 pb-16 sm:pb-24">
                {/* Full-Bleed Edge-to-Edge Horizontal Photograph */}
                <div className="w-full overflow-hidden bg-[#1e2a27] aspect-[16/10] sm:aspect-[16/9] lg:aspect-[2.05/1]">
                  <img
                    src={MISSION_PHOTO}
                    alt="Đôi tay cầm ví da nâu thủ công The Wing dưới ánh nắng tự nhiên"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-[50%_52%]"
                  />
                </div>

                {/* Nike About Us Style Single-Column Right-Offset Editorial Copy */}
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                  <div className="mt-16 sm:mt-24 lg:mt-28 md:ml-[35%] lg:ml-[36%] max-w-xl space-y-5 sm:space-y-6 text-[#F9FAF9]">
                    <div>
                      <h3
                        id="wing-mission-heading"
                        className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#F9FAF9]"
                      >
                        THE WING MISSION
                      </h3>
                      <div
                        aria-hidden="true"
                        className="mt-2.5 w-16 h-[2px] bg-[#F9FAF9]"
                      />
                    </div>

                    <p className="text-xs sm:text-sm font-normal leading-relaxed text-[#F9FAF9]">
                      We believe that what you carry shapes how you move through
                      the world.
                    </p>

                    <p className="text-xs sm:text-sm font-normal leading-relaxed text-[#F9FAF9]">
                      The Wing exists for people move with intention, who have
                      decided what matters and removed the other. Every things we
                      create is to help you feel comfortable and stay active.
                    </p>

                    <p className="text-xs sm:text-sm font-normal leading-relaxed text-[#F9FAF9]">
                      We design, question, strip back and rebuild - because what
                      you reach for every morning should be worth reaching for.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
