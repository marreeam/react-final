import styles from './Footer.module.scss';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className={styles.text}>
          © {year} QuizVerse · Questions by{' '}
          <a
            href="https://opentdb.com"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            Open Trivia DB
          </a>
        </p>
      </div>
    </footer>
  );
}
