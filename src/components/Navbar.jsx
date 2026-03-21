import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* ── Brand Logo ── */}
        <div className={styles.logoBlock}>
          <a href="#home" className={styles.nameLogo}>
            S<span className={styles.logoAccent}>H</span>
          </a>
        </div>
        
        {/* ── Right Content: CV Download ── */}
        <div className={styles.actionBlock}>
          <a href="/shivayog_cv.pdf" download className={styles.cvDownloadBtn}>
            <span className={styles.btnText}>DOWNLOAD CV</span>
            <span className={styles.btnIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}
