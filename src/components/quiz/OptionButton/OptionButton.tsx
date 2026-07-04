import { motion } from 'framer-motion';
import styles from './OptionButton.module.scss';

export type OptionState = 'idle' | 'correct' | 'incorrect' | 'muted';

interface OptionButtonProps {
  label: string;
  /** A, B, C, D … */
  letter: string;
  state: OptionState;
  disabled: boolean;
  onClick: () => void;
}

const ICONS: Record<OptionState, string> = {
  idle: '',
  correct: '✓',
  incorrect: '✕',
  muted: '',
};

export function OptionButton({
  label,
  letter,
  state,
  disabled,
  onClick,
}: OptionButtonProps) {
  return (
    <motion.button
      type="button"
      className={`${styles.option} ${styles[state]}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.015 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
    >
      <span className={styles.letter}>{letter}</span>
      <span className={styles.label}>{label}</span>
      {ICONS[state] && <span className={styles.mark}>{ICONS[state]}</span>}
    </motion.button>
  );
}
