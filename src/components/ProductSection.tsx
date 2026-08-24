'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { productsData } from '@/data/mockData';
import { Product } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, Eye, ArrowUpRight } from 'lucide-react';

interface ProductSectionProps {
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  onQuickView,
  onAddToCart,
}) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedFinish, setSelectedFinish] = useState<{ [productId: string]: string }>({});

  const categories = [
    { id: 'all', label: t('catAll') },
    { id: 'faucets', label: t('catFaucets') },
    { id: 'showers', label: t('catShowers') },
    { id: 'bathtubs', label: t('catTubs') },
    { id: 'sanitaryware', label: t('catSanitaryware') },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? productsData
      : productsData.filter((p) => p.category === activeCategory);

  const finishes = [
    { name: 'Matte White', color: '#ffffff' },
    { name: 'Brushed Titanium', color: '#94a3b8' },
    { name: 'Obsidian Black', color: '#1e293b' },
    { name: 'Brushed Gold', color: '#d4af37' },
  ];

  return (
    <section id="products" className="py-20 sm:py-28 bg-[#f8fafc] text-neutral-900 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-neutral-800 text-xs font-bold uppercase tracking-widest border border-neutral-200 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-neutral-900" />
              {t('productsBadge')}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-950 font-display-impact">
              {t('productsTitle')}
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base max-w-xl">
              {t('productsDesc')}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-neutral-900 text-white shadow-md'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:border-neutral-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const currentFinish = selectedFinish[product.id] || finishes[0].name;

            return (
              <div
                key={product.id}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-xl hover:border-neutral-300 transition-all duration-300 relative"
              >
                {/* Product Image Frame */}
                <div className="relative aspect-[4/3] w-full bg-neutral-100 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {product.tag && (
                    <div className="absolute top-3 left-3 bg-neutral-900/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                      {product.tag}
                    </div>
                  )}

                  {/* Quick View Button */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <button
                      onClick={() => onQuickView && onQuickView(product)}
                      className="bg-white/95 hover:bg-white text-neutral-900 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5 text-neutral-900" />
                      {t('quickSpec')}
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
                      {product.collection}
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 group-hover:text-black transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Finish Selector */}
                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-neutral-500">
                      Finish: <span className="text-neutral-900 font-bold">{currentFinish}</span>
                    </span>
                    <div className="flex items-center gap-1.5">
                      {finishes.map((f) => (
                        <button
                          key={f.name}
                          onClick={() =>
                            setSelectedFinish({
                              ...selectedFinish,
                              [product.id]: f.name,
                            })
                          }
                          style={{ backgroundColor: f.color }}
                          className={`w-4 h-4 rounded-full border transition-all ${
                            currentFinish === f.name
                              ? 'ring-2 ring-neutral-900 scale-110'
                              : 'hover:scale-105'
                          }`}
                          title={f.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Price & Action Button */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[10px] uppercase text-neutral-400 font-bold block">{t('msrp')}</span>
                      <span className="text-lg font-black text-neutral-950 font-display-impact">{product.price}</span>
                    </div>

                    <button
                      onClick={() => onAddToCart && onAddToCart(product)}
                      className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <span>{t('addToSpec')}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-neutral-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black font-display-impact uppercase tracking-tight">
              Need Custom Finishes or Bulk Project Specifications?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
              Our engineering team crafts bespoke tapware dimensions and custom PVD colors for luxury hospitality and private residences.
            </p>
          </div>
          <a
            href="#contact"
            className="relative z-10 whitespace-nowrap px-6 py-3.5 bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-sm rounded-full shadow-lg transition-all hover:scale-105"
          >
            Consult Our Engineering Studio
          </a>
        </div>

      </div>
    </section>
  );
};
