'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { History, MapPin } from 'lucide-react';

export const AboutHeritageStory: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const chapters = [
    {
      year: '1957',
      label: 'Phase 01',
      img: '/images/nature1.png',
      content:
        'Trilokchandji Hiran left Daspan in Rajasthan and came to Ahmedabad looking for a job after losing both his parents when he was very young. His search for work took him to several cities including Ahmedabad, Mumbai, Chennai, and finally Madurai in 1957. He tried his hand at various businesses such as selling plasticware, mehndi, turmeric, glucose, and pens before eventually settling into a business that he then grew by moving to different cities.',
    },
    {
      year: '1987',
      label: 'Phase 02',
      img: '/images/nature2.png',
      content:
        'Champalalji Hiran quit school early to help his father with his multiple businesses. He learned the ropes in various trades, including sarees, cassettes, watches, plasticware, and fast-moving consumer goods (FMCG). He also mastered hardware and plumbing and, in 1987, opened Hiran Pipe House.',
    },
    {
      year: '2014',
      label: 'Phase 03',
      img: '/images/shower_system.jpg',
      content:
        'With over 40 years of experience, he started as a distributor for various brands, won a few awards, and dreamt of starting his own brand based on his vast experience and contacts. He has three children who, after finishing their studies, joined the business. Together, they decided to start their brand “HIRAN” in 2014.',
    },
    {
      year: 'Present',
      label: 'Phase 04',
      img: '/images/bathtub.jpg',
      content:
        'The brand “HIRAN” took off quickly, serving more than 500 dealers in Tamil Nadu and over 50,000 customers in a few years, gaining popularity among plumbers, engineers, and contractors. They expanded their business from Tamil Nadu to Kerala, Karnataka, Maharashtra, Andhra Pradesh, Gujarat, and Rajasthan, strengthening their presence in the market.',
    },
  ];

  // Auto-switch tabs every 3 seconds (3000ms), pausing on user hover
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSelectedMilestone((prev) => (prev + 1) % chapters.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, chapters.length]);

  return (
    <section className="relative py-16 sm:py-24 bg-[#ede0d4]/30 text-[#0d1b2a] border-b border-[#e2d5c5] overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Nature 1 Leaf Decoration on the Right */}
        <div className="max-w-4xl mb-12 sm:mb-16 text-left">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#0d1b2a] font-serif leading-tight inline-flex items-center gap-3 sm:gap-5 flex-wrap">
            <span>
              Our Story & <span className="italic font-normal text-[#b58351]">Heritage</span>
            </span>
            <span className="relative inline-block w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 shrink-0 -mt-1 sm:-mt-2">
              <Image
                src="/images/nature1.png"
                alt="Nature Leaf Decoration"
                width={80}
                height={80}
                unoptimized
                className="w-full h-full object-contain"
              />
            </span>
          </h2>
        </div>

        {/* Milestone Selector Tabs */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10"
        >
          {chapters.map((m, idx) => {
            const isSelected = selectedMilestone === idx;
            return (
              <button
                key={m.year}
                onClick={() => setSelectedMilestone(idx)}
                className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#0d1b2a] text-white border-[#d4a373] shadow-xl ring-1 ring-[#d4a373] scale-[1.02]'
                    : 'bg-white text-[#0d1b2a] border-[#e2d5c5] hover:border-[#b58351] hover:bg-[#fbf9f5]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-2xl sm:text-3xl font-serif font-black ${
                      isSelected ? 'text-[#d4a373]' : 'text-[#0d1b2a]'
                    }`}
                  >
                    {m.year}
                  </span>
                  <span
                    className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isSelected
                        ? 'bg-white/10 text-[#ede0d4]'
                        : 'bg-[#ede0d4] text-[#7f5539]'
                    }`}
                  >
                    {m.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Selected Milestone Deep-Dive Card */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-[#e2d5c5] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 animate-in fade-in duration-300"
        >
          
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#ede0d4] border border-[#e2d5c5] shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={chapters[selectedMilestone].img}
                alt={`Hiran Heritage - ${chapters[selectedMilestone].year}`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a]/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4a373]">
                  {chapters[selectedMilestone].label}
                </span>
                <p className="text-2xl font-bold font-serif leading-tight text-[#ede0d4]">
                  {chapters[selectedMilestone].year}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Narrative */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-serif font-black text-[#b58351]">
                {chapters[selectedMilestone].year}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#f5efe6] text-[#7f5539] border border-[#e2d5c5]">
                {chapters[selectedMilestone].label}
              </span>
            </div>

            {/* Exact Narrative Excerpt from User Text */}
            <p className="text-base sm:text-lg md:text-xl text-[#334155] font-serif leading-relaxed sm:leading-loose font-normal bg-[#fcfaf7] p-5 sm:p-6 rounded-2xl border border-[#e2d5c5]/80">
              {chapters[selectedMilestone].content}
            </p>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* COMPLETE FULL 4-CHAPTER GRID WITH EXACT TEXT */}
        {/* ========================================================================= */}
        <div className="bg-[#0d1b2a] text-white rounded-3xl p-6 sm:p-10 md:p-14 border border-[#1b263b] shadow-2xl space-y-8">
          
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              The Complete Chronicle of Hiran
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
            
            {/* Paragraph 1: 1957 Origins */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#d4a373]/50 transition-colors space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-serif font-bold text-[#d4a373]">1957</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#a88b74] px-2.5 py-1 rounded bg-white/5">
                  Phase 01
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#dfcfbe] font-serif leading-relaxed font-normal">
                Trilokchandji Hiran left Daspan in Rajasthan and came to Ahmedabad looking for a job after losing both his parents when he was very young. His search for work took him to several cities including Ahmedabad, Mumbai, Chennai, and finally Madurai in 1957. He tried his hand at various businesses such as selling plasticware, mehndi, turmeric, glucose, and pens before eventually settling into a business that he then grew by moving to different cities.
              </p>
            </div>

            {/* Paragraph 2: 1987 Hiran Pipe House */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#d4a373]/50 transition-colors space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-serif font-bold text-[#d4a373]">1987</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#a88b74] px-2.5 py-1 rounded bg-white/5">
                  Phase 02
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#dfcfbe] font-serif leading-relaxed font-normal">
                Champalalji Hiran quit school early to help his father with his multiple businesses. He learned the ropes in various trades, including sarees, cassettes, watches, plasticware, and fast-moving consumer goods (FMCG). He also mastered hardware and plumbing and, in 1987, opened Hiran Pipe House.
              </p>
            </div>

            {/* Paragraph 3: 2014 Brand HIRAN */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#d4a373]/50 transition-colors space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-serif font-bold text-[#d4a373]">2014</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#a88b74] px-2.5 py-1 rounded bg-white/5">
                  Phase 03
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#dfcfbe] font-serif leading-relaxed font-normal">
                With over 40 years of experience, he started as a distributor for various brands, won a few awards, and dreamt of starting his own brand based on his vast experience and contacts. He has three children who, after finishing their studies, joined the business. Together, they decided to start their brand “HIRAN” in 2014.
              </p>
            </div>

            {/* Paragraph 4: Nationwide Growth */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#d4a373]/50 transition-colors space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-serif font-bold text-[#d4a373]">Present</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#a88b74] px-2.5 py-1 rounded bg-white/5">
                  Phase 04
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#dfcfbe] font-serif leading-relaxed font-normal">
                The brand “HIRAN” took off quickly, serving more than 500 dealers in Tamil Nadu and over 50,000 customers in a few years, gaining popularity among plumbers, engineers, and contractors. They expanded their business from Tamil Nadu to Kerala, Karnataka, Maharashtra, Andhra Pradesh, Gujarat, and Rajasthan, strengthening their presence in the market.
              </p>
            </div>

          </div>

          {/* Bottom State Expansion Strip */}
          <div className="p-5 rounded-2xl bg-white/10 border border-[#d4a373]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#d4a373] shrink-0" />
              <span className="font-bold text-white uppercase tracking-wider">States Present:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#ede0d4]">
              {['Tamil Nadu', 'Kerala', 'Karnataka', 'Maharashtra', 'Andhra Pradesh', 'Gujarat', 'Rajasthan'].map((st) => (
                <span key={st} className="px-2.5 py-1 rounded-md bg-black/40 border border-white/10 text-[#d4a373]">
                  {st}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
