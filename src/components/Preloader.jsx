import React, { useEffect, useRef, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from './Preloader.module.css';

const HOLD_MS = 1550;
const EXIT_MS = 620;

export default function Preloader({ onComplete }) {
  const timeoutRef = useRef(null);
  const exitTimeoutRef = useRef(null);
  const dotLottieRef = useRef(null);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    timeoutRef.current = window.setTimeout(() => {
      setIsExiting(true);
      exitTimeoutRef.current = window.setTimeout(onComplete, EXIT_MS);
    }, HOLD_MS);

    return () => {
      window.clearTimeout(timeoutRef.current);
      window.clearTimeout(exitTimeoutRef.current);
    };
  }, [onComplete]);

  const handleDotLottieReady = (dotLottie) => {
    dotLottieRef.current = dotLottie;

    if (dotLottie && typeof dotLottie.play === 'function') {
      dotLottie.play();
    }
  };

  return (
    <div className={`${styles.preloader} ${isExiting ? styles.slideUp : ''}`}>
      <div className={styles.loaderCard}>
        <DotLottieReact
          src="https://lottie.host/fb1c648d-3f14-4a37-9e4e-75512ffeec53/I1D2n1khpT.lottie"
          loop
          autoplay
          speed={1.25}
          renderConfig={{
            autoResize: true,
            freezeOnOffscreen: true,
          }}
          dotLottieRefCallback={handleDotLottieReady}
          className={styles.lottie}
        />
      </div>
    </div>
  );
}
