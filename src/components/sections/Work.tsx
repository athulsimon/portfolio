'use client';

import React, { useState } from 'react';
import { PROJECTS, Project } from '@/lib/data';
import { TechLogo } from '../ui/TechLogo';

export const Work: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);

  return (
    <section id="work" className="section-pad w-full relative" aria-label="Selected Projects and Work">
      <div className="container-page">
        {/* Section Header */}
        <div className="section-tag">
          <span>03</span>
          <span>—</span>
          <span>Selected Work</span>
        </div>
        <h2 className="section-heading">
          Things I&apos;ve
          <span className="heading-italic">built.</span>
        </h2>

        {/* Desktop Accordion Gallery (side-by-side) & Mobile Accordion */}
        <div className="hidden lg:flex gap-4 w-full h-[600px] max-h-[78svh] items-stretch">
          {PROJECTS.map((project) => {
            const isOpen = activeId === project.id;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setActiveId(project.id)}
                onFocus={() => setActiveId(project.id)}
                onClick={() => setActiveId(project.id)}
                tabIndex={0}
                role="region"
                aria-expanded={isOpen}
                aria-label={`Project ${project.index}: ${project.title}`}
                className={`relative rounded-[28px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border border-[rgba(13,13,13,0.1)] outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] cursor-pointer ${
                  isOpen
                    ? 'flex-[8] bg-white shadow-[0_20px_48px_rgba(13,13,13,0.08)]'
                    : 'flex-[1] bg-white/70 hover:bg-white hover:flex-[1.2]'
                }`}
              >
                {isOpen ? (
                  /* OPEN EXPANDED PANEL */
                  <div className="w-full h-full p-8 grid grid-cols-[1.1fr_1fr] gap-8 items-center overflow-hidden">
                    {/* Left Details */}
                    <div className="flex flex-col justify-between h-full overflow-y-auto pr-2">
                      <div>
                        {/* Number + Kicker */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-mono text-xs font-semibold text-[#a9a6a0]">
                            {project.index}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]" />
                          <span className="font-mono text-xs uppercase tracking-wider text-[#77756f]">
                            {project.kicker}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-3xl font-bold tracking-tight text-[#0d0d0d] mb-4">
                          {project.title}
                        </h3>

                        {/* Verbatim Description */}
                        <p className="text-sm leading-relaxed text-[#3a3a3a] mb-6">
                          {project.description}
                        </p>

                        {/* 2-Column Feature List */}
                        <div className="mb-6">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#a9a6a0] block mb-2">
                            Key Architecture & Features
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#3a3a3a]">
                            {project.features.map((feat, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <span className="text-[#0d0d0d] mt-0.5">•</span>
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tech Chips with Tiny Logos */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-6">
                          {project.tech.map((t) => (
                            <div
                              key={t}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f4f2ee] border border-[rgba(13,13,13,0.06)] text-xs font-medium text-[#0d0d0d]"
                            >
                              <TechLogo name={t} size={14} />
                              <span>{t}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* GitHub Link Button */}
                      {project.github && (
                        <div className="pt-4 border-t border-[rgba(13,13,13,0.08)]">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-pill-primary text-xs"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>View on GitHub</span>
                            <span className="font-mono">↗</span>
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Right Side: Illustrative Mini-UI in pure CSS/JSX */}
                    <div className="relative h-full w-full rounded-2xl bg-[#f4f2ee] border border-[rgba(13,13,13,0.08)] overflow-hidden flex flex-col p-4 shadow-inner">
                      {/* Illustrative UI Tag */}
                      <div className="flex items-center justify-between pb-3 border-b border-[rgba(13,13,13,0.08)] mb-3">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#77756f]">
                          Illustrative UI
                        </span>
                        <div className="flex gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#a9a6a0]" />
                          <span className="w-2 h-2 rounded-full bg-[#a9a6a0]" />
                          <span className="w-2 h-2 rounded-full bg-[#a9a6a0]" />
                        </div>
                      </div>

                      {/* Dynamic Mini-UI Component based on Project ID */}
                      <div className="flex-1 flex flex-col justify-center">
                        <ProjectMiniUI projectId={project.id} />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* FOLDED SLIM SPINE */
                  <div className="w-full h-full p-4 flex flex-col justify-between items-center group">
                    <span className="font-mono text-sm font-semibold text-[#77756f]">
                      {project.index}
                    </span>

                    {/* Vertical Title */}
                    <div
                      className="font-bold text-sm text-[#0d0d0d] tracking-tight uppercase select-none"
                      style={{
                        writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)',
                      }}
                    >
                      {project.title}
                    </div>

                    {/* Rotating Plus Button */}
                    <div className="w-8 h-8 rounded-full border border-[rgba(13,13,13,0.15)] flex items-center justify-center font-mono text-sm text-[#0d0d0d] transition-transform duration-300 group-hover:rotate-90">
                      +
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Accordion */}
        <div className="flex flex-col gap-4 lg:hidden">
          {PROJECTS.map((project) => {
            const isOpen = activeId === project.id;

            return (
              <div
                key={project.id}
                className="premium-card overflow-hidden transition-all duration-300"
              >
                {/* Header Toggle */}
                <button
                  onClick={() => setActiveId(isOpen ? '' : project.id)}
                  className="w-full p-6 flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#a9a6a0]">{project.index}</span>
                    <h3 className="text-xl font-bold text-[#0d0d0d]">{project.title}</h3>
                  </div>
                  <span
                    className={`font-mono text-lg transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>

                {/* Mobile Expanded Body */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-[rgba(13,13,13,0.06)] flex flex-col gap-6">
                    <p className="text-sm text-[#3a3a3a] leading-relaxed">
                      {project.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-[#3a3a3a]">
                      {project.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-[#0d0d0d]">•</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Illustrative Mini UI */}
                    <div className="p-4 rounded-xl bg-[#f4f2ee] border border-[rgba(13,13,13,0.08)]">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#77756f] block mb-2">
                        Illustrative UI
                      </span>
                      <ProjectMiniUI projectId={project.id} />
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-full bg-[#f4f2ee] text-xs font-medium text-[#0d0d0d]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-pill-primary text-xs w-full text-center"
                      >
                        View on GitHub ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Illustrative Mini-UI components in grayscale pure CSS/JSX
function ProjectMiniUI({ projectId }: { projectId: string }) {
  if (projectId === 'super-app') {
    return (
      <div className="w-full max-w-sm mx-auto bg-white rounded-xl border border-[#0d0d0d]/10 p-3 shadow-sm text-xs font-mono">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#0d0d0d]/10">
          <span className="font-bold text-[11px]">SuperApp Core</span>
          <span className="px-1.5 py-0.5 rounded bg-[#0d0d0d] text-white text-[9px]">v2.4.0</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="p-2 rounded-lg bg-[#f4f2ee] border border-[#0d0d0d]/5">
            <span className="block text-[9px] text-[#77756f]">Module 01</span>
            <span className="font-semibold text-[11px]">Auth & SSO</span>
            <div className="w-full bg-[#d0cdc7] h-1 rounded mt-1.5 overflow-hidden">
              <div className="bg-[#0d0d0d] h-full w-4/5" />
            </div>
          </div>
          <div className="p-2 rounded-lg bg-[#f4f2ee] border border-[#0d0d0d]/5">
            <span className="block text-[9px] text-[#77756f]">Module 02</span>
            <span className="font-semibold text-[11px]">Commerce</span>
            <div className="w-full bg-[#d0cdc7] h-1 rounded mt-1.5 overflow-hidden">
              <div className="bg-[#0d0d0d] h-full w-3/5" />
            </div>
          </div>
          <div className="p-2 rounded-lg bg-[#f4f2ee] border border-[#0d0d0d]/5">
            <span className="block text-[9px] text-[#77756f]">Module 03</span>
            <span className="font-semibold text-[11px]">Analytics</span>
            <div className="w-full bg-[#d0cdc7] h-1 rounded mt-1.5 overflow-hidden">
              <div className="bg-[#0d0d0d] h-full w-full" />
            </div>
          </div>
          <div className="p-2 rounded-lg bg-[#f4f2ee] border border-[#0d0d0d]/5">
            <span className="block text-[9px] text-[#77756f]">Module 04</span>
            <span className="font-semibold text-[11px]">Navigation</span>
            <div className="w-full bg-[#d0cdc7] h-1 rounded mt-1.5 overflow-hidden">
              <div className="bg-[#0d0d0d] h-full w-4/5" />
            </div>
          </div>
        </div>
        <div className="p-2 bg-[#f4f2ee] rounded flex items-center justify-between text-[10px] text-[#77756f]">
          <span>State Engine: BLoC Event Bus</span>
          <span className="text-[#0d0d0d] font-bold">READY</span>
        </div>
      </div>
    );
  }

  if (projectId === 'ai-chat-app') {
    return (
      <div className="w-full max-w-sm mx-auto bg-white rounded-xl border border-[#0d0d0d]/10 p-3 shadow-sm text-xs font-mono flex flex-col gap-2">
        <div className="flex items-center justify-between pb-2 border-b border-[#0d0d0d]/10">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0d0d0d]" />
            <span className="font-bold text-[11px]">ChatGPT Assistant</span>
          </div>
          <span className="text-[9px] text-[#77756f]">Voice Sync Active</span>
        </div>
        <div className="p-2 rounded-lg bg-[#f4f2ee] text-[11px] text-[#3a3a3a] self-start max-w-[85%]">
          How can I optimize Flutter state management?
        </div>
        <div className="p-2 rounded-lg bg-[#0d0d0d] text-[11px] text-white self-end max-w-[85%]">
          Implement BLoC with distinct events and state isolation.
        </div>
        <div className="pt-2 mt-1 border-t border-[#0d0d0d]/10 flex items-center justify-between">
          <div className="flex items-center gap-1 h-4">
            {[4, 12, 8, 16, 10, 6, 14, 8].map((h, i) => (
              <div key={i} className="w-1 bg-[#0d0d0d] rounded-full" style={{ height: `${h}px` }} />
            ))}
          </div>
          <span className="text-[9px] font-bold text-[#0d0d0d]">VOICE LISTENING...</span>
        </div>
      </div>
    );
  }

  if (projectId === 'kids-educational-app') {
    return (
      <div className="w-full max-w-sm mx-auto bg-white rounded-xl border border-[#0d0d0d]/10 p-3 shadow-sm text-xs font-mono">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#0d0d0d]/10">
          <span className="font-bold text-[11px]">Shapes & Learning</span>
          <span className="font-mono text-[10px]">Score: 120 ★</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center mb-2">
          <div className="aspect-square rounded-xl bg-[#f4f2ee] border border-[#0d0d0d]/10 flex flex-col items-center justify-center p-2">
            <div className="w-6 h-6 rounded-full border-2 border-[#0d0d0d] mb-1" />
            <span className="text-[10px] font-bold">Circle</span>
          </div>
          <div className="aspect-square rounded-xl bg-[#f4f2ee] border border-[#0d0d0d]/10 flex flex-col items-center justify-center p-2">
            <div className="w-6 h-6 border-2 border-[#0d0d0d] mb-1" />
            <span className="text-[10px] font-bold">Square</span>
          </div>
          <div className="aspect-square rounded-xl bg-[#f4f2ee] border border-[#0d0d0d]/10 flex flex-col items-center justify-center p-2">
            <div className="w-6 h-6 border-b-2 border-r-2 border-[#0d0d0d] rotate-45 mb-1" />
            <span className="text-[10px] font-bold">Diamond</span>
          </div>
        </div>
        <div className="text-[10px] text-center text-[#77756f] pt-1">
          Tap matching shape to continue
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl border border-[#0d0d0d]/10 p-3 shadow-sm text-xs font-mono">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#0d0d0d]/10">
        <span className="font-bold text-[11px]">Sqflite Local DB</span>
        <span className="text-[9px] text-[#77756f]">CRUD Offline</span>
      </div>
      <div className="space-y-1.5 mb-2">
        <div className="flex items-center gap-2 p-1.5 rounded bg-[#f4f2ee]">
          <span className="w-3.5 h-3.5 rounded border border-[#0d0d0d] bg-[#0d0d0d] text-white flex items-center justify-center text-[9px]">
            ✓
          </span>
          <span className="line-through text-[#77756f] text-[11px]">Architecture planning</span>
        </div>
        <div className="flex items-center gap-2 p-1.5 rounded bg-[#f4f2ee]">
          <span className="w-3.5 h-3.5 rounded border border-[#0d0d0d]" />
          <span className="text-[#0d0d0d] text-[11px] font-medium">Implement unit tests</span>
        </div>
        <div className="flex items-center gap-2 p-1.5 rounded bg-[#f4f2ee]">
          <span className="w-3.5 h-3.5 rounded border border-[#0d0d0d]" />
          <span className="text-[#0d0d0d] text-[11px]">Build store release</span>
        </div>
      </div>
      <div className="flex justify-between text-[9px] text-[#a9a6a0] pt-1 border-t border-[#0d0d0d]/5">
        <span>SQLite Transactions</span>
        <span>0ms Latency</span>
      </div>
    </div>
  );
}
