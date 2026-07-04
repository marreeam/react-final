import { useLanguage } from '@/hooks/useLanguage';
import styles from './LanguageToggle.module.scss';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleLanguage}
      aria-label="Change language"
      title="Change language"
    >
      <span className={language === 'en' ? styles.active : ''}>EN</span>
      <span className={styles.divider}>/</span>
      <span className={language === 'ka' ? styles.active : ''}>ქა</span>
    </button>
  );
}
