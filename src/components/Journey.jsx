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
    yearRange: '2010 – 2022',
    status: 'COMPLETED',
    desc: 'My journey began here — built a strong academic foundation, cultivated a love for mathematics, and developed the analytical mindset that drives everything I do today.',
    tag: 'FOUNDATION',
    num: '01',
    color: '#a78bfa',
    glowColor: 'rgba(167, 139, 250, 0.15)',
    achievements: [
      'Graduated with 89% Distinction',
      'Built foundational skills in mathematics & logical reasoning',
      'Developed early interest in computers and technology',
      'Participated in science exhibitions and coding workshops'
    ],
    skills: ['Mathematics', 'Analytical Logic', 'Problem Solving', 'Science', 'Basic Computing']
  },
  {
    type: 'diploma',
    title: 'Diploma — Computer Engineering',
    subtitle: 'First Lines of Code',
    institution: 'Jain Polytechnic Belagavi',
    yearRange: '2022 – 2025',
    status: 'COMPLETED',
    desc: 'Dove deep into the world of software. Learned to think in systems, write code, and build real-world applications — the turning point that made me a developer.',
    tag: 'BUILD',
    num: '02',
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.15)',
    achievements: [
      'Mastered Object-Oriented programming and database architecture',
      'Built multiple functional web & desktop applications from scratch',
      'Understood computer networks, OS concepts, and system design',
      'Completed academic projects with high grades and practical utility'
    ],
    skills: ['C & C++', 'Java', 'Data Structures', 'RDBMS / SQL', 'HTML / CSS / JS', 'Computer Networks']
  },
  {
    type: 'current',
    title: 'B.E. — Information Science',
    subtitle: 'Building the Future',
    institution: 'Gogte Institute of Technology, Belagavi',
    yearRange: '2025 – Present',
    status: 'IN PROGRESS',
    desc: 'Currently pushing boundaries in modern web engineering, AI integration, and scalable system architecture. Every project is a step toward building something meaningful.',
    tag: 'ACTIVE',
    num: '03',
    color: '#7c6fff',
    glowColor: 'rgba(124, 111, 255, 0.15)',
    achievements: [
      'Developing production-grade web apps with React & modern stacks',
      'Exploring machine learning algorithms and AI integration',
      'Actively contributing to open-source and personal projects',
      'Participating in hackathons and tech community events'
    ],
    skills: ['React.js', 'Next.js / Vite', 'Node.js', 'Git / GitHub', 'Machine Learning', 'REST APIs']
  },
];

// Helper to render high-tech animated SVG insignias per phase
const getPhaseIcon = (num) => {
  switch (num) {
    case '01':
      return (
        <svg className={styles.phaseIcon} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" className={styles.cubeOuter} />
          <polygon points="50,50 85,35 50,15 15,35" className={styles.cubeTop} />
          <line x1="50" y1="50" x2="50" y2="95" className={styles.cubeLine} />
          <line x1="15" y1="75" x2="50" y2="50" className={styles.cubeLine} />
          <line x1="85" y1="75" x2="50" y2="50" className={styles.cubeLine} />
        </svg>
      );
    case '02':
      return (
        <svg className={styles.phaseIcon} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="25" y="25" width="50" height="50" rx="8" className={styles.circuitOuter} />
          <path d="M10,50 L25,50 M75,50 L90,50 M50,10 L50,25 M50,75 L50,90" className={styles.circuitTrace} />
          <circle cx="50" cy="50" r="8" className={styles.circuitCore} />
          <circle cx="10" cy="50" r="3" fill="currentColor" className={styles.circuitDot} />
          <circle cx="90" cy="50" r="3" fill="currentColor" className={styles.circuitDot} />
          <circle cx="50" cy="10" r="3" fill="currentColor" className={styles.circuitDot} />
          <circle cx="50" cy="90" r="3" fill="currentColor" className={styles.circuitDot} />
        </svg>
      );
    case '03':
      return (
        <svg className={styles.phaseIcon} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="50" cy="50" r="10" className={styles.atomCore} fill="currentColor" />
          <ellipse cx="50" cy="50" rx="38" ry="12" className={styles.atomOrbit} transform="rotate(30 50 50)" />
          <ellipse cx="50" cy="50" rx="38" ry="12" className={styles.atomOrbit} transform="rotate(90 50 50)" />
          <ellipse cx="50" cy="50" rx="38" ry="12" className={styles.atomOrbit} transform="rotate(150 50 50)" />
        </svg>
      );
    default: // '04'
      return (
        <svg className={styles.phaseIcon} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="50" cy="50" r="40" className={styles.radarRing} />
          <circle cx="50" cy="50" r="25" className={styles.radarRing} />
          <line x1="50" y1="5" x2="50" y2="95" className={styles.radarLine} />
          <line x1="5" y1="50" x2="95" y2="50" className={styles.radarLine} />
          <line x1="50" y1="50" x2="78" y2="22" className={styles.radarSweep} />
        </svg>
      );
  }
};

// Interactive Card Component
function JourneyCard({ item, index, activeIdx, onMouseMove, onMouseLeave }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'milestones' | 'skills'

  return (
    <div
      className={`${styles.card} ${activeIdx === index ? styles.cardActive : ''}`}
      style={{
        '--card-color': item.color,
        '--card-glow': item.glowColor,
      }}
      onMouseMove={(e) => onMouseMove(e, index)}
      onMouseLeave={() => onMouseLeave(index)}
    >
      {/* Holographic grid overlay that reveals under cursor */}
      <div className={styles.cardGrid} />

      {/* Decorative corner elements */}
      <div className={styles.cornerTL} />
      <div className={styles.cornerTR} />
      <div className={styles.cornerBL} />
      <div className={styles.cornerBR} />

      {/* Futuristic boundary data markers */}
      <span className={styles.borderLabelTop}>[COORDINATES: 15.8497° N, 74.4977° E]</span>
      <span className={styles.borderLabelBottom}>[STATUS: STABLE_LINK_0{item.num}]</span>

      {/* Card Header */}
      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          <span className={styles.cardNum}>{item.num}</span>
          <div className={styles.titleMeta}>
            <span className={styles.cardTag}>{item.tag}</span>
            <span className={styles.cardYear}>{item.yearRange}</span>
          </div>
        </div>
        <div className={styles.headerRightSide}>
          <div className={styles.statusBadge}>
            <span className={styles.statusDot} />
            {item.status}
          </div>
          <div className={styles.phaseIconWrapper}>
            {getPhaseIcon(item.num)}
          </div>
        </div>
      </div>

      {/* Custom Tabs Navigation */}
      <div className={styles.tabsNav}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'overview' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'milestones' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('milestones')}
        >
          Milestones
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'skills' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          Tech Arsenal
        </button>
      </div>

      {/* Card Content Area */}
      <div className={styles.cardBody}>
        {activeTab === 'overview' && (
          <div className={styles.tabContent} key="overview">
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <h4 className={styles.cardSubtitle}>{item.subtitle}</h4>
            <div className={styles.institution}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
              </svg>
              {item.institution}
            </div>
            <p className={styles.cardDesc}>{item.desc}</p>
            
            {/* High-tech telemetry oscilloscope wave */}
            <div className={styles.telemetryWrapper}>
              <div className={styles.telemetryGrid} />
              <svg className={styles.telemetryWave} viewBox="0 0 200 50" preserveAspectRatio="none">
                <path
                  d={
                    index === 0
                      ? "M0,25 Q30,5 60,30 T120,35 T180,15 L200,25"
                      : index === 1
                      ? "M0,35 Q25,10 50,30 T100,10 T150,35 L200,25"
                      : "M0,15 Q40,40 80,15 T140,35 T180,5 L200,15"
                  }
                  className={styles.wavePath}
                />
              </svg>
              <div className={styles.telemetryFooter}>
                <span className={styles.telemetryLabel}>[TELEMETRY FEED: CHRONO_0{item.num}]</span>
                <span className={styles.telemetryStatus}>SYS_LOAD: {(28.4 + index * 15.3).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'milestones' && (
          <div className={styles.tabContent} key="milestones">
            <span className={styles.sectionLabel}>Key Milestones</span>
            <ul className={styles.milestoneList}>
              {item.achievements.map((ach, idx) => (
                <li key={idx} className={styles.milestoneItem}>
                  <span className={styles.bullet}>//</span>
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className={styles.tabContent} key="skills">
            <span className={styles.sectionLabel}>Skills & Technologies</span>
            <div className={styles.skillsWrap}>
              {item.skills.map((skill, idx) => (
                <span key={idx} className={styles.skillBadge}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Background Watermark */}
      <span className={styles.watermark}>{item.num}</span>
    </div>
  );
}

export default function Journey() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressLineRef = useRef(null);
  const canvasRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [trackWidth, setTrackWidth] = useState(2000);
  const [svgPath, setSvgPath] = useState('');
  const scrollVelocityRef = useRef(0);

  // Dynamic Bezier Wave Generation
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    
    const widthVal = track.scrollWidth;
    setTrackWidth(widthVal);
    const cardCount = JOURNEY_DATA.length + 1; // 4 cards total
    
    // Generate smooth winding curve weaving up and down
    let path = 'M 0 150';
    const segmentWidth = widthVal / cardCount;
    
    for (let i = 0; i < cardCount; i++) {
      const cardCenter = i * segmentWidth + segmentWidth / 2;
      const prevCenter = (i - 1) * segmentWidth + segmentWidth / 2;
      
      if (i === 0) {
        path += ` L ${cardCenter} 150`;
      } else {
        const midX = (prevCenter + cardCenter) / 2;
        // Alternate curving peaks up and down in gaps
        const curveY = i % 2 === 0 ? 50 : 250;
        path += ` C ${prevCenter + 120} 150, ${midX - 120} ${curveY}, ${midX} ${curveY}`;
        path += ` C ${midX + 120} ${curveY}, ${cardCenter - 120} 150, ${cardCenter} 150`;
      }
    }
    path += ` L ${widthVal} 150`;
    setSvgPath(path);
  }, []);

  // Measure path length to initialize SVG stroke dash properties
  useEffect(() => {
    const path = progressLineRef.current;
    if (path && svgPath) {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    }
  }, [svgPath]);

  // 3D Parallax Canvas Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Build particle field
    const particleCount = 65;
    const particles = [];
    const colors = ['#a78bfa', '#38bdf8', '#7c6fff', '#00ff87'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 1600,
        y: (Math.random() - 0.5) * 1600,
        z: Math.random() * 800 + 40,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)] + (Math.random() > 0.45 ? '99' : '44'),
      });
    }

    let smoothVelocity = 0;

    const render = () => {
      // Gentle opacity sweep to clean canvas
      ctx.fillStyle = 'rgba(3, 4, 11, 0.22)';
      ctx.fillRect(0, 0, width, height);

      // Extract real scroll velocity
      const velocity = scrollVelocityRef.current;
      scrollVelocityRef.current *= 0.95; // decay velocity
      smoothVelocity += (velocity - smoothVelocity) * 0.08;

      const maxDist = 800;

      // Draw neural connections
      if (Math.abs(smoothVelocity) < 350) {
        for (let i = 0; i < particles.length; i++) {
          const pi = particles[i];
          if (pi.z > maxDist - 120) continue;

          const pix = (pi.x / pi.z) * width + width / 2;
          const piy = (pi.y / pi.z) * height + height / 2;
          if (pix < 0 || pix > width || piy < 0 || piy > height) continue;

          for (let j = i + 1; j < particles.length; j += 2) {
            const pj = particles[j];
            if (pj.z > maxDist - 120) continue;

            const pjx = (pj.x / pj.z) * width + width / 2;
            const pjy = (pj.y / pj.z) * height + height / 2;

            const dx = pix - pjx;
            const dy = piy - pjy;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 110) {
              const alpha = (1 - dist / 110) * 0.07 * (1 - pi.z / maxDist);
              ctx.strokeStyle = `rgba(124, 111, 255, ${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(pix, piy);
              ctx.lineTo(pjx, pjy);
              ctx.stroke();
            }
          }
        }
      }

      // Update and draw particles (Pure floating stars for a premium, glitch-free parallax)
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        const scrollShift = smoothVelocity * 0.08;
        p.x -= scrollShift;

        if (p.x < -maxDist) p.x = maxDist;
        if (p.x > maxDist) p.x = -maxDist;
        if (p.y < -maxDist) p.y = maxDist;
        if (p.y > maxDist) p.y = -maxDist;
        if (p.z < 10) p.z = maxDist;
        if (p.z > maxDist) p.z = 10;

        const screenX = (p.x / p.z) * width + width / 2;
        const screenY = (p.y / p.z) * height + height / 2;

        if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height) {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(screenX, screenY, p.size * (1 - p.z / maxDist), 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Mouse Move 3D tilt (applied to inner card to prevent ScrollTrigger conflicts)
  const handleMouseMove = (e, idx) => {
    const wrapper = cardRefs.current[idx];
    if (!wrapper) return;
    const card = wrapper.querySelector(`.${styles.card}`);
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 10; // tilt range
    const angleY = (x - xc) / 10;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    gsap.to(card, {
      rotateX: angleX,
      rotateY: angleY,
      transformPerspective: 1000,
      ease: 'power1.out',
      duration: 0.3,
    });
  };

  const handleMouseLeave = (idx) => {
    const wrapper = cardRefs.current[idx];
    if (!wrapper) return;
    const card = wrapper.querySelector(`.${styles.card}`);
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      ease: 'power2.out',
      duration: 0.5,
    });
  };

  // GSAP Pinning and 3D Curved Scroll Timeline
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth;
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            scrollVelocityRef.current = self.getVelocity();
          },
        },
      });

      // Translates track horizontally
      tl.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
      });

      // Traces progress wave dynamically along the Bezier curve
      tl.to(progressLineRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
      }, 0);

      // Apply 3D Cylindrical curved flows to each card wrapper using a single unified timeline
      cardRefs.current.forEach((wrapper, i) => {
        if (!wrapper) return;

        // Node active focus trigger
        ScrollTrigger.create({
          trigger: wrapper,
          containerAnimation: tl,
          start: 'left center+=200',
          end: 'right center-=200',
          onToggle: (self) => {
            if (self.isActive) {
              setActiveIdx(i);
            }
          },
        });

        // Unified 3D scroll timeline (Entrance -> Peak Center -> Exit)
        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            containerAnimation: tl,
            start: 'left right',   // Starts entering from right edge of screen
            end: 'right left',     // Finishes exiting at left edge of screen
            scrub: true,
          },
        });

        cardTl.fromTo(
          wrapper,
          {
            rotateY: 32,
            z: -260,
            scale: 0.86,
            opacity: 0.2,
          },
          {
            rotateY: 0,
            z: 80,
            scale: 1.04,
            opacity: 1,
            ease: 'none',
            duration: 0.5,
          }
        ).to(wrapper, {
          rotateY: -32,
          z: -260,
          scale: 0.86,
          opacity: 0.2,
          ease: 'none',
          duration: 0.5,
        });
      });

      return () => {
        tl.scrollTrigger?.kill();
      };
    });

    return () => mm.revert();
  }, [svgPath]); // Dependency on svgPath ensures timeline initializes with calculated Bezier lengths

  const activeColor = JOURNEY_DATA[activeIdx]?.color || '#7c6fff';

  return (
    <section id="journey" className={styles.section} ref={sectionRef}>
      {/* Scroll-Warp Canvas Layer */}
      <canvas ref={canvasRef} className={styles.canvasBg} />

      {/* Dynamic Background Grid and Ambient Glows */}
      <div className={styles.bgGrid} />
      <div
        className={styles.ambientGlow}
        style={{ '--glow-color': activeColor }}
      />

      {/* Desktop Horizontal Scrubbing Viewport */}
      <div className={styles.viewport}>
        {/* Top High-Tech Header */}
        <div className={styles.headerPanel}>
          <div className={styles.headerLeft}>
            <span className={styles.cyberTag}>// DEPLOYED_COGNITION: CHRONO_TRACK</span>
            <h2 className={styles.sectionTitle}>MY JOURNEY</h2>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.infoText}>SCROLL VERTICALLY TO INTERACT WITH TIMELINE</span>
          </div>
        </div>

        {/* 3D Curved Horizontal Track */}
        <div className={styles.track} ref={trackRef}>
          {/* Dynamic Bezier Wavy Path behind cards */}
          {svgPath && (
            <svg
              className={styles.timelinePath}
              width={trackWidth}
              height="300"
              viewBox={`0 0 ${trackWidth} 300`}
              preserveAspectRatio="none"
            >
              <path d={svgPath} className={styles.timelineWaveBase} />
              <path
                d={svgPath}
                ref={progressLineRef}
                className={styles.timelineWaveProgress}
                style={{ '--progress-color': activeColor }}
              />
            </svg>
          )}

          {JOURNEY_DATA.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className={styles.cardWrapper}
            >
              <JourneyCard
                item={item}
                index={i}
                activeIdx={activeIdx}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
            </div>
          ))}

          {/* Premium Next Chapter / Call to Action Card */}
          <div
            ref={(el) => (cardRefs.current[JOURNEY_DATA.length] = el)}
            className={styles.cardWrapper}
          >
            <div
              className={`${styles.card} ${styles.ctaCard} ${activeIdx === JOURNEY_DATA.length ? styles.cardActive : ''}`}
              style={{
                '--card-color': '#00ff87',
                '--card-glow': 'rgba(0, 255, 135, 0.15)',
              }}
              onMouseMove={(e) => handleMouseMove(e, JOURNEY_DATA.length)}
              onMouseLeave={() => handleMouseLeave(JOURNEY_DATA.length)}
            >
              <div className={styles.cardGrid} />
              <div className={styles.cornerTL} />
              <div className={styles.cornerTR} />
              <div className={styles.cornerBL} />
              <div className={styles.cornerBR} />
              <span className={styles.borderLabelTop}>[TARGET: SOFTWARE_ENGINEER]</span>
              <span className={styles.borderLabelBottom}>[LATENCY: 0.00ms]</span>

              <div className={styles.cardHeader}>
                <div className={styles.headerLeft}>
                  <span className={styles.cardNum}>04</span>
                  <div className={styles.titleMeta}>
                    <span className={styles.cardTag}>NEXT PHASE</span>
                    <span className={styles.cardYear}>FUTURE</span>
                  </div>
                </div>
                <div className={styles.headerRightSide}>
                  <div className={`${styles.statusBadge} ${styles.statusFuture}`}>
                    <span className={styles.statusDot} />
                    OPEN TO WORK
                  </div>
                  <div className={styles.phaseIconWrapper}>
                    {getPhaseIcon('04')}
                  </div>
                </div>
              </div>

              <div className={styles.ctaBody}>
                <h3 className={styles.ctaTitle}>The Next Chapter</h3>
                <p className={styles.ctaDesc}>
                  I am actively seeking software engineering internships, full-time opportunities, and collaborative ventures. Let's connect and build something extraordinary!
                </p>
                <a href="#contact" className={styles.ctaBtn}>
                  <span>INITIATE CONTACT</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </a>
              </div>
              <span className={styles.watermark}>??</span>
            </div>
          </div>
        </div>

        {/* Bottom Navigation HUD */}
        <div className={styles.hudPanel}>
          {/* Progress bar */}
          <div className={styles.hudProgress}>
            <div className={styles.hudTrack}>
              <div
                className={styles.hudFill}
                style={{
                  width: `${((activeIdx + 1) / (JOURNEY_DATA.length + 1)) * 100}%`,
                  background: activeColor,
                  boxShadow: `0 0 10px ${activeColor}`,
                }}
              />
            </div>
            <div className={styles.hudLabel}>
              <span style={{ color: activeColor }}>
                {(activeIdx + 1).toString().padStart(2, '0')}
              </span>
              <span className={styles.hudSep}>/</span>
              <span>{(JOURNEY_DATA.length + 1).toString().padStart(2, '0')}</span>
            </div>
          </div>

          {/* Stepper map nodes */}
          <div className={styles.hudNodes}>
            {JOURNEY_DATA.map((item, i) => (
              <button
                key={i}
                className={`${styles.hudNode} ${activeIdx === i ? styles.hudNodeActive : ''}`}
                style={{ '--node-color': item.color }}
                onClick={() => {
                  const section = sectionRef.current;
                  if (!section) return;
                  const scrollAmount = (trackRef.current.scrollWidth - window.innerWidth);
                  const progress = i / JOURNEY_DATA.length;
                  window.scrollTo({
                    top: section.offsetTop + (scrollAmount * progress),
                    behavior: 'smooth',
                  });
                }}
              >
                <span className={styles.nodeTooltip}>{item.tag}</span>
              </button>
            ))}
            <button
              className={`${styles.hudNode} ${activeIdx === JOURNEY_DATA.length ? styles.hudNodeActive : ''}`}
              style={{ '--node-color': '#00ff87' }}
              onClick={() => {
                const section = sectionRef.current;
                if (!section) return;
                window.scrollTo({
                  top: section.offsetTop + (trackRef.current.scrollWidth - window.innerWidth),
                  behavior: 'smooth',
                });
              }}
            >
              <span className={styles.nodeTooltip}>FUTURE</span>
            </button>
          </div>
        </div>
      </div>

      {/* Responsive mobile layout */}
      <div className={styles.mobileLayout}>
        <div className={styles.mobileHeader}>
          <span className={styles.cyberTag}>// DEPLOYED_COGNITION: CHRONO_TRACK</span>
          <h2 className={styles.sectionTitle}>MY JOURNEY</h2>
        </div>
        <div className={styles.mobileList}>
          {JOURNEY_DATA.map((item, i) => (
            <JourneyCard
              key={i}
              item={item}
              index={i}
              activeIdx={activeIdx}
              onMouseMove={() => {}}
              onMouseLeave={() => {}}
            />
          ))}

          {/* Mobile CTA card */}
          <div
            className={`${styles.card} ${styles.ctaCard}`}
            style={{
              '--card-color': '#00ff87',
              '--card-glow': 'rgba(0, 255, 135, 0.15)',
            }}
          >
            <div className={styles.cornerTL} />
            <div className={styles.cornerTR} />
            <div className={styles.cornerBL} />
            <div className={styles.cornerBR} />
            <div className={styles.cardHeader}>
              <div className={styles.headerLeft}>
                <span className={styles.cardNum}>04</span>
                <div className={styles.titleMeta}>
                  <span className={styles.cardTag}>NEXT PHASE</span>
                  <span className={styles.cardYear}>FUTURE</span>
                </div>
              </div>
            </div>
            <div className={styles.ctaBody}>
              <h3 className={styles.ctaTitle}>The Next Chapter</h3>
              <p className={styles.ctaDesc}>
                I am actively seeking software engineering internships, full-time opportunities, and collaborative ventures. Let's connect!
              </p>
              <a href="#contact" className={styles.ctaBtn}>
                <span>INITIATE CONTACT</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
