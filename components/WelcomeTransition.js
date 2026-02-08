import React, { useEffect, useState } from 'react';
import styles from './WelcomeTransition.module.css';

const WelcomeTransition = ({ onComplete }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            if (onComplete) onComplete();
        }, 3000); // 3 seconds total duration

        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!show) return null;

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.logoWrapper}>
                    {/* Reusing the logo or a simplified version */}
                    <div className={styles.logoCircle}></div>
                    <div className={styles.logoPulse}></div>
                </div>
                <h1 className={styles.title}>
                    Welcome to <span className={styles.highlight}>DraftXo</span>
                </h1>
                <div className={styles.loadingBar}>
                    <div className={styles.progress}></div>
                </div>
            </div>
            <div className={styles.particles}>
                {[...Array(20)].map((_, i) => (
                    <div key={i} className={styles.particle} style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`
                    }} />
                ))}
            </div>
        </div>
    );
};

export default WelcomeTransition;
