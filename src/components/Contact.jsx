import React from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <footer id="contact" className={styles.contact}>
      <div className={styles.container}>
        <span className={styles.tag}>GET IN TOUCH</span>
        <h2 className={styles.mainCta}>LET'S WORK <br /> TOGETHER</h2>
        
        <div className={styles.footerBottom}>
          <div className={styles.socialGrid}>
            <a href="https://www.linkedin.com/in/shivayogi-hugar/" className={styles.socialLink}>LINKEDIN</a>
            <a href="https://x.com/HugarShiva50433" className={styles.socialLink}>TWITTER</a>
            <a href="https://github.com/shivayogihugar47-spec" className={styles.socialLink}>GITHUB</a>
            <a href="https://www.instagram.com/shivayogi._hugar/" className={styles.socialLink}>INSTAGRAM</a>
          </div>
          
          <div className={styles.credits}>
            <p>© 2026 SHIVAYOGI. ALL RIGHTS RESERVED.</p>
            <p className={styles.collabText}>OPEN FOR PROJECTS</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
