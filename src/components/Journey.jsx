import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Journey.module.css';

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    num: '01',
    tag: 'FOUNDATION',
    title: 'The Genesis',
    role: 'Student',
    place: 'St. Marys High',
    year: '2010 — 2022',
    story: 'Constructed the base layer. Cultivated mathematical reasoning and core logical frameworks before writing a single line of code.',
    skills: ['Mathematics', 'Logic', 'Problem Solving'],
    color: '#a78bfa',
  },
  {
    num: '02',
    tag: 'CONSTRUCT',
    title: 'First Lines',
    role: 'Engineering Student',
    place: 'Jain Polytechnic',
    year: '2022 — 2025',
    story: 'Initialized developer protocols. Mastered low-level data structures, object-oriented design, and database architecture.',
    skills: ['C/C++', 'Java', 'SQL', 'Networking'],
    color: '#38bdf8',
  },
  {
    num: '03',
    tag: 'ACTIVE',
    title: 'Building Forward',
    role: 'Information Science',
    place: 'Gogte Institute',
    year: '2025 — Present',
    story: 'Deploying production-grade React architectures. Integrating machine learning models and optimizing scalable system workflows.',
    skills: ['React.js', 'Node.js', 'Machine Learning'],
    color: '#7c6fff',
  },
  {
    num: '04',
    tag: 'HORIZON',
    title: 'The Horizon',
    role: 'Software Engineer',
    place: 'Open Network',
    year: '2026 →',
    story: 'System ready for enterprise scaling. Seeking software engineering roles to architect high-impact solutions.',
    skills: ['Full Stack', 'Cloud', 'System Design'],
    color: '#00ff87',
    isCta: true,
  },
];

const JourneyCard = ({ data, isActive }) => {
  return (
    <div className={`${styles.cardWrap} cardWrap`}>
      <div className={`${styles.card} ${isActive ? styles.cardActive : ''}`} style={{ '--cc': data.color }}>
        {/* Glow behind the card */}
        <div className={styles.cardGlow} />
        
        {/* Card Content */}
        <div className={styles.cardInner}>
          <div className={styles.cardHeader}>
            <span className={styles.phaseTag}>{data.tag}</span>
            <span className={styles.year}>{data.year}</span>
          </div>

          <h3 className={styles.title}>{data.title}</h3>
          
          <div className={styles.meta}>
            <span className={styles.role}>{data.role}</span>
            <span className={styles.place}>@ {data.place}</span>
          </div>

          <p className={styles.story}>{data.story}</p>

          <div className={styles.skills}>
            {data.skills.map((s, i) => (
              <span key={i} className={styles.chip}>{s}</span>
            ))}
          </div>

          {data.isCta && (
            <a href="#contact" className={styles.cta}>
              Start a Conversation
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Journey() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      // Ensure full scroll distance across all cards
      const getScrollAmount = () => track.scrollWidth - window.innerWidth + 600;

      // 1. Horizontal Scroll Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track, { x: () => -getScrollAmount(), ease: 'none' });

      // 2. 3D Carousel Animation for Cards
      const cards = track.querySelectorAll('.cardWrap');
      cards.forEach((card, i) => {
        // As the card comes into view from the right, it swings in
        gsap.fromTo(card,
          { rotateY: -45, scale: 0.75, opacity: 0, z: -500 },
          {
            rotateY: 0, scale: 1, opacity: 1, z: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: 'left right', // When left edge of card enters right edge of viewport
              end: 'center center', // Fully realized at center
              scrub: true,
            }
          }
        );

        // As it leaves the center to the left, it swings away
        gsap.to(card, {
          rotateY: 45, scale: 0.75, opacity: 0, z: -500,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: card,
            containerAnimation: tl,
            start: 'center center',
            end: 'right left', // When right edge leaves left side
            scrub: true,
          }
        });

        // Set active index for background color updates
        ScrollTrigger.create({
          trigger: card,
          containerAnimation: tl,
          start: 'left center+=200',
          end: 'right center-=200',
          onToggle: self => {
            if (self.isActive) setActiveIdx(i);
          }
        });
      });

      return () => tl.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="journey" ref={sectionRef} className={styles.section}>
      {/* Dynamic Ambient Background */}
      <div 
        className={styles.ambientBg} 
        style={{ '--bc': CHAPTERS[activeIdx]?.color || '#7c6fff' }} 
      />
      
      {/* Floating Particles Canvas */}
      <div className={styles.particles} />

      <div className={styles.viewport}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>// CHRONOLOGY</span>
            <h2 className={styles.heading}>My Journey</h2>
          </div>
          <span className={styles.hint}>Scroll to explore</span>
        </header>

        {/* 3D Carousel Track */}
        <div className={styles.trackWindow}>
          <div className={styles.trackContainer} ref={trackRef}>
            
            {/* The continuous connector line */}
            <div className={styles.connectorLine} />

            {/* Cards */}
            {CHAPTERS.map((ch, i) => (
              <JourneyCard key={i} data={ch} isActive={activeIdx === i} />
            ))}
            
            {/* Padding at end */}
            <div style={{ width: '50vw', flexShrink: 0 }} />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className={styles.mobile}>
        <header className={styles.header} style={{ padding: 0, marginBottom: 40 }}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>// CHRONOLOGY</span>
            <h2 className={styles.heading}>My Journey</h2>
          </div>
        </header>
        
        <div className={styles.mobileList}>
          {CHAPTERS.map((ch, i) => (
            <div key={i} className={styles.mobileCard} style={{ '--cc': ch.color }}>
              <div className={styles.cardHeader}>
                <span className={styles.phaseTag}>{ch.tag}</span>
                <span className={styles.year}>{ch.year}</span>
              </div>
              <h3 className={styles.title}>{ch.title}</h3>
              <div className={styles.meta}>
                <span className={styles.role}>{ch.role}</span>
              </div>
              <p className={styles.story}>{ch.story}</p>
              <div className={styles.skills}>
                {ch.skills.map((s, idx) => <span key={idx} className={styles.chip}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
