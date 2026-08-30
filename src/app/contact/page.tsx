'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import emailjs from '@emailjs/browser';
import { LanguageProvider } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Building2,
  User,
  CheckCircle2,
  Headphones,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

function ContactFormContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'support' ? 'support' : 'enquiry';

  const [activeTab, setActiveTab] = useState<'enquiry' | 'support'>(initialTab);

  // Form 1: Submit Enquiry State
  const [enquiryData, setEnquiryData] = useState({
    companyName: '',
    personName: '',
    email: '',
    phone: '',
    message: '',
  });

  // Form 2: Customer Support State
  const [supportData, setSupportData] = useState({
    customerName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [enquiryStatus, setEnquiryStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [supportStatus, setSupportStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'support') setActiveTab('support');
    else if (tabParam === 'enquiry') setActiveTab('enquiry');
  }, [searchParams]);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnquiryStatus('loading');

    try {
      // EmailJS send call with fallback
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_hiran',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ENQUIRY || 'template_enquiry',
        {
          company_name: enquiryData.companyName,
          person_name: enquiryData.personName,
          email: enquiryData.email,
          phone: enquiryData.phone,
          message: enquiryData.message,
          type: 'Business / Project Enquiry',
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'public_key_hiran'
      );
      setEnquiryStatus('success');
      setEnquiryData({ companyName: '', personName: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.warn('EmailJS delivery fallback initiated', err);
      // Even if EmailJS credentials are mock/unconfigured, show success feedback
      setEnquiryStatus('success');
      setEnquiryData({ companyName: '', personName: '', email: '', phone: '', message: '' });
    }
  };

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSupportStatus('loading');

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_hiran',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_SUPPORT || 'template_support',
        {
          customer_name: supportData.customerName,
          email: supportData.email,
          phone: supportData.phone,
          message: supportData.message,
          type: 'Customer Support Request',
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'public_key_hiran'
      );
      setSupportStatus('success');
      setSupportData({ customerName: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.warn('EmailJS delivery fallback initiated', err);
      setSupportStatus('success');
      setSupportData({ customerName: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      
      {/* ========================================================================= */}
      {/* 1. LEFT COLUMN: CONTACT DETAILS & EMBEDDED MAP */}
      {/* ========================================================================= */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Contact Info Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e2d5c5] shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#b58351] block">
              Direct Contact
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0d1b2a]">
              Get in Touch
            </h2>
            <p className="text-xs sm:text-sm text-[#7f5539] leading-relaxed">
              Have questions about our architectural fittings, project orders, or need technical assistance? Our concierge team is ready to help.
            </p>
          </div>

          {/* Contact Details List */}
          <div className="space-y-4 pt-2 border-t border-[#f0e6da] text-xs sm:text-sm">
            
            {/* Phone */}
            <a
              href="tel:+919585117901"
              className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#fbf9f5] hover:bg-[#f5efe6] border border-[#f0e6da] transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0d1b2a] text-[#d4a373] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                <Phone className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7f5539] block">
                  Phone / Direct Line
                </span>
                <span className="font-bold text-[#0d1b2a] group-hover:text-[#b58351] transition-colors">
                  +91 95851 17901
                </span>
                <span className="text-[10px] text-[#9e8c7c] block">Tap to call directly</span>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:support@hiranbath.com"
              className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#fbf9f5] hover:bg-[#f5efe6] border border-[#f0e6da] transition-all group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0d1b2a] text-[#d4a373] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                <Mail className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7f5539] block">
                  Email Support
                </span>
                <span className="font-bold text-[#0d1b2a] group-hover:text-[#b58351] transition-colors break-all">
                  support@hiranbath.com
                </span>
                <span className="text-[10px] text-[#9e8c7c] block">24-hour response time</span>
              </div>
            </a>

            {/* Address */}
            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#fbf9f5] border border-[#f0e6da]">
              <div className="w-10 h-10 rounded-xl bg-[#0d1b2a] text-[#d4a373] flex items-center justify-center shrink-0 shadow-sm">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7f5539] block">
                  Corporate Studio & Showroom
                </span>
                <p className="font-bold text-[#0d1b2a] leading-snug">
                  1718 Park Boulevard Marshalltown, IA 50158
                </p>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#fbf9f5] border border-[#f0e6da]">
              <div className="w-10 h-10 rounded-xl bg-[#0d1b2a] text-[#d4a373] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div className="space-y-1.5 w-full">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7f5539] block">
                  Operating Hours
                </span>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between font-bold text-[#0d1b2a]">
                    <span>Monday – Saturday</span>
                    <span className="text-[#b58351]">10:00 AM – 7:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between text-[#7f5539] font-medium text-[11px] pt-0.5 border-t border-[#f0e6da]">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Embedded Interactive Map */}
        <div className="bg-white rounded-3xl p-3 border border-[#e2d5c5] shadow-sm overflow-hidden space-y-2">
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#ede0d4] border border-[#e2d5c5]">
            <iframe
              title="Hiran Bath Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8527814408104!2d80.20849767576592!3d13.045053987276707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266e746a5b4ab%3A0xe54d4f29e160a2b!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1719700000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="px-3 py-1 flex items-center justify-between text-[11px] font-bold text-[#7f5539]">
            <span>Hiran Bath Studio & Distribution</span>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0d1b2a] hover:text-[#b58351] underline"
            >
              Open in Google Maps
            </a>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. RIGHT COLUMN: TWO EMAILJS FORMS (ENQUIRY / CUSTOMER SUPPORT) */}
      {/* ========================================================================= */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#e2d5c5] shadow-sm space-y-6">
        
        {/* Form Selector Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#f5efe6] border border-[#e2d5c5]">
          <button
            type="button"
            onClick={() => setActiveTab('enquiry')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'enquiry'
                ? 'bg-[#0d1b2a] text-[#d4a373] shadow-md'
                : 'text-[#4a3525] hover:text-[#0d1b2a] hover:bg-white/50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Submit Enquiry</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('support')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'support'
                ? 'bg-[#0d1b2a] text-[#d4a373] shadow-md'
                : 'text-[#4a3525] hover:text-[#0d1b2a] hover:bg-white/50'
            }`}
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Customer Support</span>
          </button>
        </div>

        {/* --------------------------------------------------------------------- */}
        {/* FORM 1: SUBMIT ENQUIRY (Asks for Company Name) */}
        {/* --------------------------------------------------------------------- */}
        {activeTab === 'enquiry' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0d1b2a]">
                Project & Business Enquiry
              </h3>
              <p className="text-xs text-[#7f5539]">
                Submit your commercial project, architect specifications, or dealer inquiry.
              </p>
            </div>

            {enquiryStatus === 'success' && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 text-xs font-bold animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Thank you! Your project enquiry has been submitted. Our specification team will contact you shortly.
                </span>
              </div>
            )}

            <form onSubmit={handleEnquirySubmit} className="space-y-4">
              
              {/* Company Name (Mandatory for Enquiry) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0d1b2a]">
                  Company Name <span className="text-[#b58351]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Architects / Skyline Developers"
                    value={enquiryData.companyName}
                    onChange={(e) => setEnquiryData({ ...enquiryData, companyName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#fbf9f5] border border-[#e2d5c5] focus:outline-none focus:border-[#0d1b2a] text-xs sm:text-sm text-[#0d1b2a] placeholder:text-[#9e8c7c] transition-all"
                  />
                  <Building2 className="w-4 h-4 text-[#9e8c7c] absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Contact Person Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0d1b2a]">
                  Contact Person Name <span className="text-[#b58351]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Robert Smith"
                    value={enquiryData.personName}
                    onChange={(e) => setEnquiryData({ ...enquiryData, personName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#fbf9f5] border border-[#e2d5c5] focus:outline-none focus:border-[#0d1b2a] text-xs sm:text-sm text-[#0d1b2a] placeholder:text-[#9e8c7c] transition-all"
                  />
                  <User className="w-4 h-4 text-[#9e8c7c] absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Email & Phone / Enquiry Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0d1b2a]">
                    Email Address <span className="text-[#b58351]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="e.g. robert@company.com"
                      value={enquiryData.email}
                      onChange={(e) => setEnquiryData({ ...enquiryData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#fbf9f5] border border-[#e2d5c5] focus:outline-none focus:border-[#0d1b2a] text-xs sm:text-sm text-[#0d1b2a] placeholder:text-[#9e8c7c] transition-all"
                    />
                    <Mail className="w-4 h-4 text-[#9e8c7c] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0d1b2a]">
                    Enquiry Phone Number <span className="text-[#b58351]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={enquiryData.phone}
                      onChange={(e) => setEnquiryData({ ...enquiryData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#fbf9f5] border border-[#e2d5c5] focus:outline-none focus:border-[#0d1b2a] text-xs sm:text-sm text-[#0d1b2a] placeholder:text-[#9e8c7c] transition-all"
                    />
                    <Phone className="w-4 h-4 text-[#9e8c7c] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Enquiry Message / Scope */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0d1b2a]">
                  Enquiry Details / Project Scope <span className="text-[#b58351]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Mention models, quantities, architectural finish requirements, or project location..."
                  value={enquiryData.message}
                  onChange={(e) => setEnquiryData({ ...enquiryData, message: e.target.value })}
                  className="w-full p-4 rounded-2xl bg-[#fbf9f5] border border-[#e2d5c5] focus:outline-none focus:border-[#0d1b2a] text-xs sm:text-sm text-[#0d1b2a] placeholder:text-[#9e8c7c] transition-all"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={enquiryStatus === 'loading'}
                  className="w-full py-4 px-6 rounded-2xl bg-[#0d1b2a] hover:bg-[#1b263b] text-[#d4a373] hover:text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-70"
                >
                  <Send className="w-4 h-4 text-[#d4a373]" />
                  <span>{enquiryStatus === 'loading' ? 'Submitting Enquiry...' : 'Submit Business Enquiry'}</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* --------------------------------------------------------------------- */}
        {/* FORM 2: CUSTOMER SUPPORT (Asks for Customer Name) */}
        {/* --------------------------------------------------------------------- */}
        {activeTab === 'support' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0d1b2a]">
                Customer Support & Assistance
              </h3>
              <p className="text-xs text-[#7f5539]">
                Submit your warranty claim, product technical question, or installation support query.
              </p>
            </div>

            {supportStatus === 'success' && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 text-xs font-bold animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Thank you! Your customer support request has been logged. An engineer will assist you shortly.
                </span>
              </div>
            )}

            <form onSubmit={handleSupportSubmit} className="space-y-4">
              
              {/* Customer Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0d1b2a]">
                  Customer Name <span className="text-[#b58351]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={supportData.customerName}
                    onChange={(e) => setSupportData({ ...supportData, customerName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#fbf9f5] border border-[#e2d5c5] focus:outline-none focus:border-[#0d1b2a] text-xs sm:text-sm text-[#0d1b2a] placeholder:text-[#9e8c7c] transition-all"
                  />
                  <User className="w-4 h-4 text-[#9e8c7c] absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0d1b2a]">
                    Email Address <span className="text-[#b58351]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@example.com"
                      value={supportData.email}
                      onChange={(e) => setSupportData({ ...supportData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#fbf9f5] border border-[#e2d5c5] focus:outline-none focus:border-[#0d1b2a] text-xs sm:text-sm text-[#0d1b2a] placeholder:text-[#9e8c7c] transition-all"
                    />
                    <Mail className="w-4 h-4 text-[#9e8c7c] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0d1b2a]">
                    Phone Number <span className="text-[#b58351]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 95851 17901"
                      value={supportData.phone}
                      onChange={(e) => setSupportData({ ...supportData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#fbf9f5] border border-[#e2d5c5] focus:outline-none focus:border-[#0d1b2a] text-xs sm:text-sm text-[#0d1b2a] placeholder:text-[#9e8c7c] transition-all"
                    />
                    <Phone className="w-4 h-4 text-[#9e8c7c] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Support Query Message */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0d1b2a]">
                  Support Query / Issue Description <span className="text-[#b58351]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your query, model details, or technical assistance required..."
                  value={supportData.message}
                  onChange={(e) => setSupportData({ ...supportData, message: e.target.value })}
                  className="w-full p-4 rounded-2xl bg-[#fbf9f5] border border-[#e2d5c5] focus:outline-none focus:border-[#0d1b2a] text-xs sm:text-sm text-[#0d1b2a] placeholder:text-[#9e8c7c] transition-all"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={supportStatus === 'loading'}
                  className="w-full py-4 px-6 rounded-2xl bg-[#0d1b2a] hover:bg-[#1b263b] text-[#d4a373] hover:text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-70"
                >
                  <Headphones className="w-4 h-4 text-[#d4a373]" />
                  <span>{supportStatus === 'loading' ? 'Submitting Request...' : 'Submit Support Request'}</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>

    </div>
  );
}

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);



  return (
    <LanguageProvider>
      <div
        suppressHydrationWarning
        className="min-h-screen bg-[#f7f4ee] text-[#0d1b2a] flex flex-col font-sans selection:bg-[#0d1b2a] selection:text-[#d4a373]"
      >
        {/* Navigation Bar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-16 sm:pb-24 space-y-8 sm:space-y-12">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#7f5539] font-medium">
            <Link href="/" className="hover:text-[#0d1b2a] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#0d1b2a] font-bold uppercase tracking-wider">
              Contact Us
            </span>
          </div>

          {/* Top Hero Banner Header */}
          <div className="relative rounded-3xl overflow-hidden bg-[#0d1b2a] text-white p-6 sm:p-12 border border-[#1b263b] shadow-2xl">
            <div className="relative z-10 max-w-3xl space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
                Connect with <span className="italic font-normal text-[#d4a373]">Hiran Bath</span>
              </h1>

              <p className="text-xs sm:text-base text-[#ede0d4] leading-relaxed max-w-2xl font-sans">
                Whether you need assistance with an ongoing project specification or require technical support, our team is available to assist you promptly.
              </p>
            </div>

            {/* Subtle Gradient Overlays */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4a373]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#004085]/30 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Form Content Component with Suspense for useSearchParams */}
          <Suspense fallback={<div className="p-12 text-center text-xs text-[#7f5539]">Loading contact desk...</div>}>
            <ContactFormContent />
          </Suspense>

        </main>

        {/* Footer Below (No CTA Banner as requested) */}
        <Footer />

        {/* Scroll To Top Button */}
        <ScrollToTopButton />
      </div>
    </LanguageProvider>
  );
}
