import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { useHistory } from '@/hooks/useHistory';
import { Button } from '@/components/ui/Button/Button';
import styles from './Home.module.scss';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { totalPlayed, bestScore, averageScore } = useHistory();

  const features = [
    { icon: '♾️', title: t.home.feature1Title, text: t.home.feature1Text },
    { icon: '⏱️', title: t.home.feature2Title, text: t.home.feature2Text },
    { icon: '📈', title: t.home.feature3Title, text: t.home.feature3Text },
  ];

  const stats = [
    { label: t.home.statsPlayed, value: totalPlayed },
    { label: t.home.statsBest, value: `${bestScore}%` },
    { label: t.home.statsAvg, value: `${averageScore}%` },
  ];

  return (
    <div className="container">
      <motion.section
        className={styles.hero}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.span className={styles.tagline} variants={item}>
          {t.home.tagline}
        </motion.span>
        <motion.h1 className={styles.title} variants={item}>
          {t.home.title}
        </motion.h1>
        <motion.p className={styles.subtitle} variants={item}>
          {t.home.subtitle}
        </motion.p>
        <motion.div className={styles.actions} variants={item}>
          <Button size="lg" onClick={() => navigate('/setup')}>
            {t.home.startQuiz}
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate('/history')}
          >
            {t.home.viewHistory}
          </Button>
        </motion.div>

        {totalPlayed > 0 && (
          <motion.div className={styles.stats} variants={item}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        )}
      </motion.section>

      <section className={styles.features}>
        <h2 className={styles.featuresTitle}>{t.home.featuresTitle}</h2>
        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              className={styles.feature}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <span className={styles.featureIcon} aria-hidden="true">
                {feature.icon}
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
