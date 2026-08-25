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
              href="#contact"
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
              href="#projects"
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
              href="#catalogue"
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

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#0d1b2a]">
              Quick Link
            </h4>
            <ul className="space-y-2.5 text-xs text-[#5c677d]">
              <li><a href="#home" className="hover:text-[#0d1b2a] transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-[#0d1b2a] transition-colors">About Us</a></li>
              <li><a href="#products" className="hover:text-[#0d1b2a] transition-colors">Our Product</a></li>
              <li><a href="#catalogue" className="hover:text-[#0d1b2a] transition-colors">Catalogue</a></li>
              <li><a href="#projects" className="hover:text-[#0d1b2a] transition-colors">Projects</a></li>
              <li><a href="#dealers" className="hover:text-[#0d1b2a] transition-colors">Dealers</a></li>
              <li><a href="#contact" className="hover:text-[#0d1b2a] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Our Products */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#0d1b2a]">
              Our Product
            </h4>
            <ul className="space-y-2.5 text-xs text-[#5c677d]">
              <li><a href="#products" className="hover:text-[#0d1b2a] transition-colors">Faucets</a></li>
              <li><a href="#products" className="hover:text-[#0d1b2a] transition-colors">Bath Seth</a></li>
              <li><a href="#products" className="hover:text-[#0d1b2a] transition-colors">Showers</a></li>
              <li><a href="#products" className="hover:text-[#0d1b2a] transition-colors">Valve</a></li>
              <li><a href="#products" className="hover:text-[#0d1b2a] transition-colors">Kitchen Sink</a></li>
              <li><a href="#products" className="hover:text-[#0d1b2a] transition-colors">Gratings & Showers</a></li>
              <li><a href="#products" className="hover:text-[#0d1b2a] transition-colors">Allieds</a></li>
            </ul>
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

        {/* Social Icons Row matching Gessi luxury aesthetic */}
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-[#0d1b2a]">
          
          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 flex items-center justify-center text-sm font-serif font-bold hover:text-[#b58351] hover:scale-110 transition-transform"
            aria-label="Facebook"
          >
            f
          </a>

          {/* X (Twitter) */}
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 flex items-center justify-center text-sm font-sans font-bold hover:text-[#b58351] hover:scale-110 transition-transform"
            aria-label="X Twitter"
          >
            𝕏
          </a>

          {/* YouTube */}
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

          {/* Instagram */}
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

          {/* Pinterest */}
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 flex items-center justify-center text-sm font-serif font-bold hover:text-[#b58351] hover:scale-110 transition-transform"
            aria-label="Pinterest"
          >
            p
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 flex items-center justify-center text-xs font-sans font-bold hover:text-[#b58351] hover:scale-110 transition-transform"
            aria-label="LinkedIn"
          >
            in
          </a>

          {/* Threads */}
          <a
            href="https://threads.net"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 flex items-center justify-center text-sm font-sans font-bold hover:text-[#b58351] hover:scale-110 transition-transform"
            aria-label="Threads"
          >
            @
          </a>

          {/* WeChat */}
          <a
            href="#contact"
            className="w-7 h-7 flex items-center justify-center hover:text-[#b58351] hover:scale-110 transition-transform"
            aria-label="WeChat"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M8.691 2.188C3.891 2.188 0 5.478 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.81-.05-.858-2.587.402-5.408 2.838-6.611 1.09-.538 2.288-.813 3.52-.813.432 0 .86.035 1.282.105C18.15 5.244 13.81 2.188 8.69 2.188zm-2.4 4.025c.662 0 1.2.538 1.2 1.2 0 .663-.538 1.2-1.2 1.2-.663 0-1.2-.537-1.2-1.2 0-.662.537-1.2 1.2-1.2zm5.4 0c.662 0 1.2.538 1.2 1.2 0 .663-.538 1.2-1.2 1.2-.663 0-1.2-.537-1.2-1.2 0-.662.537-1.2 1.2-1.2z"/>
            </svg>
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 flex items-center justify-center hover:text-[#b58351] hover:scale-110 transition-transform"
            aria-label="TikTok"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.73 1.12-.04 2.16-.62 2.74-1.57.4-.64.57-1.4.56-2.15.02-5.74.01-11.49.01-17.23z"/>
            </svg>
          </a>

        </div>
      </div>

      {/* 4. BOTTOM COPYRIGHT STRIP */}
      <div className="border-t border-[#d8c3af] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
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

          {/* Corporate Address & Details */}
          <div className="text-center md:text-left text-[11px] text-[#7f5539] space-y-0.5 leading-tight">
            <p>1718 Park Boulevard Marshalltown, IA 50158 • Phone: 641-754-0072</p>
          </div>

          {/* Copyright / Powered By */}
          <div className="text-[11px] text-[#5c677d]">
            <p>Copyright © <span className="text-[#0d1b2a] font-semibold">Hiran®</span>. All rights reserved. | Powered by <span className="text-[#b58351] font-bold">yuyonix</span></p>
          </div>

        </div>
      </div>

    </footer>
  );
};
