'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { CustomerInfoModal } from '@/components/CustomerInfoModal';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  Send,
  ArrowRight,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen: propIsOpen,
  onClose: propOnClose,
}) => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartOpen,
    setCartOpen,
    totalItems,
  } = useCart();

  const [customerInfoOpen, setCustomerInfoOpen] = useState(false);

  const isVisible = propIsOpen !== undefined ? propIsOpen : cartOpen;
  const handleClose = propOnClose || (() => setCartOpen(false));

  if (!isVisible) return null;

  const handleCheckoutWhatsApp = () => {
    if (cartItems.length === 0) return;
    setCustomerInfoOpen(true);
  };

  const handleCustomerInfoSubmit = (details: { name: string; email: string }) => {
    if (cartItems.length === 0) return;

    const origin =
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'https://raw.githubusercontent.com/Yokesh-2003/hiran-blue/main/public'
        : typeof window !== 'undefined'
        ? window.location.origin
        : 'https://hiranbath.com';

    let message = `Hello Hiran Bath,\n\n*Customer Details:*\n- Name: ${details.name}\n- Email: ${details.email}\n\n*Order Items from Cart:*\n\n`;

    cartItems.forEach((item, index) => {
      const imgUrl = item.product.image.startsWith('http')
        ? item.product.image
        : `${origin}${encodeURI(item.product.image)}`;
      message += `${index + 1}. *${item.product.name}*\n   - Model: ${item.product.modelCode || 'N/A'}\n   - Series: ${item.product.subCategory || item.product.collection}\n   - Quantity: ${item.quantity}\n   - Image: ${imgUrl}\n\n`;
    });

    message += `*Total Items:* ${totalItems}\n\nPlease confirm availability, official quotation, and delivery details. Thank you!`;

    const whatsappUrl = `https://wa.me/919585117901?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in"
      onClick={handleClose}
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div
          className="w-screen max-w-md bg-white text-[#0d1b2a] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 border-l border-[#e2d5c5]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Header */}
          <div className="p-5 sm:p-6 border-b border-[#e2d5c5] flex items-center justify-between bg-[#fbf9f5]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#0d1b2a] text-[#d4a373] flex items-center justify-center shadow-sm">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-serif font-bold text-[#0d1b2a]">
                  Your Cart
                </h2>
                <p className="text-[11px] text-[#7f5539]">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} saved
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-white hover:bg-[#0d1b2a] text-[#4a3525] hover:text-[#d4a373] border border-[#d8c3af] flex items-center justify-center transition-all cursor-pointer shadow-sm"
              aria-label="Close Cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-3.5">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#f5efe6] flex items-center justify-center mx-auto text-[#b58351] border border-[#e2d5c5]">
                  <ShoppingCart className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-serif font-bold text-[#0d1b2a]">
                    Your Cart is Empty
                  </p>
                  <p className="text-xs text-[#7f5539] max-w-xs mx-auto">
                    Browse our luxury products catalog and click &ldquo;Add to Cart&rdquo; to build your order list.
                  </p>
                </div>
              </div>
            ) : (
              cartItems.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#fbf9f5] border border-[#e2d5c5] shadow-sm hover:shadow-md transition-all"
                >
                  {/* Product Image */}
                  <div className="relative w-16 h-16 rounded-xl bg-white border border-[#f0e6da] overflow-hidden shrink-0 flex items-center justify-center p-1.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#b58351] block truncate">
                      {product.modelCode ? `Model: ${product.modelCode}` : product.subCategory}
                    </span>
                    <h4 className="text-xs font-serif font-bold text-[#0d1b2a] line-clamp-1">
                      {product.name}
                    </h4>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 pt-1">
                      <div className="flex items-center rounded-lg bg-white border border-[#d8c3af] overflow-hidden">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="px-2 py-0.5 text-[#0d1b2a] hover:bg-[#ede0d4] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#0d1b2a] min-w-[20px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="px-2 py-0.5 text-[#0d1b2a] hover:bg-[#ede0d4] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="p-2 text-[#7f5539] hover:text-[#c8102e] transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Bottom Actions */}
          {cartItems.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-[#e2d5c5] bg-[#fbf9f5] space-y-3 shrink-0">
              <div className="flex justify-between items-center text-xs font-bold text-[#7f5539]">
                <span>Total Items:</span>
                <span className="text-[#0d1b2a] text-sm">{totalItems} units</span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCheckoutWhatsApp}
                  className="w-full py-3.5 px-5 bg-[#d4a373] hover:bg-[#c69260] text-[#0d1b2a] text-xs font-bold uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Order Cart on WhatsApp</span>
                </button>

                <button
                  onClick={clearCart}
                  className="w-full py-2 text-[11px] text-[#7f5539] hover:text-[#c8102e] font-bold text-center transition-colors cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Customer Name & Email Modal before WhatsApp Cart Order */}
      <CustomerInfoModal
        isOpen={customerInfoOpen}
        onClose={() => setCustomerInfoOpen(false)}
        onSubmit={handleCustomerInfoSubmit}
        title="Order Cart on WhatsApp"
        subtitle={`Please enter your details so our team can prepare your official quotation for all ${totalItems} items in your cart.`}
        submitLabel="Continue"
      />
    </div>
  );
};
