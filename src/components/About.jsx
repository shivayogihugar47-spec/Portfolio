import React from 'react';
import styles from './About.module.css';
import { Canvas } from "@react-three/fiber";
import { Bounds, OrbitControls } from "@react-three/drei";
import { Environment } from "@react-three/drei";
import { ContactShadows } from "@react-three/drei";
import Model from "./model";

export default function About() {
  return (
    <section id="about" className={styles.aboutPage}>
      <div className={styles.container}>
        <div className={styles.contentWrap}>
          
          {/* ── Left Side: Identity Info ── */}
          <div className={styles.textSide}>
            <div className={styles.header}>
              <span className={styles.tag}>ABOUT THE DEVELOPER</span>
              <h2 className={styles.title}>BEYOND THE <br /> CODEbase</h2>
            </div>
            
            <p className={styles.bio}>
              Hi, I’m Shivayogi, a second year Engineering student and a curious developer with a passion for creating high impact digital experiences. 
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

          {/* ── Right Side: 3D Model ── */}
          <div className={styles.imageSide}>
            <div className={styles.imageBox}>

             <Canvas camera={{ fov: 45 }}>
  
  <ambientLight intensity={1} />
  <directionalLight position={[5, 5, 5]} intensity={1.5} />
  <pointLight position={[-3, 2, 2]} intensity={2} color="#3b82f6" />
  <pointLight position={[3, -2, 2]} intensity={2} color="#f97316" />

  <Environment preset="city" />

  <Bounds fit clip observe margin={0.7}>
    <Model />
  </Bounds>

  <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={10} blur={2} />

  <OrbitControls enableZoom={false} enablePan={false} />

</Canvas>

              <div className={styles.overlayGlow} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}