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
    <section id="dealers" className="py-20 sm:py-28 bg-[#f8fafc] text-neutral-900 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-neutral-800 text-xs font-bold uppercase tracking-widest border border-neutral-200 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-neutral-900" />
            {t('dealersBadge')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-950 font-display-impact">
            {t('dealersTitle')}
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
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
                    ? 'bg-neutral-950 text-white shadow-md'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:border-neutral-300'
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
              className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm hover:shadow-xl hover:border-neutral-300 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    {dealer.experienceCentre ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider bg-neutral-100 text-neutral-900 border border-neutral-300 px-2.5 py-0.5 rounded-full mb-2">
                        <CheckCircle2 className="w-3 h-3" /> Flagship Studio
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider bg-neutral-50 text-neutral-600 border border-neutral-200 px-2.5 py-0.5 rounded-full mb-2">
                        Authorized Gallery
                      </span>
                    )}
                    <h3 className="text-base font-bold text-neutral-900 leading-snug">
                      {dealer.name}
                    </h3>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-neutral-600">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                    <span>{dealer.address}, {dealer.city}, {dealer.state}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                    <a href={`tel:${dealer.phone}`} className="hover:text-black font-medium">
                      {dealer.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                    <a href={`mailto:${dealer.email}`} className="hover:text-black font-medium">
                      {dealer.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center gap-3">
                <button
                  onClick={() => onBookVisit && onBookVisit(dealer.name)}
                  className="flex-1 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors text-center"
                >
                  {t('bookVip')}
                </button>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    `${dealer.name} ${dealer.address} ${dealer.city}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-neutral-700 transition-colors"
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
