'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronRight } from 'lucide-react';

interface HeroBannerProps {
  onOpenInquiry?: () => void;
  onExploreProducts?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative w-full bg-white overflow-hidden">
      {/* 
        Standard YouTube Channel Banner Size:
        Slim horizontal strip (210px - 250px on desktop) across full width
      */}
      <div className="relative w-full h-[150px] sm:h-[180px] md:h-[220px] lg:h-[250px] overflow-hidden bg-neutral-100 border-b border-neutral-200">
        <Image
          src="/images/hero-banner.png"
          alt="Hiranbath Hero Banner"
          fill
          priority
          unoptimized={true}
          quality={100}
          className="object-cover object-center w-full h-full select-none"
          sizes="100vw"
        />
      </div>

      {/* Breadcrumb Navigation Strip */}
      <div className="w-full border-b border-neutral-100 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-1.5 text-[11px] sm:text-xs text-neutral-500 font-medium">
          <a href="#home" className="hover:text-black transition-colors">{t('home')}</a>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
          <a href="#products" className="hover:text-black transition-colors">{t('products')}</a>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
          <span className="text-neutral-900 font-bold">Aura Zero 2.0 Luxury Collection</span>
        </div>
      </div>
    </section>
  );
};
