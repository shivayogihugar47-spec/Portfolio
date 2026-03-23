import React from 'react';
import styles from './Skills.module.css';

const SKILLS_BY_CATEGORY = [
  {
    id: "01",
    name: "FRONTEND",
    accent: "#61dafb",
    skills: [
      { name: "React", image: "/react.png" },
      { name: "JavaScript", image: "/javascript.png" },
      { name: "Tailwind CSS", image: "/tailwindcss.png" }
    ]
  },
  {
    id: "02",
    name: "BACKEND",
    accent: "#3e9333",
    skills: [
      { name: "Node.js", image: "/nodejs.png" },
      { name: "Supabase", image: "/supabase.png" },
      { name: "SQL", image: "/sql.png" }
    ]
  },
  {
    id: "03",
    name: "LANGUAGES",
    accent: "#ffde57",
    skills: [
      { name: "Python", image: "/python.png" },
      { name: "Java", image: "/java.png" },
      { name: "C++", image: "/c++.png" }
    ]
  },
  {
    id: "04",
    name: "CLOUD & TOOLS",
    accent: "#ff9900",
    skills: [
      { name: "AWS", image: "/aws.png" },
      { name: "GitHub", image: "/github.png" }
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className={styles.skillsPage}>
      <div className={styles.backgroundDecoration}>
        <div className={styles.orb1}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.topTag}>SKILL ACQUISITION</span>
          <h2 className={styles.mainTitle}>LEARNING THE <span className={styles.glowText}>CRAFT</span></h2>
        </div>

        <div className={styles.categoriesWrapper}>
          {SKILLS_BY_CATEGORY.map((cat, idx) => (
            <div key={idx} className={styles.categoryBlock}>
              <div className={styles.categoryHeader}>
                <div className={styles.numberBox}>
                  <span className={styles.catNumber}>{cat.id}</span>
                  <div className={styles.numberBg} style={{ backgroundColor: cat.accent }}></div>
                </div>
                <h3 className={styles.catName}>{cat.name}</h3>
                <div className={styles.catDivider}></div>
              </div>

              <div className={styles.skillsGrid}>
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className={styles.skillCard}>
                    <div className={styles.cardInner}>
                      <div className={styles.iconWrapper}>
                        <img src={skill.image} alt={skill.name} className={styles.skillIcon} />
                        <div className={styles.iconGlowSmall} style={{ backgroundColor: cat.accent }}></div>
                      </div>
                      <h4 className={styles.skillName}>{skill.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
