"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Particles from '@/components/Particles';

export default function Home() {
  const router = useRouter();
  const [introFinished, setIntroFinished] = React.useState(false);
  const [isNavigating, setIsNavigating] = React.useState(false);

  React.useEffect(() => {
    // Intro sequence timer
    const timer = setTimeout(() => {
      setIntroFinished(true);
    }, 2800); // Intro lasts 2.8 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    if (typeof window !== 'undefined') {
      window.introSeen = true;
    }
    setIsNavigating(true);
    // Wait for animation (1.2s match CSS) before pushing route
    setTimeout(() => {
      router.push('/login');
    }, 1200);
  };

  return (
    <div className={styles.heroContainer}>

      {/* Cinematic Transition Overlay */}
      <div className={`${styles.transitionOverlay} ${isNavigating ? styles.overlayActive : ''}`} />

      {/* Intro Overlay */}
      <div className={`${styles.introOverlay} ${introFinished ? styles.introHidden : ''}`}>
        <img src="/dx-final-v2.png?v=8" alt="DX Intro" className={styles.introLogo} />
      </div>

      {/* Main Content (Reveals after intro) */}
      <div className={`${styles.mainContentWrapper} ${introFinished ? styles.contentVisible : ''} ${isNavigating ? styles.contentExit : ''}`}>

        {/* Background Particles */}
        <Particles />

        {/* Top Left Brand Anchor */}
        <div className={styles.brandCorner}>
          <img src="/dx-final-v2.png?v=8" alt="DX Brand" className={styles.cornerLogo} />
          <span className={styles.cornerText}>DraftXo</span>
        </div>

        <div className={styles.centerContent}>
          <div className={styles.logoContainer}>
            <img src="/dx-final-v2.png?v=8" alt="DX Logo" className={styles.logo} />
          </div>

          <div className={styles.titleContainer}>
            <h1 className={styles.mainTitle}>DRAFTXO</h1>
            <p className={styles.subTitle}>Create Smart Project Drafts Instantly</p>
          </div>

          <button className={styles.enterBtn} onClick={handleEnter}>
            Enter Experience
          </button>
        </div>
      </div>
    </div>
  );
}
