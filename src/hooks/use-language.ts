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
  
  const t = <K extends keyof Translations['fr']>(key: K): Translations['fr'][K] => {
    return translations[language][key] ?? (key as unknown as Translations['fr'][K]);
  };
  
  const portfolioItems = allPortfolioItems[language];
  const apps = translations[language].apps;

  return { ...context, t, portfolioItems, apps };
};

