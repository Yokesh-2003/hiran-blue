'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, MapPin, Wrench, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineTrackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const track = timelineTrackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startOffset = windowHeight * 0.75;
      const totalHeight = rect.height;
      const currentScroll = startOffset - rect.top;

      const progress = Math.min(Math.max((currentScroll / totalHeight) * 100, 0), 100);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const is1957Active = scrollProgress >= 10;
  const is1987Active = scrollProgress >= 55;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-14 sm:py-24 lg:py-28 bg-[#fcfcfc] text-neutral-900 border-b border-neutral-200 overflow-hidden"
    >
      {/* Subtle Architectural Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (Playfair Serif Font for Title & Subtitle with Gold Italic Accent) */}
        <div className="max-w-3xl mb-10 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-neutral-900 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest shadow-sm font-sans">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-neutral-300" />
            <span>Legacy & Heritage</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-950 font-serif leading-[1.05]">
            About <span className="italic font-normal text-[#c59a3f]">Us</span>
          </h2>

          <p className="text-base sm:text-xl text-neutral-800 font-serif leading-relaxed max-w-2xl font-normal">
            A generational story of{' '}
            <span className="italic font-semibold text-[#c59a3f]">resilience, entrepreneurial spirit</span>, and uncompromising craftsmanship that shaped the foundation of modern luxury bathware.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Visual Showcase & Stats Strip */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6 lg:sticky lg:top-28">
            
            {/* Primary Visual */}
            <div className="relative w-full rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 bg-white/90 backdrop-blur-xl border border-neutral-200 shadow-[0_15px_45px_rgba(0,0,0,0.05)]">
              <div className="relative w-full aspect-[16/9] sm:aspect-[4/3] min-h-[220px] sm:min-h-[280px] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/shower_system.jpg"
                  alt="Hiran - Bath Heritage"
                  loading="eager"
                  className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5 text-white font-sans pointer-events-none">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-neutral-300">
                    Hiranbath Heritage
                  </span>
                  <h3 className="text-base sm:text-xl font-bold font-display-impact mt-0.5 leading-tight">
                    A Legacy of Trust & Craftsmanship
                  </h3>
                </div>
              </div>
            </div>

            {/* 3 Metric Cards Grid */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 font-sans">
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-neutral-200/90 shadow-sm text-center">
                <p className="text-xl sm:text-2xl font-black text-neutral-950 font-display-impact">1957</p>
                <p className="text-[9px] sm:text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Founded</p>
              </div>
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-neutral-200/90 shadow-sm text-center">
                <p className="text-xl sm:text-2xl font-black text-neutral-950 font-display-impact">1987</p>
                <p className="text-[9px] sm:text-[10px] uppercase font-bold text-neutral-500 tracking-wider">Pipe House</p>
              </div>
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-neutral-950 text-white shadow-md text-center">
                <p className="text-xl sm:text-2xl font-black text-white font-display-impact">65+</p>
                <p className="text-[9px] sm:text-[10px] uppercase font-bold text-neutral-300 tracking-wider">Years Trust</p>
              </div>
            </div>

          </div>

          {/* Right Column: Timeline & Story Cards (Original Font) */}
          <div className="lg:col-span-7 relative pt-2 lg:pt-0 font-sans">
            
            {/* Timeline Track Container */}
            <div ref={timelineTrackRef} className="relative space-y-6 sm:space-y-8">
              
              {/* 1. Track Background Line */}
              <div className="absolute left-4 sm:left-5 top-7 bottom-10 w-0.5 bg-neutral-200 -translate-x-1/2 rounded-full overflow-hidden">
                {/* 2. Active Scroll Fill Line in Luxury Gold */}
                <div
                  className="w-full bg-gradient-to-b from-[#d4af37] via-[#c59a3f] to-[#aa7c11] rounded-full transition-all duration-150 ease-out shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                  style={{ height: `${scrollProgress}%` }}
                />
              </div>

              {/* TIMELINE ITEM 1: 1957 */}
              <div className="relative pl-10 sm:pl-14 group">
                {/* Node 1 */}
                <div
                  className={`absolute left-4 sm:left-5 -translate-x-1/2 top-6 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-500 z-10 border-2 ${
                    is1957Active
                      ? 'bg-neutral-950 border-[#d4af37] text-[#d4af37] scale-105 sm:scale-110 shadow-lg ring-3 sm:ring-4 ring-[#d4af37]/25'
                      : 'bg-white border-neutral-300 text-neutral-400 scale-95 shadow-sm'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                {/* Card 1 */}
                <div className={`rounded-2xl sm:rounded-3xl p-5 sm:p-8 border transition-all duration-500 space-y-3 ${
                  is1957Active
                    ? 'bg-white border-neutral-300 shadow-[0_15px_40px_rgba(0,0,0,0.06)]'
                    : 'bg-neutral-50/70 border-neutral-200/80 opacity-85'
                }`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest transition-colors ${
                      is1957Active ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-600'
                    }`}>
                      The Founding Journey
                    </span>
                    <span className={`text-2xl sm:text-3xl font-black font-display-impact transition-colors ${
                      is1957Active ? 'text-neutral-950' : 'text-neutral-400'
                    }`}>
                      1957
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-neutral-950 leading-snug">
                    Trilokchandji Hiran & The Journey from Daspan to Madurai
                  </h4>

                  <p className="text-neutral-700 text-xs sm:text-[15px] leading-relaxed text-justify sm:text-left">
                    Trilokchandji Hiran left Daspan in Rajasthan and came to Ahmedabad looking for a job after losing both his parents when he was very young. His search for work took him to several cities including Ahmedabad, Mumbai, Chennai, and finally Madurai in 1957. He tried his hand at various businesses such as selling plasticware, mehndi, turmeric, glucose, and pens before eventually settling into a business that he then grew by moving to different cities.
                  </p>
                </div>
              </div>

              {/* TIMELINE ITEM 2: 1987 */}
              <div className="relative pl-10 sm:pl-14 group">
                {/* Node 2 */}
                <div
                  className={`absolute left-4 sm:left-5 -translate-x-1/2 top-6 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-500 z-10 border-2 ${
                    is1987Active
                      ? 'bg-neutral-950 border-[#d4af37] text-[#d4af37] scale-105 sm:scale-110 shadow-lg ring-3 sm:ring-4 ring-[#d4af37]/25'
                      : 'bg-white border-neutral-300 text-neutral-400 scale-95 shadow-sm'
                  }`}
                >
                  <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                {/* Card 2 */}
                <div className={`rounded-2xl sm:rounded-3xl p-5 sm:p-8 border transition-all duration-500 space-y-3 ${
                  is1987Active
                    ? 'bg-white border-neutral-300 shadow-[0_15px_40px_rgba(0,0,0,0.06)]'
                    : 'bg-neutral-50/70 border-neutral-200/80 opacity-85'
                }`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest transition-colors ${
                      is1987Active ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-600'
                    }`}>
                      Plumbing Mastery & Expansion
                    </span>
                    <span className={`text-2xl sm:text-3xl font-black font-display-impact transition-colors ${
                      is1987Active ? 'text-neutral-950' : 'text-neutral-400'
                    }`}>
                      1987
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-neutral-950 leading-snug">
                    Champalalji Hiran & The Opening of Hiran Pipe House
                  </h4>

                  <p className="text-neutral-700 text-xs sm:text-[15px] leading-relaxed text-justify sm:text-left">
                    Champalalji Hiran quit school early to help his father with his multiple businesses. He learned the ropes in various trades, including sarees, cassettes, watches, plasticware, and fast-moving consumer goods (FMCG). He also mastered hardware and plumbing and, in 1987, opened Hiran Pipe House.
                  </p>
                </div>
              </div>

              {/* Bottom Footer Action Bar */}
              <div className="pl-10 sm:pl-14 pt-2 sm:pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-t border-neutral-200">
                <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-neutral-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>65+ Years of Trust & Uncompromised Quality</span>
                </div>

                <a
                  href="#clients"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider transition-all transform hover:scale-105 shadow-md group w-full sm:w-auto font-sans"
                >
                  <span>Explore Our Clients</span>
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
