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

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

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

  // Helper to map code to Google Translate standard code
  const getGoogleLangCode = (code: LanguageCode): string => {
    if (code === 'zh') return 'zh-CN';
    return code;
  };

  // Helper to apply translation via Google Translate cookies & DOM combo
  const applyGoogleTranslation = (langCode: LanguageCode) => {
    if (typeof window === 'undefined') return;

    const gtCode = getGoogleLangCode(langCode);

    if (langCode === 'en') {
      // Clear cookies for English
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
    } else {
      // Set translation cookie from English to target language
      document.cookie = `googtrans=/en/${gtCode}; path=/;`;
      document.cookie = `googtrans=/en/${gtCode}; path=/; domain=${window.location.hostname}`;
      document.cookie = `googtrans=/en/${gtCode}; path=/; domain=.${window.location.hostname}`;
    }

    // Try finding existing Google Translate combo
    const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (select) {
      select.value = gtCode;
      select.dispatchEvent(new Event('change'));
    } else {
      // Reload page to apply new translation cookie seamlessly
      window.location.reload();
    }
  };

  // Initialize Google Translate script on mount
  useEffect(() => {
    setIsMounted(true);

    try {
      const savedCountry = localStorage.getItem('hiranbath_country');
      const savedLang = localStorage.getItem('hiranbath_lang') as LanguageCode;

      if (savedCountry && countriesList.some((c) => c.code === savedCountry)) {
        setSelectedCountryCode(savedCountry);
      }
      if (savedLang && allLanguagesMap[savedLang]) {
        setCurrentLanguage(savedLang);
      }
    } catch {
      // ignore storage errors
    }

    // Inject Google Translate script dynamically
    if (typeof window !== 'undefined') {
      window.googleTranslateElementInit = () => {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              autoDisplay: false,
              includedLanguages:
                'en,hi,ta,te,kn,ml,mr,gu,bn,pa,ar,de,fr,it,es,ja,zh-CN,ru,pt',
            },
            'google_translate_element'
          );
        }
      };

      if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src =
          '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.head.appendChild(script);
      }
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
        setLanguage(country.defaultLanguage);
      }
    }
  };

  const setLanguage = (code: LanguageCode) => {
    setCurrentLanguage(code);
    try {
      localStorage.setItem('hiranbath_lang', code);
    } catch {}

    // Apply live full-website translation
    applyGoogleTranslation(code);
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
      {/* Hidden Google Translate Mount Element */}
      <div id="google_translate_element" style={{ display: 'none' }} />
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
