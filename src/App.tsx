import { useCallback } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SWalletShowcase } from './components/SWalletShowcase';
import { VisionSection } from './components/VisionSection';
import { SWalletProductSection } from './components/SWalletProductSection';
import { Footer } from './components/Footer';

export default function App() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#111816] text-[#F9FAF9] flex flex-col">
        <Navbar onShopClick={scrollToTop} />

        <main className="flex-1">
          <HeroSection />
          <SWalletShowcase />
          <VisionSection />
          <SWalletProductSection />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}
