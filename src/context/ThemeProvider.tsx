import { useCallback, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Theme } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ThemeContext } from './theme-context';

const STORAGE_KEY = 'quizverse:theme';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const prefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;
  return prefersDark ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>(
    STORAGE_KEY,
    getInitialTheme(),
  );

  // Reflect the active theme on the root element for CSS custom properties.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, [setTheme]);

  const value = useMemo(
    () => ({ theme, toggleTheme, setTheme }),
    [theme, toggleTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
