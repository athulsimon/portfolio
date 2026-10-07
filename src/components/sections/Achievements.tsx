'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ACHIEVEMENTS, AchievementItem } from '@/lib/data';
import { TechLogo } from '../ui/TechLogo';

export const Achievements: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [hasStartedCount, setHasStartedCount] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const container = containerRef.current;
          const track = trackRef.current;
          if (container && track) {
            const containerRect = container.getBoundingClientRect();
            const scrollDistance = -containerRect.top;
            const maxScroll = container.offsetHeight - window.innerHeight;

            if (maxScroll > 0) {
              const p = Math.min(1, Math.max(0, scrollDistance / maxScroll));
              setScrollProgress(p);

              if (p > 0.05 && !hasStartedCount) {
                setHasStartedCount(true);
              }

              // Compute nearest card to viewport horizontal center
              const cardCount = ACHIEVEMENTS.length;
              const activeIndex = Math.min(
                cardCount - 1,
                Math.max(0, Math.round(p * (cardCount - 0.5)))
              );
              setActiveCardIndex(activeIndex);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasStartedCount]);

  // Total horizontal travel distance in px (rough estimate: card width ~480 + 32 gap)
  const totalCards = ACHIEVEMENTS.length;
  const travelDistance = Math.max(800, (totalCards + 1) * 440);

  return (
    <div
      ref={containerRef}
      id="achievements"
      className="relative w-full"
      style={{
        height: `calc(100svh + ${travelDistance}px)`,
      }}
      aria-label="Quantified Achievements and Milestones"
    >
      {/* Sticky Viewport Container (100svh) */}
      <div className="sticky top-0 h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-[#f4f2ee] pt-20 pb-12">
        {/* Header with Title and Thin Progress Bar */}
        <div className="container-page w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
            <div>
              <div className="section-tag mb-2">
                <span>06</span>
                <span>—</span>
                <span>Quantified Milestones</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0d0d0d] leading-none">
                Impact &amp;
                <span className="heading-italic">milestones.</span>
              </h2>
            </div>

            {/* Travel indicator text */}
            <div className="font-mono text-xs text-[#77756f]">
              Scroll to explore ({Math.round(scrollProgress * 100)}%)
            </div>
          </div>

          {/* Thin Progress Bar in Header */}
          <div className="w-full h-[2px] bg-[#0d0d0d]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0d0d0d] origin-left transition-transform duration-75"
              style={{ transform: `scaleX(${scrollProgress})` }}
            />
          </div>
        </div>

        {/* Horizontal Card Track */}
        <div className="w-full overflow-hidden flex-1 flex items-center my-auto">
          <div
            ref={trackRef}
            className="flex items-center gap-8 pl-[clamp(18px,4vw,64px)] transition-transform duration-75 ease-out will-change-transform"
            style={{
              transform: `translateX(-${scrollProgress * travelDistance}px)`,
            }}
          >
            {ACHIEVEMENTS.map((card, index) => {
              const isCenter = activeCardIndex === index;

              return (
                <div
                  key={card.id}
                  className={`flex-shrink-0 bg-white rounded-[28px] border border-[rgba(13,13,13,0.08)] p-8 sm:p-9 flex flex-col justify-between transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isCenter
                      ? '-translate-y-3 shadow-[0_24px_54px_rgba(13,13,13,0.12)]'
                      : 'translate-y-0 shadow-[0_4px_16px_rgba(13,13,13,0.04)]'
                  }`}
                  style={{
                    width: 'clamp(340px, 40vw, 540px)',
                    height: 'clamp(260px, 36vh, 310px)',
                  }}
                >
                  {/* Top Row: 72px Logo Tile with Glow + Index */}
                  <div className="flex items-start justify-between">
                    <div className="relative">
                      {/* Brand-tint glow */}
                      <div
                        className={`absolute inset-0 rounded-2xl blur-lg transition-opacity duration-300 ${
                          isCenter ? 'opacity-40' : 'opacity-20'
                        }`}
                        style={{ backgroundColor: card.brandColor }}
                      />
                      {/* 72px Logo Tile */}
                      <div className="relative w-[72px] h-[72px] rounded-2xl bg-[#f4f2ee] border border-[rgba(13,13,13,0.08)] flex items-center justify-center p-3">
                        <TechLogo name={card.logo} size={42} glow={false} />
                      </div>
                    </div>

                    <span className="font-mono text-xs sm:text-sm font-semibold text-[#a9a6a0]">
                      {card.index}
                    </span>
                  </div>

                  {/* Bottom Row: Details (Left) + Huge Animated Count (Right) */}
                  <div className="flex items-end justify-between gap-4 pt-4 border-t border-[rgba(13,13,13,0.06)]">
                    <div className="max-w-[60%]">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0d0d0d] mb-1">
                        {card.label}
                      </h3>
                      <p className="font-mono text-xs text-[#77756f] uppercase tracking-wider mb-1">
                        {card.caption}
                      </p>
                      <p className="text-xs text-[#3a3a3a] leading-snug line-clamp-2">
                        {card.detail}
                      </p>
                    </div>

                    {/* Huge Count-Up Number */}
                    <div className="text-right">
                      <CountUpNumber
                        target={card.metric}
                        suffix={card.suffix}
                        trigger={hasStartedCount}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* End of Track: "and counting →" */}
            <div
              className="flex-shrink-0 flex items-center justify-center px-8 text-[#77756f] font-mono text-base tracking-wider uppercase select-none"
              style={{
                width: 'clamp(240px, 25vw, 320px)',
                height: 'clamp(260px, 36vh, 310px)',
              }}
            >
              <div className="flex items-center gap-3">
                <span className="font-serif italic text-2xl text-[#0d0d0d] lowercase">and counting</span>
                <span className="text-xl">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// easeOutQuart count-up component over 1.4s
function CountUpNumber({
  target,
  suffix,
  trigger,
}: {
  target: number;
  suffix: string;
  trigger: boolean;
}) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!trigger || startedRef.current) return;
    startedRef.current = true;

    const startTime = performance.now();
    const duration = 1400; // 1.4s

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // easeOutQuart: 1 - (1 - t)^4
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(ease * target));

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(update);
  }, [trigger, target]);

  return (
    <div className="font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#0d0d0d] leading-none">
      <span>{count}</span>
      <span className="font-normal text-3xl sm:text-4xl text-[#77756f]">{suffix}</span>
    </div>
  );
}
