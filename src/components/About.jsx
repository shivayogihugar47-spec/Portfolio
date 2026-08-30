import React from 'react';
import styles from './About.module.css';
import Lanyard from './Lanyard';
import LightRays from './LightRays';

export default function About() {
  return (
    <section id="about" className={styles.aboutPage}>
      <div className={styles.wavesBackground}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#7c6fff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>
      <div className={styles.container}>
        <div className={styles.contentWrap}>
          <div className={styles.textSide}>
            <div className={styles.header}>
              <span className={styles.tag}>ABOUT THE DEVELOPER</span>
              <h2 className={styles.title}>BEYOND THE <br /> CODEbase</h2>
            </div>

            <p className={styles.bio}>
              Hi, I&apos;m Shivayogi, a third year Engineering student and a curious developer with a passion for creating high impact digital experiences.
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

          <div className={styles.imageSide}>
            <div className={styles.imageBox}>
              <Lanyard 
                position={[0, 0, 12]} 
                gravity={[0, -40, 0]} 
                frontImage="/myimage5.png"
                backImage="/myimage5.png"
                signatureImage="/signature.png"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
