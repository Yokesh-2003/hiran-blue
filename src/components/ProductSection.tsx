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
    <section id="products" className="py-20 sm:py-28 bg-[#ede0d4] text-[#0d1b2a] border-b border-[#d8c3af]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d1b2a] text-white text-xs font-bold uppercase tracking-widest border border-[#1b263b] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#d4a373]" />
              {t('productsBadge')}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#0d1b2a] font-display-impact">
              {t('productsTitle')}
            </h2>
            <p className="text-[#5c677d] text-sm sm:text-base max-w-xl">
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
                    ? 'bg-[#0d1b2a] text-[#d4a373] shadow-md border border-[#1b263b] font-bold'
                    : 'bg-white text-[#4a3525] hover:text-[#0d1b2a] border border-[#d8c3af]'
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
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-[#d8c3af] shadow-sm hover:shadow-xl hover:border-[#0d1b2a] transition-all duration-300 relative"
              >
                {/* Product Image Frame */}
                <div className="relative aspect-[4/3] w-full bg-[#ede0d4] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {product.tag && (
                    <div className="absolute top-3 left-3 bg-[#0d1b2a]/90 backdrop-blur-md text-[#d4a373] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow border border-[#d4a373]/30">
                      {product.tag}
                    </div>
                  )}

                  {/* Quick View Button */}
                  <div className="absolute inset-0 bg-[#0d1b2a]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <button
                      onClick={() => onQuickView && onQuickView(product)}
                      className="bg-white hover:bg-[#0d1b2a] text-[#0d1b2a] hover:text-[#d4a373] px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-all cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      {t('quickSpec')}
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-[#c8102e]">
                      {product.collection}
                    </div>
                    <h3 className="text-base font-bold text-[#0d1b2a] group-hover:text-[#b58351] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#5c677d] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Finish Selector */}
                  <div className="pt-2 border-t border-[#e2d5c5] flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#5c677d]">
                      Finish: <span className="text-[#0d1b2a] font-bold">{currentFinish}</span>
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
                          className={`w-4 h-4 rounded-full border border-neutral-300 transition-all cursor-pointer ${
                            currentFinish === f.name
                              ? 'ring-2 ring-[#0d1b2a] scale-110'
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
                      <span className="text-[10px] uppercase text-[#7f5539] font-bold block">{t('msrp')}</span>
                      <span className="text-lg font-black text-[#0d1b2a] font-display-impact">{product.price}</span>
                    </div>

                    <button
                      onClick={() => onAddToCart && onAddToCart(product)}
                      className="px-4 py-2 rounded-xl bg-[#c8102e] hover:bg-[#a50b24] text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
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
        <div className="mt-16 bg-[#0d1b2a] text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl border border-[#1b263b]">
          <div className="space-y-2 text-center md:text-left z-10">
            <h3 className="text-2xl sm:text-3xl font-black font-display-impact text-white">
              Need a Custom Finish or Bespoke Architecture Suite?
            </h3>
            <p className="text-sm text-[#ede0d4] max-w-xl">
              Our project engineering team fabricates PVD-coated finishes in Brushed Champagne, Rose Gold, and Ultra-Matte Nero for large-scale development orders.
            </p>
          </div>

          <a
            href="#contact"
            className="px-6 py-3.5 rounded-xl bg-[#d4a373] hover:bg-[#b58351] text-[#0d1b2a] text-xs font-bold uppercase tracking-wider transition-all z-10 shrink-0 shadow-lg transform hover:scale-105"
          >
            Speak to Project Specifier
          </a>
        </div>

      </div>
    </section>
  );
};
