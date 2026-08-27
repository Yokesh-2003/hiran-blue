'use client';

import React from 'react';
import { Target, Eye, CheckCircle } from 'lucide-react';

export const AboutValues: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 bg-[#f7f4ee] text-[#0d1b2a] border-b border-[#e2d5c5] overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split: Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Vision Card */}
          <div className="relative p-8 sm:p-10 rounded-3xl bg-white border border-[#e2d5c5] shadow-lg flex flex-col justify-between overflow-hidden group hover:border-[#d4a373] transition-all">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#d4a373]/15 to-transparent rounded-tr-3xl pointer-events-none" />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0d1b2a] text-[#d4a373] flex items-center justify-center mb-6 shadow-md">
                <Eye className="w-6 h-6 stroke-[2]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#b58351] block mb-2">
                Our Vision
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0d1b2a] mb-4">
                To define the global gold standard in luxury architectural bath fittings.
              </h3>
              <p className="text-sm text-[#5c677d] leading-relaxed font-normal">
                We envision bathrooms not merely as utility zones, but as personal wellness sanctuaries where precision engineering and aesthetic sublime come together seamlessly.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#f0e6da] flex items-center gap-2 text-xs font-bold text-[#0d1b2a]">
              <CheckCircle className="w-4 h-4 text-[#b58351]" />
              <span>Pioneering Indian Luxury on the World Stage</span>
            </div>
          </div>

          {/* Mission Card */}
          <div className="relative p-8 sm:p-10 rounded-3xl bg-white border border-[#e2d5c5] shadow-lg flex flex-col justify-between overflow-hidden group hover:border-[#d4a373] transition-all">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#1b263b]/10 to-transparent rounded-tr-3xl pointer-events-none" />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0d1b2a] text-[#d4a373] flex items-center justify-center mb-6 shadow-md">
                <Target className="w-6 h-6 stroke-[2]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#b58351] block mb-2">
                Our Mission
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0d1b2a] mb-4">
                Delivering flawless craftsmanship, lifetime durability, and mutual prosperity.
              </h3>
              <p className="text-sm text-[#5c677d] leading-relaxed font-normal">
                To empower architects, developers, and homeowners with fixtures of uncompromising quality while fostering deep community ties and equitable growth across all our trade partners.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#f0e6da] flex items-center gap-2 text-xs font-bold text-[#0d1b2a]">
              <CheckCircle className="w-4 h-4 text-[#b58351]" />
              <span>Unwavering Commitment to Durability & Service</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
