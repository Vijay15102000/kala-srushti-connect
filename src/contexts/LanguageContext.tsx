import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { type Language, t as translate } from '@/lib/translations';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  const toggleLang = () => setLang(l => l === 'en' ? 'kn' : 'en');
  const tFn = (key: string) => translate(key, lang);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t: tFn }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be inside LanguageProvider');
  return ctx;
}
