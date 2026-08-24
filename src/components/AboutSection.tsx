'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Award, Compass, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 sm:py-28 bg-white text-neutral-900 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-950 font-display-impact">
            {t('aboutTitle')}
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            {t('aboutDesc')}
          </p>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Imagery Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 bg-neutral-100">
              <Image
                src="/images/shower_system.jpg"
                alt="Hiranbath Craftsmanship"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-xs font-bold uppercase tracking-widest text-neutral-300">
                  Precision Robotics & Hand Polish
                </div>
                <div className="text-xl font-bold font-display-impact">
                  Zero Micro-Defect Quality Standard
                </div>
              </div>
            </div>

            {/* Floating Experience Card */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-neutral-900 text-white p-5 rounded-2xl shadow-2xl border border-neutral-800 flex items-center gap-4 max-w-xs">
              <div className="w-12 h-12 rounded-xl bg-white text-neutral-950 flex items-center justify-center font-black text-xl font-display-impact">
                25+
              </div>
              <div>
                <p className="text-sm font-bold">{t('aboutYears')}</p>
                <p className="text-[11px] text-neutral-400">{t('aboutYearsSub')}</p>
              </div>
            </div>
          </div>

          {/* Right Features & Core Values */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">
                Crafted for Discerning Architects, Interior Designers & Homeowners
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Every mixer, rain head, and fireclay basin undergoes a rigorous 14-stage manufacturing process, combining high-pressure forging with diamond-level PVD surface molecular bonding.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-neutral-300 transition-colors">
                <Compass className="w-6 h-6 text-neutral-900 mb-2" />
                <h4 className="text-sm font-bold text-neutral-900">Custom Architectural Finishes</h4>
                <p className="text-xs text-neutral-600 mt-1">Available in Velvet Matte White, Brushed Titanium, Gunmetal, and Warm Rose Gold.</p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-neutral-300 transition-colors">
                <Award className="w-6 h-6 text-neutral-900 mb-2" />
                <h4 className="text-sm font-bold text-neutral-900">Eco-Hydraulic Aeration</h4>
                <p className="text-xs text-neutral-600 mt-1">Saves up to 40% water without compromising on plush velvety water pressure.</p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-neutral-300 transition-colors">
                <Shield className="w-6 h-6 text-neutral-900 mb-2" />
                <h4 className="text-sm font-bold text-neutral-900">15-Year Solid Warranty</h4>
                <p className="text-xs text-neutral-600 mt-1">Full replacement and maintenance coverage backed by verified service engineers.</p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-neutral-300 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-neutral-900 mb-2" />
                <h4 className="text-sm font-bold text-neutral-900">German Ceramic Discs</h4>
                <p className="text-xs text-neutral-600 mt-1">Tested for 500,000 continuous drip-free turns and silken single-lever glide.</p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 hover:text-black uppercase tracking-wider group"
              >
                <span>Read engineering whitepaper</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
