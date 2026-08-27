'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Gem, Layers, CheckCircle2 } from 'lucide-react';

interface AboutHeroProps {
  onExploreMotto?: () => void;
  onOpenInquiry?: () => void;
}

export const AboutHero: React.FC<AboutHeroProps> = ({ onExploreMotto, onOpenInquiry }) => {
  const [activeTitleIndex, setActiveTitleIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const cardsContainerRef = React.useRef<HTMLDivElement>(null);

  const heroTitles = [
    {
      id: 'style',
      number: '01',
      title: 'Bath accessories for every home and style',
      subtitle: 'Universal Style',
      desc: 'Thoughtfully contoured luxury bath accessories for every home, space, and modern aesthetic.',
      badge: '01',
      bgImg: '/images/hero-banner.png',
      gradientClass: 'from-[#0d1b2a]/75 via-[#0d1b2a]/45 to-transparent',
    },
    {
      id: 'lifestyle',
      number: '02',
      title: 'A Bathroom for Every Lifestyle',
      subtitle: 'Modern Living',
      desc: 'Elevating everyday cleansing rituals into restorative personal sanctuary experiences.',
      badge: '02',
      bgImg: '/images/shower_system.jpg',
      gradientClass: 'from-[#0d1b2a]/75 via-[#1b263b]/45 to-transparent',
    },
    {
      id: 'quality',
      number: '03',
      title: 'Home to highest quality bathroom accessories',
      subtitle: 'Precision Engineering',
      desc: 'Forged from premium grade brass and surgical stainless steel, finished with 10-layer physical vapor deposition for lifetime brilliance.',
      badge: '03',
      bgImg: '/images/bathtub.jpg',
      gradientClass: 'from-[#0d1b2a]/75 via-[#0d1b2a]/45 to-transparent',
    },
  ];

  // Auto-switch tabs every 3 seconds (3000ms), pausing on hover
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveTitleIndex((prev) => (prev + 1) % heroTitles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, heroTitles.length]);

  // When activeTitleIndex changes, automatically swipe only the horizontal card container (NOT the whole page)
  useEffect(() => {
    const container = cardsContainerRef.current;
    const targetCard = cardRefs.current[activeTitleIndex];
    if (container && targetCard) {
      const cardLeft = targetCard.offsetLeft;
      const cardWidth = targetCard.offsetWidth;
      const containerWidth = container.offsetWidth;
      container.scrollTo({
        left: cardLeft - containerWidth / 2 + cardWidth / 2,
        behavior: 'smooth',
      });
    }
  }, [activeTitleIndex]);

  return (
    <section className="relative w-full bg-[#0d1b2a] text-white overflow-hidden font-sans border-b border-[#1b263b]">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* Radiant Ambient Glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] lg:w-[900px] h-[350px] sm:h-[500px] bg-gradient-to-b from-[#d4a373]/20 via-[#b58351]/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -right-24 w-80 h-80 bg-[#274060]/30 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-14 sm:pb-20 relative z-10">
        
        {/* TOP HEADER: Badge, Title & Story Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-6 mb-12 sm:mb-16">
          


          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-white leading-[1.05]">
            About <span className="italic font-normal text-[#d4a373]">Us</span>
          </h1>

          {/* Subtitle Description */}
          <p className="text-base sm:text-xl md:text-2xl text-[#dfcfbe] font-serif leading-relaxed max-w-3xl mx-auto font-normal">
            A generational story of{' '}
            <span className="italic font-semibold text-[#d4a373]">
              resilience, entrepreneurial spirit
            </span>
            , and uncompromising craftsmanship that shaped the foundation of modern luxury bathware.
          </p>

          {/* Quick Metrics Bar on Mobile/Desktop */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-[#ede0d4]/80">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-[#d4a373] text-lg sm:text-xl">1957</span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#a88b74]">Est. Legacy</span>
            </div>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-[#d4a373] text-lg sm:text-xl">100%</span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#a88b74]">Pure Brass & Steel</span>
            </div>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-[#d4a373] text-lg sm:text-xl">10-Year</span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#a88b74]">Full Assurance</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* HERO BANNER SECTION: 3 TITLES WITH AUTO-SWITCH (3s) & SOFTENED GRADIENTS */}
        {/* ========================================================================= */}
        <div
          className="space-y-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Main Visual Display Screen with Softened Gradient Overlay & Active Title */}
          <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#d4a373]/30 shadow-2xl bg-[#1b263b] min-h-[340px] sm:min-h-[420px] md:min-h-[480px] flex items-end">
            
            {/* Background Image Layer with Smooth Crossfade Feel */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={heroTitles[activeTitleIndex].id}
              src={heroTitles[activeTitleIndex].bgImg}
              alt={heroTitles[activeTitleIndex].title}
              className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 scale-100 animate-in fade-in"
            />

            {/* Reduced Softened Gradient Overlays (Clearer image backdrop while maintaining legibility) */}
            <div
              className={`absolute inset-0 bg-gradient-to-t ${heroTitles[activeTitleIndex].gradientClass} transition-all duration-700`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b2a]/70 via-[#0d1b2a]/30 to-transparent" />
            <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#0d1b2a]/50 to-transparent" />



            {/* Active Content Overlay at Bottom Left */}
            <div className="relative z-20 p-5 sm:p-8 md:p-12 max-w-3xl space-y-3 sm:space-y-4 text-left">
              <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#d4a373] drop-shadow-sm">
                {heroTitles[activeTitleIndex].subtitle}
              </span>
              
              {/* The Hero Title (Matching user's image serif typography) */}
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15] drop-shadow-lg">
                {heroTitles[activeTitleIndex].title}
              </h2>

              <p className="text-xs sm:text-base text-[#ede0d4] leading-relaxed max-w-2xl font-normal drop-shadow-md">
                {heroTitles[activeTitleIndex].desc}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={onExploreMotto}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#d4a373] hover:bg-[#b58351] text-[#0d1b2a] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-lg hover:shadow-[#d4a373]/20"
                >
                  <span>Explore Our Motto</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                
                <a
                  href="/#products"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white font-medium text-xs sm:text-sm transition-all"
                >
                  <span>View Product Catalog</span>
                </a>
              </div>
            </div>

            {/* Indicator Dots at Bottom Right */}
            <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-2">
              {heroTitles.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTitleIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    activeTitleIndex === idx
                      ? 'w-8 bg-[#d4a373]'
                      : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* ======================================================================= */}
          {/* 3 TITLE CARDS: SIDE-BY-SIDE (1 2 3) ON MOBILE & 3-COL ON DESKTOP */}
          {/* ======================================================================= */}
          <div
            ref={cardsContainerRef}
            className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible pb-3 md:pb-0 gap-3 sm:gap-4 md:gap-6 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {heroTitles.map((item, index) => {
              const isActive = activeTitleIndex === index;
              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  onClick={() => setActiveTitleIndex(index)}
                  className={`shrink-0 w-[80vw] max-w-[320px] md:w-auto snap-center group relative text-left p-4 sm:p-5 md:p-6 rounded-2xl cursor-pointer transition-all duration-300 border overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-br from-[#1b263b] to-[#0d1b2a] border-[#d4a373] shadow-xl shadow-[#d4a373]/10 ring-1 ring-[#d4a373]'
                      : 'bg-[#0d1b2a]/80 hover:bg-[#1b263b]/80 border-[#1b263b] hover:border-[#d4a373]/50'
                  }`}
                >
                  {/* Subtle Gradient Glow inside Card */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl pointer-events-none transition-opacity duration-300 ${
                      isActive ? 'bg-[#d4a373]/15 opacity-100' : 'bg-white/5 opacity-0 group-hover:opacity-100'
                    }`}
                  />

                  {/* Card Header: Number & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md ${
                        isActive
                          ? 'bg-[#d4a373] text-[#0d1b2a]'
                          : 'bg-white/10 text-[#a88b74] group-hover:text-white'
                      }`}
                    >
                      {item.number}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#d4a373]">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title Typography (The 3 Titles requested by user) */}
                  <h3
                    className={`text-base sm:text-lg md:text-xl font-serif font-bold tracking-tight mb-2 leading-snug transition-colors ${
                      isActive
                        ? 'text-white'
                        : 'text-[#ede0d4] group-hover:text-white'
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Short excerpt */}
                  <p className="text-xs text-[#a88b74] line-clamp-2 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
