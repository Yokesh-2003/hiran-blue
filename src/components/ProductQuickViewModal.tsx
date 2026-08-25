'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { X, ShieldCheck, Check, Sparkles, ShoppingBag, FileDown } from 'lucide-react';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div
        className="relative w-full max-w-3xl bg-[#0d1b2a] text-white rounded-3xl overflow-hidden shadow-2xl border border-[#1b263b] animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#16253b]/80 hover:bg-[#16253b] text-[#ede0d4] hover:text-[#d4a373] flex items-center justify-center transition-colors shadow border border-[#1b263b] cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square md:aspect-auto w-full bg-[#ede0d4] min-h-[280px]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.tag && (
              <div className="absolute top-4 left-4 bg-[#0d1b2a]/90 text-[#d4a373] border border-[#d4a373]/30 text-xs font-bold px-3 py-1 rounded-full shadow">
                {product.tag}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-[#c8102e]">
                {product.collection}
              </div>
              <h2 className="text-2xl font-black text-white font-display-impact">
                {product.name}
              </h2>
              <p className="text-sm text-[#ede0d4] leading-relaxed">
                {product.description}
              </p>

              {/* Specs Table */}
              <div className="pt-3 border-t border-[#1b263b] space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#1b263b]/80">
                  <span className="text-[#a88b74] font-medium">Material Composition:</span>
                  <span className="text-white font-bold">{product.specs.material}</span>
                </div>
                {product.specs.flowRate && (
                  <div className="flex justify-between py-1 border-b border-[#1b263b]/80">
                    <span className="text-[#a88b74] font-medium">Hydraulic Flow:</span>
                    <span className="text-white font-bold">{product.specs.flowRate}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-[#1b263b]/80">
                  <span className="text-[#a88b74] font-medium">Installation Type:</span>
                  <span className="text-white font-bold">{product.specs.installation}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1b263b]/80">
                  <span className="text-[#a88b74] font-medium">Warranty Coverage:</span>
                  <span className="text-white font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#c8102e]" />
                    {product.specs.warranty}
                  </span>
                </div>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="space-y-3 pt-4 border-t border-[#1b263b]">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold text-[#a88b74] uppercase">MSRP Quote</span>
                <span className="text-2xl font-black text-[#d4a373] font-display-impact">{product.price}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="py-3 bg-[#c8102e] hover:bg-[#a50b24] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shadow cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Spec</span>
                </button>
                <a
                  href="#contact"
                  onClick={onClose}
                  className="py-3 bg-[#16253b] hover:bg-[#0d1b2a] text-white hover:text-[#d4a373] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 text-center border border-[#1b263b]"
                >
                  <span>Request CAD</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
