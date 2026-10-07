'use client';

import React, { useState } from 'react';
import { PERIODIC_SKILLS, SKILL_FAMILIES, SkillFamily, PeriodicSkill } from '@/lib/data';
import { TechLogo } from '../ui/TechLogo';

export const Skills: React.FC = () => {
  const [selectedFamily, setSelectedFamily] = useState<SkillFamily | 'All'>('All');
  const [activeSkill, setActiveSkill] = useState<PeriodicSkill>(PERIODIC_SKILLS[0]);

  const filteredSkills = PERIODIC_SKILLS;

  return (
    <section id="skills" className="section-pad w-full relative" aria-label="Skills and Technical Stack">
      <div className="container-page">
        {/* Section Header */}
        <div className="section-tag">
          <span>02</span>
          <span>—</span>
          <span>Periodic Table of Stack</span>
        </div>
        <h2 className="section-heading">
          Technical
          <span className="heading-italic">foundation.</span>
        </h2>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[rgba(13,13,13,0.08)]">
          <button
            onClick={() => setSelectedFamily('All')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              selectedFamily === 'All'
                ? 'bg-[#0d0d0d] text-white shadow-sm'
                : 'bg-white text-[#77756f] hover:text-[#0d0d0d] border border-[rgba(13,13,13,0.1)]'
            }`}
          >
            All Elements ({PERIODIC_SKILLS.length})
          </button>
          {SKILL_FAMILIES.map((family) => {
            const count = PERIODIC_SKILLS.filter((s) => s.family === family).length;
            if (count === 0) return null;

            return (
              <button
                key={family}
                onClick={() => setSelectedFamily(family)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  selectedFamily === family
                    ? 'bg-[#0d0d0d] text-white shadow-sm'
                    : 'bg-white text-[#77756f] hover:text-[#0d0d0d] border border-[rgba(13,13,13,0.1)]'
                }`}
              >
                {family}
              </button>
            );
          })}
        </div>

        {/* Two-column layout: Periodic Table Grid (left) + Sticky Inspector (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Periodic Elements Grid (8 cols desktop, 4 cols mobile) */}
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-2.5 sm:gap-3">
            {filteredSkills.map((skill, index) => {
              const isMatch = selectedFamily === 'All' || skill.family === selectedFamily;
              const isSelected = activeSkill.name === skill.name;
              const row = Math.floor(index / 8);
              const col = index % 8;
              const delayMs = (row + col) * 40;

              return (
                <button
                  key={skill.name}
                  onClick={() => setActiveSkill(skill)}
                  onMouseEnter={() => setActiveSkill(skill)}
                  onFocus={() => setActiveSkill(skill)}
                  tabIndex={0}
                  style={{
                    animationDelay: `${delayMs}ms`,
                  }}
                  className={`relative aspect-square p-2 sm:p-2.5 rounded-2xl flex flex-col justify-between text-left transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] cursor-pointer ${
                    isSelected
                      ? 'bg-white border-2 border-[#0d0d0d] shadow-lg scale-105 z-10'
                      : 'bg-white border border-[rgba(13,13,13,0.1)] hover:border-[rgba(13,13,13,0.3)] hover:shadow-md'
                  } ${!isMatch ? 'opacity-25 filter grayscale' : 'opacity-100'}`}
                >
                  {/* Top row: atomic number & micro family indicator */}
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-[9px] sm:text-[10px] text-[#77756f]">
                      {skill.number < 10 ? `0${skill.number}` : skill.number}
                    </span>
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: skill.color || '#0d0d0d' }}
                      title={skill.family}
                    />
                  </div>

                  {/* Middle: 2-Letter Symbol */}
                  <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#0d0d0d] my-auto">
                    {skill.symbol}
                  </div>

                  {/* Bottom: Name */}
                  <div className="text-[10px] sm:text-[11px] font-medium text-[#3a3a3a] leading-tight truncate w-full">
                    {skill.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sticky Inspector Panel (320px wide) */}
          <aside className="premium-card p-6 lg:sticky lg:top-28 w-full transition-all duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(13,13,13,0.08)] mb-6">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#77756f]">
                Element Inspector
              </span>
              <span className="font-mono text-[11px] font-bold text-[#0d0d0d]">
                #{activeSkill.number < 10 ? `0${activeSkill.number}` : activeSkill.number}
              </span>
            </div>

            {/* 150px Logo with Pop Animation & Soft Glow */}
            <div className="h-44 w-full flex items-center justify-center relative my-2 bg-[#f4f2ee]/60 rounded-2xl border border-[rgba(13,13,13,0.05)] overflow-hidden">
              <div
                key={activeSkill.name}
                className="animate-[scalePop_0.4s_cubic-bezier(0.16,1,0.3,1)]"
              >
                <TechLogo
                  name={activeSkill.name}
                  size={120}
                  glow={true}
                  className="transition-transform duration-300"
                />
              </div>
            </div>

            {/* Skill Name & Symbol */}
            <div className="mt-6">
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold tracking-tight text-[#0d0d0d]">
                  {activeSkill.name}
                </h3>
                <span className="text-xl font-mono font-bold text-[#77756f]">
                  [{activeSkill.symbol}]
                </span>
              </div>
              <span className="inline-block mt-1 font-mono text-xs text-[#77756f] uppercase tracking-wider">
                Family: {activeSkill.family}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#3a3a3a] leading-relaxed mt-4">
              {activeSkill.description}
            </p>

            {/* Connected Projects */}
            <div className="mt-6 pt-4 border-t border-[rgba(13,13,13,0.08)]">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#a9a6a0] block mb-2">
                Applied In Projects
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeSkill.projects.map((proj) => (
                  <span
                    key={proj}
                    className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#f4f2ee] text-[#0d0d0d] border border-[rgba(13,13,13,0.06)]"
                  >
                    {proj}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        @keyframes scalePop {
          0% {
            transform: scale(0.75);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};
