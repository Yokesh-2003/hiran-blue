'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black text-neutral-300 overflow-hidden border-t border-neutral-900">
      
      {/* GIANT FADED BACKGROUND WATERMARK (HIRAN® WITH OFFICIAL REGISTERED TRADEMARK CIRCLE) */}
      {/* Desktop Background Watermark */}
      <div className="notranslate absolute -bottom-10 left-1/2 -translate-x-1/2 text-neutral-900/35 text-[17vw] font-black uppercase tracking-wider font-display-impact pointer-events-none whitespace-nowrap hidden md:flex items-center">
        <span>HIRAN</span>
        <span className="text-[0.3em] font-sans font-bold -translate-y-8 ml-2 border-[0.06em] border-neutral-900/40 rounded-full w-[1.2em] h-[1.2em] inline-flex items-center justify-center">
          R
        </span>
      </div>

      {/* Mobile Vertical Watermark on Right Edge */}
      <div className="notranslate absolute right-1 top-24 bottom-12 text-neutral-900/35 text-6xl font-black uppercase tracking-[0.4em] [writing-mode:vertical-rl] font-display-impact pointer-events-none md:hidden">
        HIRAN®
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-16 pb-12 relative z-10">
        
        {/* MAIN 4-COLUMN FOOTER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 mb-14">
          
          {/* COLUMN 1: Logo & Direct Contact Details (ORIGINAL COLOR LOGO, NO BACKGROUND) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Transparent Original-Color Large Logo with enhanced dark text visibility */}
            <div className="inline-block">
              <Image
                src="/images/logo.webp"
                alt="HIRAN Bath Accessories"
                width={260}
                height={85}
                priority
                unoptimized
                className="h-14 sm:h-16 md:h-18 w-auto object-contain [filter:brightness(2.4)_contrast(1.15)_drop-shadow(0_0_0.75px_rgba(255,255,255,0.7))]"
              />
            </div>

            {/* Direct Contact List with Icons */}
            <div className="space-y-3 text-xs sm:text-[13px] text-neutral-300">
              
              {/* Phone */}
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <a href="tel:641-754-0072" className="hover:text-white transition-colors font-medium">
                  641-754-0072
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <a href="mailto:GavinEMaki@rhyta.com" className="hover:text-white transition-colors break-all font-medium">
                  GavinEMaki@rhyta.com
                </a>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <p className="leading-snug text-neutral-400">
                  1718 Park Boulevard Marshalltown, IA 50158
                </p>
              </div>

            </div>
          </div>

          {/* MIDDLE SECTION: 2 Columns Side-by-Side (Desktop: 2 cols, Mobile: 2 cols side-by-side) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-6 sm:gap-8">
            
            {/* COLUMN 2: Quick Link */}
            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm sm:text-base border-b-2 border-white pb-1 inline-block">
                Quick Link
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-neutral-400">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Our Product</a></li>
                <li><a href="#catalogue" className="hover:text-white transition-colors">Catalogue</a></li>
              </ul>
            </div>

            {/* COLUMN 3: Our Product */}
            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm sm:text-base border-b-2 border-white pb-1 inline-block">
                Our Product
              </h4>
              <ul className="space-y-2 text-xs sm:text-[13px] text-neutral-400">
                <li><a href="#products" className="hover:text-white transition-colors">Faucets</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Bath Seth</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Showers</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Valve</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Kitchen Sink</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Gratings & Showers</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Allieds</a></li>
              </ul>
            </div>

          </div>

          {/* COLUMN 4: Subscribe Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-sm sm:text-base border-b-2 border-white pb-1 inline-block">
              Subscribe Newsletter
            </h4>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & SCROLL TO TOP */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p className="text-center sm:text-left">
            Copyright © <span className="notranslate">Hiran®</span>. All rights reserved. | Powered by <span className="notranslate">yuyonix</span>
          </p>

          {/* Scroll to top floating button */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white flex items-center justify-center transition-all shadow-md active:scale-95 focus:outline-none"
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
