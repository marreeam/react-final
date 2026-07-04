import type { Question, RawQuestion } from '@/types';

/**
 * The trivia API returns HTML-encoded strings (e.g. &quot;, &#039;).
 * Decode them into readable text using the browser's parser.
 */
export function decodeHtml(html: string): string {
  if (typeof document === 'undefined') return html;
  const textarea = document.createElement('textarea');
  textarea.innerHTML = html;
  return textarea.value;
}

/** Fisher–Yates shuffle that returns a new array. */
export function shuffle<T>(input: readonly T[]): T[] {
  const array = [...input];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/** Create a reasonably unique id without external dependencies. */
export function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Convert a raw API question into the normalized UI shape. */
export function normalizeQuestion(raw: RawQuestion): Question {
  const correctAnswer = decodeHtml(raw.correct_answer);
  const incorrect = raw.incorrect_answers.map(decodeHtml);

  const answers =
    raw.type === 'boolean'
      ? ['True', 'False']
      : shuffle([correctAnswer, ...incorrect]);

  return {
    id: createId(),
    category: decodeHtml(raw.category),
    difficulty: raw.difficulty,
    type: raw.type,
    question: decodeHtml(raw.question),
    correctAnswer,
    answers,
  };
}

/** Format a number of seconds as m:ss. */
export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/** Format an ISO date string for display. */
export function formatDate(iso: string, locale: string): string {
  try {
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
