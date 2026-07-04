import axios from 'axios';
import type {
  Question,
  QuizSettings,
  TriviaCategory,
  TriviaResponse,
} from '@/types';
import { normalizeQuestion } from '@/utils/helpers';

const api = axios.create({
  baseURL: 'https://opentdb.com',
  timeout: 12000,
});

// Response codes documented by the Open Trivia DB API.
const RESPONSE_CODE = {
  SUCCESS: 0,
  NO_RESULTS: 1,
  INVALID_PARAMETER: 2,
} as const;

export class TriviaError extends Error {
  readonly code?: number;

  constructor(message: string, code?: number) {
    super(message);
    this.name = 'TriviaError';
    this.code = code;
  }
}

interface CategoryResponse {
  trivia_categories: TriviaCategory[];
}

/** Fetch the list of available trivia categories. */
export async function fetchCategories(): Promise<TriviaCategory[]> {
  const { data } = await api.get<CategoryResponse>('/api_category.php');
  return data.trivia_categories ?? [];
}

/**
 * Fetch and normalize a batch of questions for the given settings.
 * Throws a TriviaError with a friendly message on failure.
 */
export async function fetchQuestions(
  settings: QuizSettings,
): Promise<Question[]> {
  const params: Record<string, string | number> = {
    amount: settings.amount,
  };

  if (settings.category !== 'any') params.category = settings.category;
  if (settings.difficulty !== 'any') params.difficulty = settings.difficulty;

  try {
    const { data } = await api.get<TriviaResponse>('/api.php', { params });

    switch (data.response_code) {
      case RESPONSE_CODE.SUCCESS:
        return data.results.map(normalizeQuestion);
      case RESPONSE_CODE.NO_RESULTS:
        throw new TriviaError(
          'Not enough questions for those settings.',
          data.response_code,
        );
      default:
        throw new TriviaError(
          'The trivia service rejected the request.',
          data.response_code,
        );
    }
  } catch (error) {
    if (error instanceof TriviaError) throw error;
    if (axios.isAxiosError(error)) {
      throw new TriviaError(
        'Network error while contacting the trivia service.',
      );
    }
    throw new TriviaError('An unexpected error occurred.');
  }
}
