import React from 'react';
import { Instagram } from 'lucide-react';
import { WingMark } from './WingMark';
import { WING_ASSETS } from '../data/wingData';
import { trackEvent } from '../utils/analytics';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111816] text-[#F9FAF9] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          {/* Brand Lockup & Lab Summary */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-[#F9FAF9] p-1.5 flex items-center justify-center overflow-hidden">
                <img
                  src={WING_ASSETS.logoCover}
                  alt="The Wing official logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <WingMark className="w-5 h-3.5 text-[#FF6B00]" strokeWidth={2.8} />
                  <span className="text-base font-extrabold tracking-[0.14em] uppercase">
                    THE WING
                  </span>
                  <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#F9FAF9]/50">
                    LABS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation & Social */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#F9FAF9]/45 mb-4">
                Explore
              </h3>
              <ul className="space-y-2.5 text-[#F9FAF9]/75">
                <li>
                  <a href="#manifesto" className="hover:text-[#FF6B00] transition-colors">
                    Mission
                  </a>
                </li>
                <li>
                  <a href="#products" className="hover:text-[#FF6B00] transition-colors">
                    Products
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#F9FAF9]/45 mb-4">
                Channels
              </h3>
              <ul className="space-y-2.5 text-[#F9FAF9]/75">
                <li>
                  <a
                    href="https://www.instagram.com/thewing_labs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent('click_social', {
                        platform: 'instagram',
                        location: 'footer',
                      })
                    }
                    className="inline-flex items-center gap-1.5 hover:text-[#FF6B00] transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Instagram</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F9FAF9]/45">
          <p>© {new Date().getFullYear()} The Wing Labs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
