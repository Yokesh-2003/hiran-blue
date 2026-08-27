'use client';

import React from 'react';
import { Award, Sparkles } from 'lucide-react';

export const AboutMotto: React.FC = () => {
  return (
    <section
      id="motto"
      className="relative py-16 sm:py-24 bg-[#f7f4ee] text-[#0d1b2a] border-b border-[#e2d5c5] overflow-hidden font-sans"
    >
      {/* Background Subtle Architectural Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-12">
        
        {/* Section Header */}
        <div className="space-y-4 text-left">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#0d1b2a] font-serif leading-[1.05]">
            Our <span className="italic font-normal text-[#b58351]">Motto</span>
          </h2>
        </div>

        {/* The Tri-Pillar Motto Title in Bold Editorial Typography */}
        <div className="pt-2 border-t border-[#e2d5c5]">
          <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-black tracking-wide text-[#0d1b2a] uppercase leading-snug sm:leading-relaxed">
            <span className="text-[#0d1b2a] hover:text-[#b58351] transition-colors">Quality and Durability</span>
            <span className="text-[#b58351] px-2 sm:px-4 font-normal font-sans text-base sm:text-2xl">|</span>
            <span className="text-[#0d1b2a] hover:text-[#b58351] transition-colors">Service and Assurance</span>
            <span className="text-[#b58351] px-2 sm:px-4 font-normal font-sans text-base sm:text-2xl">|</span>
            <span className="text-[#0d1b2a] hover:text-[#b58351] transition-colors">Co-operation and Prosperity</span>
          </h3>
        </div>

        {/* Exact Content in High-Readability Editorial Paragraph */}
        <div className="space-y-6 pt-2">
          <p className="text-base sm:text-xl md:text-2xl text-[#334155] font-serif leading-relaxed sm:leading-loose font-normal text-left">
            In summary, our motto encapsulates our commitment to delivering bathroom fittings of the highest quality and durability. We prioritize exceptional customer service and assurance, ensuring that every interaction with our brand exceeds your expectations. By fostering co-operation and prosperity, we aim to not only meet your needs but also contribute positively to the larger community.
          </p>
        </div>

      </div>
    </section>
  );
};
