import React, { useState, useEffect, useRef } from 'react';
import styles from './Preloader.module.css';

const LOG_MESSAGES = [
  { t: 'ok',   m: 'npm install → 847 packages resolved' },
  { t: 'ok',   m: 'webpack :: bundling entry point...' },
  { t: 'warn', m: 'ESLint :: 3 warnings in App.jsx' },
  { t: 'ok',   m: 'TypeScript :: type check passed ✓' },
  { t: 'ok',   m: 'Vite :: HMR connected on port 5173' },
  { t: 'err',  m: 'jest :: 1 snapshot test failed' },
  { t: 'ok',   m: 'git commit -m "feat: init project"' },
  { t: 'ok',   m: 'Docker :: container shivayogi/app built' },
  { t: 'warn', m: 'Lighthouse :: performance score 74' },
  { t: 'ok',   m: 'CI pipeline :: all checks passing' },
  { t: 'ok',   m: 'GraphQL :: schema introspection done' },
  { t: 'ok',   m: 'Prisma :: migrations applied (3)' },
  { t: 'ok',   m: 'Redis :: cache layer initialized' },
  { t: 'warn', m: 'bundle size :: 2.1MB (target <1MB)' },
  { t: 'ok',   m: 'env vars :: 12 variables loaded' },
  { t: 'ok',   m: 'Tailwind :: JIT build complete' },
  { t: 'ok',   m: 'API :: /health → 200 OK (12ms)' },
  { t: 'ok',   m: 'PWA :: service worker registered' },
  { t: 'err',  m: 'CORS :: origin blocked, patching...' },
  { t: 'ok',   m: 'deploy → Vercel :: production live 🚀' },
];

const STATUS_PHRASES = [
  'installing dependencies...',
  'compiling source files...',
  'running type checks...',
  'bundling modules...',
  'running test suite...',
  'optimizing assets...',
  'connecting services...',
  'deploying to cloud...',
  'warming up cache...',
  'app ready.',
];

const BOOT_TITLES = [
  'BOOTSTRAPPING...',
  'RESOLVING_PACKAGES',
  'COMPILING_TYPESCRIPT',
  'BUNDLING_MODULES',
  'RUNNING_TESTS',
  'LINTING_CODEBASE',
  'BUILDING_DOCKER_IMAGE',
  'PUSHING_TO_REGISTRY',
  'DEPLOYING_TO_PROD',
  'LAUNCH_COMPLETE 🚀',
];

const FILE_TREE = [
  'src/components/Button.tsx',
  'src/hooks/useAuth.ts',
  'src/pages/Dashboard.jsx',
  'src/utils/api.ts',
  'src/store/slices/user.ts',
  'prisma/schema.prisma',
  'docker-compose.yml',
  'src/styles/globals.css',
  'tests/unit/auth.test.ts',
  'src/lib/db.ts',
];

const TECH_STACK = ['React', 'TypeScript', 'Node.js', 'Prisma', 'Redis', 'Docker', 'Vite', 'Tailwind'];

const HEX_COUNT = 64;

function randomChar() {
  return Math.random() > 0.5 ? '1' : '0';
}

function fileIcon(f) {
  if (f.endsWith('.ts') || f.endsWith('.tsx')) return '⬡';
  if (f.endsWith('.css')) return '◈';
  if (f.endsWith('.yml') || f.endsWith('.prisma')) return '⚙';
  return '◻';
}

export default function Preloader({ onComplete }) {
  const [progress, setProgress]       = useState(0);
  const [logs, setLogs]               = useState([]);
  const [bits, setBits]               = useState(() =>
    Array.from({ length: HEX_COUNT }, () => ({ val: randomChar(), lit: false }))
  );
  const [cpu, setCpu]                 = useState(0);
  const [mem, setMem]                 = useState(0);
  const [currentFile, setCurrentFile] = useState(FILE_TREE[0]);
  const [clock, setClock]             = useState('--:--:--');
  const [activeStack, setActiveStack] = useState([]);
  const canvasRef                     = useRef(null);
  const dropsRef                      = useRef([]);
  const logBodyRef                    = useRef(null);

  // ── Code rain canvas ──────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const CHARS = 'const export default import function return async await useState useEffect interface type <>{}[]();=>';

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const cols = Math.floor(canvas.width / 16);
      dropsRef.current = Array.from({ length: cols }, () => Math.random() * -60);
    }

    resize();
    window.addEventListener('resize', resize);

    const frame = setInterval(() => {
      ctx.fillStyle = 'rgba(6,8,20,0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '13px Fira Code, monospace';
      dropsRef.current.forEach((y, i) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const bright = Math.random();
        ctx.fillStyle = bright > 0.97 ? '#fff' : bright > 0.8 ? '#7dd3fc' : '#1e40af33';
        ctx.fillText(char, i * 16, y * 16);
        if (y * 16 > canvas.height && Math.random() > 0.97) dropsRef.current[i] = 0;
        dropsRef.current[i] += 0.5;
      });
    }, 40);

    return () => { clearInterval(frame); window.removeEventListener('resize', resize); };
  }, []);

  // ── Clock ─────────────────────────────────────────────────────
  useEffect(() => {
    const t = setInterval(() => setClock(new Date().toLocaleTimeString('en-GB')), 1000);
    return () => clearInterval(t);
  }, []);

  // ── Progress ──────────────────────────────────────────────────
  useEffect(() => {
    const t = setInterval(() => {
      setProgress(prev => {
        const next = Math.min(100, prev + Math.random() * 1.4 + 0.4);
        if (next >= 100) { clearInterval(t); setTimeout(onComplete, 1400); }
        return next;
      });
    }, 40);
    return () => clearInterval(t);
  }, [onComplete]);

  // ── Sys stats ─────────────────────────────────────────────────
  useEffect(() => {
    const t = setInterval(() => {
      const p = Math.floor(progress);
      setCpu(Math.min(100, Math.floor(p * 0.85 + Math.random() * 14)));
      setMem(Math.min(100, Math.floor(p * 0.6  + Math.random() * 18)));
      setCurrentFile(FILE_TREE[Math.floor(Math.random() * FILE_TREE.length)]);
    }, 220);
    return () => clearInterval(t);
  }, [progress]);

  // ── Tech stack pulse ──────────────────────────────────────────
  useEffect(() => {
    const t = setInterval(() => {
      const pick = TECH_STACK[Math.floor(Math.random() * TECH_STACK.length)];
      setActiveStack(prev => [...prev.slice(-2), pick]);
    }, 600);
    return () => clearInterval(t);
  }, []);

  // ── Logs ──────────────────────────────────────────────────────
  useEffect(() => {
    const t = setInterval(() => {
      const entry = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
      setLogs(prev => [
        ...prev.slice(-13),
        { ...entry, time: new Date().toLocaleTimeString('en-GB'), id: Date.now() + Math.random() },
      ]);
    }, 260 + Math.random() * 320);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (logBodyRef.current) logBodyRef.current.scrollTop = logBodyRef.current.scrollHeight;
  }, [logs]);

  // ── Binary flicker ────────────────────────────────────────────
  useEffect(() => {
    const t = setInterval(() => {
      const indices = Array.from({ length: Math.floor(Math.random() * 10) + 4 }, () =>
        Math.floor(Math.random() * HEX_COUNT)
      );
      setBits(prev => {
        const next = [...prev];
        indices.forEach(i => { next[i] = { val: randomChar(), lit: true }; });
        return next;
      });
      setTimeout(() => setBits(prev => prev.map(b => b.lit ? { ...b, lit: false } : b)), 150);
    }, 90);
    return () => clearInterval(t);
  }, []);

  const p         = Math.floor(progress);
  const statusIdx = Math.floor((p / 100) * (STATUS_PHRASES.length - 1));
  const titleIdx  = Math.floor((p / 100) * (BOOT_TITLES.length - 1));

  return (
    <div className={styles.preloader}>
      <canvas ref={canvasRef} className={styles.matrixCanvas} />

      <div className={styles.loaderWrap}>

        {/* ── Top Bar ── */}
        <div className={styles.topBar}>
          <div className={styles.topLeft}>
            <span className={styles.dot} style={{ background: '#ef4444' }} />
            <span className={styles.dot} style={{ background: '#f59e0b' }} />
            <span className={styles.dot} style={{ background: '#22c55e' }} />
            <span className={styles.topTitle}>shivayogi@dev <span className={styles.topPath}>~/project</span> <span className={styles.topBranch}>⎇ main</span></span>
          </div>
          <span className={styles.topRight}>{clock}</span>
        </div>

        {/* ── Left: Explorer + Stack ── */}
        <div className={styles.leftPanel}>
          <div className={styles.panelTitle}>EXPLORER</div>
          <div className={styles.fileTree}>
            {FILE_TREE.slice(0, 8).map((f, i) => (
              <div key={i} className={`${styles.fileRow} ${f === currentFile ? styles.activeFile : ''}`}>
                <span className={styles.fileIcon}>{fileIcon(f)}</span>
                <span className={styles.fileName}>{f.split('/').pop()}</span>
                {f === currentFile && <span className={styles.filePing} />}
              </div>
            ))}
          </div>

          <div className={styles.panelTitle} style={{ marginTop: '4px' }}>STACK</div>
          <div className={styles.stackGrid}>
            {TECH_STACK.map(tech => (
              <div key={tech} className={`${styles.stackBadge} ${activeStack.includes(tech) ? styles.stackActive : ''}`}>
                {tech}
              </div>
            ))}
          </div>

          <div className={styles.sysStats}>
            <div className={styles.statRow}><span>CPU</span><span>{cpu}%</span></div>
            <div className={styles.miniBarWrap}><div className={styles.miniBar} style={{ width: `${cpu}%` }} /></div>
            <div className={styles.statRow}><span>RAM</span><span>{mem}%</span></div>
            <div className={styles.miniBarWrap}><div className={styles.miniBar} style={{ width: `${mem}%` }} /></div>
          </div>
        </div>

        {/* ── Center ── */}
        <div className={styles.centerPanel}>
          <div className={styles.bitGrid}>
            {bits.map((b, i) => (
              <span key={i} className={`${styles.bit} ${b.lit ? styles.bitLit : ''}`}>{b.val}</span>
            ))}
          </div>

          <div className={styles.orbitContainer}>
            <div className={styles.ring1} />
            <div className={styles.ring2} />
            <div className={styles.ring3} />
            <div className={styles.centerCore}>
              <span className={styles.pctVal}>{p}</span>
              <span className={styles.pctLabel}>BUILD</span>
            </div>
          </div>

          <h2 className={styles.bootTitle}>{BOOT_TITLES[titleIdx]}</h2>

          <div className={styles.termLine}>
            <span className={styles.prompt}>~/app $</span>
            <span className={styles.cmd}> {STATUS_PHRASES[statusIdx]}</span>
            <span className={styles.cursor}>▌</span>
          </div>

          <div className={styles.mainBarOuter}>
            <div className={styles.mainBarFill} style={{ width: `${p}%` }}>
              <div className={styles.barCursor} />
            </div>
          </div>

          <div className={styles.barTicks}>
            {['0%', '25%', '50%', '75%', '100%'].map(t => (
              <span key={t} className={styles.barTick}>{t}</span>
            ))}
          </div>

          <div className={styles.compilingFile}>
            <span className={styles.compileLabel}>compiling</span>
            <span className={styles.compileFile}>{currentFile}</span>
          </div>
        </div>

        {/* ── Right: Terminal ── */}
        <div className={styles.rightPanel}>
          <div className={styles.panelTitle}>TERMINAL</div>
          <div className={styles.logBody} ref={logBodyRef}>
            {logs.map(entry => (
              <div key={entry.id} className={`${styles.logEntry} ${styles[entry.t]}`}>
                <span className={styles.logTs}>{entry.time}</span>
                <span className={styles.logMsg}>{entry.m}</span>
              </div>
            ))}
            <div className={styles.cursorBlink}>█</div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className={styles.bottomBar}>
          <span className={styles.btag}>⎇ main · 0 errors · 3 warnings</span>
          <span className={styles.btag}>Node v20.11 · TypeScript 5.3</span>
          <span className={styles.btag}>UTF-8 · LF · TSX</span>
        </div>

      </div>
    </div>
  );
}