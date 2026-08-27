'use client';

import React from 'react';
import { ArrowRight, Download, Store, Sparkles, PhoneCall, ArrowUpRight } from 'lucide-react';

interface AboutCtaProps {
  onOpenInquiry?: () => void;
}

export const AboutCta: React.FC<AboutCtaProps> = ({ onOpenInquiry }) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#0d1b2a] text-white font-sans">
      {/* WIDE PANORAMIC CTA CONTAINER WITH SAME BACKGROUND IMAGE */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] md:aspect-[24/9] min-h-[360px] sm:min-h-[420px] md:min-h-[480px] flex items-center justify-center py-12 sm:py-16 md:py-20">
        
        {/* Background Image: Same CTA Banner Image (/images/banner.png) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/banner.png"
          alt="Hiran - Bath Architectural Space"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover object-center [-webkit-user-drag:none]"
        />

        {/* Soft Dark Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a]/85 via-[#0d1b2a]/55 to-[#0d1b2a]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b2a]/70 via-[#0d1b2a]/30 to-[#0d1b2a]/70 pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-4 sm:space-y-6 pointer-events-auto">
          


          {/* Heading */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            Ready to Elevate Your <span className="italic font-normal text-[#d4a373]">Architectural Space?</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-base md:text-lg text-[#ede0d4] max-w-2xl mx-auto font-serif leading-relaxed font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            Connect with our luxury specification team for custom finish samples, BIM/CAD drawings, or find an authorized dealer showroom near you.
          </p>

          {/* Call-To-Action Buttons */}
          <div className="pt-2 sm:pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            
            {/* 1. Request Project Consultation Button */}
            <button
              onClick={onOpenInquiry}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full bg-[#d4a373] hover:bg-[#b58351] text-[#0d1b2a] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all transform hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(0,0,0,0.4)] cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Request Project Consultation</span>
            </button>

            {/* 2. Digital Catalogue Button */}
            <a
              href="/#catalogue"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full bg-[#0d1b2a]/80 hover:bg-[#0d1b2a] text-white hover:text-[#d4a373] border border-[#d4a373]/60 hover:border-[#d4a373] text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-md transition-all transform hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4a373]" />
              <span>Digital Catalogue</span>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};
