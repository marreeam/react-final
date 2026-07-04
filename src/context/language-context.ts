import { createContext } from 'react';
import type { Language } from '@/types';
import type { TranslationSchema } from '@/i18n/translations';

export interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  /** Active translation dictionary. */
  t: TranslationSchema;
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);
