"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Onboarding() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState(null);
    const [isExiting, setIsExiting] = useState(false);

    const roles = [
        { id: 'student', icon: '🎓', label: 'Student', desc: 'Notes, Thesis & Study Plans' },
        { id: 'developer', icon: '💻', label: 'Developer', desc: 'Architecture & Docs' },
        { id: 'creative', icon: '🎨', label: 'Creative', desc: 'Storyboarding & Brainstorming' },
        { id: 'business', icon: '💼', label: 'Business', desc: 'Strategy & Meetings' }
    ];

    const handleContinue = () => {
        if (!selectedRole) return;

        if (typeof window !== 'undefined') {
            localStorage.setItem('draftxo_role', selectedRole);
        }

        setIsExiting(true);
        setTimeout(() => {
            router.push('/selection');
        }, 800);
    };

    return (
        <main className={`${styles.main} ${isExiting ? styles.exit : ''}`}>
            <div className={styles.background}>
                <div className={styles.glow}></div>
            </div>

            <button className={styles.backBtn} onClick={() => router.back()}>
                ← Back
            </button>

            <div className={styles.content}>
                <h1 className={styles.title}>Let's calibrate your experience</h1>
                <p className={styles.subtitle}>Tell us how you plan to use DraftXo</p>

                <div className={styles.grid}>
                    {roles.map((role) => (
                        <div
                            key={role.id}
                            className={`${styles.card} ${selectedRole === role.id ? styles.selected : ''}`}
                            onClick={() => setSelectedRole(role.id)}
                        >
                            <div className={styles.icon}>{role.icon}</div>
                            <h3 className={styles.label}>{role.label}</h3>
                            <p className={styles.desc}>{role.desc}</p>
                            {selectedRole === role.id && <div className={styles.check}>✓</div>}
                        </div>
                    ))}
                </div>

                <button
                    className={`${styles.continueBtn} ${selectedRole ? styles.active : ''}`}
                    onClick={handleContinue}
                    disabled={!selectedRole}
                >
                    Continue
                </button>
            </div>
        </main>
    );
}
