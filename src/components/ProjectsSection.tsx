'use client';

import React from 'react';
import Image from 'next/image';
import { projectsData } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, MapPin, Calendar, ArrowUpRight } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-20 sm:py-28 bg-[#ede0d4] text-[#0d1b2a] border-b border-[#d8c3af]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d1b2a] text-white text-xs font-bold uppercase tracking-widest border border-[#1b263b]">
              <Sparkles className="w-3.5 h-3.5 text-[#d4a373]" />
              {t('projectsBadge')}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#0d1b2a] font-display-impact">
              {t('projectsTitle')}
            </h2>
            <p className="text-[#5c677d] text-sm sm:text-base max-w-xl">
              {t('projectsDesc')}
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0d1b2a] hover:text-[#c8102e] group"
          >
            <span>Submit Your Project Spec</span>
            <ArrowUpRight className="w-4 h-4 text-[#0d1b2a] group-hover:text-[#c8102e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-3xl overflow-hidden border border-[#d8c3af] hover:border-[#0d1b2a] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Project Image */}
              <div className="relative aspect-[16/10] w-full bg-[#ede0d4] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a]/90 via-[#0d1b2a]/20 to-transparent" />
                
                <div className="absolute top-4 left-4 bg-[#0d1b2a]/90 backdrop-blur-md text-[#d4a373] text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-[#d4a373]/30 shadow">
                  {project.category}
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-4 text-[11px] font-medium text-[#ede0d4] mb-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#d4a373]" />
                      {project.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#d4a373]" />
                      {project.year}
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[#0d1b2a] group-hover:text-[#b58351] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#5c677d] leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#e2d5c5] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#7f5539]">
                    Custom Hiranbath Suite
                  </span>
                  <span className="text-xs font-bold text-[#0d1b2a] group-hover:text-[#c8102e] uppercase flex items-center gap-1 transition-colors">
                    Case Study <ArrowUpRight className="w-3.5 h-3.5 text-[#d4a373]" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
