import React, { useEffect, useRef } from 'react';
import styles from './Work.module.css';

const LETTERS = ['C','O','M','I','N','G','S','O','O','N'];

export default function Work() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [], raf;

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function spawn() {
      return {
        x: Math.random() * W,
        y: H + 10,
        vy: -(Math.random() * 0.6 + 0.3),
        vx: (Math.random() - 0.5) * 0.4,
        life: 1,
        decay: Math.random() * 0.003 + 0.002,
        size: Math.random() * 1.5 + 0.5,
        hue: 240 + Math.random() * 50,
      };
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);
      if (particles.length < 120 && Math.random() > 0.3) particles.push(spawn());
      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => {
        p.x  += p.vx;
        p.y  += p.vy;
        p.life -= p.decay;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.life * 0.6})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener('resize', resize);
    frame();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section id="work" className={styles.workPage}>
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Subtle grid */}
      <div className={styles.grid} />

      <div className={styles.container}>

        {/* Section label */}
        <p className={styles.label}>// projects</p>

        {/* Giant glitching text */}
        <div className={styles.bigWrap}>
          <div className={styles.bigRow}>
            {'COMING'.split('').map((l, i) => (
              <span key={i} className={styles.bigLetter} style={{ '--i': i }}>{l}</span>
            ))}
          </div>
          <div className={styles.bigRow}>
            {'SOON'.split('').map((l, i) => (
              <span key={i} className={`${styles.bigLetter} ${styles.bigLetterAccent}`} style={{ '--i': i + 6 }}>{l}</span>
            ))}
          </div>
        </div>

        {/* Orbit loader */}
        <div className={styles.orbitWrap}>
          <div className={styles.orbit1} />
          <div className={styles.orbit2} />
          <div className={styles.orbitCore}>
            <span className={styles.orbitLabel}>IN DEV</span>
          </div>
        </div>

        {/* Sub message */}
        <div className={styles.sub}>
          <span className={styles.subLine} />
          <p className={styles.subText}>Crafting something extraordinary. Check back soon.</p>
          <span className={styles.subLine} />
        </div>

        {/* Ticker */}
        <div className={styles.ticker}>
          <div className={styles.tickerInner}>
            {Array(6).fill('WORK IN PROGRESS · SHIVAYOGI · BUILDING · STAY TUNED · ').map((t, i) => (
              <span key={i} className={styles.tickerItem}>{t}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}