'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Product } from '@/types';
import { allCatalogProducts } from '@/data/allCatalogProducts';
import {
  X,
  Layers,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Plus,
  Minus,
} from 'lucide-react';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onSelectProduct,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const suggestedScrollRef = useRef<HTMLDivElement>(null);
  const modalBodyRef = useRef<HTMLDivElement>(null);

  // Silky Smooth Mouse Drag-to-Scroll for Suggested Carousel
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftVal = useRef(0);
  const dragDistance = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = suggestedScrollRef.current;
    if (!el) return;
    isDragging.current = true;
    dragDistance.current = 0;
    startX.current = e.pageX;
    scrollLeftVal.current = el.scrollLeft;
    el.style.scrollBehavior = 'auto';
    el.style.scrollSnapType = 'none';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !suggestedScrollRef.current) return;
    const x = e.pageX;
    const diff = Math.abs(x - startX.current);
    dragDistance.current = diff;
    if (diff > 8) {
      e.preventDefault();
      const walk = x - startX.current;
      suggestedScrollRef.current.scrollLeft = scrollLeftVal.current - walk;
    }
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (suggestedScrollRef.current) {
      suggestedScrollRef.current.style.scrollBehavior = 'smooth';
      suggestedScrollRef.current.style.scrollSnapType = '';
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging.current) {
        handleMouseUpOrLeave();
      }
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  // Reset quantity and scroll position when active product changes
  useEffect(() => {
    setQuantity(1);
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product?.id]);

  // Suggested products from the same category or sub-category
  const suggestedProducts = useMemo(() => {
    if (!product) return [];
    const sameSeries = allCatalogProducts.filter(
      (p) => p.id !== product.id && p.subCategory === product.subCategory
    );
    const sameCategory = allCatalogProducts.filter(
      (p) =>
        p.id !== product.id &&
        p.category === product.category &&
        p.subCategory !== product.subCategory
    );
    return [...sameSeries, ...sameCategory].slice(0, 16);
  }, [product]);

  if (!product) return null;

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const scrollSuggested = (direction: 'left' | 'right') => {
    if (!suggestedScrollRef.current) return;
    const amount = direction === 'left' ? -320 : 320;
    suggestedScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const handleBuyNow = () => {
    if (!product) return;
    const isLocalhost =
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

    // Use live GitHub public URL on localhost so WhatsApp servers can crawl and preview the image
    const fullImageUrl = isLocalhost
      ? `https://raw.githubusercontent.com/Yokesh-2003/hiran-blue/main/public${encodeURI(product.image)}`
      : `${window.location.origin}${encodeURI(product.image)}`;

    const message = `Hello Hiran Bath,\n\nI would like to order/enquire about this product:\n\n*Product Name:* ${product.name}\n*Category:* ${product.category}\n*Series:* ${product.subCategory || product.collection}\n*Model Code:* ${product.modelCode || 'N/A'}\n*Quantity:* ${quantity}\n*Product Image:* ${fullImageUrl}\n\nPlease share the details. Thank you!`;

    const whatsappUrl = `https://wa.me/919585117901?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSelectSuggestedItem = (item: Product) => {
    if (dragDistance.current < 8 && onSelectProduct) {
      onSelectProduct(item);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/80 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white text-[#0d1b2a] rounded-3xl overflow-hidden shadow-2xl border border-[#e2d5c5] animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2d5c5] bg-[#fbf9f5] shrink-0">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7f5539] uppercase tracking-wider">
            <span>Products</span>
            <span>/</span>
            <span className="text-[#0d1b2a]">{product.category}</span>
            <span>/</span>
            <span className="text-[#b58351]">{product.subCategory || product.collection}</span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white hover:bg-[#0d1b2a] text-[#4a3525] hover:text-[#d4a373] flex items-center justify-center transition-all shadow-sm border border-[#d8c3af] cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div ref={modalBodyRef} className="overflow-y-auto p-5 sm:p-7 space-y-7 flex-1 scroll-smooth">
          
          {/* TOP SECTION: 2-COLUMN (IMAGE LEFT + CLASSIFICATION RIGHT) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* 1. LEFT COLUMN: PRODUCT IMAGE */}
            <div className="md:col-span-5 space-y-2">
              <div className="relative aspect-square w-full rounded-2xl bg-[#fbf9f5] border border-[#e2d5c5] overflow-hidden flex items-center justify-center p-6 shadow-inner group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />

                {product.modelCode && (
                  <div className="absolute top-3 left-3 bg-[#0d1b2a] text-[#d4a373] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md border border-[#1b263b]">
                    Model: {product.modelCode}
                  </div>
                )}
              </div>
            </div>

            {/* 2. RIGHT COLUMN: CLASSIFICATION ONLY */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                
                {/* Series Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5efe6] text-[#7f5539] text-[11px] font-bold uppercase tracking-wider border border-[#e2d5c5]">
                  <Layers className="w-3.5 h-3.5 text-[#b58351]" />
                  <span>{product.subCategory || product.collection}</span>
                </div>

                {/* Product Title */}
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0d1b2a] leading-tight">
                  {product.name}
                </h3>

                {/* Verified Classification Grid */}
                <div className="pt-3 border-t border-[#e2d5c5] space-y-2.5 text-xs">
                  <div className="grid grid-cols-2 gap-2 py-1.5 border-b border-[#f0e6da]">
                    <span className="text-[#7f5539] font-medium">Category:</span>
                    <span className="text-[#0d1b2a] font-bold uppercase">{product.category}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1.5 border-b border-[#f0e6da]">
                    <span className="text-[#7f5539] font-medium">Series:</span>
                    <span className="text-[#0d1b2a] font-bold">{product.subCategory || product.collection}</span>
                  </div>
                  {product.modelCode && (
                    <div className="grid grid-cols-2 gap-2 py-1.5 border-b border-[#f0e6da]">
                      <span className="text-[#7f5539] font-medium">Model:</span>
                      <span className="text-[#0d1b2a] font-bold">{product.modelCode}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* QUANTITY COUNTER & BUY NOW BUTTON */}
              <div className="pt-4 border-t border-[#e2d5c5] space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7f5539]">
                    Quantity:
                  </span>
                  
                  <div className="flex items-center rounded-xl bg-[#f5efe6] border border-[#d8c3af] overflow-hidden">
                    <button
                      onClick={handleDecrement}
                      className="px-3 py-2 text-[#0d1b2a] hover:bg-[#ede0d4] transition-colors cursor-pointer active:scale-95"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 py-2 text-sm font-bold text-[#0d1b2a] min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrement}
                      className="px-3 py-2 text-[#0d1b2a] hover:bg-[#ede0d4] transition-colors cursor-pointer active:scale-95"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Sandal Colored Buy Now Button */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#d4a373] hover:bg-[#c69260] text-[#0d1b2a] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.99] text-center"
                >
                  Buy Now
                </button>
              </div>

            </div>

          </div>

          {/* BOTTOM SECTION: SUGGESTED PRODUCTS FROM THIS CATEGORY */}
          {suggestedProducts.length > 0 && (
            <div className="pt-6 border-t-2 border-[#e2d5c5] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base sm:text-lg font-serif font-bold text-[#0d1b2a]">
                    Suggested in {product.subCategory || product.category}
                  </h4>
                  <p className="text-[11px] text-[#7f5539]">
                    Other models from this collection
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => scrollSuggested('left')}
                    className="w-7 h-7 rounded-full bg-white hover:bg-[#0d1b2a] text-[#0d1b2a] hover:text-[#d4a373] border border-[#e2d5c5] flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Scroll suggested products left"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => scrollSuggested('right')}
                    className="w-7 h-7 rounded-full bg-white hover:bg-[#0d1b2a] text-[#0d1b2a] hover:text-[#d4a373] border border-[#e2d5c5] flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Scroll suggested products right"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Horizontal Suggested Products Carousel (Silky Smooth Drag & Touch Swipe) */}
              <div
                ref={suggestedScrollRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                className="flex items-stretch gap-3 overflow-x-auto pb-2 scrollbar-none select-none cursor-grab active:cursor-grabbing"
              >
                {suggestedProducts.map((item) => (
                  <div
                    key={`suggested-${item.id}`}
                    onClick={() => handleSelectSuggestedItem(item)}
                    className="w-[140px] sm:w-[160px] shrink-0 rounded-2xl bg-[#fbf9f5] border border-[#e2d5c5] p-2.5 shadow-sm hover:shadow-md hover:border-[#0d1b2a] transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative w-full aspect-square rounded-xl bg-white border border-[#f0e6da] overflow-hidden flex items-center justify-center p-2 mb-2 pointer-events-none">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform [-webkit-user-drag:none]"
                        />
                      </div>

                      <span className="text-[8px] font-bold text-[#b58351] uppercase tracking-wider block truncate">
                        {item.modelCode || item.subCategory}
                      </span>

                      <h5 className="text-[11px] font-serif font-bold text-[#0d1b2a] line-clamp-2 leading-snug group-hover:text-[#b58351]">
                        {item.name}
                      </h5>
                    </div>

                    <div className="pt-2 mt-1 border-t border-[#f0e6da] flex items-center justify-between text-[10px] font-bold text-[#0d1b2a] group-hover:text-[#b58351]">
                      <span>Select</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
