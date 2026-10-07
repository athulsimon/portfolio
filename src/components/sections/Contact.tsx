'use client';

import React, { useState } from 'react';
import { PROFILE } from '@/lib/data';
import { useScroll } from '@/lib/scroll';

export const Contact: React.FC = () => {
  const { scrollToTarget } = useScroll();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  // Letters of the heading for individual bounce hops
  const headingLine1 = "Let's build";
  const headingLine2 = "something together.";

  return (
    <footer id="contact" className="section-pad w-full relative pb-12" aria-label="Contact and Footer">
      <div className="container-page">
        {/* Section Header */}
        <div className="section-tag mb-4">
          <span>07</span>
          <span>—</span>
          <span>Initiate Collaboration</span>
        </div>

        {/* Huge Interactive Heading with Bouncing Letters */}
        <div className="mb-14 sm:mb-20">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.045em] leading-[0.95] text-[#0d0d0d] select-none">
            <span className="block mb-2">
              {headingLine1.split('').map((char, i) => (
                <span
                  key={`l1-${i}`}
                  className="inline-block transition-transform duration-200 hover:-translate-y-3 cursor-default"
                  style={{
                    display: char === ' ' ? 'inline' : 'inline-block',
                    marginRight: char === ' ' ? '0.25em' : '0',
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
            <span className="block">
              {headingLine2.split('').map((char, i) => (
                <span
                  key={`l2-${i}`}
                  className="inline-block transition-transform duration-200 hover:-translate-y-3 cursor-default"
                  style={{
                    display: char === ' ' ? 'inline' : 'inline-block',
                    marginRight: char === ' ' ? '0.25em' : '0',
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          </h2>
        </div>

        {/* Contact Links & Circular Badge Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-end pb-20 border-b border-[rgba(13,13,13,0.1)]">
          {/* Email & Contact Details */}
          <div className="space-y-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#77756f] block mb-2">
                Primary Direct Channel
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0d0d0d] underline decoration-[rgba(13,13,13,0.25)] underline-offset-8 hover:decoration-[#0d0d0d] transition-all"
                >
                  {PROFILE.email}
                </a>

                {/* Copy Chip */}
                <button
                  onClick={copyEmail}
                  className="px-3 py-1.5 rounded-full font-mono text-xs font-medium border border-[rgba(13,13,13,0.15)] bg-white text-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
                  aria-label="Copy email address to clipboard"
                >
                  <span aria-live="polite">
                    {copied ? 'Copied ✓' : 'Copy'}
                  </span>
                </button>
              </div>
            </div>

            {/* Phone & External Profiles */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4">
              <a
                href={PROFILE.phoneHref}
                className="btn-pill-secondary text-xs sm:text-sm font-mono"
              >
                <span>Tel: +91 {PROFILE.phone}</span>
              </a>

              {PROFILE.github && (
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-secondary text-xs sm:text-sm"
                >
                  <span>GitHub</span>
                  <span className="font-mono">↗</span>
                </a>
              )}

              {PROFILE.linkedin && (
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-secondary text-xs sm:text-sm"
                >
                  <span>LinkedIn</span>
                  <span className="font-mono">↗</span>
                </a>
              )}
            </div>
          </div>

          {/* Slowly Spinning Circular "Say Hello" Badge */}
          <div className="flex justify-start lg:justify-end">
            <div className="relative w-32 h-32 flex items-center justify-center select-none">
              <div className="absolute inset-0 animate-[spin_16s_linear_infinite]">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                    fill="none"
                  />
                  <text className="font-mono text-[9px] uppercase tracking-[0.2em] fill-[#0d0d0d]">
                    <textPath href="#circlePath" startOffset="0%">
                      SAY HELLO · GET IN TOUCH · REACH OUT ·
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Center Dot */}
              <div className="w-3.5 h-3.5 rounded-full bg-[#0d0d0d]" />
            </div>
          </div>
        </div>

        {/* Footer Sub-row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#77756f]">
          <div>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollToTarget('#hero')}
              className="text-[#0d0d0d] hover:underline cursor-pointer"
            >
              Back to top ↑
            </button>
            <span className="opacity-40">|</span>
            <span>Built with Next.js 15</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
