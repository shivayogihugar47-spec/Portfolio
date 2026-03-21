import React from 'react';
import styles from './Work.module.css';

const PROJECTS = [
  {
    title: "COMING SOON!",
    role: "New Project In Development",
    year: "2024",
    desc: "Stay tuned for some exciting new work and case studies.",
    image: ""
  }
];

export default function Work() {
  return (
    <section id="work" className={styles.workPage}>
      <div className={styles.container}>
        <div className={styles.centeredContent}>
          <h2 className={styles.title}>PROJECTS</h2>
          <p className={styles.subtext}>COMING SOON! STAY TUNED</p>
        </div>
      </div>
    </section>
  );
}
