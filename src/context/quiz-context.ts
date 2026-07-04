import { createContext } from 'react';
import type {
  AnswerRecord,
  Question,
  QuizResult,
  QuizSettings,
} from '@/types';

export type QuizStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface FinishedQuiz {
  result: QuizResult;
  records: AnswerRecord[];
}

export interface QuizContextValue {
  status: QuizStatus;
  error: string | null;
  settings: QuizSettings | null;
  questions: Question[];
  currentIndex: number;
  answers: Record<string, string>;
  finished: FinishedQuiz | null;
  /** Fetch questions for the given settings and enter the "ready" state. */
  startQuiz: (settings: QuizSettings) => Promise<void>;
  selectAnswer: (questionId: string, answer: string) => void;
  goNext: () => void;
  goPrev: () => void;
  /** Compute the result, persist it, and return the finished payload. */
  finishQuiz: () => FinishedQuiz | null;
  reset: () => void;
}

export const QuizContext = createContext<QuizContextValue | undefined>(
  undefined,
);
