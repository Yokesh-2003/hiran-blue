'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ChevronRight,
  Globe,
  Phone,
  Mail,
  MapPin,
  Check,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ firstName: '', lastName: '', email: '' });
    }, 4000);
  };

  return (
    <footer className="relative bg-[#ede0d4] text-[#0d1b2a] border-t border-[#d8c3af] overflow-hidden font-sans">
      
      {/* 1. TOP INTERACTIVE ACTION PILLARS (3-COLUMN SPLIT WITH VERTICAL DIVIDERS) */}
      <div className="border-b border-[#d8c3af]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#d8c3af]">
            
            {/* Pillar 1: Assistance */}
            <a
              href="/#contact"
              className="group py-8 sm:py-10 md:px-8 first:pl-0 flex items-center justify-between transition-colors hover:bg-[#e4d4c4]/40"
            >
              <div className="space-y-1.5 pr-4">
                <h3 className="text-base sm:text-lg font-bold text-[#0d1b2a] tracking-tight group-hover:text-[#b58351] transition-colors">
                  Assistance
                </h3>
                <p className="text-xs text-[#5c677d] leading-relaxed max-w-xs font-normal">
                  Do you need assistance or would you like to request technical information?
                </p>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#0d1b2a] group-hover:text-[#b58351] group-hover:translate-x-1.5 transition-all shrink-0">
                <ChevronRight className="w-5 h-5 stroke-[1.75]" />
              </div>
            </a>

            {/* Pillar 2: News & Events */}
            <a
              href="/#projects"
              className="group py-8 sm:py-10 md:px-8 flex items-center justify-between transition-colors hover:bg-[#e4d4c4]/40"
            >
              <div className="space-y-1.5 pr-4">
                <h3 className="text-base sm:text-lg font-bold text-[#0d1b2a] tracking-tight group-hover:text-[#b58351] transition-colors">
                  News & Events
                </h3>
                <p className="text-xs text-[#5c677d] leading-relaxed max-w-xs font-normal">
                  News, architectural insights and must-see showcase moments.
                </p>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#0d1b2a] group-hover:text-[#b58351] group-hover:translate-x-1.5 transition-all shrink-0">
                <ChevronRight className="w-5 h-5 stroke-[1.75]" />
              </div>
            </a>

            {/* Pillar 3: Catalogues */}
            <a
              href="/#catalogue"
              className="group py-8 sm:py-10 md:px-8 last:pr-0 flex items-center justify-between transition-colors hover:bg-[#e4d4c4]/40"
            >
              <div className="space-y-1.5 pr-4">
                <h3 className="text-base sm:text-lg font-bold text-[#0d1b2a] tracking-tight group-hover:text-[#b58351] transition-colors">
                  Catalogues
                </h3>
                <p className="text-xs text-[#5c677d] leading-relaxed max-w-xs font-normal">
                  Flip through the digital catalogues to find the newest luxury collections.
                </p>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#0d1b2a] group-hover:text-[#b58351] group-hover:translate-x-1.5 transition-all shrink-0">
                <ChevronRight className="w-5 h-5 stroke-[1.75]" />
              </div>
            </a>

          </div>
        </div>
      </div>

      {/* 2. MAIN 5-COLUMN EDITORIAL DIRECTORY GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Column 1: Contact Details */}
          <div className="lg:col-span-3 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0d1b2a] pb-1 border-b border-[#0d1b2a]/30">
              <Globe className="w-4 h-4 text-[#b58351]" />
              <span>UNITED STATES / EN</span>
            </div>

            {/* Direct Contact List */}
            <div className="space-y-3 text-xs text-[#5c677d]">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#b58351] shrink-0" />
                <a href="tel:641-754-0072" className="hover:text-[#0d1b2a] transition-colors font-medium">
                  641-754-0072
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#b58351] shrink-0" />
                <a href="mailto:GavinEMaki@rhyta.com" className="hover:text-[#0d1b2a] transition-colors break-all font-medium">
                  GavinEMaki@rhyta.com
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-[#b58351] shrink-0 mt-0.5" />
                <p className="leading-snug text-[#7f5539]">
                  1718 Park Boulevard Marshalltown, IA 50158
                </p>
              </div>
            </div>
          </div>

          {/* Columns 2 & 3: Quick Links & Our Product (Side-by-side 2 columns on mobile & desktop) */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:col-span-4">
            
            {/* Quick Link */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#0d1b2a]">
                Quick Link
              </h4>
              <ul className="space-y-2.5 text-xs text-[#5c677d]">
                <li><a href="/" className="hover:text-[#0d1b2a] transition-colors">Home</a></li>
                <li><a href="/about" className="hover:text-[#0d1b2a] transition-colors">About Us</a></li>
                <li><a href="/products" className="hover:text-[#0d1b2a] transition-colors">Our Product</a></li>
                <li><a href="/#catalogue" className="hover:text-[#0d1b2a] transition-colors">Catalogue</a></li>
                <li><a href="/#projects" className="hover:text-[#0d1b2a] transition-colors">Projects</a></li>
                <li><a href="/#dealers" className="hover:text-[#0d1b2a] transition-colors">Dealers</a></li>
                <li><a href="/#contact" className="hover:text-[#0d1b2a] transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Our Product (On the right side of Quick Link) */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#0d1b2a]">
                Our Product
              </h4>
              <ul className="space-y-2.5 text-xs text-[#5c677d]">
                <li><a href="/products" className="hover:text-[#0d1b2a] transition-colors">Faucets</a></li>
                <li><a href="/products" className="hover:text-[#0d1b2a] transition-colors">Bath Seth</a></li>
                <li><a href="/products" className="hover:text-[#0d1b2a] transition-colors">Kitchen</a></li>
                <li><a href="/products" className="hover:text-[#0d1b2a] transition-colors">Valves</a></li>
                <li><a href="/products" className="hover:text-[#0d1b2a] transition-colors">Allieds</a></li>
                <li><a href="/products" className="hover:text-[#0d1b2a] transition-colors">Showers</a></li>
              </ul>
            </div>

          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#0d1b2a]">
              Subscribe Newsletter
            </h4>

            <p className="text-xs text-[#5c677d] leading-relaxed">
              Experience the pinnacle of bathroom luxury and precision engineering.
            </p>

            {isSubmitted ? (
              <div className="p-4 rounded-xl bg-white border border-[#d8c3af] text-[#0d1b2a] text-xs font-medium flex items-center gap-2 animate-in fade-in">
                <div className="w-5 h-5 rounded-full bg-[#0d1b2a] text-[#d4a373] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>Thank you for subscribing to Hiran® newsletters.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                
                {/* First Name & Last Name Underline Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-transparent border-b border-[#0d1b2a]/40 focus:border-[#0d1b2a] text-xs py-1.5 text-[#0d1b2a] placeholder-[#7f5539]/70 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-transparent border-b border-[#0d1b2a]/40 focus:border-[#0d1b2a] text-xs py-1.5 text-[#0d1b2a] placeholder-[#7f5539]/70 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* E-mail & CONFIRM Submit */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex-1">
                    <input
                      type="email"
                      placeholder="E-mail"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-[#0d1b2a]/40 focus:border-[#0d1b2a] text-xs py-1.5 text-[#0d1b2a] placeholder-[#7f5539]/70 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="border-b border-[#0d1b2a] pb-1 text-xs font-bold uppercase tracking-widest text-[#0d1b2a] hover:text-[#b58351] hover:border-[#b58351] transition-colors cursor-pointer shrink-0"
                  >
                    CONFIRM
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>
      </div>

      {/* 3. FOLLOW US SOCIAL STRIP */}
      <div className="border-t border-[#d8c3af] py-10 text-center space-y-6">
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0d1b2a]">
          FOLLOW US
        </h4>

        {/* Social Icons Row (Instagram, WhatsApp, Facebook, YouTube, X) */}
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-[#0d1b2a]">
          
          {/* 1. Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 flex items-center justify-center hover:text-[#b58351] hover:scale-110 transition-transform"
            aria-label="Instagram"
          >
            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          </a>

          {/* 2. WhatsApp */}
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 flex items-center justify-center hover:text-[#b58351] hover:scale-110 transition-transform"
            aria-label="WhatsApp"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          </a>

          {/* 3. Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 flex items-center justify-center text-sm font-serif font-bold hover:text-[#b58351] hover:scale-110 transition-transform"
            aria-label="Facebook"
          >
            f
          </a>

          {/* 4. YouTube */}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 flex items-center justify-center hover:text-[#b58351] hover:scale-110 transition-transform"
            aria-label="YouTube"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>

          {/* 5. X (Twitter) */}
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 flex items-center justify-center text-sm font-sans font-bold hover:text-[#b58351] hover:scale-110 transition-transform"
            aria-label="X Twitter"
          >
            𝕏
          </a>

        </div>
      </div>

      {/* 4. BOTTOM COPYRIGHT STRIP */}
      <div className="border-t border-[#d8c3af] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 relative">
          
          {/* Brand Logo */}
          <div className="shrink-0">
            <Image
              src="/images/logo.webp"
              alt="HIRAN Bath Accessories"
              width={200}
              height={65}
              priority
              unoptimized
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </div>

          {/* Copyright / Powered By (Centered in the middle) */}
          <div className="text-xs text-[#5c677d] text-center md:absolute md:left-1/2 md:-translate-x-1/2">
            <p>
              Copyright © <span className="text-[#0d1b2a] font-semibold">Hiran®</span>. All rights reserved. | Powered by{' '}
              <span className="text-[#b58351] font-bold">yuyonix</span>
            </p>
          </div>

          {/* Spacer to keep flex layout balanced */}
          <div className="hidden md:block w-28 shrink-0 pointer-events-none" />

        </div>
      </div>

    </footer>
  );
};
