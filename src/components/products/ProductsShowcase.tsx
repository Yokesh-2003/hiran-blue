'use client';

import React, { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Eye,
  ShoppingBag,
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { productsData } from '@/data/mockData';
import { allCatalogProducts } from '@/data/allCatalogProducts';
import { Product } from '@/types';

interface ProductsShowcaseProps {
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

// Reusable Netflix-Style Category Product Row
interface NetflixRowProps {
  title: string;
  count: number;
  products: Product[];
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onViewAll?: () => void;
}

const NetflixRow: React.FC<NetflixRowProps> = ({
  title,
  count,
  products,
  onQuickView,
  onAddToCart,
  onViewAll,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftVal = useRef(0);
  const hasDragged = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = rowRef.current;
    if (!el) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX;
    scrollLeftVal.current = el.scrollLeft;
    el.style.scrollBehavior = 'auto';
    el.style.scrollSnapType = 'none';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !rowRef.current) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = x - startX.current;
    if (Math.abs(walk) > 4) {
      hasDragged.current = true;
    }
    rowRef.current.scrollLeft = scrollLeftVal.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (rowRef.current) {
      rowRef.current.style.scrollBehavior = 'smooth';
      rowRef.current.style.scrollSnapType = '';
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!rowRef.current) return;
    const scrollAmount = direction === 'left' ? -380 : 380;
    rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="space-y-4 pt-2">
      {/* Row Header: Category Name + Counter + Left/Right Navigation */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5">
          <h4 className="text-lg sm:text-2xl font-serif font-bold text-[#0d1b2a] tracking-tight">
            {title}
          </h4>
          <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#ede0d4] text-[#7f5539] border border-[#d8c3af]">
            {count} Items
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-xs sm:text-sm font-bold text-[#b58351] hover:text-[#0d1b2a] transition-colors flex items-center gap-1 cursor-pointer mr-2"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Left / Right Arrow Buttons */}
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#0d1b2a] text-[#0d1b2a] hover:text-[#d4a373] border border-[#e2d5c5] shadow-sm flex items-center justify-center transition-all cursor-pointer active:scale-95"
            aria-label={`Scroll ${title} left`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#0d1b2a] text-[#0d1b2a] hover:text-[#d4a373] border border-[#e2d5c5] shadow-sm flex items-center justify-center transition-all cursor-pointer active:scale-95"
            aria-label={`Scroll ${title} right`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track (Netflix Style - headroom padding to prevent hover crop) */}
      <div
        ref={rowRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className="flex items-stretch gap-3.5 sm:gap-5 overflow-x-auto select-none cursor-grab active:cursor-grabbing pt-5 pb-6 px-2 -mt-3 scrollbar-none snap-x snap-mandatory sm:snap-none"
      >
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => onQuickView?.(product)}
            className="w-[190px] sm:w-[230px] shrink-0 snap-start rounded-2xl sm:rounded-3xl bg-white border border-[#e2d5c5] p-3.5 sm:p-4 shadow-sm hover:shadow-xl hover:border-[#0d1b2a] transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              {/* Category & Model Code Badge */}
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="px-2 py-0.5 rounded-md bg-[#f5efe6] text-[#7f5539] text-[9px] font-bold uppercase tracking-wider border border-[#e2d5c5] truncate max-w-[120px]">
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
                <div className="relative w-full h-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Product Name Format: [Folder Name] Model: [Code] */}
              <h5 className="text-xs sm:text-sm font-serif font-bold text-[#0d1b2a] line-clamp-2 group-hover:text-[#b58351] transition-colors mb-1">
                {product.name}
              </h5>

              <p className="text-[10px] sm:text-[11px] text-[#7f5539] font-medium truncate">
                {product.collection}
              </p>
            </div>
          </div>
        ))}

        {/* Netflix Style "View More" End Card */}
        {onViewAll && count > products.length && (
          <div
            onClick={onViewAll}
            className="w-[180px] sm:w-[200px] shrink-0 snap-start rounded-2xl sm:rounded-3xl bg-[#0d1b2a] text-white p-5 border border-[#1b263b] shadow-md hover:shadow-2xl hover:bg-[#1b263b] transition-all duration-300 flex flex-col justify-center items-center text-center cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full bg-[#1b263b] group-hover:bg-[#d4a373] group-hover:text-[#0d1b2a] text-[#d4a373] flex items-center justify-center transition-colors mb-3 shadow">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
            <h5 className="text-base font-serif font-bold text-white mb-1">
              View More
            </h5>
            <p className="text-xs text-[#ede0d4]/80">
              +{count - products.length} {title} Products
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export const ProductsShowcase: React.FC<ProductsShowcaseProps> = ({
  onQuickView,
  onAddToCart,
}) => {
  const router = useRouter();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const promoSliderRef = useRef<HTMLDivElement>(null);

  // 1. Top 6 Colorful Category Cards
  const promoCards = [
    {
      id: 'faucets',
      category: 'faucets',
      title: 'Architectural Faucets',
      subtitle: 'Concealed Basin & Wall Mixers',
      badge: 'Up to 10-Yr Warranty',
      baseBg: 'bg-[#ea580c]',
      overlayGradient: 'bg-gradient-to-br from-[#ea580c]/90 via-[#f97316]/60 to-transparent',
      img: '/images/products/2.png',
      tag: 'PVD Brushed Finish',
    },
    {
      id: 'bath-seth',
      category: 'bath-seth',
      title: 'Bath Seth & Wellness',
      subtitle: 'Soaking Tubs & Luxury Sets',
      badge: 'Mineral Cast Purity',
      baseBg: 'bg-[#ca8a04]',
      overlayGradient: 'bg-gradient-to-br from-[#ca8a04]/90 via-[#eab308]/60 to-transparent',
      img: '/images/products/3.png',
      tag: 'Ergonomic Comfort',
    },
    {
      id: 'kitchen',
      category: 'kitchen',
      title: 'Kitchen Sink Mixers',
      subtitle: 'Pull-Down 360° Swivel Taps',
      badge: 'SS304 Surgical Grade',
      baseBg: 'bg-[#0284c7]',
      overlayGradient: 'bg-gradient-to-br from-[#0284c7]/90 via-[#0ea5e9]/60 to-transparent',
      img: '/images/products/4.png',
      tag: 'Dual Aerated Spray',
    },
    {
      id: 'valves',
      category: 'valves',
      title: 'Precision Flow Valves',
      subtitle: 'Concealed Heavy-Duty Diverters',
      badge: '16 Bar Pressure Tested',
      baseBg: 'bg-[#0f172a]',
      overlayGradient: 'bg-gradient-to-br from-[#0f172a]/95 via-[#1e293b]/70 to-transparent',
      img: '/images/products/5.png',
      tag: 'Zero-Leak Cartridge',
    },
    {
      id: 'allieds',
      category: 'allieds',
      title: 'Architectural Allieds',
      subtitle: 'Towel Rails, Gratings & Hooks',
      badge: '100% Solid Pure Brass',
      baseBg: 'bg-[#b45309]',
      overlayGradient: 'bg-gradient-to-br from-[#b45309]/90 via-[#d97706]/60 to-transparent',
      img: '/images/products/6.png',
      tag: 'Monogram Luxe',
    },
    {
      id: 'showers',
      category: 'showers',
      title: 'Thermostatic Showers',
      subtitle: 'Rainfall & Multi-Zone Jets',
      badge: 'Hydrotherapy Flow',
      baseBg: 'bg-[#1e1b4b]',
      overlayGradient: 'bg-gradient-to-br from-[#1e1b4b]/95 via-[#312e81]/70 to-transparent',
      img: '/images/shower_system.jpg',
      tag: 'Air-Injection Mist',
    },
  ];

  // Drag-to-scroll for mouse on PC / Touch on mobile
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftVal = useRef(0);
  const hasDragged = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!promoSliderRef.current) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - promoSliderRef.current.offsetLeft;
    scrollLeftVal.current = promoSliderRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !promoSliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - promoSliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 5) {
      hasDragged.current = true;
    }
    promoSliderRef.current.scrollLeft = scrollLeftVal.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  const categoriesTabs = [
    { id: 'all', label: 'All Categories', count: allCatalogProducts.length },
    { id: 'faucets', label: 'Faucets', count: allCatalogProducts.filter(p => p.category === 'faucets').length },
    { id: 'bath-seth', label: 'Bath Seth', count: allCatalogProducts.filter(p => p.category === 'bath-seth').length },
    { id: 'kitchen', label: 'Kitchen', count: allCatalogProducts.filter(p => p.category === 'kitchen').length },
    { id: 'valves', label: 'Valves', count: allCatalogProducts.filter(p => p.category === 'valves').length },
    { id: 'allieds', label: 'Allieds', count: allCatalogProducts.filter(p => p.category === 'allieds').length },
    { id: 'showers', label: 'Showers', count: allCatalogProducts.filter(p => p.category === 'showers').length },
  ];

  // Group products by category for Netflix Rows
  const categoryGroups = useMemo(() => {
    const groups = [
      {
        id: 'faucets',
        title: 'Faucets',
        products: allCatalogProducts.filter((p) => p.category === 'faucets'),
      },
      {
        id: 'bath-seth',
        title: 'Bath Seth',
        products: allCatalogProducts.filter((p) => p.category === 'bath-seth'),
      },
      {
        id: 'kitchen',
        title: 'Kitchen',
        products: allCatalogProducts.filter((p) => p.category === 'kitchen'),
      },
      {
        id: 'valves',
        title: 'Valves',
        products: allCatalogProducts.filter((p) => p.category === 'valves'),
      },
      {
        id: 'allieds',
        title: 'Allieds',
        products: allCatalogProducts.filter((p) => p.category === 'allieds'),
      },
      {
        id: 'showers',
        title: 'Showers',
        products: allCatalogProducts.filter((p) => p.category === 'showers'),
      },
    ];
    return groups;
  }, []);

  // When a specific category is selected, group its products by Series/Subcategory
  const seriesGroupsForCategory = useMemo(() => {
    if (activeCategoryFilter === 'all') return [];
    const prods = allCatalogProducts.filter(p => p.category === activeCategoryFilter);
    const map = new Map<string, Product[]>();
    prods.forEach(p => {
      const sub = p.subCategory || p.collection || 'General';
      if (!map.has(sub)) map.set(sub, []);
      map.get(sub)!.push(p);
    });
    return Array.from(map.entries()).map(([subTitle, items]) => ({
      title: subTitle,
      products: items,
    }));
  }, [activeCategoryFilter]);

  // Search Results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return allCatalogProducts.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.modelCode || '').toLowerCase().includes(q) ||
      (p.subCategory || '').toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="w-full space-y-12 sm:space-y-16">
      
      {/* ========================================================================= */}
      {/* 1. TOP 2-COLUMN SECTION: LEFT HERO CARD + RIGHT (SLIDER + PRODUCTS GRID) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* A. LEFT FEATURED HERO CARD (Full container image with blue corner overlay) */}
        <div className="lg:col-span-4 rounded-3xl text-white p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl relative group min-h-[300px] sm:min-h-[380px] lg:min-h-[640px] lg:sticky lg:top-24 bg-[#004085]">
          
          {/* Full Container Background Image: /images/products/1.png */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/products/1.png"
              alt="Hiran Luxury Bath Products"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 [-webkit-user-drag:none]"
            />
          </div>

          {/* Blue Corner Overlay & Ambient Lighting */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#005bb5]/90 via-[#004085]/60 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

          {/* Top Content */}
          <div className="relative z-10 space-y-2">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-white leading-[1.05] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              One brand, <br />
              <span className="text-[#ede0d4]">many luxuries</span>
            </h3>

            <p className="text-xs sm:text-sm text-blue-100 font-medium max-w-[260px] pt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Engineered bathroom suites, precision faucets & luxury wellness systems.
            </p>
          </div>

          {/* Bottom Action Button */}
          <div className="relative z-10 pt-4 flex flex-col items-center justify-end">
            <a
              href="#full-catalog-section"
              className="w-full py-3.5 rounded-2xl bg-white text-[#004085] hover:bg-[#ede0d4] font-bold text-xs sm:text-sm text-center uppercase tracking-wider transition-all shadow-xl hover:shadow-white/20 active:scale-95"
            >
              Explore Full Collection
            </a>
          </div>

        </div>

        {/* B. RIGHT COLUMN: TOP COLORFUL CATEGORY SLIDER + 6 CATEGORY TILES DIRECTLY BELOW */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
          
          {/* 1. Top Colorful Category Cards Slider (Full-bleed image + corner color overlay) */}
          <div
            ref={promoSliderRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto select-none cursor-grab active:cursor-grabbing pt-5 pb-6 px-2 -mt-3 scrollbar-none snap-x snap-mandatory sm:snap-none"
          >
            {promoCards.map((card) => (
              <div
                key={card.id}
                className={`w-[260px] sm:w-[280px] shrink-0 snap-start rounded-3xl p-5 sm:p-6 text-white shadow-lg transition-all duration-300 flex flex-col justify-between relative overflow-hidden group min-h-[380px] lg:min-h-[400px] ${card.baseBg}`}
              >
                {/* Full Container Background Image */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover object-center [-webkit-user-drag:none]"
                  />
                </div>

                {/* Corner Color Gradient Overlay & Ambient Contrast */}
                <div className={`absolute inset-0 ${card.overlayGradient} pointer-events-none`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

                {/* Top Card Info */}
                <div className="relative z-10 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] block">
                    {card.badge}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black font-sans leading-tight text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)]">
                    {card.title}
                  </h4>
                  <p className="text-xs text-white/90 leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {card.subtitle}
                  </p>
                </div>

                {/* Bottom Tag */}
                <div className="relative z-10 pt-2 border-t border-white/20 flex items-center justify-between text-xs font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] pointer-events-none">
                  <span>{card.tag}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 2. Top Area Clean Category Tiles Grid */}
          <div className="pt-4 border-t border-[#e2d5c5] space-y-6">
            
            {/* Category Filter Pills in Top Area */}
            <div className="flex flex-wrap items-center gap-2">
              {categoriesTabs.map((tab) => (
                <button
                  key={`top-${tab.id}`}
                  onClick={() => {
                    if (tab.id === 'all') {
                      setActiveCategoryFilter('all');
                    } else {
                      router.push(`/products/${tab.id}`);
                    }
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeCategoryFilter === tab.id
                      ? 'bg-[#0d1b2a] text-[#d4a373] shadow-md border border-[#1b263b]'
                      : 'bg-white text-[#4a3525] hover:text-[#0d1b2a] border border-[#d8c3af]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Top Area Category Tiles */}
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">
              {productsData.map((product) => (
                <div
                  key={`top-${product.id}`}
                  onClick={() => {
                    router.push(`/products/${product.category}`);
                  }}
                  className="rounded-2xl sm:rounded-3xl bg-white border border-[#e2d5c5] hover:border-[#0d1b2a] p-3.5 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between items-center cursor-pointer group min-h-[190px] sm:min-h-[285px]"
                >
                  {/* Product Image Frame */}
                  <div className="relative w-full aspect-square max-w-[130px] sm:max-w-[180px] rounded-xl sm:rounded-2xl bg-[#fbf9f5] border border-[#f0e6da] overflow-hidden flex items-center justify-center p-2.5 sm:p-4 group-hover:bg-[#f5efe6] transition-colors">
                    <div className="relative w-full h-full">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Category Name */}
                  <div className="pt-2 sm:pt-3 text-center">
                    <h4 className="text-sm sm:text-lg font-serif font-bold text-[#0d1b2a] group-hover:text-[#b58351] transition-colors">
                      {product.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. NETFLIX-STYLE FULL CATALOG ROWS (HORIZONTAL SCROLLING ROWS WITH VIEW MORE) */}
      {/* ========================================================================= */}
      <div id="full-catalog-section" className="pt-8 sm:pt-10 border-t-2 border-[#e2d5c5] space-y-8 sm:space-y-12">
        
        {/* Header & Live Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-[#e2d5c5] shadow-sm">
          <div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#b58351] block mb-1">
              Architecture & Specification Library
            </span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#0d1b2a]">
              {activeCategoryFilter === 'all'
                ? 'Complete Product Collections'
                : `${categoriesTabs.find(t => t.id === activeCategoryFilter)?.label || 'Products'} Collections`}
            </h3>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#7f5539] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search model number or code... e.g. BV3001"
              className="w-full bg-[#fbf9f5] border border-[#d8c3af] focus:border-[#0d1b2a] focus:bg-white text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-full text-[#0d1b2a] placeholder:text-[#9c8979] focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Master Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {categoriesTabs.map((tab) => (
            <button
              key={`bottom-tab-${tab.id}`}
              onClick={() => {
                setActiveCategoryFilter(tab.id);
                setSearchQuery('');
              }}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategoryFilter === tab.id
                  ? 'bg-[#0d1b2a] text-[#d4a373] shadow-md border border-[#1b263b]'
                  : 'bg-white text-[#4a3525] hover:text-[#0d1b2a] border border-[#d8c3af]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeCategoryFilter === tab.id ? 'bg-[#1b263b] text-white' : 'bg-[#f5efe6] text-[#7f5539]'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* A. SEARCH MODE (When user types a search query) */}
        {searchQuery.trim() ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-serif font-bold text-[#0d1b2a]">
                Search Results for &ldquo;{searchQuery}&rdquo; ({searchResults.length} Products Found)
              </h4>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-[#b58351] hover:underline"
              >
                Clear Search
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-6">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => onQuickView?.(product)}
                    className="rounded-2xl sm:rounded-3xl bg-white border border-[#e2d5c5] p-3.5 sm:p-4 shadow-sm hover:shadow-xl hover:border-[#0d1b2a] transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="px-2 py-0.5 rounded-md bg-[#f5efe6] text-[#7f5539] text-[9px] font-bold uppercase tracking-wider border border-[#e2d5c5] truncate max-w-[130px]">
                          {product.subCategory || product.category}
                        </span>

                        {product.modelCode && (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-[#d4a373] bg-[#0d1b2a] px-1.5 py-0.5 rounded shrink-0">
                            {product.modelCode}
                          </span>
                        )}
                      </div>

                      <div className="relative w-full aspect-square rounded-xl bg-[#fbf9f5] border border-[#f0e6da] overflow-hidden flex items-center justify-center p-2.5 mb-2.5 group-hover:bg-[#f5efe6] transition-colors">
                        <div className="relative w-full h-full">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      </div>

                      <h5 className="text-xs sm:text-sm font-serif font-bold text-[#0d1b2a] line-clamp-2 group-hover:text-[#b58351] transition-colors mb-1">
                        {product.name}
                      </h5>

                      <p className="text-[10px] sm:text-[11px] text-[#7f5539] font-medium truncate">
                        {product.collection}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-white rounded-3xl border border-[#e2d5c5]">
                <p className="text-sm font-bold text-[#0d1b2a]">No models found matching &ldquo;{searchQuery}&rdquo;.</p>
              </div>
            )}
          </div>
        ) : activeCategoryFilter === 'all' ? (
          /* B. ALL CATEGORIES: NETFLIX ROWS FOR EACH MASTER CATEGORY */
          <div className="space-y-12 sm:space-y-16">
            {categoryGroups.map((group) => (
              <NetflixRow
                key={`netflix-group-${group.id}`}
                title={group.title}
                count={group.products.length}
                products={group.products}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                onViewAll={() => {
                  router.push(`/products/${group.id}`);
                }}
              />
            ))}
          </div>
        ) : (
          /* C. SINGLE CATEGORY ACTIVE: NETFLIX ROWS FOR EACH SUB-SERIES FOLDER */
          <div className="space-y-10 sm:space-y-14">
            <div className="flex items-center justify-between pb-2 border-b border-[#e2d5c5]">
              <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#0d1b2a]">
                All {categoriesTabs.find(t => t.id === activeCategoryFilter)?.label} Series ({seriesGroupsForCategory.length} Series Folders)
              </h4>
              <button
                onClick={() => setActiveCategoryFilter('all')}
                className="text-xs font-bold text-[#b58351] hover:underline cursor-pointer"
              >
                Back to All Categories
              </button>
            </div>

            {seriesGroupsForCategory.map((series) => (
              <NetflixRow
                key={`series-${series.title}`}
                title={series.title}
                count={series.products.length}
                products={series.products}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
