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
    <section id="catalogue" className="py-20 sm:py-28 bg-white text-neutral-900 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-bold uppercase tracking-widest border border-neutral-300">
            <Sparkles className="w-3.5 h-3.5 text-neutral-900" />
            {t('catalogueBadge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-950 font-display-impact">
            {t('catalogueTitle')}
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            {t('catalogueDesc')}
          </p>
        </div>

        {downloadSuccess && (
          <div className="max-w-md mx-auto mb-8 bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-2xl flex items-center gap-3 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>&ldquo;{downloadSuccess}&rdquo; download initiated!</span>
          </div>
        )}

        {/* Catalogues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cataloguesData.map((cat) => (
            <div
              key={cat.id}
              className="bg-neutral-50 rounded-3xl p-6 border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-neutral-200 border border-neutral-200 shadow-md">
                  <Image
                    src={cat.coverImage}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {cat.category}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-bold text-neutral-300">{cat.edition}</p>
                    <h3 className="text-base font-bold font-display-impact">{cat.title}</h3>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-500 font-medium px-1">
                  <span className="flex items-center gap-1">
                    <FileText className="w-4 h-4 text-neutral-400" />
                    {cat.pages} Pages
                  </span>
                  <span>{cat.size}</span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => handleDownload(cat.title)}
                  className="w-full py-3.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>{t('downloadPdf')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CAD & BIM Strip */}
        <div className="mt-12 p-6 sm:p-8 bg-neutral-900 text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold font-display-impact">
              Looking for 3D Revit / BIM & AutoCAD Files?
            </h4>
            <p className="text-xs text-neutral-400">
              Download complete parametric Revit families (.rfa) and AutoCAD (.dwg) symbol libraries for all Hiranbath models.
            </p>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 bg-white hover:bg-neutral-100 text-neutral-950 text-xs font-bold rounded-full transition-all shrink-0 flex items-center gap-2"
          >
            <span>Request BIM Portal Access</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
