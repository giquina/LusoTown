import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './en.json';
import pt from './pt.json';

const LANGUAGE_DETECTOR = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      // Try to get saved language from AsyncStorage
      const savedLanguage = await AsyncStorage.getItem('user-language');
      if (savedLanguage) {
        callback(savedLanguage);
        return;
      }

      // Fall back to device language
      const deviceLanguage = Localization.locale;
      
      // Check if device language is Portuguese
      if (deviceLanguage.startsWith('pt')) {
        callback('pt');
      } else {
        callback('en');
      }
    } catch (error) {
      console.log('Error detecting language:', error);
      callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem('user-language', language);
    } catch (error) {
      console.log('Error saving language:', error);
    }
  },
};

i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    fallbackLng: 'en',
    debug: __DEV__,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    compatibilityJSON: 'v3',
  });

export default i18n;