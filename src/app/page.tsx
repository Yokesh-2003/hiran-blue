'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { LanguageProvider } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { VideoSection } from '@/components/VideoSection';
import { AboutSection } from '@/components/AboutSection';
import { ClientsSection } from '@/components/ClientsSection';
import { ProductSection } from '@/components/ProductSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { DealersSection } from '@/components/DealersSection';
import { CatalogueSection } from '@/components/CatalogueSection';
import { ProductCategoriesSection } from '@/components/ProductCategoriesSection';
import { CtaBanner } from '@/components/CtaBanner';
import { Footer } from '@/components/Footer';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { ProductQuickViewModal } from '@/components/ProductQuickViewModal';
import { CartDrawer } from '@/components/CartDrawer';
import { InquiryModal } from '@/components/InquiryModal';
import { Product } from '@/types';
import { productsData } from '@/data/mockData';

export default function Home() {
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
  const [inquiryTopic, setInquiryTopic] = useState('General Project Specification');

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
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

  const handleBookVisit = (dealerName: string) => {
    setInquiryTopic(`VIP Showroom Visit - ${dealerName}`);
    setInquiryOpen(true);
  };

  const handleOpenGeneralInquiry = () => {
    setInquiryTopic('Aura 2.0 Spec Kit & CAD Models');
    setInquiryOpen(true);
  };



  return (
    <LanguageProvider>
      <div
        suppressHydrationWarning
        className="min-h-screen bg-[#f0f7ff] text-[#0f172a] flex flex-col font-sans selection:bg-[#e0f2fe] selection:text-[#0284c7]"
      >
        {/* Navigation Bar with Indian Languages Dropdown */}
        <Navbar />

        {/* Hero Banner Container */}
        <HeroBanner
          onOpenInquiry={handleOpenGeneralInquiry}
          onExploreProducts={() => {
            const el = document.getElementById('products');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Video Player in Glassmorphism Container */}
        <VideoSection />

        {/* About Us Section */}
        <AboutSection />

        {/* Our Clients Infinite Logo Marquee Section */}
        <ClientsSection />

        {/* Our Products 5-Category Showcase */}
        <ProductCategoriesSection />

        {/* Wide Panoramic CTA Banner */}
        <CtaBanner onContactClick={handleOpenGeneralInquiry} />

        {/* Footer */}
        <Footer />

        {/* Floating Scroll to Top Pop-Up Button (25% Scroll Trigger) */}
        <ScrollToTopButton />

        {/* Modals & Drawers */}
        <ProductQuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onSelectProduct={(p) => setQuickViewProduct(p)}
        />
      </div>
    </LanguageProvider>
  );
}
