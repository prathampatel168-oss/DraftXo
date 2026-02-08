"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Sidebar.module.css';

export default function Sidebar() {
    const [user, setUser] = useState({ name: 'Guest User', initials: 'GU', plan: 'Free Plan' });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
    }, []);

    return (
        <aside className={`${styles.sidebar} glass`}>
            <div className={styles.topSection}>
                <div className={styles.logoContainer}>
                    <Link href="/" className={styles.logo}>
                        Draft<span className={styles.highlight}>Xo</span>
                    </Link>
                </div>
            </div>

            <div className={styles.userSection}>
                <div className={styles.userAvatar}>{user.initials}</div>
                <div className={styles.userInfo}>
                    <p className={styles.userName}>{user.name}</p>
                    <p className={styles.userPlan}>{user.plan}</p>
                </div>
            </div>
        </aside>
    );
}
