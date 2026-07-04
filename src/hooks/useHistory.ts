import { useCallback } from 'react';
import type { QuizResult } from '@/types';
import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY = 'quizverse:history';
const MAX_ENTRIES = 50;

/** Manages the list of completed quiz results persisted in localStorage. */
export function useHistory() {
  const [history, setHistory] = useLocalStorage<QuizResult[]>(STORAGE_KEY, []);

  const addResult = useCallback(
    (result: QuizResult) => {
      setHistory((prev) => [result, ...prev].slice(0, MAX_ENTRIES));
    },
    [setHistory],
  );

  const clearHistory = useCallback(() => setHistory([]), [setHistory]);

  const removeResult = useCallback(
    (id: string) => {
      setHistory((prev) => prev.filter((entry) => entry.id !== id));
    },
    [setHistory],
  );

  const bestScore = history.reduce(
    (max, entry) => Math.max(max, entry.scorePercent),
    0,
  );

  const averageScore = history.length
    ? Math.round(
        history.reduce((sum, entry) => sum + entry.scorePercent, 0) /
          history.length,
      )
    : 0;

  return {
    history,
    addResult,
    clearHistory,
    removeResult,
    bestScore,
    averageScore,
    totalPlayed: history.length,
  };
}
