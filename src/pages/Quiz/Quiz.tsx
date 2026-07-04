import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { useQuiz } from '@/hooks/useQuiz';
import { Loader } from '@/components/ui/Loader/Loader';
import { Button } from '@/components/ui/Button/Button';
import { Modal } from '@/components/ui/Modal/Modal';
import { ProgressBar } from '@/components/ui/ProgressBar/ProgressBar';
import { Timer } from '@/components/quiz/Timer/Timer';
import { QuestionCard } from '@/components/quiz/QuestionCard/QuestionCard';
import styles from './Quiz.module.scss';

const SECONDS_PER_QUESTION = 20;

export function Quiz() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const {
    status,
    error,
    questions,
    currentIndex,
    answers,
    selectAnswer,
    goNext,
    finishQuiz,
    reset,
  } = useQuiz();

  const [revealed, setRevealed] = useState(false);
  const [quitOpen, setQuitOpen] = useState(false);

  // Guard: entering the quiz directly without configured questions.
  useEffect(() => {
    if (status === 'idle' && questions.length === 0) {
      navigate('/setup', { replace: true });
    }
  }, [status, questions.length, navigate]);

  // Reset the reveal state whenever we move to a new question.
  useEffect(() => {
    setRevealed(false);
  }, [currentIndex]);

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const selectedAnswer = currentQuestion
    ? (answers[currentQuestion.id] ?? null)
    : null;

  const handleSelect = (answer: string) => {
    if (revealed || !currentQuestion) return;
    selectAnswer(currentQuestion.id, answer);
    setRevealed(true);
  };

  const handleTimeUp = useCallback(() => {
    setRevealed(true);
  }, []);

  const handleNext = () => {
    if (isLast) {
      finishQuiz();
      navigate('/results');
    } else {
      goNext();
    }
  };

  const handleQuit = () => {
    reset();
    navigate('/');
  };

  if (status === 'loading') {
    return (
      <div className="container">
        <Loader />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="container">
        <div className={styles.errorBox}>
          <span className={styles.errorIcon} aria-hidden="true">
            😕
          </span>
          <p>{error ?? t.quiz.loadingError}</p>
          <div className={styles.errorActions}>
            <Button variant="secondary" onClick={() => navigate('/setup')}>
              {t.common.retry}
            </Button>
            <Button variant="ghost" onClick={handleQuit}>
              {t.nav.home}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="container">
      <div className={styles.quiz}>
        <div className={styles.topbar}>
          <div className={styles.counter}>
            <span className={styles.current}>{currentIndex + 1}</span>
            <span className={styles.total}>
              {t.common.of} {questions.length}
            </span>
          </div>
          <Timer
            seconds={SECONDS_PER_QUESTION}
            resetKey={currentQuestion.id}
            paused={revealed}
            onExpire={handleTimeUp}
          />
          <Button variant="ghost" size="sm" onClick={() => setQuitOpen(true)}>
            {t.common.quit}
          </Button>
        </div>

        <ProgressBar value={(currentIndex + (revealed ? 1 : 0)) / questions.length} />

        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            revealed={revealed}
            onSelect={handleSelect}
          />
        </AnimatePresence>

        <div className={styles.footer}>
          <Button
            size="lg"
            onClick={handleNext}
            disabled={!revealed}
            fullWidth
          >
            {isLast ? t.common.finish : t.common.next}
          </Button>
        </div>
      </div>

      <Modal
        isOpen={quitOpen}
        onClose={() => setQuitOpen(false)}
        title={t.quiz.quitTitle}
        footer={
          <>
            <Button variant="ghost" onClick={() => setQuitOpen(false)}>
              {t.common.cancel}
            </Button>
            <Button variant="danger" onClick={handleQuit}>
              {t.common.quit}
            </Button>
          </>
        }
      >
        <p>{t.quiz.quitMessage}</p>
      </Modal>
    </div>
  );
}
