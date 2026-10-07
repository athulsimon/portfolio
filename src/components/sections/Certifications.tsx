'use client';

import React from 'react';
import { CERTIFICATIONS } from '@/lib/data';

export const Certifications: React.FC = () => {
  if (CERTIFICATIONS.length === 0) return null;

  return (
    <section
      id="certifications"
      className="w-full bg-white border-y border-[rgba(13,13,13,0.1)] py-24 md:py-32 relative"
      aria-label="Certifications and Continuous Learning"
    >
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 items-start">
          {/* Left Sticky Header */}
          <div className="lg:sticky lg:top-28">
            <div className="section-tag mb-3">
              <span>04</span>
              <span>—</span>
              <span>Accreditations</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0d0d0d] leading-none mb-4">
              Always
              <span className="heading-italic">learning.</span>
            </h2>
            <p className="font-mono text-xs uppercase tracking-wider text-[#77756f]">
              {CERTIFICATIONS.length} Specialized Credentials
            </p>
          </div>

          {/* Right: Ink-Flood Numbered Rows */}
          <div className="divide-y divide-[rgba(13,13,13,0.1)] border-y border-[rgba(13,13,13,0.1)]">
            {CERTIFICATIONS.map((cert) => (
              <a
                key={cert.id}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between py-7 px-4 sm:px-6 transition-colors duration-300 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d]"
              >
                {/* Ink Flood Background Layer (scaleX 0 -> 1 from left) */}
                <div
                  className="absolute inset-0 bg-[#0d0d0d] -z-10 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus:scale-x-100"
                  aria-hidden="true"
                />

                {/* Left Content */}
                <div className="flex items-baseline gap-6 sm:gap-10 relative z-10">
                  <span className="font-mono text-sm sm:text-base font-semibold text-[#a9a6a0] group-hover:text-white/60 transition-colors duration-300">
                    {cert.index}
                  </span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0d0d0d] group-hover:text-white transition-colors duration-300 tracking-tight">
                      {cert.title}
                    </h3>
                    <span className="font-mono text-xs text-[#77756f] group-hover:text-[#f4f2ee]/80 transition-colors duration-300 mt-1 block">
                      {cert.issuer} · {cert.year}
                    </span>
                  </div>
                </div>

                {/* Right Arrow (slides in on hover) */}
                <div className="relative z-10 flex items-center gap-2 pl-4">
                  <span className="font-mono text-lg text-[#0d0d0d] group-hover:text-white transition-all duration-300 translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus:translate-x-0 group-focus:opacity-100">
                    ↗
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
