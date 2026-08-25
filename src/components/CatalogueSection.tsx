'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cataloguesData } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { Download, FileText, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const CatalogueSection: React.FC = () => {
  const { t } = useLanguage();
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (title: string) => {
    setDownloadSuccess(title);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 4000);
  };

  return (
    <section id="catalogue" className="py-20 sm:py-28 bg-[#ede0d4] text-[#0d1b2a] border-b border-[#d8c3af]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d1b2a] text-white text-xs font-bold uppercase tracking-widest border border-[#1b263b]">
            <Sparkles className="w-3.5 h-3.5 text-[#d4a373]" />
            {t('catalogueBadge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#0d1b2a] font-display-impact">
            {t('catalogueTitle')}
          </h2>
          <p className="text-[#5c677d] text-sm sm:text-base leading-relaxed">
            {t('catalogueDesc')}
          </p>
        </div>

        {downloadSuccess && (
          <div className="max-w-md mx-auto mb-8 bg-[#0d1b2a] border border-[#d4a373] text-[#d4a373] p-4 rounded-2xl flex items-center gap-3 text-xs font-bold animate-in fade-in shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-[#d4a373] shrink-0" />
            <span>&ldquo;{downloadSuccess}&rdquo; download initiated!</span>
          </div>
        )}

        {/* Catalogues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cataloguesData.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-3xl p-6 border border-[#d8c3af] hover:border-[#0d1b2a] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#ede0d4] border border-[#d8c3af] shadow-sm">
                  <Image
                    src={cat.coverImage}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a]/90 via-[#0d1b2a]/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-[#0d1b2a]/90 backdrop-blur-md text-[#d4a373] text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#d4a373]/30">
                    {cat.category}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-bold text-[#ede0d4]">{cat.edition}</p>
                    <h3 className="text-base font-bold font-display-impact">{cat.title}</h3>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#5c677d] font-medium px-1">
                  <span className="flex items-center gap-1">
                    <FileText className="w-4 h-4 text-[#b58351]" />
                    {cat.pages} Pages
                  </span>
                  <span>{cat.size}</span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => handleDownload(cat.title)}
                  className="w-full py-3.5 bg-[#0d1b2a] hover:bg-[#1b263b] text-[#ede0d4] hover:text-[#d4a373] text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer border border-[#1b263b]"
                >
                  <Download className="w-4 h-4 text-[#d4a373]" />
                  <span>{t('downloadPdf')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CAD & BIM Strip */}
        <div className="mt-12 p-6 sm:p-8 bg-[#0d1b2a] text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#1b263b] shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold font-display-impact text-white">
              Looking for 3D Revit / BIM & AutoCAD Files?
            </h4>
            <p className="text-xs text-[#ede0d4]">
              Download complete parametric Revit families (.rfa) and AutoCAD (.dwg) symbol libraries for all Hiranbath models.
            </p>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 bg-[#d4a373] hover:bg-[#b58351] text-[#0d1b2a] text-xs font-bold rounded-full transition-all shrink-0 flex items-center gap-2 shadow-md transform hover:scale-105"
          >
            <span>Request BIM Portal Access</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
