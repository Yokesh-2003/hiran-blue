'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollTotal > 0) {
        const percent = (window.scrollY / scrollTotal) * 100;
        setScrollProgress(Math.min(100, Math.max(0, percent)));
        setIsVisible(percent >= 25);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 notranslate ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-5 scale-90 pointer-events-none'
      }`}
      translate="no"
    >
      <button
        onClick={scrollToTop}
        className="group relative w-12 h-12 rounded-full bg-[#16233b] text-white border border-[#1b2a4a] shadow-2xl hover:shadow-[0_10px_25px_rgba(22,35,59,0.35)] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[#0d1522] hover:border-[#d4af37] active:scale-95 focus:outline-none cursor-pointer"
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        {/* Subtle radial progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 48 48">
          <circle
            cx="24"
            cy="24"
            r="21"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-[#1b2a4a]"
          />
          <circle
            cx="24"
            cy="24"
            r="21"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeDasharray={132}
            strokeDashoffset={132 - (132 * scrollProgress) / 100}
            strokeLinecap="round"
            className="text-[#d4af37] transition-[stroke-dashoffset] duration-150"
          />
        </svg>

        {/* Up Arrow with smooth lift on hover */}
        <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5 text-white group-hover:text-[#d4af37]" />
      </button>
    </div>
  );
};
