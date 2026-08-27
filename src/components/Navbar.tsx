'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { productsData } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { CountryFlag } from '@/components/CountryFlag';
import {
  Search,
  X,
  ChevronRight,
  ArrowRight,
  ChevronDown,
  Globe,
  Check,
  Package,
  Store,
  HelpCircle,
  Building2,
  Headphones,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentCountry,
    setCountry,
    currentLanguage,
    setLanguage,
    t,
    availableLanguages,
    allCountries,
    currentLanguageName,
  } = useLanguage();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

  // Search queries inside dropdowns
  const [countrySearch, setCountrySearch] = useState('');
  const [langSearch, setLangSearch] = useState('');

  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('');

  const isNavActive = (key: string) => {
    if (pathname === '/about') {
      return key === 'about';
    }
    if (pathname === '/products') {
      return key === 'products';
    }
    if (pathname === '/' || !pathname) {
      if (activeNav) {
        return activeNav === key;
      }
      return key === 'home';
    }
    return activeNav === key;
  };

  const searchInputRef = useRef<HTMLInputElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(e.target as Node)
      ) {
        setLangDropdownOpen(false);
      }
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(e.target as Node)
      ) {
        setCountryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto focus input when search is opened
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [searchOpen]);

  const navItemsList = [
    { key: 'home', name: t('home'), href: '/' },
    { key: 'about', name: t('about'), href: '/about' },
    { key: 'products', name: t('products'), href: '/products' },
    { key: 'projects', name: t('projects'), href: '/#projects' },
    { key: 'dealers', name: t('dealers'), href: '/#dealers' },
    { key: 'catalogue', name: t('catalogue'), href: '/#catalogue' },
    { key: 'contact', name: t('contact'), href: '/#contact' },
  ];

  const tickerItems = [
    t('ticker1'),
    t('ticker2'),
    t('ticker3'),
    t('ticker4'),
    t('ticker5'),
    t('ticker6'),
    t('ticker7'),
  ];

  const filteredProducts = searchQuery.trim()
    ? productsData.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.collection.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Filter countries by search query
  const filteredCountries = allCountries.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  // Filter languages by search query
  const filteredLanguages = availableLanguages.filter(
    (l) =>
      l.name.toLowerCase().includes(langSearch.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(langSearch.toLowerCase())
  );

  return (
    <>
      {/* 1. TOP UTILITY STRIP (DARK BLUE BACKGROUND) */}
      <div
        className="w-full bg-[#0d1b2a] text-[#ede0d4] text-[11px] py-1.5 px-3 sm:px-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-1.5 sm:gap-4 border-b border-[#1b263b] select-none relative z-50 notranslate"
        translate="no"
      >
        
        {/* Row 2 on Mobile / Left on Desktop: Customer & Partner Links */}
        <div className="order-2 sm:order-1 flex flex-wrap items-center justify-start gap-x-2.5 sm:gap-x-3.5 gap-y-1 text-[10px] sm:text-[11px] font-medium text-[#dfcfbe] py-1 sm:py-0.5 border-t sm:border-t-0 border-[#1b263b]">
          <a
            href="/#products"
            className="flex items-center gap-1.5 hover:text-[#d4a373] transition-colors whitespace-nowrap"
          >
            <Package className="w-3 h-3 text-[#d4a373]" />
            <span>Customer Product</span>
          </a>
          <span className="text-[#5c677d]">|</span>

          <a
            href="/#dealers"
            className="flex items-center gap-1.5 hover:text-[#d4a373] transition-colors whitespace-nowrap"
          >
            <Store className="w-3 h-3 text-[#d4a373]" />
            <span>Become a Dealer</span>
          </a>
          <span className="text-[#5c677d]">|</span>

          <a
            href="/#contact"
            className="flex items-center gap-1.5 hover:text-[#d4a373] transition-colors whitespace-nowrap"
          >
            <HelpCircle className="w-3 h-3 text-[#d4a373]" />
            <span>Submit Enquiry</span>
          </a>
          <span className="text-[#5c677d]">|</span>

          <a
            href="/#contact"
            className="flex items-center gap-1.5 hover:text-[#d4a373] transition-colors whitespace-nowrap"
          >
            <Headphones className="w-3 h-3 text-[#d4a373]" />
            <span>Support</span>
          </a>
          <span className="text-[#5c677d]">|</span>

          <a
            href="/#contact"
            className="flex items-center gap-1.5 hover:text-[#d4a373] transition-colors whitespace-nowrap"
          >
            <Building2 className="w-3 h-3 text-[#d4a373]" />
            <span>Contractor Project Enquiry</span>
          </a>
        </div>

        {/* Row 1 on Mobile / Right on Desktop: Language & Country Selectors */}
        <div className="order-1 sm:order-2 flex items-center justify-end gap-3 sm:gap-5 shrink-0">
          {/* A. Language Dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => {
                setLangDropdownOpen(!langDropdownOpen);
                setCountryDropdownOpen(false);
              }}
              className="flex items-center gap-1.5 hover:text-[#d4a373] transition-colors py-0.5 px-2 rounded-md hover:bg-[#1b263b] focus:outline-none"
              aria-expanded={langDropdownOpen}
            >
              <Globe className="w-3.5 h-3.5 text-[#d4a373]" />
              <span className="font-bold text-white truncate max-w-[120px] sm:max-w-none">
                {currentLanguageName}
              </span>
              <ChevronDown
                className={`w-3 h-3 text-[#dfcfbe] transition-transform ${
                  langDropdownOpen ? 'rotate-180 text-[#d4a373]' : ''
                }`}
              />
            </button>

            {/* Language Dropdown Menu with Search Option */}
            {langDropdownOpen && (
              <div className="absolute top-full right-0 mt-1.5 w-64 bg-[#0d1b2a] text-white rounded-2xl shadow-2xl border border-[#1b263b] py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 pb-2 border-b border-[#1b263b]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#dfcfbe] mb-1.5">
                    Languages for {currentCountry.name} ({availableLanguages.length})
                  </div>
                  {/* Search Box Inside Language Dropdown */}
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={langSearch}
                      onChange={(e) => setLangSearch(e.target.value)}
                      placeholder="Search language..."
                      className="w-full bg-[#16253b] border border-[#274060] rounded-lg text-base sm:text-xs px-2.5 py-1.5 text-white placeholder:text-[#a88b74] focus:outline-none focus:border-[#d4a373]"
                    />
                    {langSearch && (
                      <button
                        onClick={() => setLangSearch('')}
                        className="absolute right-2 text-[#a88b74] hover:text-white text-xs"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Language List */}
                <div className="max-h-60 overflow-y-auto mt-1 space-y-0.5">
                  {filteredLanguages.length > 0 ? (
                    filteredLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangDropdownOpen(false);
                          setLangSearch('');
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs transition-colors ${
                          currentLanguage === lang.code
                            ? 'bg-[#1b263b] text-[#d4a373] font-bold'
                            : 'text-[#dfcfbe] hover:bg-[#16253b] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{lang.name}</span>
                          <span className="text-[10px] text-[#a88b74]">({lang.nativeName})</span>
                        </div>
                        {currentLanguage === lang.code && (
                          <Check className="w-3.5 h-3.5 text-[#d4a373]" />
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="p-3 text-center text-xs text-[#a88b74]">
                      No language found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* B. Country Dropdown with Visual Flag Icons */}
          <div className="relative" ref={countryDropdownRef}>
            <button
              onClick={() => {
                setCountryDropdownOpen(!countryDropdownOpen);
                setLangDropdownOpen(false);
              }}
              className="flex items-center gap-2 hover:text-[#d4a373] transition-colors py-0.5 px-2 rounded-md hover:bg-[#1b263b] focus:outline-none"
              aria-expanded={countryDropdownOpen}
            >
              {/* Visual Flag Image */}
              <CountryFlag code={currentCountry.code} name={currentCountry.name} />
              <span className="font-bold text-white">{currentCountry.name}</span>
              <ChevronDown
                className={`w-3 h-3 text-[#dfcfbe] transition-transform ${
                  countryDropdownOpen ? 'rotate-180 text-[#d4a373]' : ''
                }`}
              />
            </button>

            {/* Country Dropdown Menu with Search Option */}
            {countryDropdownOpen && (
              <div className="absolute top-full right-0 mt-1.5 w-64 bg-[#0d1b2a] text-white rounded-2xl shadow-2xl border border-[#1b263b] py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 pb-2 border-b border-[#1b263b]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#dfcfbe] mb-1.5 flex items-center justify-between">
                    <span>Select Country / Region</span>
                    <span className="text-[9px] text-[#d4a373] font-bold">{allCountries.length} Countries</span>
                  </div>
                  {/* Search Box Inside Country Dropdown */}
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      placeholder="Search country..."
                      className="w-full bg-[#16253b] border border-[#274060] rounded-lg text-base sm:text-xs px-2.5 py-1.5 text-white placeholder:text-[#a88b74] focus:outline-none focus:border-[#d4a373]"
                    />
                    {countrySearch && (
                      <button
                        onClick={() => setCountrySearch('')}
                        className="absolute right-2 text-[#a88b74] hover:text-white text-xs"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Country List with Flags */}
                <div className="max-h-64 overflow-y-auto mt-1 space-y-0.5">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          setCountry(c.code);
                          setCountryDropdownOpen(false);
                          setCountrySearch('');
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs transition-colors ${
                          currentCountry.code === c.code
                            ? 'bg-[#1b263b] text-[#d4a373] font-bold'
                            : 'text-[#dfcfbe] hover:bg-[#16253b] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {/* Visual Country Flag */}
                          <CountryFlag code={c.code} name={c.name} />
                          <span className="font-medium">{c.name}</span>
                        </div>
                        {currentCountry.code === c.code && (
                          <Check className="w-3.5 h-3.5 text-[#d4a373]" />
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="p-3 text-center text-xs text-[#a88b74]">
                      No country found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* 2. RUNNING TICKER STRIP (GREY BACKGROUND) */}
      <div className="w-full bg-[#f3f4f6] text-[#0d1b2a] text-[11px] sm:text-xs py-1.5 overflow-hidden border-b border-[#e5e7eb] select-none z-40">
        <div className="animate-marquee flex items-center whitespace-nowrap">
          {tickerItems.map((text, idx) => (
            <div key={`ticker-1-${idx}`} className="flex items-center">
              <span className="font-bold tracking-wide text-[#0d1b2a] px-4">
                {text}
              </span>
              <span className="text-[#c8102e] font-bold px-2">|</span>
            </div>
          ))}
          {tickerItems.map((text, idx) => (
            <div key={`ticker-2-${idx}`} className="flex items-center">
              <span className="font-bold tracking-wide text-[#0d1b2a] px-4">
                {text}
              </span>
              <span className="text-[#c8102e] font-bold px-2">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. MAIN NAVIGATION HEADER (WHITE BACKGROUND) */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-neutral-200'
            : 'bg-white border-b border-neutral-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
            
            {/* LOGO (Left) */}
            <div className="flex items-center shrink-0">
              <a
                href="/"
                className="h-10 sm:h-12 flex items-center justify-start focus:outline-none"
                aria-label="Hiranbath Home"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo.webp"
                  alt="Hiranbath Logo"
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </a>
            </div>

            {/* NAVIGATION CONTENTS (Desktop Center with dynamic translations) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItemsList.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setActiveNav(item.key)}
                  className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all relative rounded-lg whitespace-nowrap ${
                    isNavActive(item.key)
                      ? 'text-[#d4a373] bg-[#0d1b2a] shadow-md'
                      : 'text-[#0d1b2a] hover:text-[#b58351] hover:bg-[#f5efe6]'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* RIGHT ICONS CLUSTER */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* 1. Circle Search Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all ${
                  searchOpen
                    ? 'border-[#0d1b2a] bg-[#0d1b2a] text-[#d4a373]'
                    : 'border-neutral-300 text-[#0d1b2a] hover:border-[#0d1b2a] hover:bg-[#f5efe6] bg-white shadow-sm'
                }`}
                aria-label="Search"
              >
                {searchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
              </button>

              {/* 2. Hamburger Menu (Only for Mobile / Tablet, hidden on PC) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 sm:w-10 sm:h-10 flex lg:hidden flex-col items-center justify-center gap-1.5 p-2 text-[#0d1b2a] hover:text-[#b58351] focus:outline-none"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#0d1b2a]" />
                ) : (
                  <div className="flex flex-col gap-1.5 w-6">
                    <span className="w-full h-[2.5px] bg-[#0d1b2a] rounded-full transition-transform" />
                    <span className="w-4/5 h-[2.5px] bg-[#d4a373] rounded-full transition-transform" />
                  </div>
                )}
              </button>
            </div>

          </div>

          {/* 4. SEARCH DROPDOWN BAR */}
          {searchOpen && (
            <div className="py-3 sm:py-4 border-t border-neutral-200 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="relative flex items-center w-full">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full bg-[#f5efe6] border border-[#d8c3af] rounded-lg sm:rounded-xl px-4 py-3 text-xs sm:text-sm text-[#0d1b2a] placeholder:text-[#a88b74] focus:outline-none focus:border-[#0d1b2a] focus:ring-1 focus:ring-[#0d1b2a] shadow-sm pr-12"
                />
                
                {/* Arrow Submit Button */}
                <button
                  onClick={() => {
                    if (searchQuery.trim()) {
                      const el = document.getElementById('products');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 text-[#0d1b2a] hover:text-[#c8102e] hover:scale-110 transition-transform focus:outline-none"
                  aria-label="Submit search"
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                </button>
              </div>

              {/* Instant Search Results Dropdown */}
              {searchQuery.trim().length > 0 && (
                <div className="mt-2 w-full bg-white rounded-xl shadow-2xl border border-neutral-200 p-2 z-50 animate-in fade-in">
                  <div className="text-[10px] font-bold text-[#a88b74] uppercase tracking-wider px-3 py-1.5">
                    {t('searchResults')} ({filteredProducts.length})
                  </div>
                  {filteredProducts.length > 0 ? (
                    <div className="max-h-60 overflow-y-auto space-y-1">
                      {filteredProducts.map((prod) => (
                        <a
                          key={prod.id}
                          href="#products"
                          onClick={() => {
                            setSearchQuery('');
                            setSearchOpen(false);
                          }}
                          className="flex items-center justify-between p-2.5 hover:bg-[#f5efe6] rounded-lg transition-colors group"
                        >
                          <div>
                            <p className="text-xs font-bold text-[#0d1b2a] group-hover:text-[#b58351]">
                              {prod.name}
                            </p>
                            <p className="text-[10px] text-[#a88b74]">
                              {prod.collection} • {prod.finish}
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-[#0d1b2a]">
                            {prod.price}
                          </span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 text-xs text-[#a88b74] text-center">
                      {t('noResults')} &ldquo;{searchQuery}&rdquo;
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 5. MOBILE NAVIGATION DRAWER */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-neutral-200 px-4 pt-3 pb-6 space-y-1.5 shadow-xl animate-in slide-in-from-top-4">
            {navItemsList.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => {
                  setActiveNav(item.key);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  isNavActive(item.key)
                    ? 'bg-[#0d1b2a] text-[#d4a373] shadow-sm'
                    : 'text-[#0d1b2a] hover:bg-[#f5efe6] hover:text-[#b58351]'
                }`}
              >
                <span>{item.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#a88b74]" />
              </a>
            ))}
          </div>
        )}
      </header>
    </>
  );
};
