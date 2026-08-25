'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export interface ClientLogo {
  name: string;
  src: string;
}

export const clientLogos: ClientLogo[] = [
  { name: 'Dalmia Cement', src: '/images/Our Clients/Dalmia-Cement.webp' },
  { name: 'ITC Hotels', src: '/images/Our Clients/ITC-Hotel.webp' },
  { name: 'Jains Housing', src: '/images/Our Clients/Jains-Housing.webp' },
  { name: 'LifeCell', src: '/images/Our Clients/Life-Cell.webp' },
  { name: 'Mahatma School', src: '/images/Our Clients/Mahatma-School-Orange.webp' },
  { name: 'Meenakshi Mission', src: '/images/Our Clients/Meenakshi-Mission.webp' },
  { name: 'Pothys', src: '/images/Our Clients/Pothys.webp' },
  { name: 'Rane Group', src: '/images/Our Clients/Rane.webp' },
  { name: 'TVS Tyres', src: '/images/Our Clients/TVS-Tyres.webp' },
  { name: 'The American College', src: '/images/Our Clients/The-American-College.webp' },
  { name: 'The Ramco Cements', src: '/images/Our Clients/The-Ramco-Cement.webp' },
  { name: 'Urbando', src: '/images/Our Clients/Urbando.webp' },
  { name: 'Velammal Hospital', src: '/images/Our Clients/Velammal-Hospital.webp' },
];

export const ClientsSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const totalPages = 3;

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : totalPages));
  };

  const handleNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1));
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (scrollContainerRef.current) {
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const targetScroll = ((pageNumber - 1) / totalPages) * (scrollWidth / 3);
      scrollContainerRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
  };

  return (
    <section id="clients" className="relative py-16 sm:py-24 bg-[#0d1b2a] text-white border-b border-[#1b263b] overflow-hidden">
      
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16253b] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest shadow-sm font-sans border border-[#1b263b]">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#d4a373]" />
              <span>Trusted Partnerships</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-serif leading-[1.05]">
              Our <span className="italic font-normal text-[#d4a373]">Clients</span>
            </h2>

            <p className="text-sm sm:text-base text-[#ede0d4] font-normal leading-relaxed max-w-xl font-sans">
              Trusted by industry leaders, premier hospitality chains, healthcare landmarks, and renowned institutions nationwide.
            </p>
          </div>

          {/* < 1 2 3 > Interactive Pagination Navigation */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 self-start md:self-end">
            
            {/* Prev Arrow */}
            <button
              onClick={handlePrev}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#1b263b] hover:border-[#d4a373] bg-[#16253b] hover:bg-[#0d1b2a] text-[#ede0d4] hover:text-[#d4a373] flex items-center justify-center transition-all shadow-sm active:scale-95 focus:outline-none cursor-pointer"
              aria-label="Previous Clients"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page Number Pills (1, 2, 3) */}
            <div className="flex items-center gap-1.5 bg-[#16253b] p-1 rounded-full border border-[#1b263b]">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  onClick={() => handlePageClick(num)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs font-bold transition-all focus:outline-none cursor-pointer ${
                    currentPage === num
                      ? 'bg-[#d4a373] text-[#0d1b2a] shadow-sm scale-105 font-black'
                      : 'text-[#dfcfbe] hover:text-white hover:bg-[#0d1b2a]'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            {/* Next Arrow */}
            <button
              onClick={handleNext}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#1b263b] hover:border-[#d4a373] bg-[#16253b] hover:bg-[#0d1b2a] text-[#ede0d4] hover:text-[#d4a373] flex items-center justify-center transition-all shadow-sm active:scale-95 focus:outline-none cursor-pointer"
              aria-label="Next Clients"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

          </div>
        </div>

        {/* NON-STOP CONTINUOUS INFINITE RUNNING LOGO MARQUEE WITH ZERO CLIPPING */}
        <div className="relative w-full overflow-hidden py-2">
          
          {/* Left & Right Seamless Vignette Gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#0d1b2a] via-[#0d1b2a]/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#0d1b2a] via-[#0d1b2a]/80 to-transparent z-20 pointer-events-none" />

          {/* Continuous Running Marquee Container (with ample vertical padding to prevent hover crop) */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-6 sm:py-8 px-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div
              className="flex gap-4 sm:gap-6 shrink-0 items-center py-2"
              style={{
                display: 'flex',
                width: 'max-content',
                animation: 'marqueeClients 28s linear infinite',
              }}
            >
              {/* First Set of 13 Logos */}
              {clientLogos.map((client, idx) => (
                <div
                  key={`client-1-${idx}`}
                  className="w-[180px] sm:w-[220px] h-[90px] sm:h-[110px] rounded-2xl bg-white border border-neutral-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.08)] hover:border-neutral-400 p-4 sm:p-5 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shrink-0 group/card"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={client.src}
                      alt={client.name}
                      width={160}
                      height={70}
                      unoptimized
                      className="max-h-full max-w-full object-contain filter-none opacity-100 group-hover/card:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              ))}

              {/* Second Set of 13 Logos for Seamless Infinite Loop */}
              {clientLogos.map((client, idx) => (
                <div
                  key={`client-2-${idx}`}
                  className="w-[180px] sm:w-[220px] h-[90px] sm:h-[110px] rounded-2xl bg-white border border-neutral-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.08)] hover:border-neutral-400 p-4 sm:p-5 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shrink-0 group/card"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={client.src}
                      alt={client.name}
                      width={160}
                      height={70}
                      unoptimized
                      className="max-h-full max-w-full object-contain filter-none opacity-100 group-hover/card:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              ))}

              {/* Third Set of 13 Logos for Seamless Infinite Loop */}
              {clientLogos.map((client, idx) => (
                <div
                  key={`client-3-${idx}`}
                  className="w-[180px] sm:w-[220px] h-[90px] sm:h-[110px] rounded-2xl bg-white border border-neutral-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.08)] hover:border-neutral-400 p-4 sm:p-5 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shrink-0 group/card"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={client.src}
                      alt={client.name}
                      width={160}
                      height={70}
                      unoptimized
                      className="max-h-full max-w-full object-contain filter-none opacity-100 group-hover/card:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* CSS Animation for Non-Stop Continuous Infinite Clients Marquee */}
      <style jsx>{`
        @keyframes marqueeClients {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </section>
  );
};
