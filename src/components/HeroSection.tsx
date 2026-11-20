import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { motion } from 'motion/react';

type RGB = [number, number, number];

function lerpColor(a: RGB, b: RGB, t: number): RGB {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

function rgbCss(c: RGB, alpha = 1): string {
  return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`;
}

// Bright, Apple-inspired Day-to-Night keyframes aligned with #F9FAF9, #283734, #9E5331, #FF6B00
const SKY_STAGES: Array<{
  top: RGB;
  mid: RGB;
  horizon: RGB;
  glow: RGB;
  glowAlpha: number;
  starAlpha: number;
  isDarkSky: number; // 0 = bright Apple canvas (dark ink), 1 = evening spruce (light ink)
}> = [
  // 0: Dawn — Crisp morning alabaster & warm apricot-terracotta horizon
  {
    top: [244, 247, 246],
    mid: [228, 236, 233],
    horizon: [238, 206, 184],
    glow: [255, 107, 0],
    glowAlpha: 0.22,
    starAlpha: 0,
    isDarkSky: 0,
  },
  // 1: Midday — Pure Apple Innovator luminous studio white & soft spruce mist
  {
    top: [249, 250, 249],
    mid: [238, 243, 241],
    horizon: [212, 224, 220],
    glow: [255, 255, 255],
    glowAlpha: 0.85,
    starAlpha: 0,
    isDarkSky: 0,
  },
  // 2: Golden Hour — Luminous warm ivory into sunlit terracotta glow & #FF6B00 solar bloom
  {
    top: [247, 241, 236],
    mid: [236, 200, 176],
    horizon: [214, 152, 114],
    glow: [255, 107, 0],
    glowAlpha: 0.34,
    starAlpha: 0,
    isDarkSky: 0,
  },
  // 3: Evening — Refined Deep Spruce (#283734) twilight with luminous horizon ember
  {
    top: [28, 40, 37],
    mid: [40, 55, 52],
    horizon: [82, 74, 68],
    glow: [255, 107, 0],
    glowAlpha: 0.18,
    starAlpha: 0.38,
    isDarkSky: 1,
  },
];

// Deterministic subtle stars for the Evening phase
const NIGHT_STARS = Array.from({ length: 36 }, (_, i) => ({
  x: ((i * 193 + 37) % 1000) / 1000,
  y: ((i * 317 + 19) % 520) / 1000,
  r: 0.8 + (i % 3) * 0.45,
  phase: i * 0.7,
}));

interface WingDayToNightBackdropProps {
  isPaused: boolean;
  onDarkSkyChange: (isDark: boolean) => void;
}

/**
 * Full-bleed bright Apple-inspired Day-to-Night animated canvas.
 */
const WingDayToNightBackdrop: React.FC<WingDayToNightBackdropProps> = ({
  isPaused,
  onDarkSkyChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pausedRef = useRef(isPaused);
  const isDarkRef = useRef(false);
  const cycleOffsetRef = useRef(0.22); // Start in bright Apple Daylight
  const lastFrameRef = useRef<number | null>(null);

  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1440;
    const height = 820;
    canvas.width = width;
    canvas.height = height;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let rafId = 0;

    const renderFrame = (now: number) => {
      if (lastFrameRef.current === null) {
        lastFrameRef.current = now;
      }
      const dt = Math.min(0.1, (now - lastFrameRef.current) / 1000);
      lastFrameRef.current = now;

      if (!pausedRef.current && !prefersReducedMotion) {
        // Complete full day-to-night cycle every 16 seconds
        cycleOffsetRef.current = (cycleOffsetRef.current + dt / 16) % 1;
      }

      const cycle = cycleOffsetRef.current;
      const stageFloat = cycle * SKY_STAGES.length;
      const stageIdx = Math.floor(stageFloat) % SKY_STAGES.length;
      const nextIdx = (stageIdx + 1) % SKY_STAGES.length;
      const localT = stageFloat - Math.floor(stageFloat);
      const smoothT = localT * localT * (3 - 2 * localT);

      const cur = SKY_STAGES[stageIdx];
      const nxt = SKY_STAGES[nextIdx];

      const topColor = lerpColor(cur.top, nxt.top, smoothT);
      const midColor = lerpColor(cur.mid, nxt.mid, smoothT);
      const horizonColor = lerpColor(cur.horizon, nxt.horizon, smoothT);
      const glowColor = lerpColor(cur.glow, nxt.glow, smoothT);
      const glowAlpha = cur.glowAlpha + (nxt.glowAlpha - cur.glowAlpha) * smoothT;
      const starAlpha = cur.starAlpha + (nxt.starAlpha - cur.starAlpha) * smoothT;
      const darkFactor = cur.isDarkSky + (nxt.isDarkSky - cur.isDarkSky) * smoothT;

      // Update foreground ink state cleanly when crossing luminance midpoint
      const shouldBeDark = darkFactor > 0.45;
      if (shouldBeDark !== isDarkRef.current) {
        isDarkRef.current = shouldBeDark;
        onDarkSkyChange(shouldBeDark);
      }

      // 1. Full-bleed luminous sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, rgbCss(topColor));
      skyGrad.addColorStop(0.58, rgbCss(midColor));
      skyGrad.addColorStop(1, rgbCss(horizonColor));
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Soft volumetric sun / moon radiance arcing gently across sky
      const arcAngle = cycle * Math.PI * 2;
      const orbX = width * (0.5 - 0.34 * Math.cos(arcAngle));
      const orbY = height * (0.52 - 0.32 * Math.sin(arcAngle));

      const orbGrad = ctx.createRadialGradient(orbX, orbY, 16, orbX, orbY, 520);
      orbGrad.addColorStop(0, rgbCss(glowColor, glowAlpha));
      orbGrad.addColorStop(0.45, rgbCss(glowColor, glowAlpha * 0.32));
      orbGrad.addColorStop(1, rgbCss(glowColor, 0));
      ctx.fillStyle = orbGrad;
      ctx.fillRect(0, 0, width, height);

      // 3. Soft Apple-style studio light halo behind the centered Wing mark
      const centerHalo = ctx.createRadialGradient(
        width * 0.5,
        height * 0.48,
        10,
        width * 0.5,
        height * 0.48,
        340
      );
      centerHalo.addColorStop(
        0,
        darkFactor > 0.45
          ? 'rgba(255, 255, 255, 0.14)'
          : 'rgba(255, 255, 255, 0.72)'
      );
      centerHalo.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = centerHalo;
      ctx.fillRect(0, 0, width, height);

      // 4. Subtle starlight points during evening phase
      if (starAlpha > 0.02) {
        for (const star of NIGHT_STARS) {
          const twinkle =
            0.55 + 0.45 * Math.sin(now * 0.002 + star.phase);
          ctx.fillStyle = `rgba(249, 250, 249, ${starAlpha * twinkle})`;
          ctx.beginPath();
          ctx.arc(star.x * width, star.y * height, star.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafId = window.requestAnimationFrame(renderFrame);
    };

    rafId = window.requestAnimationFrame(renderFrame);
    return () => window.cancelAnimationFrame(rafId);
  }, [onDarkSkyChange]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        aria-hidden="true"
      />

      {/* Top subtle scrim solely under fixed transparent navbar for nav legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#111816]/25 to-transparent"
      />
    </div>
  );
};

export const HeroSection: React.FC = () => {
  const [isLoopPaused, setIsLoopPaused] = useState(false);
  const [isDarkSky, setIsDarkSky] = useState(false);

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#111816] text-[#F9FAF9]"
    >
      {/* Top ambient safety scrim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      />

      <div className="relative w-full">
        {/* Full-Bleed Bright Apple-Inspired Day-to-Night Hero Stage */}
        <div className="relative w-full min-h-[84vh] sm:min-h-[88vh] pt-24 pb-12 sm:pb-16 flex flex-col justify-between items-center overflow-hidden">
          {/* Selected Full-Bleed Background Container */}
          <WingDayToNightBackdrop
            isPaused={isLoopPaused}
            onDarkSkyChange={setIsDarkSky}
          />

          {/* Top Greeting with phase-adaptive high contrast */}
          <p
            className={`relative z-10 text-center text-base sm:text-xl font-medium tracking-tight transition-colors duration-700 px-5 ${
              isDarkSky ? 'text-[#F9FAF9]' : 'text-[#111816]'
            }`}
          >
            The Wing xin chào!
          </p>

          {/* Centered Wing Logo positioned evenly between top greeting and bottom text */}
          <div className="relative z-10 flex-1 w-full flex items-center justify-center py-6 pointer-events-none select-none">
            <motion.svg
              viewBox="0 0 120 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`w-32 sm:w-44 h-auto transition-colors duration-700 ${
                isDarkSky ? 'text-[#F9FAF9]' : 'text-[#111816]'
              }`}
              aria-hidden="true"
              animate={
                isLoopPaused
                  ? { scale: 1, opacity: 0.98 }
                  : {
                      scale: [0.97, 1.03, 0.97],
                      opacity: [0.92, 1, 0.92],
                    }
              }
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <motion.path
                d="M12 58L44 26L61 43L94 11L108 25"
                stroke="currentColor"
                strokeWidth="7.5"
                strokeLinecap="square"
                strokeLinejoin="miter"
                initial={{ pathLength: 0, opacity: 0.6 }}
                animate={
                  isLoopPaused
                    ? { pathLength: 1, opacity: 1 }
                    : {
                        pathLength: [0, 1, 1, 1],
                        opacity: [0.6, 1, 1, 0.88],
                      }
                }
                transition={{
                  duration: 5.5,
                  times: [0, 0.35, 0.85, 1],
                  repeat: Infinity,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </motion.svg>
          </div>

          {/* Lower-Center Editorial Statement — Text Only */}
          <div
            className={`relative z-10 w-full max-w-xl mx-auto px-5 text-center transition-colors duration-700 ${
              isDarkSky ? 'text-[#F9FAF9]' : 'text-[#111816]'
            }`}
          >
            <p className="text-xs sm:text-sm font-normal tracking-normal opacity-80 mb-1.5">
              Nhắc bạn nhớ hôm nay,
            </p>

            <h1 className="text-2xl sm:text-4xl md:text-[2.65rem] font-extrabold uppercase tracking-[-0.03em] leading-[1.02]">
              CARRY LIGHT
              <br />
              LIVE FULL
            </h1>
          </div>

          {/* Subtle Bottom-Right Loop Control */}
          <button
            type="button"
            onClick={() => setIsLoopPaused((prev) => !prev)}
            aria-label={
              isLoopPaused
                ? 'Resume day-to-night cycle'
                : 'Pause day-to-night cycle'
            }
            className="absolute bottom-5 right-5 sm:bottom-7 sm:right-8 z-20 w-10 h-10 rounded-full bg-[#111816]/65 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#F9FAF9] hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
          >
            {isLoopPaused ? (
              <Play className="w-4 h-4 fill-current" aria-hidden="true" />
            ) : (
              <Pause className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
