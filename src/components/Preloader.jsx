import React, { useEffect, useRef, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from './Preloader.module.css';

export default function Preloader({ onComplete }) {
  const dotLottieRef = useRef(null);
  const timeoutRef = useRef(null);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleDotLottieReady = (dotLottie) => {
    dotLottieRef.current = dotLottie;

    if (!dotLottie) return;

    const startPlayback = () => {
      if (typeof dotLottie.play === 'function') {
        dotLottie.play();
      }

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      // Show the animation for 2.5 seconds, then trigger the slide out
      timeoutRef.current = window.setTimeout(() => {
        setIsExiting(true);
        // Wait 1 second for the slide up animation to finish before removing from DOM
        setTimeout(() => {
          onComplete();
        }, 1000);
      }, 2500);
    };

    if (dotLottie.isLoaded || dotLottie.isReady) {
      startPlayback();
      return;
    }

    const onLoad = () => {
      startPlayback();
      dotLottie.removeEventListener('load', onLoad);
    };

    dotLottie.addEventListener('load', onLoad);
  };

  return (
    <div className={`${styles.preloader} ${isExiting ? styles.slideUp : ''}`}>
      <div className={styles.loaderCard}>
        <DotLottieReact
          src="https://lottie.host/fb1c648d-3f14-4a37-9e4e-75512ffeec53/I1D2n1khpT.lottie"
          loop={true}
          autoplay={false}
          speed={1}
          renderConfig={{
            autoResize: true,
            freezeOnOffscreen: false,
          }}
          dotLottieRefCallback={handleDotLottieReady}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
      </div>
    </div>
  );
}
