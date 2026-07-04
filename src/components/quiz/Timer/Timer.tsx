import { useEffect, useRef, useState } from 'react';
import styles from './Timer.module.scss';

interface TimerProps {
  /** Total seconds for the countdown. */
  seconds: number;
  /** Changing this value restarts the countdown. */
  resetKey: string | number;
  onExpire: () => void;
  /** Pause the countdown (e.g. after answering). */
  paused?: boolean;
}

export function Timer({ seconds, resetKey, onExpire, paused = false }: TimerProps) {
  const [remaining, setRemaining] = useState(seconds);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  // Restart whenever the question (resetKey) changes.
  useEffect(() => {
    setRemaining(seconds);
  }, [resetKey, seconds]);

  useEffect(() => {
    if (paused) return;
    if (remaining <= 0) {
      onExpireRef.current();
      return;
    }

    const timeout = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(timeout);
  }, [remaining, paused]);

  const ratio = remaining / seconds;
  const urgent = remaining <= 5;

  return (
    <div className={`${styles.timer} ${urgent ? styles.urgent : ''}`}>
      <svg viewBox="0 0 36 36" className={styles.ring} aria-hidden="true">
        <circle className={styles.bg} cx="18" cy="18" r="16" />
        <circle
          className={styles.progress}
          cx="18"
          cy="18"
          r="16"
          style={{ strokeDashoffset: 100 - ratio * 100 }}
        />
      </svg>
      <span className={styles.value}>{remaining}</span>
    </div>
  );
}
