'use client';

import React, { useState, useEffect } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { ProductsShowcase } from '@/components/products/ProductsShowcase';
import { AboutCta } from '@/components/about/AboutCta';
import { Footer } from '@/components/Footer';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { InquiryModal } from '@/components/InquiryModal';
import { CartDrawer } from '@/components/CartDrawer';
import { ProductQuickViewModal } from '@/components/ProductQuickViewModal';
import { Product } from '@/types';
import { productsData } from '@/data/mockData';
import { Sparkles, Package } from 'lucide-react';

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
  const [inquiryTopic, setInquiryTopic] = useState('Product Specification & Bulk Order Enquiry');

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

        {/* Page Content */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 pb-12 sm:pb-16 space-y-10 sm:space-y-14">
          


          {/* Products Showcase */}
          <ProductsShowcase
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={handleAddToCart}
          />

        </main>

        {/* CTA Banner: Experience the Luxury & Consultation */}
        <AboutCta
          onOpenInquiry={() => {
            setInquiryTopic('Products Specification Consultation');
            setInquiryOpen(true);
          }}
        />

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
            setInquiryTopic('BOQ Project Quotation with Selected Products');
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
