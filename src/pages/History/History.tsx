import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { useHistory } from '@/hooks/useHistory';
import { Button } from '@/components/ui/Button/Button';
import { Modal } from '@/components/ui/Modal/Modal';
import { formatDate, formatDuration } from '@/utils/helpers';
import styles from './History.module.scss';

export function History() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { history, clearHistory, removeResult, bestScore } = useHistory();
  const [clearOpen, setClearOpen] = useState(false);

  const locale = language === 'ka' ? 'ka-GE' : 'en-US';

  const scoreColor = (percent: number) => {
    if (percent >= 80) return styles.high;
    if (percent >= 50) return styles.mid;
    return styles.low;
  };

  if (history.length === 0) {
    return (
      <div className="container">
        <motion.div
          className={styles.empty}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={styles.emptyIcon} aria-hidden="true">
            📭
          </span>
          <h2>{t.history.empty}</h2>
          <Button onClick={() => navigate('/setup')}>
            {t.history.emptyCta}
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className={styles.header}>
        <div>
          <h1>{t.history.title}</h1>
          <p>{t.history.subtitle}</p>
        </div>
        <Button variant="danger" size="sm" onClick={() => setClearOpen(true)}>
          {t.history.clearAll}
        </Button>
      </header>

      <ul className={styles.list}>
        <AnimatePresence>
          {history.map((entry) => (
            <motion.li
              key={entry.id}
              className={styles.item}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              <div className={`${styles.score} ${scoreColor(entry.scorePercent)}`}>
                {entry.scorePercent}%
              </div>

              <div className={styles.details}>
                <div className={styles.topRow}>
                  <span className={styles.category}>{entry.categoryName}</span>
                  {entry.scorePercent === bestScore && bestScore > 0 && (
                    <span className={styles.badge}>🏆 {t.history.bestBadge}</span>
                  )}
                </div>
                <div className={styles.meta}>
                  <span>
                    {entry.correct}/{entry.total}
                  </span>
                  <span className={styles.dot}>•</span>
                  <span className={styles.difficulty}>{entry.difficulty}</span>
                  <span className={styles.dot}>•</span>
                  <span>{formatDuration(entry.durationSeconds)}</span>
                </div>
                <span className={styles.date}>
                  {formatDate(entry.date, locale)}
                </span>
              </div>

              <button
                type="button"
                className={styles.remove}
                aria-label="Delete result"
                onClick={() => removeResult(entry.id)}
              >
                &times;
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <Modal
        isOpen={clearOpen}
        onClose={() => setClearOpen(false)}
        title={t.history.clearTitle}
        footer={
          <>
            <Button variant="ghost" onClick={() => setClearOpen(false)}>
              {t.common.cancel}
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                clearHistory();
                setClearOpen(false);
              }}
            >
              {t.history.clearAll}
            </Button>
          </>
        }
      >
        <p>{t.history.clearMessage}</p>
      </Modal>
    </div>
  );
}
