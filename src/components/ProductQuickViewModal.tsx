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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-neutral-900/80 hover:bg-black text-white flex items-center justify-center transition-colors shadow"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square md:aspect-auto w-full bg-neutral-100 min-h-[280px]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.tag && (
              <div className="absolute top-4 left-4 bg-neutral-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                {product.tag}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-rose-600">
                {product.collection}
              </div>
              <h2 className="text-2xl font-black text-neutral-950 font-display-impact">
                {product.name}
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {product.description}
              </p>

              {/* Specs Table */}
              <div className="pt-3 border-t border-neutral-100 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500 font-medium">Material Composition:</span>
                  <span className="text-neutral-900 font-bold">{product.specs.material}</span>
                </div>
                {product.specs.flowRate && (
                  <div className="flex justify-between py-1 border-b border-neutral-100">
                    <span className="text-neutral-500 font-medium">Hydraulic Flow:</span>
                    <span className="text-neutral-900 font-bold">{product.specs.flowRate}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500 font-medium">Installation Type:</span>
                  <span className="text-neutral-900 font-bold">{product.specs.installation}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span className="text-neutral-500 font-medium">Warranty Coverage:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {product.specs.warranty}
                  </span>
                </div>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="space-y-3 pt-4 border-t border-neutral-200">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold text-neutral-400 uppercase">MSRP Quote</span>
                <span className="text-2xl font-black text-neutral-950 font-display-impact">{product.price}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="py-3 bg-[#c8102e] hover:bg-[#a50b24] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Spec</span>
                </button>
                <a
                  href="#contact"
                  onClick={onClose}
                  className="py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 text-center"
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
