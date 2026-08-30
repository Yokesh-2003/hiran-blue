'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { productsData } from '@/data/mockData';
import { allCatalogProducts } from '@/data/allCatalogProducts';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { CartDrawer } from '@/components/CartDrawer';
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
  ShoppingCart,
  Download,
  Layers,
  Sparkles,
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

  const { totalItems, setCartOpen } = useCart();

  const router = useRouter();
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
    if (pathname === '/catalogue') {
      return key === 'catalogue';
    }
    if (pathname === '/contact') {
      return key === 'contact';
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setLangDropdownOpen(false);
      }
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setCountryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when search bar opens
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
    { key: 'catalogue', name: t('catalogue'), href: '/catalogue' },
    { key: 'contact', name: t('contact'), href: '/contact' },
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

  const query = searchQuery.trim().toLowerCase();

  // 1. Quick Navigation Links Matching (Enquiries, Catalogues, Support, Categories)
  const quickLinksMatches = useMemo(() => {
    if (!query) return [];
    const results: Array<{
      title: string;
      subtitle: string;
      href: string;
      badge: string;
      iconType: 'download' | 'enquiry' | 'support' | 'category' | 'about';
    }> = [];

    // Catalogue & ZIP downloads
    if (
      query.includes('cat') ||
      query.includes('zip') ||
      query.includes('down') ||
      query.includes('pdf') ||
      query.includes('photo') ||
      query.includes('media') ||
      query.includes('image')
    ) {
      results.push({
        title: 'Download Product ZIP & Catalogue',
        subtitle: 'Official photos, high-res library & PDF catalog',
        href: '/catalogue',
        badge: 'Downloads',
        iconType: 'download',
      });
    }

    // Business / Project Enquiry
    if (
      query.includes('enquir') ||
      query.includes('inquir') ||
      query.includes('quote') ||
      query.includes('pric') ||
      query.includes('b2b') ||
      query.includes('project') ||
      query.includes('order') ||
      query.includes('buy')
    ) {
      results.push({
        title: 'Submit Business & Project Enquiry',
        subtitle: 'Request architectural specifications & official quotations',
        href: '/contact?tab=enquiry',
        badge: 'Enquiry',
        iconType: 'enquiry',
      });
    }

    // Customer Support
    if (
      query.includes('supp') ||
      query.includes('cust') ||
      query.includes('help') ||
      query.includes('care') ||
      query.includes('service') ||
      query.includes('warrant') ||
      query.includes('issu') ||
      query.includes('tech') ||
      query.includes('contact')
    ) {
      results.push({
        title: 'Customer Support & Concierge',
        subtitle: 'Installation guidance, service & warranty support',
        href: '/contact?tab=support',
        badge: 'Support',
        iconType: 'support',
      });
    }

    // Category matches
    if (query.includes('faucet') || query.includes('tap') || query.includes('mixer')) {
      results.push({
        title: 'Faucets Collection',
        subtitle: 'Basin mixers, tall body, wall mixers & diverters',
        href: '/products/faucets',
        badge: 'Category',
        iconType: 'category',
      });
    }
    if (query.includes('bath') || query.includes('seth')) {
      results.push({
        title: 'Bath Seth Collection',
        subtitle: 'Luxury bath sets, concealed components & spouts',
        href: '/products/bath-seth',
        badge: 'Category',
        iconType: 'category',
      });
    }
    if (query.includes('kitchen') || query.includes('sink')) {
      results.push({
        title: 'Kitchen Collection',
        subtitle: 'Sink mixers & 360° flexible kitchen faucets',
        href: '/products/kitchen',
        badge: 'Category',
        iconType: 'category',
      });
    }
    if (query.includes('valve') || query.includes('angle') || query.includes('ball')) {
      results.push({
        title: 'Valves Collection',
        subtitle: 'Ball valves, angle valves & heavy-duty flow controls',
        href: '/products/valves',
        badge: 'Category',
        iconType: 'category',
      });
    }
    if (query.includes('allied') || query.includes('trap') || query.includes('drain') || query.includes('towel')) {
      results.push({
        title: 'Allieds & Accessories',
        subtitle: 'Floor gratings, bottle traps & architectural accessories',
        href: '/products/allieds',
        badge: 'Category',
        iconType: 'category',
      });
    }
    if (query.includes('shower') || query.includes('rain') || query.includes('overhead')) {
      results.push({
        title: 'Showers Collection',
        subtitle: 'Rain showers, multi-flow systems & shower arms',
        href: '/products/showers',
        badge: 'Category',
        iconType: 'category',
      });
    }

    // About Us
    if (query.includes('about') || query.includes('company') || query.includes('story') || query.includes('brand') || query.includes('motto')) {
      results.push({
        title: 'About Hiran Bath',
        subtitle: 'Heritage, precision engineering & company values',
        href: '/about',
        badge: 'About Us',
        iconType: 'about',
      });
    }

    return results;
  }, [query]);

  // 2. Full Products Search across all 437 items
  const matchingCatalogProducts = useMemo(() => {
    if (!query) return [];
    return allCatalogProducts
      .filter((p) => {
        const nameMatch = p.name?.toLowerCase().includes(query);
        const codeMatch = p.modelCode?.toLowerCase().includes(query);
        const seriesMatch = p.subCategory?.toLowerCase().includes(query);
        const catMatch = p.category?.toLowerCase().includes(query);
        const collectionMatch = p.collection?.toLowerCase().includes(query);
        return nameMatch || codeMatch || seriesMatch || catMatch || collectionMatch;
      })
      .slice(0, 10);
  }, [query]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query) return;

    if (quickLinksMatches.length > 0 && matchingCatalogProducts.length === 0) {
      router.push(quickLinksMatches[0].href);
      setSearchOpen(false);
      setSearchQuery('');
      return;
    }

    if (matchingCatalogProducts.length > 0) {
      const cat = matchingCatalogProducts[0].category;
      router.push(`/products/${cat}`);
      setSearchOpen(false);
      setSearchQuery('');
      return;
    }

    router.push('/products');
    setSearchOpen(false);
    setSearchQuery('');
  };

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
        
        {/* Row 2 on Mobile / Left on Desktop: Submit Enquiry, Customer Support & Cart */}
        <div className="order-2 sm:order-1 flex flex-wrap items-center justify-start gap-x-2.5 sm:gap-x-3.5 gap-y-1 text-[10px] sm:text-[11px] font-medium text-[#dfcfbe] py-1 sm:py-0.5 border-t sm:border-t-0 border-[#1b263b]">
          <a
            href="/contact?tab=enquiry"
            className="flex items-center gap-1.5 hover:text-[#d4a373] transition-colors whitespace-nowrap"
          >
            <HelpCircle className="w-3 h-3 text-[#d4a373]" />
            <span>Submit Enquiry</span>
          </a>
          <span className="text-[#5c677d]">|</span>

          <a
            href="/contact?tab=support"
            className="flex items-center gap-1.5 hover:text-[#d4a373] transition-colors whitespace-nowrap"
          >
            <Headphones className="w-3 h-3 text-[#d4a373]" />
            <span>Customer Support</span>
          </a>
          <span className="text-[#5c677d]">|</span>

          <button
            type="button"
            suppressHydrationWarning
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-1.5 hover:text-[#d4a373] transition-colors whitespace-nowrap cursor-pointer"
          >
            <div className="relative flex items-center">
              <ShoppingCart className="w-3 h-3 text-[#d4a373]" />
              {totalItems > 0 && (
                <span
                  suppressHydrationWarning
                  className="absolute -top-1.5 -right-2 bg-[#d4a373] text-[#0d1b2a] text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </span>
              )}
            </div>
            <span suppressHydrationWarning>Cart {totalItems > 0 ? `(${totalItems})` : ''}</span>
          </button>
        </div>

        {/* Row 1 on Mobile / Right on Desktop: Language & Country Selectors */}
        <div className="order-1 sm:order-2 flex items-center justify-end gap-3 sm:gap-5 shrink-0">
          {/* A. Language Dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <button
              suppressHydrationWarning
              onClick={() => {
                setLangDropdownOpen(!langDropdownOpen);
                setCountryDropdownOpen(false);
              }}
              className="flex items-center gap-1.5 hover:text-[#d4a373] transition-colors py-0.5 px-2 rounded-md hover:bg-[#1b263b] focus:outline-none"
              aria-expanded={langDropdownOpen}
            >
              <Globe className="w-3.5 h-3.5 text-[#d4a373]" />
              <span suppressHydrationWarning className="font-bold text-white truncate max-w-[120px] sm:max-w-none">
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
              suppressHydrationWarning
              onClick={() => {
                setCountryDropdownOpen(!countryDropdownOpen);
                setLangDropdownOpen(false);
              }}
              className="flex items-center gap-2 hover:text-[#d4a373] transition-colors py-0.5 px-2 rounded-md hover:bg-[#1b263b] focus:outline-none"
              aria-expanded={countryDropdownOpen}
            >
              {/* Visual Flag Image */}
              <CountryFlag code={currentCountry.code} name={currentCountry.name} />
              <span suppressHydrationWarning className="font-bold text-white">{currentCountry.name}</span>
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
              <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, models (e.g. ANT003), catalogue, enquiry, support..."
                  className="w-full bg-[#f5efe6] border border-[#d8c3af] rounded-lg sm:rounded-xl px-4 py-3 text-xs sm:text-sm text-[#0d1b2a] placeholder:text-[#a88b74] focus:outline-none focus:border-[#0d1b2a] focus:ring-1 focus:ring-[#0d1b2a] shadow-sm pr-12"
                />
                
                {/* Arrow Submit Button */}
                <button
                  type="submit"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 text-[#0d1b2a] hover:text-[#c8102e] hover:scale-110 transition-transform focus:outline-none cursor-pointer"
                  aria-label="Submit search"
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                </button>
              </form>

              {/* Instant Search Results Dropdown */}
              {searchQuery.trim().length > 0 && (
                <div className="mt-2 w-full bg-white rounded-2xl shadow-2xl border border-[#e2d5c5] p-3 sm:p-4 z-50 animate-in fade-in max-h-[70vh] overflow-y-auto space-y-4">
                  
                  {/* A. Quick Links (Enquiries, Catalogues, Support, Categories) */}
                  {quickLinksMatches.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-bold text-[#b58351] uppercase tracking-wider px-2">
                        Quick Shortcuts & Inquiries ({quickLinksMatches.length})
                      </div>
                      <div className="space-y-1">
                        {quickLinksMatches.map((item, idx) => (
                          <a
                            key={`quick-${idx}`}
                            href={item.href}
                            onClick={() => {
                              setSearchQuery('');
                              setSearchOpen(false);
                            }}
                            className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-[#fbf9f5] hover:bg-[#f5efe6] border border-[#f0e6da] transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-[#0d1b2a] text-[#d4a373] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                                {item.iconType === 'download' && <Download className="w-4 h-4" />}
                                {item.iconType === 'enquiry' && <Building2 className="w-4 h-4" />}
                                {item.iconType === 'support' && <Headphones className="w-4 h-4" />}
                                {item.iconType === 'category' && <Layers className="w-4 h-4" />}
                                {item.iconType === 'about' && <Sparkles className="w-4 h-4" />}
                              </div>
                              <div>
                                <p className="text-xs sm:text-sm font-bold text-[#0d1b2a] group-hover:text-[#b58351] transition-colors">
                                  {item.title}
                                </p>
                                <p className="text-[10px] sm:text-[11px] text-[#7f5539]">
                                  {item.subtitle}
                                </p>
                              </div>
                            </div>
                            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white border border-[#e2d5c5] text-[#0d1b2a] shrink-0">
                              {item.badge}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* B. Matching Products & Model Codes */}
                  {matchingCatalogProducts.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[10px] font-bold text-[#b58351] uppercase tracking-wider px-2">
                        Matching Products & Models ({matchingCatalogProducts.length})
                      </div>
                      <div className="space-y-1">
                        {matchingCatalogProducts.map((prod) => (
                          <a
                            key={prod.id}
                            href={`/products/${prod.category}`}
                            onClick={() => {
                              setSearchQuery('');
                              setSearchOpen(false);
                            }}
                            className="flex items-center justify-between p-2.5 hover:bg-[#fbf9f5] rounded-xl border border-transparent hover:border-[#f0e6da] transition-colors group"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {/* Product Thumbnail */}
                              <div className="w-10 h-10 rounded-lg bg-[#ede0d4] border border-[#e2d5c5] overflow-hidden shrink-0 flex items-center justify-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={prod.image}
                                  alt={prod.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <div className="min-w-0">
                                <p className="text-xs font-bold text-[#0d1b2a] group-hover:text-[#b58351] truncate transition-colors">
                                  {prod.name}
                                </p>
                                <p className="text-[10px] text-[#7f5539] truncate">
                                  Series: {prod.subCategory || prod.collection} • {prod.category}
                                </p>
                              </div>
                            </div>

                            {prod.modelCode && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#f5efe6] text-[#0d1b2a] border border-[#e2d5c5] shrink-0 ml-2">
                                {prod.modelCode}
                              </span>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* C. Fallback when nothing found */}
                  {quickLinksMatches.length === 0 && matchingCatalogProducts.length === 0 && (
                    <div className="p-6 text-center space-y-3">
                      <p className="text-xs text-[#7f5539]">
                        No direct results found for &ldquo;<span className="font-bold text-[#0d1b2a]">{searchQuery}</span>&rdquo;.
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                        <a
                          href="/products"
                          onClick={() => {
                            setSearchQuery('');
                            setSearchOpen(false);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#0d1b2a] text-[#d4a373] text-[11px] font-bold uppercase tracking-wider hover:bg-[#1b263b] transition-colors"
                        >
                          Browse All Products
                        </a>
                        <a
                          href="/catalogue"
                          onClick={() => {
                            setSearchQuery('');
                            setSearchOpen(false);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#f5efe6] text-[#0d1b2a] text-[11px] font-bold uppercase tracking-wider hover:bg-[#ede0d4] transition-colors border border-[#e2d5c5]"
                        >
                          Download Catalogue
                        </a>
                        <a
                          href="/contact"
                          onClick={() => {
                            setSearchQuery('');
                            setSearchOpen(false);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#f5efe6] text-[#0d1b2a] text-[11px] font-bold uppercase tracking-wider hover:bg-[#ede0d4] transition-colors border border-[#e2d5c5]"
                        >
                          Contact Desk
                        </a>
                      </div>
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
      <CartDrawer />
    </>
  );
};
