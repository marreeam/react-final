import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/Button/Button';
import styles from './NotFound.module.scss';

export function NotFound() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="container">
      <motion.div
        className={styles.wrapper}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <span className={styles.code}>404</span>
        <h1>{t.notFound.title}</h1>
        <p>{t.notFound.message}</p>
        <Button size="lg" onClick={() => navigate('/')}>
          {t.notFound.backHome}
        </Button>
      </motion.div>
    </div>
  );
}
