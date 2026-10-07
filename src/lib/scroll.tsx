'use client';

import React, { useEffect, createContext, useContext, useRef } from 'react';
import Lenis from 'lenis';
import { usePrefersReducedMotion } from './hooks';

interface ScrollContextValue {
  scrollToTarget: (target: string, offset?: number) => void;
  lenis: Lenis | null;
}

const ScrollContext = createContext<ScrollContextValue>({
  scrollToTarget: () => {},
  lenis: null,
});

export const useScroll = () => useContext(ScrollContext);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const reqId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReduced]);

  const scrollToTarget = (target: string, offset = 0) => {
    if (prefersReduced || !lenisRef.current) {
      const el = document.querySelector(target);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
      }
      return;
    }

    lenisRef.current.scrollTo(target, {
      offset,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  return (
    <ScrollContext.Provider value={{ scrollToTarget, lenis: lenisRef.current }}>
      {children}
    </ScrollContext.Provider>
  );
}
