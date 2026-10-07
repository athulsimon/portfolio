'use client';

import React, { useEffect } from 'react';
import { Navigation } from './Navigation';
import { Hero } from './hero/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Work } from './sections/Work';
import { Certifications } from './sections/Certifications';
import { Experience } from './sections/Experience';
import { Achievements } from './sections/Achievements';
import { Contact } from './sections/Contact';

export const App: React.FC = () => {
  // Global RevealObserver for .rv and .rv-mask elements
  useEffect(() => {
    const elements = document.querySelectorAll('.rv, .rv-mask');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#f4f2ee] text-[#0d0d0d] overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Certifications />
        <Experience />
        <Achievements />
        <Contact />
      </main>
    </div>
  );
};
