import { motion } from 'framer-motion';
import type { Question } from '@/types';
import { OptionButton } from '@/components/quiz/OptionButton/OptionButton';
import type { OptionState } from '@/components/quiz/OptionButton/OptionButton';
import styles from './QuestionCard.module.scss';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | null;
  revealed: boolean;
  onSelect: (answer: string) => void;
}

const LETTERS = ['A', 'B', 'C', 'D'];

export function QuestionCard({
  question,
  selectedAnswer,
  revealed,
  onSelect,
}: QuestionCardProps) {
  const getState = (answer: string): OptionState => {
    if (!revealed) return 'idle';
    if (answer === question.correctAnswer) return 'correct';
    if (answer === selectedAnswer) return 'incorrect';
    return 'muted';
  };

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.badges}>
        <span className={styles.category}>{question.category}</span>
        <span className={`${styles.difficulty} ${styles[question.difficulty]}`}>
          {question.difficulty}
        </span>
      </div>

      <h2 className={styles.question}>{question.question}</h2>

      <div className={styles.options}>
        {question.answers.map((answer, index) => (
          <OptionButton
            key={answer}
            label={answer}
            letter={LETTERS[index] ?? '?'}
            state={getState(answer)}
            disabled={revealed}
            onClick={() => onSelect(answer)}
          />
        ))}
      </div>
    </motion.div>
  );
}
