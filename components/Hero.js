import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.heroBackground}></div>
            <div className={`container ${styles.heroContainer}`}>
                <h1 className={`glow-text ${styles.heroTitle}`}>
                    Create Any Project or <br />
                    <span className={styles.highlight}>Startup Idea</span> in Seconds
                </h1>
                <p className={styles.heroSubtitle}>
                    The ultimate AI-powered platform for generating business proposals,
                    project drafts, pitch decks, and detailed roadmaps instantly.
                </p>
                <div className={styles.heroButtons}>
                    <Link href="/dashboard" className="neon-button">
                        Start Creating for Free
                    </Link>
                    <Link href="/templates" className={styles.secondaryButton}>
                        View Templates
                    </Link>
                </div>
                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <h3>10k+</h3>
                        <p>Projects Generated</p>
                    </div>
                    <div className={styles.statItem}>
                        <h3>500+</h3>
                        <p>Startup Ideas</p>
                    </div>
                    <div className={styles.statItem}>
                        <h3>100%</h3>
                        <p>AI Powered</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
