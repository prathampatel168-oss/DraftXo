"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import WelcomeTransition from '@/components/WelcomeTransition';

export default function Login() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showWelcome, setShowWelcome] = useState(false);

    React.useEffect(() => {
        // Enforce Intro: Check if user came from intro page
        if (typeof window !== 'undefined' && !window.introSeen) {
            router.push('/');
        }
    }, [router]);

    const handleLogin = () => {
        setError('');
        setIsLoading(true);

        const validPass = 'hehehe';

        // Check if password matches (case-insensitive) and email is not empty
        if (email.trim() !== '' && password.toLowerCase() === validPass) {
            // Simulate Authenticating...
            setTimeout(() => {
                // Save Mock User Session with entered name
                if (typeof window !== 'undefined') {
                    const userName = email.split('@')[0].toUpperCase();
                    localStorage.setItem('user', JSON.stringify({
                        name: userName, // Use entered name
                        email: email,
                        initials: userName.substring(0, 2).toUpperCase(),
                        plan: 'Pro Plan'
                    }));
                }
                // Show Welcome Transition
                setIsLoading(false);
                setShowWelcome(true);
            }, 1000);
        } else {
            setIsLoading(false);

            const insults = [
                "NICE TRY! 😂",
                "WHO ARE YOU? 🤨",
                "ACCESS DENIED! 🚫",
                "ARE YOU LOST? 🗺️",
                "NOPE! TRY HARDER 🤪",
                "PASSWORD PROTECTION ACTIVATED 🛡️",
                "SERIOUSLY? 🤦‍♂️",
                "IS THAT ALL YOU GOT? 💪",
                "ERROR 404: BRAIN NOT FOUND 🧠",
                "TRY AGAIN, NOOB 🎮",
                "MY GRANDMA TYPES BETTER 👵",
                "HACKER DETECTED... JUST KIDDING 🤡",
                "WRONG! DO IT AGAIN 😤",
                "DON'T QUIT YOUR DAY JOB 💼",
                "SECURITY LEVEL: IMPOSSIBLE 🚧"
            ];

            const emojis = ["🫵 😂", "🫣", "🤡", "☠️", "🤪", "👀", "🚫", "🙅‍♂️", "🥜", "🦄", "🌵", "👻"];

            const randomInsult = insults[Math.floor(Math.random() * insults.length)];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

            setError({ emoji: randomEmoji, text: randomInsult });
        }
    };

    const handleWelcomeComplete = () => {
        router.push('/onboarding');
    };

    return (
        <main className={styles.main}>
            {showWelcome && <WelcomeTransition onComplete={handleWelcomeComplete} />}

            <button className={styles.backBtn} onClick={() => router.push('/')}>
                ← Back
            </button>

            <div className={styles.loginCard}>
                <div className={styles.logoWrapper}>
                    <img src="/dx-final-v2.png?v=8" alt="DraftXo Logo" className={styles.logo} />
                </div>

                <h2 className={styles.title}>Access Terminal</h2>
                <p className={styles.subtitle}>Enter authorized credentials to proceed</p>

                <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <div className={styles.inputGroup}>
                        <label>USER ID</label>
                        <input
                            type="text"
                            placeholder="Ex: PRATHAM"
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>ACCESS CODE</label>
                        <input
                            type="password"
                            placeholder="Ex: HEHEHE"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className={styles.submitBtn}>
                        {isLoading ? "Verifying..." : "Enter System"}
                    </button>
                </form>

                <p className={styles.footerText}>
                    Restricted Area | Authorized Personnel Only
                </p>
            </div>

            {/* Mock Error Modal Popup */}
            {error && (
                <div className={`${styles.errorModal} glass`}>
                    <div className={styles.modalContent}>
                        <div className={styles.mockEmoji}>{error.emoji}</div>
                        <h2 className={styles.mockTitle}>{error.text}</h2>
                        <button
                            className={styles.tryAgainBtn}
                            onClick={() => setError('')}
                        >
                            TRY AGAIN 🥺
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
