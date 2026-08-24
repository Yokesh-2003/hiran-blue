'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Sparkles, Building2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Architectural Project',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: 'Architectural Project',
        message: '',
      });
    }, 6000);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#f8fafc] text-neutral-900 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-neutral-800 text-xs font-bold uppercase tracking-widest border border-neutral-200 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-neutral-900" />
            {t('contactBadge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-950 font-display-impact">
            {t('contactTitle')}
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            {t('contactDesc')}
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Contact Info & Headquarters */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-neutral-900 text-white rounded-3xl p-8 shadow-xl space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                  Global Headquarters & Experience Studio
                </div>
                <h3 className="text-2xl font-black font-display-impact">
                  HIRANBATH LUXE SANITARY PVT LTD
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Corporate Studio:</strong>
                    Hiranbath Towers, Design District, Senapati Bapat Marg, Lower Parel, Mumbai 400013, India.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-white shrink-0" />
                  <div>
                    <strong className="text-white block">Toll-Free Architect Concierge:</strong>
                    +91 1800 22 8840 / +91 22 8840 9200
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-white shrink-0" />
                  <div>
                    <strong className="text-white block">Official Specifier Desk:</strong>
                    projects@hiranbath.com / care@hiranbath.com
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-white shrink-0" />
                  <div>
                    <strong className="text-white block">Experience Studio Hours:</strong>
                    Monday – Saturday: 10:00 AM – 7:30 PM IST
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
                <Building2 className="w-4 h-4 text-neutral-900" />
                <span>Dealership & Franchise Opportunities</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Interested in opening an authorized Hiranbath Experience Studio in your city? Select &ldquo;Dealer Partnership&rdquo; in the inquiry form.
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200 shadow-sm">
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-display-impact text-neutral-950">
                  Thank You, Your Request Has Been Received
                </h3>
                <p className="text-sm text-neutral-600 max-w-md mx-auto">
                  Our Senior Architectural Consultant will contact you within 2 business hours with technical specs and pricing.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                      {t('yourName')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Ar. Vikram Malhotra"
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-900 focus:bg-white transition-all text-neutral-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                      {t('yourEmail')} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="vikram@architects.com"
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-900 focus:bg-white transition-all text-neutral-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                      {t('yourPhone')} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+91 98765 43210"
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-900 focus:bg-white transition-all text-neutral-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                      {t('inquiryNature')}
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) =>
                        setFormData({ ...formData, inquiryType: e.target.value })
                      }
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-900 focus:bg-white transition-all text-neutral-900"
                    >
                      <option value="Architectural Project">Architectural Project Specification</option>
                      <option value="Residential Build">Luxury Residential Villa / Apartment</option>
                      <option value="Dealer Partnership">Dealer / Franchise Partnership</option>
                      <option value="Catalogue & BIM">3D BIM / CAD Spec Request</option>
                      <option value="Customer Support">Warranty & Customer Service</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                    {t('projectDetails')}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us about your project location, required finish, bathroom count, or timeline..."
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-900 focus:bg-white transition-all text-neutral-900 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-neutral-900 hover:bg-black text-white text-sm font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('submitInquiry')}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
