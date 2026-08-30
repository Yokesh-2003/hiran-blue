'use client';

import React, { useState, useEffect } from 'react';
import { X, User, Mail, Send } from 'lucide-react';

interface CustomerInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details: { name: string; email: string }) => void;
  title?: string;
  subtitle?: string;
  submitLabel?: string;
}

export const CustomerInfoModal: React.FC<CustomerInfoModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  subtitle = 'Please enter your name and email so our team can prepare your official quotation and order details.',
  submitLabel = 'Continue',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Preload saved customer details from localStorage
  useEffect(() => {
    if (isOpen) {
      const savedName = localStorage.getItem('hiran_user_name') || '';
      const savedEmail = localStorage.getItem('hiran_user_email') || '';
      if (savedName) setName(savedName);
      if (savedEmail) setEmail(savedEmail);
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    // Save to localStorage for convenience
    try {
      localStorage.setItem('hiran_user_name', name.trim());
      localStorage.setItem('hiran_user_email', email.trim());
    } catch (err) {
      console.error(err);
    }

    onSubmit({ name: name.trim(), email: email.trim() });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white text-[#0d1b2a] rounded-3xl overflow-hidden shadow-2xl border border-[#e2d5c5] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Hiran Logo */}
        <div className="p-5 sm:p-6 border-b border-[#e2d5c5] bg-[#fbf9f5] flex items-center justify-between">
          <div className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.webp"
              alt="Hiran Bath"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#0d1b2a] text-[#4a3525] hover:text-[#d4a373] flex items-center justify-center transition-all border border-[#d8c3af] cursor-pointer shadow-sm"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          <p className="text-xs text-[#7f5539] leading-relaxed">
            {subtitle}
          </p>

          {error && (
            <div className="p-2.5 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Name Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0d1b2a]">
              Your Name <span className="text-[#b58351]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="e.g. John Doe"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#fbf9f5] border border-[#e2d5c5] focus:outline-none focus:border-[#0d1b2a] text-xs sm:text-sm text-[#0d1b2a] placeholder:text-[#9e8c7c] transition-all"
              />
              <User className="w-4 h-4 text-[#9e8c7c] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0d1b2a]">
              Email Address <span className="text-[#b58351]">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="e.g. john@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#fbf9f5] border border-[#e2d5c5] focus:outline-none focus:border-[#0d1b2a] text-xs sm:text-sm text-[#0d1b2a] placeholder:text-[#9e8c7c] transition-all"
              />
              <Mail className="w-4 h-4 text-[#9e8c7c] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-[#d4a373] hover:bg-[#c69260] text-[#0d1b2a] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>{submitLabel}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
