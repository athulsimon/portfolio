'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { PROFILE, EXPERIENCE, EDUCATION } from '@/lib/data';

export const About: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [angle, setAngle] = useState(0);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const physicsRef = useRef({
    angle: 0,
    velocity: 0,
    targetAngle: 0,
    lastX: 0,
    lastTime: Date.now(),
    isHovering: false,
  });

  // Pendulum swing with spring damping and subtle idle sway
  useEffect(() => {
    let animId: number;

    const tick = () => {
      const p = physicsRef.current;
      const now = Date.now();

      if (!p.isHovering) {
        // Idle sway: gentle sine wave
        const idleAngle = Math.sin(now / 1200) * 1.8;
        p.targetAngle = idleAngle;
      }

      // Spring physics
      const spring = 0.08;
      const damping = 0.88;
      const force = (p.targetAngle - p.angle) * spring;
      p.velocity = (p.velocity + force) * damping;
      p.angle += p.velocity;

      setAngle(p.angle);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    const p = physicsRef.current;
    p.isHovering = true;
    const now = Date.now();
    const dt = Math.max(1, now - p.lastTime);
    const dx = e.clientX - p.lastX;
    p.lastX = e.clientX;
    p.lastTime = now;

    // Convert cursor velocity to swing angle
    const velocity = (dx / dt) * 12;
    p.targetAngle = Math.max(-14, Math.min(14, velocity * 2.5));
  };

  const handlePointerLeave = () => {
    physicsRef.current.isHovering = false;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsFlipped(!isFlipped);
    }
  };

  const currentRole = EXPERIENCE[0];
  const edu = EDUCATION[0];

  return (
    <section id="about" className="section-pad w-full relative" aria-label="About Athul Simon">
      <div className="container-page">
        {/* Section Header */}
        <div className="section-tag">
          <span>01</span>
          <span>—</span>
          <span>Profile & Identity</span>
        </div>
        <h2 className="section-heading">
          Engineering with
          <span className="heading-italic">purpose.</span>
        </h2>

        {/* Three-Column Equal Height Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] gap-8 items-stretch">
          {/* Left Column: Bio & Verbatim Summary */}
          <div className="premium-card p-8 md:p-10 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#77756f] block mb-3">
                Biographical Note
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0d0d0d] mb-6">
                Hi, I&apos;m {PROFILE.name}.
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-[#3a3a3a] mb-6">
                {PROFILE.resumeSummary}
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-[#77756f]">
                Specialized in architecting high-performance Flutter applications with modular components,
                Sqflite CRUD databases, and scalable state management.
              </p>
            </div>

            {/* Social & Resume Buttons */}
            <div className="pt-8 mt-8 border-t border-[rgba(13,13,13,0.1)] flex flex-wrap items-center gap-3">
              <a
                href={PROFILE.resumePath}
                download="Athul_Simon_Resume.pdf"
                className="btn-pill-primary text-xs"
              >
                <span>Résumé</span>
                <span className="font-mono">↓</span>
              </a>
              {PROFILE.github && (
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-secondary text-xs"
                >
                  GitHub ↗
                </a>
              )}
              {PROFILE.linkedin && (
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-secondary text-xs"
                >
                  LinkedIn ↗
                </a>
              )}
            </div>
          </div>

          {/* Center Column: Hanging Lanyard ID Card */}
          <div
            className="flex flex-col items-center justify-start min-h-[540px] relative select-none py-2"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            {/* Lanyard Strap: 30x56 px with scrolling text and metal clip */}
            <div className="w-[30px] h-[56px] bg-[#0d0d0d] rounded-t-sm relative overflow-hidden flex items-center justify-center shadow-md">
              <div
                className="absolute inset-0 flex flex-col justify-around text-[7px] font-mono uppercase tracking-widest text-[#f4f2ee] opacity-80 select-none pointer-events-none"
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  lineHeight: 1,
                }}
              >
                AS·DEV
              </div>
            </div>

            {/* Metal Clip */}
            <div className="w-[18px] h-[14px] bg-[#a9a6a0] rounded-sm -mt-1 z-10 border border-[#77756f] shadow-inner flex items-center justify-center">
              <div className="w-[8px] h-[2px] bg-[#3a3a3a]" />
            </div>

            {/* Pendulum Swinging & 3D Flipping Card Container */}
            <div
              ref={cardContainerRef}
              tabIndex={0}
              role="button"
              aria-label="Athul Simon Developer ID Card. Press enter or space to flip."
              onKeyDown={handleKeyDown}
              onClick={() => setIsFlipped(!isFlipped)}
              onMouseEnter={() => setIsFlipped(true)}
              onMouseLeave={() => setIsFlipped(false)}
              className="relative w-[300px] h-[404px] mt-1 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] rounded-[24px]"
              style={{
                transformOrigin: 'top center',
                transform: `rotate(${angle}deg)`,
                perspective: '1000px',
              }}
            >
              <div
                className="w-full h-full relative transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[24px]"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* FRONT OF ID CARD */}
                <div
                  className="absolute inset-0 w-full h-full bg-white rounded-[24px] border border-[rgba(13,13,13,0.12)] shadow-[0_16px_36px_rgba(13,13,13,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] p-5 flex flex-col justify-between overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {/* Top Black Header Band */}
                  <div className="-mx-5 -mt-5 bg-[#0d0d0d] text-[#f4f2ee] px-5 py-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-widest uppercase font-semibold">
                      DEVELOPER ID
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#3DDC84]" />
                  </div>

                  {/* Centered Bust Portrait */}
                  <div className="flex flex-col items-center justify-center my-auto">
                    <div className="relative group w-[128px] h-[156px] rounded-xl overflow-hidden p-1 bg-gradient-to-b from-[#e9e6e0] to-[#ffffff] border border-[rgba(13,13,13,0.1)] shadow-inner">
                      <div className="relative w-full h-full rounded-lg overflow-hidden">
                        <Image
                          src="/portrait-bust.webp"
                          alt="Athul Simon portrait"
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          sizes="128px"
                          priority
                        />
                      </div>
                    </div>

                    <h4 className="font-bold text-lg text-[#0d0d0d] mt-3 tracking-tight">
                      {PROFILE.name}
                    </h4>
                    <span className="font-mono text-xs text-[#77756f] uppercase tracking-wider">
                      {PROFILE.role}
                    </span>
                  </div>

                  {/* Detail Meta Rows */}
                  <div className="space-y-1.5 pt-3 border-t border-[rgba(13,13,13,0.08)] text-[11px] font-mono">
                    <div className="flex justify-between">
                      <span className="text-[#a9a6a0]">ID NO.</span>
                      <span className="text-[#0d0d0d] font-semibold">{PROFILE.idNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#a9a6a0]">DEPT.</span>
                      <span className="text-[#0d0d0d]">Mobile & Web</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#a9a6a0]">VALID TILL</span>
                      <span className="text-[#0d0d0d] font-semibold">{PROFILE.validTill}</span>
                    </div>
                  </div>

                  {/* Barcode and Holographic Grayscale Sticker */}
                  <div className="pt-2 flex items-center justify-between">
                    {/* Grayscale Barcode */}
                    <div className="flex items-center gap-[2px] h-6 opacity-75">
                      {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 3, 1, 4, 2].map((w, i) => (
                        <div
                          key={i}
                          className="h-full bg-[#0d0d0d]"
                          style={{ width: `${w}px` }}
                        />
                      ))}
                    </div>

                    {/* Holographic Grayscale Sticker */}
                    <div className="w-8 h-8 rounded-full border border-[#0d0d0d]/20 bg-gradient-to-tr from-[#d0cdc7] via-[#f4f2ee] to-[#a9a6a0] flex items-center justify-center text-[8px] font-mono text-[#0d0d0d] font-bold shadow-sm">
                      VERIFIED
                    </div>
                  </div>
                </div>

                {/* BACK OF ID CARD */}
                <div
                  className="absolute inset-0 w-full h-full bg-[#0d0d0d] text-[#f4f2ee] rounded-[24px] border border-[#3a3a3a] shadow-[0_16px_36px_rgba(13,13,13,0.18)] p-6 flex flex-col justify-between"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                      <span className="font-mono text-[10px] tracking-widest uppercase text-[#a9a6a0]">
                        WHAT I AM
                      </span>
                      <span className="font-mono text-[10px] text-[#77756f]">SEC / RECORD</span>
                    </div>

                    <div className="space-y-3 text-xs leading-relaxed text-[#d0cdc7]">
                      <div>
                        <span className="block font-mono text-[9px] uppercase text-[#77756f]">Role</span>
                        <span className="font-semibold text-white">Flutter Developer & Software Engineer</span>
                      </div>
                      <div>
                        <span className="block font-mono text-[9px] uppercase text-[#77756f]">Education</span>
                        <span>{edu.degree}</span>
                      </div>
                      <div>
                        <span className="block font-mono text-[9px] uppercase text-[#77756f]">Experience</span>
                        <span>4+ Years across HiFx, Indbytes & WebSoulLabs</span>
                      </div>
                      <div>
                        <span className="block font-mono text-[9px] uppercase text-[#77756f]">Core Architecture</span>
                        <span>SuperApp Modules · Bloc Pattern · Testing</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="font-serif italic text-sm text-[#a9a6a0] mb-2">
                      Athul Simon
                    </div>
                    <p className="font-mono text-[10px] text-[#77756f]">
                      If found, say hello · {PROFILE.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Facts & Verbatim Quote */}
          <div className="premium-card p-8 md:p-10 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#77756f] block mb-4">
                Quick Facts
              </span>

              <div className="divide-y divide-[rgba(13,13,13,0.08)]">
                <div className="py-3 flex justify-between items-baseline">
                  <span className="text-xs font-mono text-[#77756f]">Location</span>
                  <span className="text-sm font-semibold text-[#0d0d0d]">{PROFILE.location}</span>
                </div>
                <div className="py-3 flex justify-between items-baseline">
                  <span className="text-xs font-mono text-[#77756f]">Education</span>
                  <span className="text-sm font-semibold text-[#0d0d0d] text-right">
                    {edu.degree} ({edu.startYear}–{edu.endYear})
                  </span>
                </div>
                <div className="py-3 flex justify-between items-baseline">
                  <span className="text-xs font-mono text-[#77756f]">Current Role</span>
                  <span className="text-sm font-semibold text-[#0d0d0d] text-right">
                    {currentRole.role} @ {currentRole.company}
                  </span>
                </div>
                <div className="py-3 flex justify-between items-baseline">
                  <span className="text-xs font-mono text-[#77756f]">Email</span>
                  <span className="text-sm font-semibold text-[#0d0d0d]">{PROFILE.email}</span>
                </div>
              </div>
            </div>

            {/* Paraphrased Quote directly from resume */}
            <div className="pt-8 mt-8 border-t border-[rgba(13,13,13,0.1)]">
              <blockquote className="font-serif italic text-lg sm:text-xl text-[#3a3a3a] leading-snug">
                &ldquo;{PROFILE.quote}&rdquo;
              </blockquote>
              <span className="font-mono text-xs text-[#77756f] mt-3 block">
                — {PROFILE.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
