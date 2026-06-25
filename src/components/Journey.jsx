import React, { useEffect, useRef, useState } from 'react';
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
    year: '2010',
    yearRange: '2010 – 2022',
    desc: 'My journey began here — built a strong academic foundation, cultivated a love for mathematics, and developed the analytical mindset that drives everything I do today.',
    tag: 'FOUNDATION',
    num: '01',
    color: '#a78bfa',
    gradFrom: 'rgba(167,139,250,0.08)',
    gradTo: 'rgba(167,139,250,0.01)',
    achievements: [
      'Graduated with 89% Distinction',
      'Built foundational skills in mathematics & logical reasoning',
      'Developed early interest in computers and technology',
    ],
    skills: ['Mathematics', 'Analytical Logic', 'Problem Solving', 'Science'],
  },
  {
    type: 'diploma',
    title: 'Diploma in Computer Engg.',
    subtitle: 'First Lines of Code',
    institution: 'Jain Polytechnic Belagavi',
    year: '2022',
    yearRange: '2022 – 2025',
    desc: 'Dove deep into the world of software. Learned to think in systems, write code, and build real-world applications — the turning point that made me a developer.',
    tag: 'BUILD',
    num: '02',
    color: '#818cf8',
    gradFrom: 'rgba(129,140,248,0.08)',
    gradTo: 'rgba(129,140,248,0.01)',
    achievements: [
      'Mastered Object-Oriented programming and database architecture',
      'Built multiple functional web & desktop applications from scratch',
      'Understood computer networks, OS concepts and system design',
    ],
    skills: ['C & C++', 'Java', 'Data Structures', 'RDBMS', 'HTML / CSS / JS', 'Networks'],
  },
  {
    type: 'current',
    title: 'B.E. Information Science',
    subtitle: 'Building the Future',
    institution: 'Gogte Institute of Technology, Belagavi',
    year: '2025',
    yearRange: '2025 – Present',
    desc: 'Currently pushing boundaries in modern web engineering, AI integration, and scalable system architecture. Every project is a step toward building something meaningful.',
    tag: 'ACTIVE',
    num: '03',
    color: '#7c6fff',
    gradFrom: 'rgba(124,111,255,0.1)',
    gradTo: 'rgba(124,111,255,0.01)',
    achievements: [
      'Developing production-grade web apps with React & modern stacks',
      'Exploring machine learning and AI-powered systems',
      'Actively contributing to open-source and personal projects',
    ],
    skills: ['React.js', 'Next.js / Vite', 'Node.js', 'Git', 'Machine Learning', 'REST APIs'],
  },
];

export default function Journey() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
      const cards = cardRefs.current;
      const total = cards.length;

      // Set initial states:
      // Card 0: visible, centered
      // Card 1+: off to the right, slightly rotated
      gsap.set(cards, (i) => ({
        x: i === 0 ? 0 : '110%',
        rotateY: i === 0 ? 0 : 18,
        scale: i === 0 ? 1 : 0.88,
        opacity: i === 0 ? 1 : 0,
        transformOrigin: 'left center',
      }));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: `+=${(total - 1) * 120}%`,
          snap: {
            snapTo: 1 / (total - 1),
            duration: { min: 0.4, max: 0.8 },
            ease: 'power3.inOut',
          },
          onUpdate: (self) => {
            const idx = Math.min(
              Math.floor(self.progress * total + 0.15),
              total - 1
            );
            setActiveIdx(idx);
          },
        },
      });

      for (let i = 1; i < total; i++) {
        const t = i - 1; // timeline position

        // Incoming card: slide in from right with 3D rotation
        tl.fromTo(
          cards[i],
          { x: '110%', rotateY: 18, scale: 0.88, opacity: 0 },
          { x: '0%', rotateY: 0, scale: 1, opacity: 1, duration: 1, ease: 'power3.out' },
          t
        );

        // Outgoing previous cards: slide left, scale down, blur into depth
        for (let j = 0; j < i; j++) {
          const depth = i - j;
          tl.to(
            cards[j],
            {
              x: `-${depth * 32}px`,
              scale: 1 - depth * 0.055,
              rotateY: -depth * 4,
              opacity: Math.max(1 - depth * 0.35, 0),
              duration: 1,
              ease: 'power3.out',
            },
            t
          );
        }
      }

      return () => tl.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, []);

  const active = JOURNEY_DATA[activeIdx];

  return (
    <section id="journey" className={styles.section} ref={sectionRef}>
      {/* Backgrounds */}
      <div className={styles.bgGrid} />
      <div
        className={styles.bgBlob}
        style={{ '--blob-color': active.color }}
      />

      <div className={styles.pinWrap}>
        {/* ── Top header strip ── */}
        <div className={styles.topStrip}>
          <div className={styles.topLeft}>
            <span className={styles.headerTag}>// career.chronicles</span>
            <h2 className={styles.title}>MY JOURNEY</h2>
          </div>
          <div className={styles.topRight}>
            {/* Step indicator */}
            {JOURNEY_DATA.map((item, i) => (
              <button
                key={i}
                className={`${styles.stepBtn} ${activeIdx === i ? styles.stepBtnActive : ''}`}
                style={{ '--btn-color': item.color }}
                onClick={() => {
                  // Scroll proportionally
                  const trigger = ScrollTrigger.getById('journey-trigger');
                  if (trigger) {
                    const progress = i / (JOURNEY_DATA.length - 1);
                    const y = trigger.start + (trigger.end - trigger.start) * progress;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
              >
                <span className={styles.stepNum}>{item.num}</span>
                <span className={styles.stepLabel}>{item.tag}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Card Stack ── */}
        <div className={styles.stackContainer}>
          {JOURNEY_DATA.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className={styles.card}
              style={{
                '--card-color': item.color,
                '--card-grad-from': item.gradFrom,
                '--card-grad-to': item.gradTo,
                zIndex: i + 1,
              }}
            >
              {/* Ambient card glow */}
              <div className={styles.cardGlow} />
              {/* Top neon border */}
              <div className={styles.cardTopBorder} />
              {/* Side neon bar */}
              <div className={styles.cardSideBar} />
              {/* Corner cut */}
              <div className={styles.cardCorner} />
              {/* Background year watermark */}
              <div className={styles.cardWatermark}>{item.year}</div>

              {/* ── Card Layout: Left Panel + Right Panel ── */}
              <div className={styles.cardLayout}>
                {/* Left panel — identity block */}
                <div className={styles.leftPanel}>
                  <div className={styles.numGiant}>{item.num}</div>
                  <div className={styles.tagPill}>
                    {item.type === 'current' && <span className={styles.liveDot} />}
                    {item.tag}
                  </div>
                  <div className={styles.yearRange}>{item.yearRange}</div>
                  <div className={styles.dividerLine} />
                  <p className={styles.institutionName}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="2" width="16" height="20" rx="2"/>
                      <path d="M9 22V16h6v6M9 16h6"/>
                    </svg>
                    {item.institution}
                  </p>
                </div>

                {/* Right panel — narrative content */}
                <div className={styles.rightPanel}>
                  <div className={styles.rightTop}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <h4 className={styles.cardSubtitle}>{item.subtitle}</h4>
                    <p className={styles.cardDesc}>{item.desc}</p>
                  </div>

                  <div className={styles.rightBottom}>
                    {/* Milestones */}
                    <div className={styles.milestonesCol}>
                      <span className={styles.colLabel}>Key Milestones</span>
                      <ul className={styles.milestoneList}>
                        {item.achievements.map((ach, idx) => (
                          <li key={idx} className={styles.milestoneItem}>
                            <span className={styles.bullet}>»</span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Skills */}
                    <div className={styles.skillsCol}>
                      <span className={styles.colLabel}>Skills Acquired</span>
                      <div className={styles.skillsWrap}>
                        {item.skills.map((skill, idx) => (
                          <span key={idx} className={styles.skillBadge}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom progress bar ── */}
        <div className={styles.bottomBar}>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{
                width: `${((activeIdx + 1) / JOURNEY_DATA.length) * 100}%`,
                background: active.color,
                boxShadow: `0 0 12px ${active.color}`,
              }}
            />
          </div>
          <div className={styles.progressLabel}>
            <span style={{ color: active.color }}>{active.num}</span>
            <span className={styles.progressSep}>/</span>
            <span>{JOURNEY_DATA.length.toString().padStart(2, '0')}</span>
            <span className={styles.progressTag}>{active.tag}</span>
          </div>
        </div>
      </div>

      {/* ── Mobile fallback list ── */}
      <div className={styles.mobileList}>
        <div className={styles.mobileHeader}>
          <span className={styles.headerTag}>// career.chronicles</span>
          <h2 className={styles.title}>MY JOURNEY</h2>
        </div>
        {JOURNEY_DATA.map((item, i) => (
          <div
            key={i}
            className={styles.mobileCard}
            style={{ '--card-color': item.color, '--card-grad-from': item.gradFrom }}
          >
            <div className={styles.cardTopBorder} />
            <div className={styles.cardSideBar} />
            <div className={styles.cardLayout} style={{ flexDirection: 'column', gap: '20px' }}>
              <div className={styles.mobileMeta}>
                <span className={styles.numGiant} style={{ fontSize: '2.5rem' }}>{item.num}</span>
                <div>
                  <div className={styles.tagPill}>{item.tag}</div>
                  <div className={styles.yearRange}>{item.yearRange}</div>
                </div>
              </div>
              <div className={styles.rightPanel}>
                <div className={styles.rightTop}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <h4 className={styles.cardSubtitle}>{item.subtitle}</h4>
                  <p className={styles.cardDesc}>{item.desc}</p>
                </div>
                <div className={styles.rightBottom} style={{ flexDirection: 'column', gap: '16px' }}>
                  <div className={styles.milestonesCol}>
                    <span className={styles.colLabel}>Key Milestones</span>
                    <ul className={styles.milestoneList}>
                      {item.achievements.map((ach, idx) => (
                        <li key={idx} className={styles.milestoneItem}>
                          <span className={styles.bullet}>»</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.skillsCol}>
                    <span className={styles.colLabel}>Skills Acquired</span>
                    <div className={styles.skillsWrap}>
                      {item.skills.map((skill, idx) => (
                        <span key={idx} className={styles.skillBadge}>{skill}</span>
                      ))}
                    </div>
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
