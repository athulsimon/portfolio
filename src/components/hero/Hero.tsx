'use client';

import React, { useRef, useState, useEffect } from 'react';
import { PROFILE } from '@/lib/data';
import { useScroll } from '@/lib/scroll';

export const Hero: React.FC = () => {
  const { scrollToTarget } = useScroll();
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  // Video autoplay & sound handling
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt unmuted play first
    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
          setAutoplayBlocked(false);
        })
        .catch(() => {
          // Unmuted play blocked by browser policy -> play muted
          video.muted = true;
          video.play()
            .then(() => {
              setIsPlaying(true);
              setIsMuted(true);
              setAutoplayBlocked(true);
            })
            .catch(() => {
              setIsPlaying(false);
              setAutoplayBlocked(true);
            });
        });
    }

    // Unlock sound on first user gesture
    const handleFirstGesture = () => {
      if (videoRef.current && videoRef.current.muted) {
        videoRef.current.muted = false;
        setIsMuted(false);
        setAutoplayBlocked(false);
      }
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      window.removeEventListener('touchend', handleFirstGesture);
    };

    window.addEventListener('pointerdown', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });
    window.addEventListener('touchend', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      window.removeEventListener('touchend', handleFirstGesture);
    };
  }, []);

  // IntersectionObserver: Pause when < 35% visible, resume when back
  useEffect(() => {
    const heroEl = heroRef.current;
    const videoEl = videoRef.current;
    if (!heroEl || !videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.35) {
          videoEl.pause();
          setIsPlaying(false);
        } else {
          videoEl.play()
            .then(() => setIsPlaying(true))
            .catch(() => {});
        }
      },
      {
        threshold: [0, 0.35, 0.5, 1.0],
      }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      setIsMuted(false);
      setAutoplayBlocked(false);
      if (video.paused) {
        video.play().then(() => setIsPlaying(true));
      }
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden pt-24 pb-12"
      aria-label="Hero Introduction"
    >
      {/* Giant outlined ghost word behind person */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <span
          className="text-[clamp(8rem,24vw,28rem)] font-black uppercase tracking-tighter opacity-15"
          style={{
            WebkitTextStroke: '2px #0d0d0d',
            color: 'transparent',
            lineHeight: 0.8,
          }}
        >
          {PROFILE.firstName}
        </span>
      </div>

      {/* Main Center Video */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center my-auto">
        <div
          className="relative max-w-full flex items-center justify-center"
          style={{
            height: 'clamp(500px, 86svh, 1040px)',
            aspectRatio: '768 / 960',
          }}
        >
          <video
            ref={videoRef}
            loop
            playsInline
            preload="auto"
            muted={isMuted}
            className="w-full h-full object-contain mix-blend-multiply select-none pointer-events-none"
          >
            <source src="/hero/hero.webm" type="video/webm" />
            <source src="/hero/hero.mp4" type="video/mp4" />
          </video>

          {/* Sound control button */}
          <div className="absolute bottom-4 right-4 z-20">
            <button
              onClick={toggleSound}
              className="relative w-[46px] h-[46px] rounded-full bg-[#0d0d0d] text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-md cursor-pointer"
              aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            >
              {/* Soft ping ring while autoplay is blocked */}
              {autoplayBlocked && isMuted && (
                <span
                  className="absolute inset-0 rounded-full border border-[#0d0d0d] animate-ping opacity-60 pointer-events-none"
                  aria-hidden="true"
                />
              )}

              {isMuted ? (
                /* Play triangle icon */
                <svg
                  className="w-4 h-4 translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              ) : (
                /* Pause two bars icon */
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Foreground Hero Content: Heading & CTAs */}
      <div className="container-page relative z-20 w-full mt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-4 border-t border-[rgba(13,13,13,0.1)]">
          {/* Role Heading */}
          <div className="max-w-2xl">
            <div className="section-tag mb-2">
              <span>00</span>
              <span>—</span>
              <span>Full Stack Portfolio</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.045em] leading-[1.05] text-[#0d0d0d]">
              {PROFILE.role}
              <span className="heading-italic font-normal">Engineer.</span>
            </h1>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollToTarget('#work')}
              className="btn-pill-primary"
            >
              Explore work
            </button>
            <button
              onClick={() => scrollToTarget('#contact')}
              className="btn-pill-secondary"
            >
              Let&apos;s talk
            </button>
            <a
              href={PROFILE.resumePath}
              download="Athul_Simon_Resume.pdf"
              className="btn-pill-secondary"
              aria-label="Download Athul Simon Résumé PDF"
            >
              <span>Résumé</span>
              <span className="font-mono text-sm leading-none">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
