import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import styles from './About.module.scss';

const TECH = [
  'React 19',
  'TypeScript',
  'React Router',
  'Axios',
  'Framer Motion',
  'SCSS Modules',
];

export function About() {
  const { t } = useLanguage();

  const highlights = [
    { icon: '🪝', text: 'React Hooks & custom hooks' },
    { icon: '🧭', text: 'Multi-page routing' },
    { icon: '🌐', text: 'Live trivia API integration' },
    { icon: '💾', text: 'Persistent local storage' },
    { icon: '🌗', text: 'Light & dark themes' },
    { icon: '🗣️', text: 'English & Georgian' },
  ];

  return (
    <div className="container">
      <motion.div
        className={styles.wrapper}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className={styles.title}>{t.about.title}</h1>
        <p className={styles.intro}>{t.about.intro}</p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t.about.featuresTitle}</h2>
          <div className={styles.grid}>
            {highlights.map((item) => (
              <div key={item.text} className={styles.highlight}>
                <span aria-hidden="true">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t.about.techTitle}</h2>
          <div className={styles.tags}>
            {TECH.map((tech) => (
              <span key={tech} className={styles.tag}>
                {tech}
              </span>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
}
