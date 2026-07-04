import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Difficulty, QuizSettings, TriviaCategory } from '@/types';
import { fetchCategories } from '@/api/trivia';
import { useLanguage } from '@/hooks/useLanguage';
import { useQuiz } from '@/hooks/useQuiz';
import { Button } from '@/components/ui/Button/Button';
import styles from './Setup.module.scss';

const AMOUNT_OPTIONS = [5, 10, 15, 20];

export function Setup() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { startQuiz } = useQuiz();

  const [categories, setCategories] = useState<TriviaCategory[]>([]);
  const [category, setCategory] = useState<number | 'any'>('any');
  const [difficulty, setDifficulty] = useState<Difficulty | 'any'>('any');
  const [amount, setAmount] = useState(10);

  useEffect(() => {
    let active = true;
    fetchCategories()
      .then((data) => {
        if (active) setCategories(data);
      })
      .catch(() => {
        /* Non-fatal: user can still play "any category". */
      });
    return () => {
      active = false;
    };
  }, []);

  const difficulties: { value: Difficulty | 'any'; label: string }[] = useMemo(
    () => [
      { value: 'any', label: t.setup.anyDifficulty },
      { value: 'easy', label: t.setup.easy },
      { value: 'medium', label: t.setup.medium },
      { value: 'hard', label: t.setup.hard },
    ],
    [t],
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const categoryName =
      category === 'any'
        ? t.setup.anyCategory
        : (categories.find((c) => c.id === category)?.name ??
          t.setup.anyCategory);

    const settings: QuizSettings = {
      amount,
      category,
      categoryName,
      difficulty,
    };

    void startQuiz(settings);
    navigate('/quiz');
  };

  return (
    <div className="container">
      <motion.div
        className={styles.wrapper}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <header className={styles.header}>
          <h1>{t.setup.title}</h1>
          <p>{t.setup.subtitle}</p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="category">{t.setup.category}</label>
            <select
              id="category"
              className={styles.select}
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value === 'any' ? 'any' : Number(e.target.value),
                )
              }
            >
              <option value="any">{t.setup.anyCategory}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <span className={styles.groupLabel}>{t.setup.difficulty}</span>
            <div className={styles.chips}>
              {difficulties.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`${styles.chip} ${
                    difficulty === option.value ? styles.chipActive : ''
                  }`}
                  onClick={() => setDifficulty(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.field}>
            <span className={styles.groupLabel}>{t.setup.amount}</span>
            <div className={styles.chips}>
              {AMOUNT_OPTIONS.map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`${styles.chip} ${
                    amount === value ? styles.chipActive : ''
                  }`}
                  onClick={() => setAmount(value)}
                >
                  {value} {t.setup.questions}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" size="lg" fullWidth>
            {t.setup.beginQuiz}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
