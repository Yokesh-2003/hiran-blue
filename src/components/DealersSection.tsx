'use client';

import React, { useState } from 'react';
import { dealersData } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Phone, Mail, Sparkles, Navigation, CheckCircle2 } from 'lucide-react';

interface DealersSectionProps {
  onBookVisit?: (dealerName: string) => void;
}

export const DealersSection: React.FC<DealersSectionProps> = ({ onBookVisit }) => {
  const { t } = useLanguage();
  const [selectedCity, setSelectedCity] = useState<string>('all');

  const cities = ['all', 'Mumbai', 'New Delhi', 'Bengaluru', 'Ahmedabad', 'Hyderabad'];

  const filteredDealers =
    selectedCity === 'all'
      ? dealersData
      : dealersData.filter((d) => d.city === selectedCity);

  return (
    <section id="dealers" className="py-20 sm:py-28 bg-[#f7f4ee] text-[#0d1b2a] border-b border-[#e2d5c5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d1b2a] text-white text-xs font-bold uppercase tracking-widest border border-[#1b263b] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#d4a373]" />
            {t('dealersBadge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#0d1b2a] font-display-impact">
            {t('dealersTitle')}
          </h2>
          <p className="text-[#5c677d] text-sm sm:text-base leading-relaxed">
            {t('dealersDesc')}
          </p>

          {/* City Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCity === city
                    ? 'bg-[#0d1b2a] text-[#d4a373] shadow-md border border-[#1b263b]'
                    : 'bg-white text-[#4a3525] hover:text-[#0d1b2a] border border-[#e2d5c5]'
                }`}
              >
                {city === 'all' ? t('allShowrooms') : city}
              </button>
            ))}
          </div>
        </div>

        {/* Dealers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDealers.map((dealer) => (
            <div
              key={dealer.id}
              className="bg-white rounded-3xl p-6 border border-[#e2d5c5] shadow-sm hover:shadow-xl hover:border-[#0d1b2a] transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    {dealer.experienceCentre ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider bg-[#0d1b2a] text-[#d4a373] border border-[#1b263b] px-2.5 py-0.5 rounded-full mb-2">
                        <CheckCircle2 className="w-3 h-3 text-[#d4a373]" /> Flagship Studio
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider bg-[#ede0d4] text-[#7f5539] border border-[#d8c3af] px-2.5 py-0.5 rounded-full mb-2">
                        Authorized Gallery
                      </span>
                    )}
                    <h3 className="text-base font-bold text-[#0d1b2a] leading-snug">
                      {dealer.name}
                    </h3>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#5c677d]">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#b58351] shrink-0 mt-0.5" />
                    <span>{dealer.address}, {dealer.city}, {dealer.state}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#b58351] shrink-0" />
                    <a href={`tel:${dealer.phone}`} className="hover:text-[#c8102e] font-medium transition-colors">
                      {dealer.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#b58351] shrink-0" />
                    <a href={`mailto:${dealer.email}`} className="hover:text-[#c8102e] font-medium transition-colors">
                      {dealer.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#e2d5c5] flex items-center gap-3">
                <button
                  onClick={() => onBookVisit && onBookVisit(dealer.name)}
                  className="flex-1 py-2.5 bg-[#0d1b2a] hover:bg-[#1b263b] text-[#ede0d4] hover:text-[#d4a373] text-xs font-bold rounded-xl transition-colors text-center cursor-pointer border border-[#1b263b]"
                >
                  {t('bookVip')}
                </button>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    `${dealer.name} ${dealer.address} ${dealer.city}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-[#e2d5c5] hover:border-[#0d1b2a] hover:bg-[#ede0d4] text-[#0d1b2a] transition-colors"
                  title="Get Directions"
                >
                  <Navigation className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
