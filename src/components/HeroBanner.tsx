'use client';

import React from 'react';
import Image from 'next/image';

interface HeroBannerProps {
  onOpenInquiry?: () => void;
  onExploreProducts?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = () => {
  return (
    <section id="home" className="relative w-full bg-white overflow-hidden select-none">
      {/* Slim horizontal YouTube channel banner across full width */}
      <div className="relative w-full h-[150px] sm:h-[180px] md:h-[220px] lg:h-[250px] overflow-hidden bg-neutral-100 border-b border-neutral-200 pointer-events-none select-none">
        <Image
          src="/images/hero-banner.png"
          alt="Hiranbath Hero Banner"
          fill
          priority
          unoptimized={true}
          quality={100}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          className="object-cover object-center w-full h-full select-none pointer-events-none [-webkit-user-drag:none]"
          sizes="100vw"
        />
      </div>
    </section>
  );
};
