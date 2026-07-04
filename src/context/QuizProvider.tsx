import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type {
  AnswerRecord,
  QuizResult,
  QuizSettings,
  Question,
} from '@/types';
import { fetchQuestions, TriviaError } from '@/api/trivia';
import { useHistory } from '@/hooks/useHistory';
import { createId } from '@/utils/helpers';
import {
  QuizContext,
  type FinishedQuiz,
  type QuizStatus,
} from './quiz-context';

export function QuizProvider({ children }: { children: ReactNode }) {
  const { addResult } = useHistory();

  const [status, setStatus] = useState<QuizStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<QuizSettings | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [finished, setFinished] = useState<FinishedQuiz | null>(null);

  const startQuiz = useCallback(async (nextSettings: QuizSettings) => {
    setStatus('loading');
    setError(null);
    setFinished(null);
    setAnswers({});
    setCurrentIndex(0);
    setSettings(nextSettings);

    try {
      const fetched = await fetchQuestions(nextSettings);
      setQuestions(fetched);
      setStartedAt(Date.now());
      setStatus('ready');
    } catch (err) {
      const message =
        err instanceof TriviaError
          ? err.message
          : 'Something went wrong loading the quiz.';
      setError(message);
      setStatus('error');
    }
  }, []);

  const selectAnswer = useCallback((questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((index) => Math.min(index + 1, questions.length - 1));
  }, [questions.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }, []);

  const finishQuiz = useCallback((): FinishedQuiz | null => {
    if (!questions.length || !settings) return null;

    const records: AnswerRecord[] = questions.map((question) => {
      const selected = answers[question.id] ?? null;
      return {
        questionId: question.id,
        question: question.question,
        selectedAnswer: selected,
        correctAnswer: question.correctAnswer,
        isCorrect: selected === question.correctAnswer,
      };
    });

    const correct = records.filter((record) => record.isCorrect).length;
    const durationSeconds = startedAt
      ? Math.round((Date.now() - startedAt) / 1000)
      : 0;

    const result: QuizResult = {
      id: createId(),
      date: new Date().toISOString(),
      categoryName: settings.categoryName,
      difficulty: settings.difficulty,
      total: questions.length,
      correct,
      scorePercent: Math.round((correct / questions.length) * 100),
      durationSeconds,
    };

    const payload: FinishedQuiz = { result, records };
    addResult(result);
    setFinished(payload);
    setStatus('idle');
    return payload;
  }, [questions, settings, answers, startedAt, addResult]);

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
    setSettings(null);
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers({});
    setStartedAt(null);
    setFinished(null);
  }, []);

  const value = useMemo(
    () => ({
      status,
      error,
      settings,
      questions,
      currentIndex,
      answers,
      finished,
      startQuiz,
      selectAnswer,
      goNext,
      goPrev,
      finishQuiz,
      reset,
    }),
    [
      status,
      error,
      settings,
      questions,
      currentIndex,
      answers,
      finished,
      startQuiz,
      selectAnswer,
      goNext,
      goPrev,
      finishQuiz,
      reset,
    ],
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}
