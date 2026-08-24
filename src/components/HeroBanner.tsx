'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface HeroBannerProps {
  onOpenInquiry?: () => void;
  onExploreProducts?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = () => {
  const [imgSrc, setImgSrc] = useState('/images/hero-banner.png');

  return (
    <section id="home" className="relative w-full bg-white overflow-hidden">
      {/* Slim horizontal YouTube channel banner across full width */}
      <div className="relative w-full aspect-[16/6] sm:aspect-[21/6] md:aspect-[24/5] min-h-[130px] sm:min-h-[180px] md:min-h-[220px] max-h-[260px] overflow-hidden bg-neutral-100 border-b border-neutral-200">
        <Image
          src={imgSrc}
          alt="Hiran - Bath Hero Banner"
          fill
          priority
          unoptimized
          onError={() => setImgSrc('/images/hero%20banner.png')}
          className="object-cover object-center w-full h-full"
          sizes="100vw"
        />
      </div>
    </section>
  );
};
