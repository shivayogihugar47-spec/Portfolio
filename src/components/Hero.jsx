import { useState } from 'react';
import styles from './Hero.module.css';

const SIDEBAR_SOCIALS = [
  { id: 'github',   icon: 'github',   href: 'https://github.com/shivayogihugar47-spec' },
  { id: 'linkedin', icon: 'link',     href: 'https://www.linkedin.com/in/shivayogi-hugar/' },
  { id: 'twitter',  icon: 'twitter',  href: '#' },
  { id: 'email',    icon: 'email',    href: 'mailto:[shivayogihugar47@gmail.com]' },
];

function GithubIcon()   { return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>; }
function LinkIcon()     { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>; }
function TwitterIcon()  { return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.733-8.835L1.254 2.25H8.08l4.264 5.634 5.9-5.634zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>; }
function EmailIcon()    { return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 8.67l8.92 5.34a2.25 2.25 0 002.34 0l8.92-5.34a2.25 2.25 0 00.32-3.83 2.25 2.25 0 00-2.66-.08L12 10.12l-7.34-5.36a2.25 2.25 0 00-2.66.08 2.25 2.25 0 00.32 3.83z" /><path d="M22.5 12.75l-8.49 5.09a4.5 4.5 0 01-4.02 0L1.5 12.75v6.75A2.25 2.25 0 003.75 21.75h16.5a2.25 2.25 0 002.25-2.25v-6.75z" /></svg>; }

const ICON_MAP = { github: GithubIcon, link: LinkIcon, twitter: TwitterIcon, email: EmailIcon };

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      
      {/* ── Background ── */}
      <div className={styles.bg} />

      {/* ── Portrait (Front) ── */}
      <img
        src="/myimage5.png"
        alt="Shivayogi"
        className={styles.photo}
      />

      {/* ── Left Identity (Name & Profession) ── */}
      <div className={styles.leftInfo}>
        <h1 className={styles.mainName}>SHIVAYOGI</h1>
        <div className={styles.professionWrapper}>
          <span className={styles.profession}>
            FULLSTACK DEVELOPER
          </span>
        </div>
      </div>

      {/* ── Visual Overlays ── */}
      <div className={styles.overlay} />
      <div className={styles.fadeBottom} />

      {/* ── Floating Sidebar Socials ── */}
      <aside className={styles.floatingSidebar}>
        {SIDEBAR_SOCIALS.map(s => {
          const Icon = ICON_MAP[s.icon];
          return (
            <a key={s.id} href={s.href} className={styles.sideIcon}>
              <Icon />
            </a>
          );
        })}
      </aside>

    </section>
  );
}