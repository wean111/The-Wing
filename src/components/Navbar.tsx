import React from 'react';
import { WingMark } from './WingMark';

interface NavbarProps {
  onShopClick?: () => void;
}

const NAV_LINKS = [
  { label: 'Mission', href: '#manifesto' },
  { label: 'Products', href: '#products' },
];

export const Navbar: React.FC<NavbarProps> = () => {
  return (
    <header className="absolute top-0 inset-x-0 z-50 bg-[#111816]/50 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-6 sm:gap-8">
        {/* Zone 1: Brand Logo */}
        <a
          href="#top"
          className="inline-flex items-center text-[#F9FAF9] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] rounded-sm py-1"
          aria-label="The Wing Labs Home"
        >
          <WingMark className="w-8 h-5 text-[#F9FAF9]" strokeWidth={2.7} />
        </a>

        {/* Zone 2: Primary Navigation Links (always visible in bar) */}
        <nav
          aria-label="Primary Navigation"
          className="flex items-center gap-5 sm:gap-8"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 text-xs sm:text-sm font-medium text-[#F9FAF9]/80 hover:text-[#F9FAF9] transition-colors duration-150 whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] rounded-sm"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#FF6B00] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
              />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};
