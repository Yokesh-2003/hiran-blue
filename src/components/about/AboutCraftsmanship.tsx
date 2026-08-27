'use client';

import React, { useState } from 'react';
import { Layers, ShieldCheck, Droplet, Sparkles, Flame, CheckCircle2, Award } from 'lucide-react';

export const AboutCraftsmanship: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      id: 'materials',
      title: 'Virgin Metallurgy',
      subtitle: 'Pure Lead-Free Brass & SS304/SS316',
      icon: ShieldCheck,
      desc: 'We never compromise on ingot purity. Every casting utilizes certified virgin metals devoid of toxic fillers, preventing internal calcification and ensuring potable water safety for decades.',
      metrics: '100% Virgin Ingot Purity',
      specs: [
        'High-density non-porous structure',
        'Lead-safe certified composition',
        'Exceptional tensile strength',
        'Immunity to dezincification',
      ],
    },
    {
      id: 'pvd',
      title: '10-Layer PVD Nano-Armor',
      subtitle: 'Physical Vapor Deposition Finishing',
      icon: Sparkles,
      desc: 'Our fixtures undergo molecular-level titanium vapor bonding inside high-vacuum chambers. The resulting surface is 3x harder than standard chrome and impervious to scratches, fingerprints, and harsh cleaning agents.',
      metrics: '3X Harder Than Chrome',
      specs: [
        'PVD Brushed Gold & Gunmetal',
        'Anti-tarnish and scratch-proof',
        'Hydrophobic oleophobic top layer',
        'Zero peeling or color fading',
      ],
    },
    {
      id: 'testing',
      title: '500-Hr Salt Spray Stress Test',
      subtitle: 'Defeating High-Humidity Coastal Climates',
      icon: Flame,
      desc: 'Tested under ASTM B117 international corrosion standards. Subjected to continuous 500-hour saline fog mist and 500,000 valve handle cycles without a single leak or surface breakdown.',
      metrics: '500,000+ Cycles Tested',
      specs: [
        'ASTM B117 salt mist certified',
        '16 Bar hydrostatic pressure test',
        'Ceramic disc cartridge precision',
        'Extreme thermal shock endurance',
      ],
    },
    {
      id: 'eco',
      title: 'Smart Eco-Aeration',
      subtitle: 'Sustainable Flow Technology',
      icon: Droplet,
      desc: 'Engineered with German Neoperl air-infusion nozzles that blend millions of microscopic air bubbles into the water stream, delivering a luxurious voluminous splash-free cascade while conserving up to 40% water.',
      metrics: 'Up to 40% Water Savings',
      specs: [
        'Neoperl Swiss-grade aerators',
        'Anti-lime silicone nozzles',
        'Constant flow rate under variable pressure',
        'Green Building LEED compliant',
      ],
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 bg-[#0d1b2a] text-white border-b border-[#1b263b] overflow-hidden font-sans">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest shadow-sm font-sans border border-[#d4a373]/30">
            <Layers className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#d4a373]" />
            <span>Industrial Mastery</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-serif leading-[1.1]">
            Precision <span className="italic font-normal text-[#d4a373]">Craftsmanship</span>
          </h2>

          <p className="text-sm sm:text-lg text-[#dfcfbe] font-serif leading-relaxed max-w-2xl mx-auto font-normal">
            Where metallurgy meets fine jewelry polishing. Explore the uncompromising standards behind every Hiranbath artifact.
          </p>
        </div>

        {/* 4 Craftsmanship Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            const isHovered = activeTab === idx;
            return (
              <div
                key={p.id}
                onMouseEnter={() => setActiveTab(idx)}
                className={`relative p-6 rounded-2xl sm:rounded-3xl transition-all duration-300 border flex flex-col justify-between ${
                  isHovered
                    ? 'bg-[#1b263b] border-[#d4a373] shadow-xl shadow-[#d4a373]/10 scale-[1.02]'
                    : 'bg-[#112235] border-white/10 hover:border-[#d4a373]/50'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0d1b2a] border border-[#d4a373]/40 text-[#d4a373] flex items-center justify-center mb-5 shadow-inner">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4a373] block mb-1">
                    Standard 0{idx + 1}
                  </span>

                  <h3 className="text-xl font-serif font-bold text-white mb-2 leading-snug">
                    {p.title}
                  </h3>

                  <p className="text-xs text-[#a88b74] mb-4 font-medium">
                    {p.subtitle}
                  </p>

                  <p className="text-xs text-[#dfcfbe] leading-relaxed mb-6 font-normal">
                    {p.desc}
                  </p>

                  {/* Feature Checkpoints */}
                  <div className="space-y-2 pt-4 border-t border-white/10">
                    {p.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-[11px] text-[#ede0d4]/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#d4a373] shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#d4a373]">
                  <span>Benchmark</span>
                  <span>{p.metrics}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
