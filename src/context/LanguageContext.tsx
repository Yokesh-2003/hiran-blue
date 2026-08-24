'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  LanguageCode,
  CountryOption,
  LanguageOption,
  countriesList,
  allLanguagesMap,
  translations,
} from '@/data/translations';

interface LanguageContextType {
  currentCountry: CountryOption;
  setCountry: (countryCode: string) => void;
  currentLanguage: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  t: (key: string) => string;
  availableLanguages: LanguageOption[];
  allCountries: CountryOption[];
  currentLanguageName: string;
  isMounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('IN');
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const [isMounted, setIsMounted] = useState(false);

  // Active country
  const currentCountry =
    countriesList.find((c) => c.code === selectedCountryCode) || countriesList[0];

  // Available languages for the selected country
  const availableLanguages: LanguageOption[] = currentCountry.languages.map(
    (langCode) => allLanguagesMap[langCode] || allLanguagesMap['en']
  );

  // Load from localStorage on mount safely
  useEffect(() => {
    setIsMounted(true);
    try {
      const savedCountry = localStorage.getItem('hiranbath_country');
      const savedLang = localStorage.getItem('hiranbath_lang') as LanguageCode;

      if (savedCountry && countriesList.some((c) => c.code === savedCountry)) {
        setSelectedCountryCode(savedCountry);
      }
      if (savedLang && translations[savedLang]) {
        setCurrentLanguage(savedLang);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const setCountry = (countryCode: string) => {
    const country = countriesList.find((c) => c.code === countryCode);
    if (country) {
      setSelectedCountryCode(country.code);
      try {
        localStorage.setItem('hiranbath_country', country.code);
      } catch {}

      // If current language is not in the new country's languages, switch to default
      if (!country.languages.includes(currentLanguage)) {
        setCurrentLanguage(country.defaultLanguage);
        try {
          localStorage.setItem('hiranbath_lang', country.defaultLanguage);
        } catch {}
      }
    }
  };

  const setLanguage = (code: LanguageCode) => {
    setCurrentLanguage(code);
    try {
      localStorage.setItem('hiranbath_lang', code);
    } catch {}
  };

  const t = (key: string): string => {
    const langDict = translations[currentLanguage] || translations['en'];
    return langDict[key] || translations['en'][key] || key;
  };

  const currentOption = allLanguagesMap[currentLanguage] || allLanguagesMap['en'];
  const currentLanguageName = currentOption
    ? `${currentOption.name} (${currentOption.nativeName})`
    : 'English';

  return (
    <LanguageContext.Provider
      value={{
        currentCountry,
        setCountry,
        currentLanguage,
        setLanguage,
        t,
        availableLanguages,
        allCountries: countriesList,
        currentLanguageName,
        isMounted,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
