'use client';

import React, { useState } from 'react';
import { navItems } from '@/data/mockData';
import { ShieldCheck, Sparkles, Send, Award, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail('');
      }, 5000);
    }
  };

  return (
    <footer className="bg-black text-white border-t border-neutral-800">
      {/* Top Value Strip */}
      <div className="border-b border-neutral-800/80 py-10 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-rose-500 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">15-Year Solid Warranty</h4>
                <p className="text-[11px] text-neutral-400">German ceramic cartridge and PVD coating protection</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-rose-500 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Diamond PVD Finishing</h4>
                <p className="text-[11px] text-neutral-400">Zero fingerprint, ultra-scratch resistant surfaces</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-rose-500 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Eco-Laminar Flow</h4>
                <p className="text-[11px] text-neutral-400">Up to 40% water savings without pressure loss</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-rose-500 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Direct Specifier Support</h4>
                <p className="text-[11px] text-neutral-400">Dedicated CAD/BIM engineers for projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-rose-600 to-amber-500 p-0.5">
                <div className="w-full h-full bg-black rounded-[7px] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-rose-500 fill-current">
                    <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-7.5-3.75v5.5L12 19l7.5-3.75v-5.5L12 13.5z" />
                  </svg>
                </div>
              </div>
              <span className="font-extrabold text-2xl tracking-tighter uppercase font-display-impact">
                HIRAN<span className="text-rose-500">BATH</span>
              </span>
            </div>
            
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Engineers of bespoke architectural sanitaryware, luxury concealed thermostatic mixers, and monolithic stone freestanding baths.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-xs font-bold text-neutral-300 mb-2 uppercase tracking-wider">
                Subscribe to Architectural Lookbook Releases
              </p>
              {subscribed ? (
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 bg-neutral-900 p-2.5 rounded-xl border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Subscribed to quarterly editions!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter architect / designer email"
                    className="w-full bg-neutral-900 border border-neutral-700 text-xs text-white rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-rose-500 placeholder:text-neutral-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shrink-0 flex items-center justify-center shadow"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-300">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-rose-400 transition-colors flex items-center gap-1"
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="text-[9px] bg-rose-900/60 text-rose-300 px-1.5 py-0.2 rounded border border-rose-800/40">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Product Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-300">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><a href="#products" className="hover:text-rose-400 transition-colors">Aura Zero 2.0 Series</a></li>
              <li><a href="#products" className="hover:text-rose-400 transition-colors">Concealed Basin Mixers</a></li>
              <li><a href="#products" className="hover:text-rose-400 transition-colors">Celestial Rain Hydro Showers</a></li>
              <li><a href="#products" className="hover:text-rose-400 transition-colors">Monolith Stone Bathtubs</a></li>
              <li><a href="#products" className="hover:text-rose-400 transition-colors">Ultra-Thin Rim Basins</a></li>
              <li><a href="#products" className="hover:text-rose-400 transition-colors">Titanium Bathroom Accessories</a></li>
            </ul>
          </div>

          {/* Col 4: Specifier Support & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-300">
              Technical Resources
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><a href="#catalogue" className="hover:text-rose-400 transition-colors">2026 Master PDF Specifier</a></li>
              <li><a href="#catalogue" className="hover:text-rose-400 transition-colors">Revit 3D BIM & AutoCAD Files</a></li>
              <li><a href="#dealers" className="hover:text-rose-400 transition-colors">Authorized Dealer Locator</a></li>
              <li><a href="#contact" className="hover:text-rose-400 transition-colors">Franchise Inquiries</a></li>
              <li><a href="#contact" className="hover:text-rose-400 transition-colors">15-Year Warranty Registration</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Standards Bar */}
        <div className="mt-14 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 Hiranbath Luxe Sanitary Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Terms of Specification</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">ISO 9001:2015 Certified</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
