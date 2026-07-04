import { motion } from 'framer-motion';
import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
  /** Value between 0 and 1. */
  value: number;
}

export function ProgressBar({ value }: ProgressBarProps) {
  const clamped = Math.min(Math.max(value, 0), 1);

  return (
    <div
      className={styles.track}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped * 100)}
    >
      <motion.div
        className={styles.fill}
        initial={false}
        animate={{ width: `${clamped * 100}%` }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      />
    </div>
  );
}
