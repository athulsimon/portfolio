'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TIMELINE } from '@/lib/data';

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const spineTrackRef = useRef<HTMLDivElement>(null);
  const [spineProgress, setSpineProgress] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const section = sectionRef.current;
          const track = spineTrackRef.current;
          if (section && track) {
            const trackRect = track.getBoundingClientRect();
            const viewportTrigger = window.innerHeight * 0.65;
            const distance = viewportTrigger - trackRect.top;
            const total = trackRect.height;
            const p = Math.min(1, Math.max(0, distance / total));
            setSpineProgress(p);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-pad w-full relative"
      aria-label="Experience and Educational Timeline"
    >
      <div className="container-page">
        {/* Section Header */}
        <div className="section-tag">
          <span>05</span>
          <span>—</span>
          <span>Path & Progression</span>
        </div>
        <h2 className="section-heading">
          Unified
          <span className="heading-italic">trajectory.</span>
        </h2>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto pl-6 sm:pl-10 md:pl-16">
          {/* Vertical Spine Track */}
          <div
            ref={spineTrackRef}
            className="absolute left-0 top-3 bottom-8 w-[2px] bg-[#0d0d0d]/10 origin-top"
          >
            {/* Active Drawing Spine */}
            <div
              className="w-full bg-[#0d0d0d] origin-top transition-transform duration-75 ease-out"
              style={{
                height: '100%',
                transform: `scaleY(${spineProgress})`,
              }}
            />
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-12 sm:space-y-16">
            {TIMELINE.map((item, index) => {
              const nodeThreshold = (index + 0.3) / TIMELINE.length;
              const isReached = spineProgress >= nodeThreshold;
              const isNext = item.type === 'next';

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className="relative group"
                >
                  {/* Spine Node Dot */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[47px] md:-left-[71px] top-6 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                      isReached
                        ? 'border-[#0d0d0d] bg-[#0d0d0d] scale-110 shadow-[0_0_12px_rgba(13,13,13,0.3)]'
                        : 'border-[#0d0d0d]/30 bg-[#f4f2ee] scale-90'
                    }`}
                  >
                    {isReached && (
                      <span className="absolute inset-0 rounded-full animate-ping bg-[#0d0d0d]/40 opacity-75" />
                    )}
                  </div>

                  {/* Card Content */}
                  {isNext ? (
                    /* Dashed Card for Next Role */
                    <div
                      className={`p-8 sm:p-10 rounded-[28px] border-2 border-dashed transition-all duration-400 ${
                        isReached
                          ? 'border-[#0d0d0d] bg-white shadow-md'
                          : 'border-[#0d0d0d]/25 bg-white/40'
                      }`}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#77756f]">
                          {item.year}
                        </span>
                        <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#0d0d0d] text-white">
                          Available
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0d0d0d] mb-2">
                        {item.title}
                      </h3>
                      <p className="font-mono text-xs sm:text-sm text-[#77756f] mb-4">
                        {item.place} · {item.location}
                      </p>
                      <p className="text-sm sm:text-base text-[#3a3a3a] leading-relaxed">
                        {item.details[0]}
                      </p>
                    </div>
                  ) : (
                    /* Standard Card */
                    <div
                      className={`premium-card p-8 sm:p-10 transition-all duration-400 ${
                        isReached
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-70 translate-y-2'
                      }`}
                    >
                      {/* Year & Category Tag */}
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                        <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#a9a6a0]">
                          {item.year}
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#f4f2ee] text-[#3a3a3a] border border-[rgba(13,13,13,0.06)]">
                          {item.type === 'education' ? 'Academic Degree' : 'Engineering Role'}
                        </span>
                      </div>

                      {/* Role / Degree Title */}
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0d0d0d] mb-1">
                        {item.title}
                      </h3>

                      {/* Institution / Company */}
                      <div className="flex items-center gap-2 mb-6">
                        <span className="text-base font-medium text-[#3a3a3a]">
                          {item.place}
                        </span>
                        <span className="text-[#a9a6a0]">•</span>
                        <span className="font-mono text-xs text-[#77756f]">
                          {item.location}
                        </span>
                      </div>

                      {/* Details & Tasks */}
                      <div className="space-y-2 pt-4 border-t border-[rgba(13,13,13,0.08)]">
                        {item.details.map((task, i) => (
                          <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#3a3a3a] leading-relaxed">
                            <span className="font-mono text-[#0d0d0d] select-none">→</span>
                            <span>{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
