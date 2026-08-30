'use client';

import React, { useState, useEffect } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { ProductsShowcase } from '@/components/products/ProductsShowcase';
import { AboutCta } from '@/components/about/AboutCta';
import { Footer } from '@/components/Footer';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { ProductQuickViewModal } from '@/components/ProductQuickViewModal';
import { Product } from '@/types';

export default function ProductsPage() {
  const [mounted, setMounted] = useState(false);

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

  // Quick view state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);



  return (
    <LanguageProvider>
      <div
        suppressHydrationWarning
        className="min-h-screen bg-[#f7f4ee] text-[#0d1b2a] flex flex-col font-sans selection:bg-[#0d1b2a] selection:text-[#d4a373]"
      >
        {/* Navigation Bar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 pb-12 sm:pb-16 space-y-10 sm:space-y-14">
          


          {/* Products Showcase */}
          <ProductsShowcase
            onQuickView={(p) => setQuickViewProduct(p)}
          />

        </main>

        {/* CTA Banner: Experience the Luxury */}
        <AboutCta
          onOpenInquiry={() => {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Main Footer */}
        <Footer />

        {/* Scroll To Top Button */}
        <ScrollToTopButton />

        {/* Interactive Modal */}
        <ProductQuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onSelectProduct={(p) => setQuickViewProduct(p)}
        />
      </div>
    </LanguageProvider>
  );
}
