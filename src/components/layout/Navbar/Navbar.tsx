import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { ThemeToggle } from '@/components/ui/ThemeToggle/ThemeToggle';
import { LanguageToggle } from '@/components/ui/LanguageToggle/LanguageToggle';
import styles from './Navbar.module.scss';

export function Navbar() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: '/', label: t.nav.home, end: true },
    { to: '/setup', label: t.nav.setup, end: false },
    { to: '/history', label: t.nav.history, end: false },
    { to: '/about', label: t.nav.about, end: false },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <header className={styles.header}>
      <div className={`${styles.inner} container`}>
        <NavLink to="/" className={styles.brand} onClick={() => setMenuOpen(false)}>
          <span className={styles.logo} aria-hidden="true">
            🧠
          </span>
          <span>QuizVerse</span>
        </NavLink>

        <nav className={styles.desktopNav} aria-label="Primary">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            className={styles.burger}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={menuOpen ? styles.barTop : ''} />
            <span className={menuOpen ? styles.barMid : ''} />
            <span className={menuOpen ? styles.barBottom : ''} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className={styles.mobileNav}
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
