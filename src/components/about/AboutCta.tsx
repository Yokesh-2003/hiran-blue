'use client';

import React from 'react';
import { Download, PhoneCall } from 'lucide-react';

interface AboutCtaProps {
  onOpenInquiry?: () => void;
}

export const AboutCta: React.FC<AboutCtaProps> = ({ onOpenInquiry }) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#0d1b2a] text-white">
      {/* WIDE PANORAMIC CONTAINER (EXACT SAME AS HOME PAGE CTA BANNER) */}
      <div className="relative w-full aspect-[16/8] sm:aspect-[21/9] md:aspect-[24/9] min-h-[180px] sm:min-h-[320px] md:min-h-[420px] flex items-center justify-center py-8 sm:py-16 md:py-20">
        
        {/* Background Image: Same CTA Banner Image (/images/banner.png) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/banner.png"
          alt="Hiran - Bath Architectural Space"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover object-center [-webkit-user-drag:none]"
        />

        {/* Soft Dark Blue Gradient Overlays (Identical to Home Page Banner) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a]/60 via-[#0d1b2a]/30 to-[#0d1b2a]/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b2a]/45 via-transparent to-[#0d1b2a]/45 pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-2 sm:space-y-4 md:space-y-6 pointer-events-auto">
          
          {/* Main Headline in Bold Luxury Editorial Serif */}
          <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white font-serif leading-[1.05] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            Ready to Elevate Your <span className="italic font-normal text-[#d4a373]">Architectural Space?</span>
          </h2>

          {/* Subtitle */}
          <p className="text-[10px] sm:text-sm md:text-lg text-[#ede0d4] font-normal leading-tight sm:leading-relaxed max-w-[280px] sm:max-w-xl md:max-w-2xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] font-sans">
            Connect with our luxury specification team for custom finish samples, BIM/CAD drawings, or find an authorized dealer showroom near you.
          </p>

          {/* Two Interactive Call-To-Action Buttons (Horizontal on all screen sizes) */}
          <div className="pt-1.5 sm:pt-3 flex flex-row items-center justify-center gap-2 sm:gap-4">
            
            {/* 1. Request Project Consultation Button */}
            <button
              type="button"
              onClick={onOpenInquiry}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-7 sm:py-3.5 rounded-full bg-[#d4a373] hover:bg-[#c69260] text-[#0d1b2a] text-[9px] sm:text-xs md:text-sm font-bold uppercase tracking-wider transition-all transform hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(0,0,0,0.4)] cursor-pointer shrink-0"
            >
              <PhoneCall className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Request Project Consultation</span>
            </button>

            {/* 2. Digital Catalogue Button */}
            <a
              href="/#catalogue"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-7 sm:py-3.5 rounded-full bg-[#0d1b2a]/80 hover:bg-[#0d1b2a] text-white hover:text-[#d4a373] border border-[#d4a373]/60 hover:border-[#d4a373] text-[9px] sm:text-xs md:text-sm font-bold uppercase tracking-wider backdrop-blur-md transition-all transform hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(0,0,0,0.4)] shrink-0"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4 text-[#d4a373]" />
              <span>Digital Catalogue</span>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};
