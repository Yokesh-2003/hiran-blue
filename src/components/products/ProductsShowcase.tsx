'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  Eye,
  ShoppingBag,
} from 'lucide-react';
import { productsData } from '@/data/mockData';
import { Product } from '@/types';

interface ProductsShowcaseProps {
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductsShowcase: React.FC<ProductsShowcaseProps> = ({
  onQuickView,
  onAddToCart,
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const promoSliderRef = useRef<HTMLDivElement>(null);

  // Top 6 Colorful Category Cards (Full-bleed container image with corner color overlay design)
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
      img: '/images/our products/Allieds.png',
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
    { id: 'all', label: 'All Products' },
    { id: 'faucets', label: 'Faucets' },
    { id: 'bath-seth', label: 'Bath Seth' },
    { id: 'kitchen', label: 'Kitchen' },
    { id: 'valves', label: 'Valves' },
    { id: 'allieds', label: 'Allieds' },
    { id: 'showers', label: 'Showers' },
  ];

  const filteredProducts =
    activeCategoryFilter === 'all'
      ? productsData
      : productsData.filter((p) => p.category === activeCategoryFilter);

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

        {/* B. RIGHT COLUMN: TOP COLORFUL CATEGORY SLIDER + SMALL PRODUCTS GRID DIRECTLY BELOW */}
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
                onClick={() => {
                  if (!hasDragged.current) {
                    setActiveCategoryFilter(card.category);
                  }
                }}
                className={`w-[260px] sm:w-[280px] shrink-0 snap-start rounded-3xl p-5 sm:p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between cursor-pointer relative overflow-hidden group min-h-[380px] lg:min-h-[400px] ${card.baseBg} ${
                  activeCategoryFilter === card.category ? 'ring-4 ring-white/90' : ''
                }`}
              >
                {/* Full Container Background Image */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 [-webkit-user-drag:none]"
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
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 2. Small Product Cards Grid Directly Below the Slider in Right Column */}
          <div className="pt-4 border-t border-[#e2d5c5] space-y-6">
            
            {/* Category Filter Pills in Top Area */}
            <div className="flex flex-wrap items-center gap-2">
              {categoriesTabs.map((tab) => (
                <button
                  key={`top-${tab.id}`}
                  onClick={() => setActiveCategoryFilter(tab.id)}
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

            {/* Top Area Product Cards Grid (2 columns on mobile, matching PC tile aesthetic) */}
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">
              {filteredProducts.map((product) => (
                <div
                  key={`top-${product.id}`}
                  onClick={() => {
                    setActiveCategoryFilter(product.category);
                    const el = document.getElementById('full-catalog-section');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="rounded-2xl sm:rounded-3xl bg-white border border-[#e2d5c5] p-3.5 sm:p-5 shadow-sm hover:shadow-xl hover:border-[#0d1b2a] transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between items-center cursor-pointer group min-h-[190px] sm:min-h-[285px]"
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

                  {/* Product Name Only */}
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
      {/* 2. FULL-WIDTH PRODUCTS CATALOG SECTION (DOWN BELOW ACROSS FULL WIDTH) */}
      {/* ========================================================================= */}
      <div id="full-catalog-section" className="pt-8 sm:pt-10 border-t-2 border-[#e2d5c5] space-y-6 sm:space-y-8">
        
        {/* Full-Width Filter Tabs Strip */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {categoriesTabs.map((tab) => (
            <button
              key={`bottom-${tab.id}`}
              onClick={() => setActiveCategoryFilter(tab.id)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategoryFilter === tab.id
                  ? 'bg-[#0d1b2a] text-[#d4a373] shadow-md border border-[#1b263b]'
                  : 'bg-white text-[#4a3525] hover:text-[#0d1b2a] border border-[#d8c3af]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 2-to-4 Column Product Cards Grid (Matching PC on mobile with 2 columns) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={`bottom-${product.id}`}
              className="rounded-2xl sm:rounded-3xl bg-white border border-[#e2d5c5] p-3.5 sm:p-5 shadow-sm hover:shadow-xl hover:border-[#d4a373] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-2 sm:mb-3">
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-[#f5efe6] text-[#7f5539] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider border border-[#e2d5c5]">
                    {product.category}
                  </span>

                  {product.tag && (
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#d4a373] bg-[#0d1b2a] px-1.5 sm:px-2 py-0.5 rounded">
                      {product.tag}
                    </span>
                  )}
                </div>

                <div className="relative w-full aspect-square rounded-xl sm:rounded-2xl bg-[#fbf9f5] border border-[#f0e6da] overflow-hidden flex items-center justify-center p-2.5 sm:p-4 mb-2.5 sm:mb-4 group-hover:bg-[#f5efe6] transition-colors">
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

                <h4 className="text-sm sm:text-lg font-serif font-bold text-[#0d1b2a] line-clamp-1 group-hover:text-[#b58351] transition-colors">
                  {product.name}
                </h4>

                <p className="text-[11px] sm:text-xs text-[#7f5539] font-medium mb-1.5 sm:mb-2">
                  {product.collection} • <span className="text-[#5c677d]">{product.finish}</span>
                </p>

                <p className="text-[11px] sm:text-xs text-[#5c677d] line-clamp-2 leading-relaxed mb-3 sm:mb-4">
                  {product.description}
                </p>
              </div>

              <div className="pt-2.5 sm:pt-3 border-t border-[#f0e6da] flex items-center justify-between gap-1.5 sm:gap-2">
                <span className="text-xs sm:text-base font-bold text-[#0d1b2a] font-serif">
                  {product.price}
                </span>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={() => onQuickView?.(product)}
                    className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-[#f5efe6] hover:bg-[#0d1b2a] text-[#0d1b2a] hover:text-[#d4a373] border border-[#e2d5c5] transition-all cursor-pointer"
                    title="Quick View"
                  >
                    <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>

                  <button
                    onClick={() => onAddToCart?.(product)}
                    className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-[#0d1b2a] hover:bg-[#b58351] text-white font-bold text-[10px] sm:text-xs uppercase tracking-wider flex items-center gap-1 sm:gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#d4a373]" />
                    <span className="hidden xs:inline sm:inline">Enquire</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
