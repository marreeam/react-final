import { useEffect } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { useQuiz } from '@/hooks/useQuiz';
import { useHistory } from '@/hooks/useHistory';
import { Button } from '@/components/ui/Button/Button';
import { formatDuration } from '@/utils/helpers';
import styles from './Results.module.scss';

export function Results() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { finished, reset } = useQuiz();
  const { history } = useHistory();

  // No completed quiz to show — send the user back home.
  useEffect(() => {
    if (!finished) navigate('/', { replace: true });
  }, [finished, navigate]);

  if (!finished) return null;

  const { result, records } = finished;

  const getMessage = () => {
    if (result.scorePercent >= 80) return t.results.excellent;
    if (result.scorePercent >= 60) return t.results.good;
    if (result.scorePercent >= 40) return t.results.average;
    return t.results.poor;
  };

  const otherScores = history
    .filter((entry) => entry.id !== result.id)
    .map((entry) => entry.scorePercent);
  const isNewBest =
    result.scorePercent > 0 &&
    (otherScores.length === 0 ||
      result.scorePercent > Math.max(...otherScores));

  const handlePlayAgain = () => {
    reset();
    navigate('/setup');
  };

  const handleHome = () => {
    reset();
    navigate('/');
  };

  return (
    <div className="container">
      <motion.div
        className={styles.summary}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {isNewBest && (
          <motion.span
            className={styles.bestBadge}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            🏆 {t.results.newScore}
          </motion.span>
        )}

        <h1 className={styles.title}>{t.results.title}</h1>
        <p className={styles.message}>{getMessage()}</p>

        <motion.div
          className={styles.scoreRing}
          style={{ '--score': result.scorePercent } as CSSProperties}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 160 }}
        >
          <span className={styles.scorePercent}>{result.scorePercent}%</span>
          <span className={styles.scoreLabel}>
            {result.correct}/{result.total}
          </span>
        </motion.div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{result.correct}</span>
            <span className={styles.statLabel}>{t.results.correctAnswers}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>
              {formatDuration(result.durationSeconds)}
            </span>
            <span className={styles.statLabel}>{t.results.timeTaken}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <Button size="lg" onClick={handlePlayAgain}>
            {t.results.playAgain}
          </Button>
          <Button size="lg" variant="secondary" onClick={handleHome}>
            {t.results.backHome}
          </Button>
        </div>
      </motion.div>

      <section className={styles.review}>
        <h2 className={styles.reviewTitle}>{t.results.reviewTitle}</h2>
        <ul className={styles.reviewList}>
          {records.map((record, index) => (
            <motion.li
              key={record.questionId}
              className={styles.reviewItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
            >
              <div className={styles.reviewHead}>
                <span
                  className={`${styles.status} ${
                    record.isCorrect ? styles.ok : styles.bad
                  }`}
                >
                  {record.isCorrect ? '✓' : '✕'}
                </span>
                <p className={styles.reviewQuestion}>{record.question}</p>
              </div>
              <div className={styles.answers}>
                <p className={styles.answerRow}>
                  <span className={styles.answerLabel}>
                    {t.results.yourAnswer}:
                  </span>
                  <span
                    className={
                      record.isCorrect ? styles.correctText : styles.wrongText
                    }
                  >
                    {record.selectedAnswer ?? t.results.notAnswered}
                  </span>
                </p>
                {!record.isCorrect && (
                  <p className={styles.answerRow}>
                    <span className={styles.answerLabel}>
                      {t.results.correctAnswer}:
                    </span>
                    <span className={styles.correctText}>
                      {record.correctAnswer}
                    </span>
                  </p>
                )}
              </div>
            </motion.li>
          ))}
        </ul>
      </section>
    </div>
  );
}
