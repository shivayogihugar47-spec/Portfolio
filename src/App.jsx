import { useState, useLayoutEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Work from './components/Work';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Preloader from './components/Preloader';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    if (!loading) {
      const sections = gsap.utils.toArray('section').slice(1); // Skip Hero

      sections.forEach((section) => {
        // ── 1. Mature, graceful text reveal ──
        // Only target basic texts without splitting words or adding rotation
        const texts = section.querySelectorAll('h2, h3, h4, p, span[class*="tag"]');
        if (texts.length > 0) {
          gsap.fromTo(texts,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        }

        // ── 2. Professional, clean skill card reveal ──
        // Removed elastic bounce and 3D rotation. Just a minimal fade up.
        const skillCards = section.querySelectorAll('[class*="skillCard"]');
        if (skillCards.length > 0) {
          gsap.fromTo(skillCards,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.05,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                toggleActions: "play none none none"
              }
            }
          );
        }

        // ── 3. Journey timeline and items (Smooth and minimal) ──
        // Removed the complex blur and side-unmasking. 
        const timelineLine = section.querySelector('[class*="timelineLine"]');
        const journeyCards = section.querySelectorAll('[class*="timelineItem"]');

        if (timelineLine) {
          gsap.fromTo(timelineLine,
            { scaleY: 0, transformOrigin: "top center" },
            {
              scaleY: 1,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 70%",
                toggleActions: "play none none none"
              }
            }
          );
        }

        if (journeyCards.length > 0) {
          gsap.fromTo(journeyCards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 65%",
                toggleActions: "play none none none"
              }
            }
          );
        }

        // ── 4. Subtle Image Reveal ──
        // Removed continuous floating & intense blur. Just a soft presence.
        const images = section.querySelectorAll('img:not([class*="skillIcon"])');
        if (images.length > 0) {
          gsap.fromTo(images,
            { opacity: 0, scale: 1.05 },
            {
              opacity: 1,
              scale: 1,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
              }
            }
          );
        }
      });
    }
  }, [loading]);

  if (loading) {
    return <Preloader onComplete={() => setLoading(false)} />;
  }

  return (
    <main className="app-main">
      <Navbar />
      <Hero />
      <div style={{ position: 'relative', background: '#09090f', zIndex: 1 }}>
        <About />
        <Skills />
        <Work />
        <Journey />
        <Contact />
      </div>
    </main>
  );
}

export default App;
