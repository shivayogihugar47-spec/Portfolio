import React from 'react';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.aboutPage}>
      <div className={styles.container}>
        <div className={styles.contentWrap}>
          {/* ── Left Side: Identity Info ── */}
          <div className={styles.textSide}>
            <div className={styles.header}>
              <span className={styles.tag}>ABOUT THE DEVELOPER</span>
              <h2 className={styles.title}>BEYOND THE <br /> CODEbase</h2>
            </div>
            
            <p className={styles.bio}>
              Hi, I’m Shivayogi, a second year Engineering student and a curious developer with a passion for creating high impact digital experiences. 
              I work at the intersection of development, design, and AI, building products that are not only effective but also have a refined feel from the very first interaction.
              <br /><br />
              I have a strong interest in applying AI to improve both creativity and problem-solving, whether it is through design concepts, workflows, or smart solutions such as real-life parking solutions. 
              I enjoy bringing ideas to life through prototypes and experimenting with new tools and technologies.
            </p>

            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>LOCATION</span>
                <span className={styles.detailValue}>BELAGAVI, INDIA</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>STATUS</span>
                <span className={styles.detailValue}>OPEN TO WORK</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>EXPERIENCE</span>
                <span className={styles.detailValue}>STUDENT</span>
              </div>
            </div>
          </div>

          {/* ── Right Side: Portrait or Decorative Block ── */}
          <div className={styles.imageSide}>
            <div className={styles.imageBox}>
               <img src="/myimage 3.png" alt="About Me" className={styles.portrait} />
               <div className={styles.overlayGlow} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
