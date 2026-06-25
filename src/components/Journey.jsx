import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Journey.module.css';

gsap.registerPlugin(ScrollTrigger);

const JOURNEY_DATA = [
  {
    type: 'school',
    title: 'Schooling',
    subtitle: 'The Genesis of Curiosity',
    institution: 'St. Marys High School',
    year: '2010 – 2022',
    desc: 'My journey began here — built a strong academic foundation, cultivated a love for mathematics, and developed the analytical mindset that drives everything I do today.',
    tag: 'FOUNDATION',
    num: '01',
    color: '#a78bfa',
    achievements: [
      'Graduated with 89% Distinction',
      'Built foundational skills in mathematics & logical reasoning',
      'Developed early interest in computers and technology'
    ],
    skills: ['Mathematics', 'Analytical Logic', 'Problem Solving', 'Science']
  },
  {
    type: 'diploma',
    title: 'Diploma — Computer Engineering',
    subtitle: 'First Lines of Code',
    institution: 'Jain Polytechnic Belagavi',
    year: '2022 – 2025',
    desc: 'Dove deep into the world of software. Learned to think in systems, write code, and build real-world applications — the turning point that made me a developer.',
    tag: 'BUILD',
    num: '02',
    color: '#818cf8',
    achievements: [
      'Mastered Object-Oriented programming and database architecture',
      'Built multiple functional web & desktop applications from scratch',
      'Understood computer networks, OS concepts and system design'
    ],
    skills: ['C & C++', 'Java', 'Data Structures', 'RDBMS', 'HTML / CSS / JS', 'Computer Networks']
  },
  {
    type: 'current',
    title: 'B.E. — Information Science',
    subtitle: 'Building the Future',
    institution: 'Gogte Institute of Technology, Belagavi',
    year: '2025 – Present',
    desc: 'Currently pushing boundaries in modern web engineering, AI integration, and scalable system architecture. Every project is a step toward building something meaningful.',
    tag: 'ACTIVE',
    num: '03',
    color: '#7c6fff',
    achievements: [
      'Developing production-grade web apps with React & modern stacks',
      'Exploring machine learning and AI-powered systems',
      'Actively contributing to open-source and personal projects'
    ],
    skills: ['React.js', 'Next.js / Vite', 'Node.js', 'Git', 'Machine Learning', 'REST APIs']
  },
];

export default function Journey() {
  const sectionRef = useRef(null);
  const pinWrapRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
      const cards = cardRefs.current;
      const totalCards = cards.length;

      // Initially: card 0 visible center, rest stacked off-screen to the RIGHT
      gsap.set(cards, {
        xPercent: (i) => i === 0 ? 0 : 110,
        scale: 1,
        opacity: (i) => i === 0 ? 1 : 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 0.6,
          start: 'top top',
          end: `+=${(totalCards - 1) * 100}%`,
          snap: {
            snapTo: 1 / (totalCards - 1),
            duration: { min: 0.3, max: 0.6 },
            ease: 'power2.inOut',
          },
        },
      });

      // For each transition, slide next card in from right, push previous cards left + scale down
      for (let i = 1; i < totalCards; i++) {
        // Slide new card in from the right
        tl.to(cards[i], {
          xPercent: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        }, (i - 1));

        // Push previous cards left and scale/dim them into the stack
        for (let j = 0; j < i; j++) {
          const depth = i - j;
          const scaleVal = 1 - depth * 0.05;
          const xVal = -(depth * 28);      // shift left as cards stack behind
          const opacityVal = 1 - depth * 0.3;
          tl.to(cards[j], {
            scale: scaleVal,
            x: xVal,
            opacity: Math.max(opacityVal, 0),
            duration: 1,
            ease: 'power3.out',
          }, (i - 1));
        }
      }

      return () => {
        tl.scrollTrigger?.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="journey" className={styles.section} ref={sectionRef}>
      <div className={styles.bgGrid} />
      <div className={styles.bgGlow} />

      <div className={styles.pinWrap} ref={pinWrapRef}>
        {/* Section header — stays on top */}
        <div className={styles.header}>
          <span className={styles.headerTag}>// career.chronicles</span>
          <h2 className={styles.title}>MY JOURNEY</h2>
          <p className={styles.headerHint}>Scroll to explore</p>
        </div>

        {/* Card stack container */}
        <div className={styles.stackContainer}>
          {JOURNEY_DATA.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className={styles.card}
              style={{ '--card-theme': item.color, '--z-index': i + 1 }}
            >
              {/* Corner notch */}
              <div className={styles.cornerNotch} />
              {/* Top accent bar */}
              <div className={styles.accentBar} />
              {/* Side accent line */}
              <div className={styles.sideBar} />

              {/* Card inner layout */}
              <div className={styles.cardInner}>
                {/* Top meta row */}
                <div className={styles.cardTop}>
                  <div className={styles.numBlock}>
                    <span className={styles.numBig}>{item.num}</span>
                    <span className={styles.numTag}>{item.tag}</span>
                  </div>
                  <div className={styles.yearBlock}>
                    <span className={styles.yearText}>{item.year}</span>
                    {item.type === 'current' && (
                      <span className={styles.activePill}>
                        <span className={styles.activePulse} />
                        ACTIVE
                      </span>
                    )}
                  </div>
                </div>

                {/* Title area */}
                <div className={styles.titleArea}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <h4 className={styles.cardSubtitle}>{item.subtitle}</h4>
                  <p className={styles.cardInstitution}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="2" width="16" height="20" rx="2"/>
                      <path d="M9 22V16h6v6M9 16h6"/>
                    </svg>
                    {item.institution}
                  </p>
                  <p className={styles.cardDesc}>{item.desc}</p>
                </div>

                {/* Bottom content grid */}
                <div className={styles.cardGrid}>
                  {/* Milestones */}
                  <div className={styles.milestones}>
                    <span className={styles.gridLabel}>Key Milestones</span>
                    <ul className={styles.milestoneList}>
                      {item.achievements.map((ach, idx) => (
                        <li key={idx} className={styles.milestoneItem}>
                          <span className={styles.milestoneBullet}>»</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills */}
                  <div className={styles.skills}>
                    <span className={styles.gridLabel}>Skills Acquired</span>
                    <div className={styles.skillsGrid}>
                      {item.skills.map((skill, idx) => (
                        <span key={idx} className={styles.skillBadge}>{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Background large number watermark */}
              <span className={styles.watermark}>{item.num}</span>
            </div>
          ))}
        </div>

        {/* Progress tracker dots */}
        <div className={styles.progressDots}>
          {JOURNEY_DATA.map((item, i) => (
            <div key={i} className={styles.progressDotWrapper}>
              <div className={styles.progressDot} style={{ '--dot-color': item.color }} />
              <span className={styles.progressDotLabel}>{item.tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile-only list fallback */}
      <div className={styles.mobileList}>
        {JOURNEY_DATA.map((item, i) => (
          <div key={i} className={styles.mobileCard} style={{ '--card-theme': item.color }}>
            <div className={styles.sideBar} />
            <div className={styles.accentBar} />
            <div className={styles.cardInner}>
              <div className={styles.cardTop}>
                <div className={styles.numBlock}>
                  <span className={styles.numBig}>{item.num}</span>
                  <span className={styles.numTag}>{item.tag}</span>
                </div>
                <span className={styles.yearText}>{item.year}</span>
              </div>
              <div className={styles.titleArea}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <h4 className={styles.cardSubtitle}>{item.subtitle}</h4>
                <p className={styles.cardInstitution}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="2" width="16" height="20" rx="2"/>
                    <path d="M9 22V16h6v6M9 16h6"/>
                  </svg>
                  {item.institution}
                </p>
                <p className={styles.cardDesc}>{item.desc}</p>
              </div>
              <div className={styles.cardGrid}>
                <div className={styles.milestones}>
                  <span className={styles.gridLabel}>Key Milestones</span>
                  <ul className={styles.milestoneList}>
                    {item.achievements.map((ach, idx) => (
                      <li key={idx} className={styles.milestoneItem}>
                        <span className={styles.milestoneBullet}>»</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.skills}>
                  <span className={styles.gridLabel}>Skills Acquired</span>
                  <div className={styles.skillsGrid}>
                    {item.skills.map((skill, idx) => (
                      <span key={idx} className={styles.skillBadge}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
