import { useCallback, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Language } from '@/types';
import { translations } from '@/i18n/translations';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { LanguageContext } from './language-context';

const STORAGE_KEY = 'quizverse:language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useLocalStorage<Language>(STORAGE_KEY, 'en');

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'en' ? 'ka' : 'en'));
  }, [setLanguage]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t: translations[language],
    }),
    [language, setLanguage, toggleLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
