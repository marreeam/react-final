import { useLanguage } from '@/hooks/useLanguage';
import styles from './Loader.module.scss';

interface LoaderProps {
  label?: string;
}

export function Loader({ label }: LoaderProps) {
  const { t } = useLanguage();
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <span className={styles.spinner} />
      <p className={styles.label}>{label ?? `${t.common.loading}…`}</p>
    </div>
  );
}
