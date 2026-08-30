'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LanguageProvider } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { AboutCta } from '@/components/about/AboutCta';
import { Footer } from '@/components/Footer';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import {
  Download,
  FolderArchive,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Send,
  Image as ImageIcon,
  ShieldCheck,
} from 'lucide-react';

export default function CataloguePage() {
  const [mounted, setMounted] = useState(false);
  const [downloadInitiated, setDownloadInitiated] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleDragStart = (e: DragEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'IMG') {
        e.preventDefault();
      }
    };
    window.addEventListener('dragstart', handleDragStart);
    return () => window.removeEventListener('dragstart', handleDragStart);
  }, []);

  const handleDownloadZip = () => {
    setDownloadInitiated(true);
    setTimeout(() => {
      setDownloadInitiated(false);
    }, 5000);

    const message = `Hello Hiran Bath,\n\nI would like to download the complete *Product Photos ZIP File (330 MB)* containing all 437 product images and specifications.\n\nPlease share the download link. Thank you!`;
    const whatsappUrl = `https://wa.me/919585117901?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };



  return (
    <LanguageProvider>
      <div
        suppressHydrationWarning
        className="min-h-screen bg-[#f7f4ee] text-[#0d1b2a] flex flex-col font-sans selection:bg-[#0d1b2a] selection:text-[#d4a373]"
      >
        {/* Navigation Bar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-14 sm:pb-20 space-y-8 sm:space-y-12">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#7f5539] font-medium">
            <Link href="/" className="hover:text-[#0d1b2a] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#0d1b2a] font-bold uppercase tracking-wider">
              Catalogue
            </span>
          </div>

          {/* Simple Clean Top Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3 pt-2 sm:pt-4">
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#0d1b2a] tracking-tight leading-tight">
              Product Photos <span className="italic font-normal text-[#b58351]">Catalogue</span>
            </h1>

            <p className="text-xs sm:text-base text-[#7f5539] leading-relaxed">
              Download the complete ZIP archive containing high-resolution product photography and authentic model-coded images across all collections.
            </p>
          </div>

          {/* Download Status Alert */}
          {downloadInitiated && (
            <div className="p-4 rounded-2xl bg-[#0d1b2a] border border-[#d4a373] text-[#d4a373] flex items-center justify-center gap-3 text-xs font-bold animate-in fade-in shadow-xl max-w-md mx-auto text-center">
              <CheckCircle2 className="w-5 h-5 text-[#d4a373] shrink-0" />
              <span>Product Photos ZIP download request initiated!</span>
            </div>
          )}

          {/* Clean Main Download Card */}
          <div className="bg-white rounded-3xl border-2 border-[#e2d5c5] hover:border-[#d4a373] p-6 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 items-center">
              
              {/* Left Image Preview */}
              <div className="md:col-span-5 flex items-center justify-center">
                <div className="relative aspect-square w-full max-w-[260px] rounded-2xl bg-[#fbf9f5] border border-[#e2d5c5] p-6 flex flex-col items-center justify-center text-center shadow-inner group">
                  <div className="w-20 h-20 rounded-2xl bg-[#0d1b2a] text-[#d4a373] flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform">
                    <FolderArchive className="w-10 h-10" />
                  </div>
                  <span className="text-xs font-bold text-[#0d1b2a] uppercase tracking-wider">
                    Product Photos.zip
                  </span>
                  <span className="text-[11px] font-medium text-[#7f5539] pt-0.5">
                    ZIP Archive
                  </span>
                </div>
              </div>

              {/* Right Content & Download Buttons */}
              <div className="md:col-span-7 space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f5efe6] text-[#7f5539] text-[10px] font-bold uppercase tracking-wider border border-[#e2d5c5]">
                    <span>Complete Collection</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0d1b2a] leading-snug">
                    All Products Photo Archive
                  </h2>

                  <p className="text-xs sm:text-sm text-[#7f5539] leading-relaxed">
                    Download the complete package including Faucets, Allieds, Showers, Bath Seth, Valves, and Kitchen products.
                  </p>
                </div>

                {/* Download Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="button"
                    onClick={handleDownloadZip}
                    className="flex-1 py-4 px-6 rounded-2xl bg-[#0d1b2a] hover:bg-[#1b263b] text-[#d4a373] hover:text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Download className="w-4 h-4 text-[#d4a373]" />
                    <span>Download Product ZIP File</span>
                  </button>

                  <a
                    href="https://wa.me/919585117901?text=Hello%20Hiran%20Bath,%20please%20send%20the%20Product%20Photos%20ZIP%20file."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-4 px-5 rounded-2xl bg-[#d4a373] hover:bg-[#c69260] text-[#0d1b2a] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 text-center"
                  >
                    <Send className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </main>

        {/* Banner Below: Ready to Elevate Your Architectural Space? */}
        <AboutCta
          onOpenInquiry={() => {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Footer Below */}
        <Footer />

        {/* Scroll To Top Button */}
        <ScrollToTopButton />
      </div>
    </LanguageProvider>
  );
}
