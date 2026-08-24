'use client';

import React, { useState } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { AboutSection } from '@/components/AboutSection';
import { ProductSection } from '@/components/ProductSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { DealersSection } from '@/components/DealersSection';
import { CatalogueSection } from '@/components/CatalogueSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { ProductQuickViewModal } from '@/components/ProductQuickViewModal';
import { CartDrawer } from '@/components/CartDrawer';
import { InquiryModal } from '@/components/InquiryModal';
import { Product } from '@/types';
import { productsData } from '@/data/mockData';

export default function Home() {
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
      <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
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

        {/* About Us Section */}
        <AboutSection />

        {/* Products Section */}
        <ProductSection
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
        />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Dealers Section */}
        <DealersSection onBookVisit={handleBookVisit} />

        {/* Catalogue Download Section */}
        <CatalogueSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />

        {/* Modals & Drawers */}
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
