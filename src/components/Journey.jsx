import React, { useEffect, useRef, useState } from 'react';
import styles from './Journey.module.css';

const JOURNEY_DATA = [
  {
    type: 'school',
    title: 'Schooling',
    institution: 'St, Marys High School',
    year: '2010 – 2022',
    desc: 'completed my 1st to 10th by a 89 percentage ',
    icon: '◈',
    tag: 'FOUNDATION',
    num: '01',
  },
  {
    type: 'diploma',
    title: 'Diploma',
    institution: 'Jain Polytechnic Belagavi',
    year: '2022 – 2025',
    desc: 'Diploma in Computer Engineering learnt basics of coding, systems, problem-solving.',
    icon: '⬡',
    tag: 'BUILD',
    num: '02',
  },
  {
    type: 'current',
    title: 'B.E Engineering',
    institution: 'Gogte Institute of Technology, Belagavi',
    year: '2025 – Present',
    desc: 'Information Science & Engineering, specializing in web technologies and AI.',
    icon: '◎',
    tag: 'ACTIVE',
    num: '03',
  },
];

export default function Journey() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState([]);
  const [activeIdx, setActiveIdx] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.idx);
            setVisible((prev) => [...new Set([...prev, idx])]);
          }
        });
      },
      { threshold: 0.25 }
    );
    const items = sectionRef.current?.querySelectorAll('[data-idx]');
    items?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="journey" className={styles.section} ref={sectionRef}>
      <div className={styles.bgGrid} />
      <div className={styles.bgGlow} />

      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.headerTag}>// career.path</span>
          <h2 className={styles.title}>MY JOURNEY</h2>
        </div>

        <div className={styles.timeline}>
          <div className={styles.spineTrack} />

          {JOURNEY_DATA.map((item, i) => (
            <div
              key={i}
              data-idx={i}
              className={`${styles.row} ${i % 2 === 0 ? styles.rowLeft : styles.rowRight} ${visible.includes(i) ? styles.rowVisible : ''}`}
              style={{ '--delay': `${i * 0.12}s` }}
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
            >
              {/* Dot on spine */}
              <div className={`${styles.dot} ${visible.includes(i) ? styles.dotLit : ''} ${activeIdx === i ? styles.dotActive : ''}`} />

              {/* Connector */}
              {/* <div className={`${styles.connector} ${i % 2 === 0 ? styles.connectorLeft : styles.connectorRight} ${activeIdx === i ? styles.connectorActive : ''}`} /> */}

              {/* Card */}
              <div className={`${styles.card} ${item.type === 'current' ? styles.cardCurrent : ''}`}>
                <div className={styles.cardLeft}>
                  <span className={styles.icon}>{item.icon}</span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span className={styles.year}>{item.year}</span>
                    <span className={`${styles.tag} ${item.type === 'current' ? styles.tagActive : ''}`}>
                      {item.type === 'current' && <span className={styles.tagDot} />}
                      {item.tag}
                    </span>
                  </div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.institution}>{item.institution}</p>
                  <p className={styles.desc}>{item.desc}</p>
                </div>
                <span className={styles.cardNum}>{item.num}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
