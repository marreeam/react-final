// ---------- Theme & Language ----------
export type Theme = 'light' | 'dark';
export type Language = 'en' | 'ka';

// ---------- Trivia API ----------
export type Difficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'multiple' | 'boolean';

/** Raw shape returned by the Open Trivia DB API. */
export interface RawQuestion {
  category: string;
  type: QuestionType;
  difficulty: Difficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface TriviaResponse {
  response_code: number;
  results: RawQuestion[];
}

export interface TriviaCategory {
  id: number;
  name: string;
}

/** Normalized question used throughout the UI. */
export interface Question {
  id: string;
  category: string;
  difficulty: Difficulty;
  type: QuestionType;
  question: string;
  correctAnswer: string;
  /** Correct + incorrect answers, pre-shuffled. */
  answers: string[];
}

// ---------- Quiz settings & results ----------
export interface QuizSettings {
  amount: number;
  category: number | 'any';
  categoryName: string;
  difficulty: Difficulty | 'any';
}

export interface AnswerRecord {
  questionId: string;
  question: string;
  selectedAnswer: string | null;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface QuizResult {
  id: string;
  date: string;
  categoryName: string;
  difficulty: Difficulty | 'any';
  total: number;
  correct: number;
  scorePercent: number;
  durationSeconds: number;
}
