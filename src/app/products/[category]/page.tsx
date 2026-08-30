'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { LanguageProvider } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { AboutCta } from '@/components/about/AboutCta';
import { Footer } from '@/components/Footer';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { ProductQuickViewModal } from '@/components/ProductQuickViewModal';
import { allCatalogProducts } from '@/data/allCatalogProducts';
import { Product } from '@/types';
import {
  Search,
  ChevronRight,
  ArrowLeft,
  SlidersHorizontal,
  Layers,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const categoryMeta: Record<
  string,
  { name: string; description: string; tag: string; bannerImg?: string }
> = {
  faucets: {
    name: 'Faucets',
    description:
      'Precision-engineered luxury basin mixers, wall mixers, and concealed architectural faucet suites.',
    tag: 'Solid Brass & PVD Finishes',
    bannerImg: '/images/products/2.png',
  },
  'bath-seth': {
    name: 'Bath Seth',
    description:
      'Luxury bath fittings, diverters, spouts, flush valves, and wellness components.',
    tag: 'Mineral Purity & Durability',
    bannerImg: '/images/products/3.png',
  },
  kitchen: {
    name: 'Kitchen',
    description:
      'High-performance kitchen sink mixers, pull-down 360° swivel taps, and sinkware solutions.',
    tag: 'Surgical SS304 & Aerated Flow',
    bannerImg: '/images/products/4.png',
  },
  valves: {
    name: 'Valves',
    description:
      'Concealed heavy-duty diverters, high-pressure angle valves, and flow control valves.',
    tag: '16 Bar Pressure Tested',
    bannerImg: '/images/products/5.png',
  },
  allieds: {
    name: 'Allieds',
    description:
      'Architectural allied accessories including bottle traps, gratings, towel rails, drains, and luxury fittings.',
    tag: '100% Solid Brass Construction',
    bannerImg: '/images/products/6.png',
  },
  showers: {
    name: 'Showers',
    description:
      'Thermostatic rainfall showers, multi-zone hydrotherapy jets, and luxury shower arms.',
    tag: 'Air-Injection Mist & Rain Flow',
    bannerImg: '/images/shower_system.jpg',
  },
};

const allCategoriesList = [
  { id: 'faucets', label: 'Faucets' },
  { id: 'bath-seth', label: 'Bath Seth' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'valves', label: 'Valves' },
  { id: 'allieds', label: 'Allieds' },
  { id: 'showers', label: 'Showers' },
];

export default function CategoryProductsPage() {
  const params = useParams();
  const router = useRouter();
  const rawCategory = (params?.category as string) || 'faucets';
  const categoryKey = rawCategory.toLowerCase();

  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubSeries, setSelectedSubSeries] = useState<string>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

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

  // Reset sub-series filter on category change
  useEffect(() => {
    setSelectedSubSeries('all');
    setSearchQuery('');
  }, [categoryKey]);

  // Current category details
  const currentMeta = categoryMeta[categoryKey] || {
    name: categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1),
    description: 'Explore authentic architectural bath fittings and luxury collections.',
    tag: 'Architectural Excellence',
  };

  // Products belonging strictly to this category
  const categoryProducts = useMemo(() => {
    return allCatalogProducts.filter((p) => p.category === categoryKey);
  }, [categoryKey]);

  // Unique sub-series folders in this category
  const subSeriesList = useMemo(() => {
    const map = new Map<string, number>();
    categoryProducts.forEach((p) => {
      const key = p.subCategory || p.collection || 'General';
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [categoryProducts]);

  // Filtered products based on search and sub-series filter
  const displayedProducts = useMemo(() => {
    return categoryProducts.filter((product) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.modelCode && product.modelCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.subCategory && product.subCategory.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSubSeries =
        selectedSubSeries === 'all' ||
        product.subCategory === selectedSubSeries ||
        product.collection === selectedSubSeries;

      return matchesSearch && matchesSubSeries;
    });
  }, [categoryProducts, searchQuery, selectedSubSeries]);

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
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 pb-12 sm:pb-16 space-y-8 sm:space-y-12">
          
          {/* 1. TOP BREADCRUMB & BACK BUTTON */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#7f5539] font-medium">
              <Link href="/" className="hover:text-[#0d1b2a] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/products" className="hover:text-[#0d1b2a] transition-colors">
                Products
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#0d1b2a] font-bold uppercase tracking-wider">
                {currentMeta.name}
              </span>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-[#0d1b2a] text-[#4a3525] hover:text-[#d4a373] border border-[#d8c3af] font-bold text-xs transition-all shadow-sm group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>All Categories</span>
            </Link>
          </div>

          {/* 2. CATEGORY HERO HEADER */}
          <div className="relative rounded-3xl overflow-hidden bg-[#0d1b2a] text-white p-6 sm:p-10 border border-[#1b263b] shadow-xl">
            <div className="relative z-10 max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#d4a373] border border-[#d4a373]/30 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#d4a373]" />
                <span>{currentMeta.tag}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
                {currentMeta.name}{' '}
                <span className="italic font-normal text-[#d4a373]">Collection</span>
              </h1>

              <p className="text-xs sm:text-base text-[#ede0d4] leading-relaxed max-w-2xl font-sans">
                {currentMeta.description}
              </p>

              <div className="pt-2 flex items-center gap-3 text-xs font-bold text-[#d4a373]">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
                  {categoryProducts.length} Authentic Products
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
                  {subSeriesList.length} Series Collections
                </span>
              </div>
            </div>

            {/* Subtle Gradient Overlays */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4a373]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#004085]/30 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* 3. CATEGORY SWITCHER PILLS */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7f5539] block">
              Switch Category:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/products"
                className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white hover:bg-[#0d1b2a] text-[#4a3525] hover:text-[#d4a373] border border-[#d8c3af] transition-all"
              >
                All Categories
              </Link>
              {allCategoriesList.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products/${cat.id}`}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    cat.id === categoryKey
                      ? 'bg-[#0d1b2a] text-[#d4a373] shadow-md border border-[#1b263b]'
                      : 'bg-white hover:bg-[#0d1b2a] text-[#4a3525] hover:text-[#d4a373] border border-[#d8c3af]'
                  }`}
                >
                  {cat.label} ({allCatalogProducts.filter((p) => p.category === cat.id).length})
                </Link>
              ))}
            </div>
          </div>

          {/* 4. SEARCH & SUB-SERIES FILTER TOOLBAR */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#e2d5c5] shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder={`Search in ${currentMeta.name} (e.g. Model, Series)...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#fbf9f5] border border-[#e2d5c5] focus:outline-none focus:border-[#0d1b2a] text-sm text-[#0d1b2a] placeholder:text-[#9e8c7c] transition-all"
                />
                <Search className="w-4 h-4 text-[#9e8c7c] absolute left-3.5 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#7f5539] hover:text-[#0d1b2a] font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Items Counter */}
              <div className="text-xs font-bold text-[#7f5539]">
                Showing <span className="text-[#0d1b2a]">{displayedProducts.length}</span> of{' '}
                <span className="text-[#0d1b2a]">{categoryProducts.length}</span> products
              </div>
            </div>

            {/* Sub-Series Filter Pills */}
            {subSeriesList.length > 1 && (
              <div className="pt-3 border-t border-[#f0e6da] flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7f5539] mr-1 flex items-center gap-1">
                  <SlidersHorizontal className="w-3 h-3" />
                  Series:
                </span>
                <button
                  onClick={() => setSelectedSubSeries('all')}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                    selectedSubSeries === 'all'
                      ? 'bg-[#0d1b2a] text-[#d4a373] shadow-sm'
                      : 'bg-[#f5efe6] text-[#4a3525] hover:bg-[#ede0d4] border border-[#e2d5c5]'
                  }`}
                >
                  All Series ({categoryProducts.length})
                </button>
                {subSeriesList.map((series) => (
                  <button
                    key={`series-${series.name}`}
                    onClick={() => setSelectedSubSeries(series.name)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                      selectedSubSeries === series.name
                        ? 'bg-[#0d1b2a] text-[#d4a373] shadow-sm'
                        : 'bg-[#f5efe6] text-[#4a3525] hover:bg-[#ede0d4] border border-[#e2d5c5]'
                    }`}
                  >
                    {series.name} ({series.count})
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 5. PRODUCTS GRID LIST */}
          {displayedProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#e2d5c5] space-y-4">
              <p className="text-base text-[#7f5539] font-medium">
                No products found matching &ldquo;{searchQuery}&rdquo; in {currentMeta.name}.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSubSeries('all');
                }}
                className="px-5 py-2.5 rounded-full bg-[#0d1b2a] text-[#d4a373] font-bold text-xs uppercase tracking-wider hover:bg-[#1b263b] transition-all cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
              {displayedProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => setQuickViewProduct(product)}
                  className="rounded-2xl sm:rounded-3xl bg-white border border-[#e2d5c5] p-3.5 sm:p-4 shadow-sm hover:shadow-xl hover:border-[#0d1b2a] transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    {/* Category & Model Code Badges */}
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className="px-2 py-0.5 rounded-md bg-[#f5efe6] text-[#7f5539] text-[9px] font-bold uppercase tracking-wider border border-[#e2d5c5] truncate max-w-[110px]">
                        {product.subCategory || product.category}
                      </span>

                      {product.modelCode && (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#d4a373] bg-[#0d1b2a] px-1.5 py-0.5 rounded shrink-0">
                          {product.modelCode}
                        </span>
                      )}
                    </div>

                    {/* Product Image Frame */}
                    <div className="relative w-full aspect-square rounded-xl bg-[#fbf9f5] border border-[#f0e6da] overflow-hidden flex items-center justify-center p-2.5 mb-2.5 group-hover:bg-[#f5efe6] transition-colors">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 [-webkit-user-drag:none]"
                      />
                    </div>

                    {/* Series Title */}
                    <span className="text-[9px] font-bold text-[#b58351] uppercase tracking-wider block truncate mb-0.5">
                      {product.subCategory || product.collection}
                    </span>

                    {/* Product Full Name */}
                    <h4 className="text-xs sm:text-sm font-serif font-bold text-[#0d1b2a] line-clamp-2 leading-snug group-hover:text-[#b58351] transition-colors">
                      {product.name}
                    </h4>
                  </div>

                  {/* Bottom Tap Action */}
                  <div className="pt-2.5 mt-2.5 border-t border-[#f0e6da] flex items-center justify-between text-[11px] font-bold text-[#0d1b2a] group-hover:text-[#b58351] transition-colors">
                    <span>View / Order</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )}

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
