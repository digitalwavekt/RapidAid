/**
 * RapidAid - Language Context
 * Global language state management with i18n support
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import StorageService from '../services/storageService';
import { LANGUAGES, DEFAULT_SETTINGS } from '../utils/constants';

// Import translation files
import enTranslations from '../data/translations_en.json';
import hiTranslations from '../data/translations_hi.json';

const translations = {
  en: enTranslations,
  hi: hiTranslations,
};

const LanguageContext = createContext({
  language: LANGUAGES.ENGLISH,
  setLanguage: () => {},
  t: (key) => key,
  isReady: false,
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(LANGUAGES.ENGLISH);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await StorageService.getLanguage();
      if (savedLanguage && translations[savedLanguage]) {
        setLanguageState(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    } finally {
      setIsReady(true);
    }
  };

  const setLanguage = async (lang) => {
    if (translations[lang]) {
      setLanguageState(lang);
      await StorageService.saveLanguage(lang);
    }
  };

  /**
   * Translate a key to current language
   * Supports nested keys with dot notation (e.g., "steps.title")
   * @param {string} key - Translation key
   * @param {object} params - Optional interpolation params
   */
  const t = (key, params = {}) => {
    const currentTranslations = translations[language] || translations.en;

    // Handle nested keys
    const keys = key.split('.');
    let value = currentTranslations;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }

    // Fallback to English
    if (value === undefined) {
      let fallbackValue = translations.en;
      for (const k of keys) {
        fallbackValue = fallbackValue?.[k];
        if (fallbackValue === undefined) break;
      }
      value = fallbackValue;
    }

    // Return key if translation not found
    if (value === undefined) return key;

    // Simple interpolation
    if (typeof value === 'string' && params) {
      return Object.entries(params).reduce((str, [paramKey, paramValue]) => {
        return str.replace(new RegExp(`{{${paramKey}}}`, 'g'), paramValue);
      }, value);
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isReady }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export default LanguageContext;
