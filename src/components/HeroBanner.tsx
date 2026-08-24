'use client';

import React from 'react';

interface HeroBannerProps {
  onOpenInquiry?: () => void;
  onExploreProducts?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = () => {
  return (
    <section id="home" className="relative w-full bg-white overflow-hidden">
      {/* Slim horizontal YouTube channel banner across full width */}
      <div className="relative w-full aspect-[16/6] sm:aspect-[21/6] md:aspect-[24/5] min-h-[140px] sm:min-h-[180px] md:min-h-[220px] max-h-[280px] overflow-hidden bg-neutral-100 border-b border-neutral-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-banner.png"
          alt="Hiran - Bath Hero Banner"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>
    </section>
  );
};
