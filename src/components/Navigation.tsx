'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PROFILE, NAV_ITEMS } from '@/lib/data';
import { useScroll } from '@/lib/scroll';
import { useScrollProgress } from '@/lib/hooks';

export const Navigation: React.FC = () => {
  const { scrollToTarget } = useScroll();
  const progress = useScrollProgress();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navContainerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Track scroll > 40px
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section with IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', ...NAV_ITEMS.map((item) => item.href.replace('#', ''))];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-45% 0px -50% 0px',
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Update pill indicator position
  useEffect(() => {
    const activeBtn = linkRefs.current.get(activeSection);
    const container = navContainerRef.current;
    if (activeBtn && container) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      setIndicatorStyle({
        left: btnRect.left - containerRect.left,
        width: btnRect.width,
        opacity: 1,
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection, scrolled]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const handleNavClick = (target: string) => {
    setMenuOpen(false);
    scrollToTarget(target);
  };

  return (
    <>
      {/* 2px ink scroll-progress bar along the very top */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#0d0d0d] z-50 origin-left transition-transform duration-75"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-6 md:py-8'
        }`}
      >
        <div className="container-page flex items-center justify-between">
          {/* Left: initials mark + fading full name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('#hero')}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-semibold tracking-wider transition-all duration-300 group cursor-pointer ${
                scrolled
                  ? 'bg-[#0d0d0d] text-[#f4f2ee] shadow-sm'
                  : 'bg-transparent text-[#0d0d0d] border border-[#0d0d0d]/20 hover:border-[#0d0d0d]'
              }`}
              aria-label="Athul Simon — Scroll to Top"
            >
              <span className="transition-transform duration-500 ease-out group-hover:rotate-360 inline-block">
                {PROFILE.initials}
              </span>
            </button>

            <span
              className={`font-semibold tracking-tight text-sm text-[#0d0d0d] transition-opacity duration-300 select-none ${
                scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              {PROFILE.name}
            </span>
          </div>

          {/* Desktop Nav: frosted white glass pill */}
          <nav
            ref={navContainerRef}
            className={`hidden md:flex items-center relative p-1.5 rounded-full transition-all duration-300 border ${
              scrolled
                ? 'bg-white/85 backdrop-blur-md border-[rgba(13,13,13,0.08)] shadow-[0_8px_24px_rgba(13,13,13,0.06)]'
                : 'bg-transparent border-transparent'
            }`}
          >
            {/* Sliding ink indicator pill */}
            <div
              className="absolute top-1.5 bottom-1.5 bg-[#0d0d0d] rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
              }}
              aria-hidden="true"
            />

            {NAV_ITEMS.map((item) => {
              const secId = item.href.replace('#', '');
              const isActive = activeSection === secId;

              return (
                <button
                  key={item.href}
                  ref={(el) => {
                    if (el) linkRefs.current.set(secId, el);
                  }}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative z-10 px-4 py-1.5 rounded-full text-xs font-medium tracking-tight transition-colors duration-200 cursor-pointer ${
                    isActive ? 'text-[#f4f2ee]' : 'text-[#77756f] hover:text-[#0d0d0d]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Pill Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-medium tracking-wider uppercase transition-all duration-200 border ${
                scrolled
                  ? 'bg-white/90 backdrop-blur-md text-[#0d0d0d] border-[#0d0d0d]/10 shadow-sm'
                  : 'bg-[#0d0d0d] text-[#f4f2ee] border-transparent'
              }`}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label="Toggle Navigation Menu"
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Navigation Overlay with clip-path */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-50 bg-[#f4f2ee] flex flex-col justify-between p-8 md:hidden transition-[clip-path] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen
            ? '[clip-path:circle(150%_at_top_right)] pointer-events-auto'
            : '[clip-path:circle(0%_at_top_right)] pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-[#77756f]">
            Menu
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-10 h-10 rounded-full border border-[#0d0d0d]/15 flex items-center justify-center font-mono text-sm"
            aria-label="Close Menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-5 my-auto">
          {NAV_ITEMS.map((item, idx) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="group flex items-baseline gap-4 text-left transition-transform duration-200 hover:translate-x-2"
              style={{
                transitionDelay: `${idx * 40}ms`,
              }}
            >
              <span className="font-mono text-xs text-[#a9a6a0] group-hover:text-[#0d0d0d]">
                0{idx + 1}
              </span>
              <span className="text-3xl font-bold tracking-tight text-[#0d0d0d]">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-[rgba(13,13,13,0.1)] flex flex-col gap-2">
          <span className="text-xs text-[#77756f]">{PROFILE.email}</span>
          <span className="text-xs text-[#77756f]">{PROFILE.location}</span>
        </div>
      </div>
    </>
  );
};
