'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { X, Trash2, ArrowRight, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: { product: Product; quantity: number }[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onProceedToInquiry: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart,
  onProceedToInquiry,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white text-neutral-900 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Top Header */}
          <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
            <div>
              <h2 className="text-xl font-bold font-display-impact uppercase tracking-tight text-neutral-950">
                Architectural Spec Cart
              </h2>
              <p className="text-xs text-neutral-500">
                {items.length} fixtures selected for quotation
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-200 text-neutral-600 transition-colors"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-neutral-700">Your Spec Cart is Empty</p>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Browse the Aura 2.0 or Master Catalogue collections and add fixtures to build your project bill of quantities (BOQ).
                </p>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-3 bg-neutral-50 rounded-2xl border border-neutral-200"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-200 shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-neutral-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-[10px] text-neutral-500 truncate">
                      {product.collection} • {product.finish}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-black text-neutral-950">
                        {product.price}
                      </span>
                      <span className="text-[11px] text-neutral-500 font-semibold">
                        Qty: {quantity}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(product.id)}
                    className="p-1.5 text-neutral-400 hover:text-rose-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Bottom Actions */}
          {items.length > 0 && (
            <div className="p-6 border-t border-neutral-200 bg-neutral-50 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-neutral-500">Project Spec Items:</span>
                <span className="font-bold text-neutral-900">{items.length} models</span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    onClose();
                    onProceedToInquiry();
                  }}
                  className="w-full py-4 bg-[#c8102e] hover:bg-[#a50b24] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-900/20"
                >
                  <span>Request Project Estimate & BIM</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onClearCart}
                  className="w-full py-2 text-xs text-neutral-500 hover:text-neutral-800 font-semibold text-center"
                >
                  Clear Spec Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
