'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export const ProductCategoriesSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef<boolean>(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const categories = [
    {
      id: 'faucets',
      name: 'Faucets',
      subtitle: 'Concealed & Basin Mixers',
      imageSrc: '/images/our products/Faucets.png',
      icon: null,
    },
    {
      id: 'bath-seth',
      name: 'Bath Seth',
      subtitle: 'Soaking Tubs & Wellness',
      imageSrc: '/images/our products/Bath Seth.png',
      icon: null,
    },
    {
      id: 'allieds',
      name: 'Allieds',
      subtitle: 'Architectural Fittings',
      imageSrc: '/images/our products/Allieds.png',
      icon: null,
    },
    {
      id: 'kitchen',
      name: 'Kitchen',
      subtitle: 'Sinks & Pull-Down Mixers',
      imageSrc: '/images/our products/Kitchen.png',
      icon: null,
    },
    {
      id: 'valves',
      name: 'Valves',
      subtitle: 'Precision Flow Controls',
      imageSrc: '/images/our products/Valves.png',
      icon: null,
    },
  ];

  // Smooth Scroll to Specific Product (1 to 5) with Scroll Lock to eliminate glitching
  const scrollToPage = (page: number) => {
    isProgrammaticScroll.current = true;
    setCurrentPage(page);

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cards = container.children;
      if (cards[page - 1]) {
        const targetCard = cards[page - 1] as HTMLElement;
        const targetOffset = targetCard.offsetLeft - container.offsetLeft - 16;
        container.scrollTo({
          left: Math.max(0, targetOffset),
          behavior: 'smooth',
        });
      }
    }

    // Release lock once smooth scrolling animation finishes
    scrollTimeout.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 600);
  };

  const handlePrev = () => {
    const prev = currentPage > 1 ? currentPage - 1 : categories.length;
    scrollToPage(prev);
  };

  const handleNext = () => {
    const next = currentPage < categories.length ? currentPage + 1 : 1;
    scrollToPage(next);
  };

  // Sync scroll position with active product number ONLY during manual touch/drag
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isProgrammaticScroll.current) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 15) return; // Ignore on desktop where all cards fit completely

      const scrollLeft = container.scrollLeft;
      const cards = Array.from(container.children) as HTMLElement[];
      
      let activeIndex = 0;
      let minDistance = Infinity;

      cards.forEach((card, index) => {
        const cardOffset = card.offsetLeft - container.offsetLeft;
        const distance = Math.abs(cardOffset - scrollLeft);
        if (distance < minDistance) {
          minDistance = distance;
          activeIndex = index;
        }
      });

      setCurrentPage(activeIndex + 1);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <section id="products" className="relative py-14 sm:py-22 bg-[#f8f8f9] text-neutral-900 border-t border-b border-neutral-200 overflow-hidden">
      
      {/* Subtle Background Architectural Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Left (nature1) and Right (nature2) Leaf Design */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-2 sm:space-y-3">
          <div className="flex items-center justify-center gap-2.5 sm:gap-6">
            {/* Left Leaf Image (nature1) */}
            <div className="relative w-7 h-7 sm:w-12 sm:h-12 shrink-0">
              <Image
                src="/images/nature1.png"
                alt="Leaf decoration left"
                width={48}
                height={48}
                unoptimized
                className="w-full h-full object-contain"
              />
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-950 font-serif leading-[1.05]">
              Our <span className="italic font-normal text-[#c59a3f]">Products</span>
            </h2>

            {/* Right Leaf Image (nature2) */}
            <div className="relative w-7 h-7 sm:w-12 sm:h-12 shrink-0">
              <Image
                src="/images/nature2.png"
                alt="Leaf decoration right"
                width={48}
                height={48}
                unoptimized
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <p className="text-xs sm:text-base text-neutral-600 font-normal leading-relaxed max-w-xl mx-auto font-sans">
            Engineered with aerospace-grade precision and timeless minimalist aesthetics for modern luxury sanctuaries.
          </p>
        </div>

        {/* 5 Luxury Architectural Category Cards - SINGLE LINE HORIZONTAL ROW ON MOBILE & DESKTOP */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto lg:grid lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 items-stretch pb-3 pt-1 px-1 no-scrollbar snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="min-w-[160px] sm:min-w-[190px] lg:min-w-0 w-full shrink-0 snap-center relative rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-md border border-neutral-200/90 hover:border-neutral-950 p-4 sm:p-6 lg:p-7 flex flex-col items-center justify-between text-center transition-all duration-500 hover:-translate-y-2 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] group cursor-pointer"
            >
              {/* Image / Icon rendered directly at full size */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 flex items-center justify-center my-1.5 transition-transform duration-300 transform group-hover:scale-110">
                {cat.imageSrc ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={cat.imageSrc}
                      alt={cat.name}
                      width={88}
                      height={88}
                      unoptimized
                      className="w-full h-full object-contain filter-none opacity-100 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-950">
                    {cat.icon}
                  </div>
                )}
              </div>

              {/* Title in Editorial Serif */}
              <div className="space-y-0.5 my-2">
                <h3 className="text-base sm:text-xl lg:text-2xl font-bold font-serif text-neutral-950 group-hover:text-neutral-950 tracking-tight leading-tight">
                  {cat.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-neutral-500 font-sans font-normal leading-tight">
                  {cat.subtitle}
                </p>
              </div>

              {/* Bottom Subtle Action Link */}
              <div className="mt-2 pt-2.5 border-t border-neutral-100 w-full flex items-center justify-center gap-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-700 group-hover:text-neutral-950 font-sans transition-colors">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* < 1 2 3 4 5 > INTERACTIVE PAGINATION CONTROLS (ONLY MOBILE/TABLET, HIDDEN ON PC) */}
        <div className="flex lg:hidden items-center justify-center gap-2 sm:gap-3 mt-8 sm:mt-10">
          
          {/* Prev Arrow */}
          <button
            onClick={handlePrev}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-300 hover:border-neutral-900 bg-white hover:bg-neutral-900 text-neutral-800 hover:text-white flex items-center justify-center transition-all shadow-sm active:scale-95 focus:outline-none cursor-pointer"
            aria-label="Previous Product"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page Number Pills (1, 2, 3, 4, 5) */}
          <div className="flex items-center gap-1 sm:gap-1.5 bg-neutral-100 p-1 rounded-full border border-neutral-200">
            {categories.map((_, index) => {
              const num = index + 1;
              return (
                <button
                  key={num}
                  onClick={() => scrollToPage(num)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs font-bold transition-all focus:outline-none cursor-pointer ${
                    currentPage === num
                      ? 'bg-neutral-950 text-white shadow-sm scale-105'
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200'
                  }`}
                  aria-label={`Go to product ${num}`}
                >
                  {num}
                </button>
              );
            })}
          </div>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-300 hover:border-neutral-900 bg-white hover:bg-neutral-900 text-neutral-800 hover:text-white flex items-center justify-center transition-all shadow-sm active:scale-95 focus:outline-none cursor-pointer"
            aria-label="Next Product"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

      </div>
    </section>
  );
};
