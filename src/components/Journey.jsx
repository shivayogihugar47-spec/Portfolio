import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Journey.module.css';

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    num: '01',
    tag: 'FOUNDATION',
    title: 'ST, MARYS HIGH SCHOOL',
    role: 'Student',
    year: '2010 - 2022',
    story: 'Built the base layer with mathematical reasoning, logic, and the habits that later made code feel natural.',
    milestones: [
      'Developed logical reasoning and mathematical foundations.',
      'Participated in extracurricular problem-solving challenges.',
      'Built early communication and teamwork skills.'
    ],
    skills: ['Basic Communication', 'Logic Building', 'Problem Solving'],
    color: '#a78bfa',
    shortYear: '2010',
  },
  {
    num: '02',
    tag: 'CONSTRUCT',
    title: 'JAIN POLYTECHNIC BELAGAVI',
    role: 'Computer Science Student',
    year: '2022 - 2025',
    story: 'Moved from theory into systems: data structures, object-oriented design, database thinking, and network fundamentals.',
    milestones: [
      'Learned OOP in Java and developed mini-projects.',
      'Built a CLI tool and foundational programs in C.',
      'Grasped fundamental database and networking concepts.'
    ],
    skills: ['C', 'Java', 'Python', 'SQL', 'Networking'],
    color: '#38bdf8',
    shortYear: '2022',
  },
  {
    num: '03',
    tag: 'ACTIVE',
    title: 'KLS GOGTE INSTITUTE OF TECHNOLOGY',
    role: 'Information Science Student',
    year: '2025 - Present',
    story: 'Shipping React interfaces, learning scalable backend patterns, and folding machine learning into practical builds.',
    milestones: [
      'Building dynamic and responsive React applications.',
      'Exploring scalable backend architectures and API design.',
      'Integrating modern tech stacks into real-world projects.'
    ],
    skills: ['React.js', 'DSA', 'Software Engineering', 'Operating Systems', 'Cloud Computing',],
    color: '#7c6fff',
    shortYear: '2025',
  },
];

const JourneyScene = ({ chapter, active, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
  <article className={`${styles.scene} ${active ? styles.sceneActive : ''}`} style={{ '--accent': chapter.color }} data-stop>
    <span className={styles.sceneNumber}>{chapter.num}</span>
    <span className={styles.yearGhost}>{chapter.shortYear}</span>

    <div className={styles.route}>
      <span className={styles.routeBefore} />
      <span className={styles.station}>
        <i />
      </span>
      <span className={styles.routeAfter} />
    </div>

    <div className={styles.signpost}>
      <div className={styles.signHeader}>
        <span className={styles.tag}>{chapter.tag}</span>
        <span className={styles.year}>{chapter.year}</span>
      </div>

      <h3 className={styles.title}>{chapter.title}</h3>

      <div className={styles.meta}>
        <span>{chapter.role}</span>
        <span>{chapter.place}</span>
      </div>

      <p className={styles.story}>{chapter.story}</p>

      {chapter.milestones && chapter.milestones.length > 0 && (
        <div className={styles.milestonesContainer}>
          <button 
            className={styles.toggleBtn} 
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'Hide Milestones' : 'Show Milestones'}
            <svg 
              className={`${styles.toggleIcon} ${isExpanded ? styles.toggleIconOpen : ''}`} 
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          
          <div className={`${styles.milestonesList} ${isExpanded ? styles.milestonesListOpen : ''}`}>
            <ul>
              {chapter.milestones.map((milestone, idx) => (
                <li key={idx}>
                  <span className={styles.milestoneBullet}></span>
                  {milestone}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className={styles.skills} aria-label={`Skills from chapter ${index + 1}`}>
        {chapter.skills.map((skill) => (
          <span key={skill} className={styles.chip}>{skill}</span>
        ))}
      </div>

      {chapter.isCta && (
        <a href="#contact" className={styles.cta}>
          Connect Now
        </a>
      )}
    </div>

    <div className={styles.caption}>
      <span>Chapter {index + 1}</span>
    </div>
  </article>
  );
};

export default function Journey() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const mobileRailRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const progress = progressRef.current;
      if (!section || !track) return undefined;

      const getStops = () => gsap.utils.toArray(track.querySelectorAll('[data-stop]'));
      const getScrollAmount = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.9,
          start: 'top top',
          end: () => `+=${getScrollAmount() + window.innerHeight * 0.45}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progress) {
              progress.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      tl.to(track, { x: () => -getScrollAmount(), ease: 'none' });

      const stops = getStops();

      stops.forEach((stop, index) => {
        gsap.fromTo(
          stop,
          { opacity: 0.28, scale: 0.94 },
          {
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stop,
              containerAnimation: tl,
              start: 'left 78%',
              end: 'center center',
              scrub: true,
            },
          }
        );

        ScrollTrigger.create({
          trigger: stop,
          containerAnimation: tl,
          start: 'left center',
          end: 'right center',
          onToggle: (self) => {
            if (self.isActive) setActiveIdx(index);
          },
        });
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('load', refresh);
      document.fonts?.ready?.then(refresh);

      return () => {
        window.removeEventListener('load', refresh);
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    mm.add('(max-width: 768px)', () => {
      const section = sectionRef.current;
      const rail = mobileRailRef.current;
      if (!section || !rail) return undefined;

      const stops = gsap.utils.toArray(rail.querySelectorAll('[data-stop]'));
      const getScrollAmount = () => Math.max(0, rail.scrollWidth - window.innerWidth);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.9,
          start: 'top top',
          end: () => `+=${getScrollAmount() + window.innerHeight * 0.35}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      tl.to(rail, { x: () => -getScrollAmount(), ease: 'none' });

      stops.forEach((stop, index) => {
        gsap.fromTo(
          stop,
          { opacity: 0.36, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stop,
              containerAnimation: tl,
              start: 'left 82%',
              end: 'center center',
              scrub: true,
            },
          }
        );

        ScrollTrigger.create({
          trigger: stop,
          containerAnimation: tl,
          start: 'left center',
          end: 'right center',
          onToggle: (self) => {
            if (self.isActive) setActiveIdx(index);
          },
        });
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('load', refresh);
      document.fonts?.ready?.then(refresh);

      return () => {
        window.removeEventListener('load', refresh);
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const rail = mobileRailRef.current;
    if (!rail) return undefined;

    const updateActive = () => {
      const stops = Array.from(rail.querySelectorAll('[data-stop]'));
      const railCenter = rail.getBoundingClientRect().left + rail.clientWidth / 2;
      const nextIdx = stops.reduce((closest, stop, index) => {
        const station = stop.querySelector(`.${styles.station}`);
        const rect = (station || stop).getBoundingClientRect();
        const stopCenter = rect.left + rect.width / 2;
        const distance = Math.abs(stopCenter - railCenter);
        return distance < closest.distance ? { index, distance } : closest;
      }, { index: 0, distance: Infinity }).index;

      setActiveIdx(nextIdx);
    };

    rail.addEventListener('scroll', updateActive, { passive: true });
    updateActive();

    return () => rail.removeEventListener('scroll', updateActive);
  }, []);

  return (
    <section id="journey" ref={sectionRef} className={styles.section}>
      <div className={styles.backdrop} />

      <div className={styles.viewport}>
        <header className={styles.sectionHeader}>
          <div>
            <h2 className={styles.heading}>The Journey</h2>
          </div>
          <p className={styles.intro}>A guided map through the chapters that shaped how I think, learn, and build.</p>
        </header>

        <div className={styles.progressShell} aria-hidden="true">
          <span ref={progressRef} className={styles.progressFill} />
        </div>

        <div className={styles.trackWindow}>
          <div className={styles.track} ref={trackRef}>
            {CHAPTERS.map((chapter, index) => (
              <JourneyScene
                key={chapter.num}
                chapter={chapter}
                index={index}
                active={activeIdx === index}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.mobile}>
        <header className={styles.sectionHeader}>
          <div>
            <span className={styles.eyebrow}>// CHRONOLOGY</span>
            <h2 className={styles.heading}>The Journey</h2>
          </div>
        </header>

        <div className={styles.mobileRail} ref={mobileRailRef}>
          {CHAPTERS.map((chapter, index) => (
            <JourneyScene
              key={chapter.num}
              chapter={chapter}
              index={index}
              active={activeIdx === index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
