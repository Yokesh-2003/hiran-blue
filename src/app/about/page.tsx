'use client';

import React, { useState, useEffect } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutMotto } from '@/components/about/AboutMotto';
import { AboutHeritageStory } from '@/components/about/AboutHeritageStory';
import { AboutCta } from '@/components/about/AboutCta';
import { Footer } from '@/components/Footer';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { InquiryModal } from '@/components/InquiryModal';
import { CartDrawer } from '@/components/CartDrawer';
import { ProductQuickViewModal } from '@/components/ProductQuickViewModal';
import { Product } from '@/types';
import { productsData } from '@/data/mockData';

export default function AboutPage() {
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

  // Cart state
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([
    { product: productsData[0], quantity: 1 },
    { product: productsData[1], quantity: 1 },
  ]);
  const [cartOpen, setCartOpen] = useState(false);

  // Quick view state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Inquiry modal state
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryTopic, setInquiryTopic] = useState('About Hiranbath Specification & Legacy');

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenGeneralInquiry = () => {
    setInquiryTopic('About Hiran - Architecture & Specification Inquiries');
    setInquiryOpen(true);
  };

  const handleScrollToMotto = () => {
    const el = document.getElementById('motto');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#f7f4ee] text-[#0d1b2a] flex flex-col font-sans">
        <div className="w-full h-8 bg-[#0d1b2a]" />
        <div className="w-full h-16 bg-white border-b border-neutral-200" />
      </div>
    );
  }

  return (
    <LanguageProvider>
      <div
        suppressHydrationWarning
        className="min-h-screen bg-[#f7f4ee] text-[#0d1b2a] flex flex-col font-sans selection:bg-[#0d1b2a] selection:text-[#d4a373]"
      >
        {/* Navigation Bar */}
        <Navbar />

        {/* Hero Banner with 3 Titles and Gradient Overlays on Top */}
        <AboutHero
          onExploreMotto={handleScrollToMotto}
          onOpenInquiry={handleOpenGeneralInquiry}
        />

        {/* Our Motto Section with 3 Pillars and Exact Summary Statement */}
        <AboutMotto />

        {/* Heritage & Generational Milestones (1957 to Present) */}
        <AboutHeritageStory />

        {/* CTA Banner: Experience the Luxury & Consultation */}
        <AboutCta onOpenInquiry={handleOpenGeneralInquiry} />

        {/* Main Footer */}
        <Footer />

        {/* Scroll To Top Button */}
        <ScrollToTopButton />

        {/* Interactive Modals */}
        <ProductQuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />

        <CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          items={cartItems}
          onRemoveItem={handleRemoveFromCart}
          onClearCart={handleClearCart}
          onProceedToInquiry={() => {
            setInquiryTopic('BOQ Project Quotation with Selected Cart Items');
            setInquiryOpen(true);
          }}
        />

        <InquiryModal
          isOpen={inquiryOpen}
          onClose={() => setInquiryOpen(false)}
          initialTopic={inquiryTopic}
        />
      </div>
    </LanguageProvider>
  );
}
