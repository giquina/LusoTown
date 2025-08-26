import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { Language, HeritageCountry } from '../types';

interface LanguageContextType {
  language: Language;
  isRTL: boolean;
  setLanguage: (language: Language) => Promise<void>;
  t: (key: string, options?: any) => string;
  formatCurrency: (amount: number, currency?: string) => string;
  formatDate: (date: string | Date, options?: Intl.DateTimeFormatOptions) => string;
  getHeritageFlag: (heritage: HeritageCountry) => string;
  getLanguageFromHeritage: (heritage: HeritageCountry) => Language;
  supportedLanguages: { code: Language; name: string; nativeName: string; flag: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Portuguese cultural heritage to language mapping
const heritageToLanguage: Record<HeritageCountry, Language> = {
  'portugal': 'pt',
  'brazil': 'pt',
  'cape-verde': 'pt',
  'angola': 'pt',
  'mozambique': 'pt',
  'guinea-bissau': 'pt',
  'east-timor': 'pt',
  'sao-tome': 'pt',
};

// Heritage to flag mapping
const heritageToFlag: Record<HeritageCountry, string> = {
  'portugal': '🇵🇹',
  'brazil': '🇧🇷',
  'cape-verde': '🇨🇻',
  'angola': '🇦🇴',
  'mozambique': '🇲🇿',
  'guinea-bissau': '🇬🇼',
  'east-timor': '🇹🇱',
  'sao-tome': '🇸🇹',
};

const supportedLanguages = [
  { 
    code: 'en' as Language, 
    name: 'English', 
    nativeName: 'English', 
    flag: '🇬🇧' 
  },
  { 
    code: 'pt' as Language, 
    name: 'Portuguese', 
    nativeName: 'Português', 
    flag: '🇵🇹' 
  },
];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n, t } = useTranslation();
  const [language, setLanguageState] = useState<Language>('en');
  const [isRTL, setIsRTL] = useState(false);

  // Initialize language from storage or device locale
  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        // Check for stored language preference
        const storedLanguage = await AsyncStorage.getItem('lusotown_language');
        
        if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'pt')) {
          setLanguageState(storedLanguage as Language);
          await i18n.changeLanguage(storedLanguage);
        } else {
          // Detect device language and default to Portuguese for Portuguese-speaking community
          const deviceLocales = Localization.locales;
          const primaryLocale = deviceLocales[0]?.languageCode;
          
          let detectedLanguage: Language = 'en';
          
          // Check if device is set to Portuguese or user is in Portuguese-speaking region
          if (primaryLocale === 'pt' || 
              deviceLocales.some(locale => locale.languageCode === 'pt') ||
              deviceLocales.some(locale => 
                ['PT', 'BR', 'CV', 'AO', 'MZ', 'GW', 'TL', 'ST'].includes(locale.countryCode || '')
              )) {
            detectedLanguage = 'pt';
          }
          
          setLanguageState(detectedLanguage);
          await i18n.changeLanguage(detectedLanguage);
          await AsyncStorage.setItem('lusotown_language', detectedLanguage);
        }
      } catch (error) {
        console.error('Error initializing language:', error);
        // Fallback to English
        setLanguageState('en');
        await i18n.changeLanguage('en');
      }
    };

    initializeLanguage();
  }, [i18n]);

  const setLanguage = useCallback(async (newLanguage: Language) => {
    try {
      setLanguageState(newLanguage);
      await i18n.changeLanguage(newLanguage);
      await AsyncStorage.setItem('lusotown_language', newLanguage);
      
      // Update RTL setting (Portuguese and English are both LTR)
      setIsRTL(false);
      
      console.log(`Language changed to: ${newLanguage}`);
    } catch (error) {
      console.error('Error setting language:', error);
    }
  }, [i18n]);

  const formatCurrency = useCallback((amount: number, currency: string = 'GBP') => {
    const locale = language === 'pt' ? 'pt-PT' : 'en-GB';
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }, [language]);

  const formatDate = useCallback((date: string | Date, options: Intl.DateTimeFormatOptions = {}) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const locale = language === 'pt' ? 'pt-PT' : 'en-GB';
    
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options,
    };
    
    return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj);
  }, [language]);

  const getHeritageFlag = useCallback((heritage: HeritageCountry) => {
    return heritageToFlag[heritage] || '🌍';
  }, []);

  const getLanguageFromHeritage = useCallback((heritage: HeritageCountry) => {
    return heritageToLanguage[heritage] || 'en';
  }, []);

  const contextValue: LanguageContextType = {
    language,
    isRTL,
    setLanguage,
    t,
    formatCurrency,
    formatDate,
    getHeritageFlag,
    getLanguageFromHeritage,
    supportedLanguages,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;