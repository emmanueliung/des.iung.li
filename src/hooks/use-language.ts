'use client';

import { useContext } from 'react';
import { LanguageContext } from '@/context/language-context';
import { translations } from '@/lib/data';
import { portfolioItems as allPortfolioItems } from '@/lib/portfolio-data';
import type { Translations } from '@/lib/types';

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  const { language } = context;
  
  const t = (key: keyof Translations['fr']) => {
    // This is a safe assertion because the key is one of the keys of the french translation.
    // All languages are typed to have the same keys.
    return translations[language][key] || key;
  };
  
  const portfolioItems = allPortfolioItems[language];

  return { ...context, t, portfolioItems };
};
