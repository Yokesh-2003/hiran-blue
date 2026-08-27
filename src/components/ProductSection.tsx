'use client';

import React from 'react';
import { Product } from '@/types';
import { ProductsShowcase } from '@/components/products/ProductsShowcase';

interface ProductSectionProps {
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  onQuickView,
  onAddToCart,
}) => {
  return (
    <section id="products" className="py-16 sm:py-24 bg-[#ede0d4]/35 text-[#0d1b2a] border-b border-[#d8c3af]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Products Showcase */}
        <ProductsShowcase
          onQuickView={onQuickView}
          onAddToCart={onAddToCart}
        />

      </div>
    </section>
  );
};
