import React, { useEffect, useState } from 'react';
import styles from './WorkspaceLoading.module.css';

const WorkspaceLoading = ({ onComplete }) => {
    const [status, setStatus] = useState('Initializing Core...');

    useEffect(() => {
        const steps = [
            { msg: 'Initializing Core...', time: 500 },
            { msg: 'Loading Assets...', time: 1000 },
            { msg: 'Connecting AI Agents...', time: 1800 },
            { msg: 'Preparing Workspace...', time: 2500 }
        ];

        steps.forEach(step => {
            setTimeout(() => setStatus(step.msg), step.time);
        });

        const timer = setTimeout(() => {
            if (onComplete) onComplete();
        }, 3500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className={styles.container}>
            <div className={styles.flowerContainer}>
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                    <div
                        key={i}
                        className={styles.petal}
                        style={{ '--r': `${deg}deg` }}
                    ></div>
                ))}
                <div className={styles.flowerCenter}></div>
            </div>

            <h1 className={styles.welcomeText}>WELCOME</h1>

            <div className={styles.statusWrapper}>
                <h2 className={styles.status}>{status}</h2>
                <div className={styles.progressBar}>
                    <div className={styles.progressFill}></div>
                </div>
            </div>
        </div>
    );
};

export default WorkspaceLoading;
