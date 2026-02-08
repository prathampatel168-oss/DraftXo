import Navbar from '@/components/Navbar';
import Link from 'next/link';
import styles from './page.module.css';

export default function Pricing() {
    return (
        <main className={styles.main}>
            <Navbar />
            <div className={`container ${styles.container}`}>
                <h1 className={`glow-text ${styles.title}`}>Choose Your Plan</h1>
                <p className={styles.subtitle}>Unlock the full power of AI for your projects.</p>

                <div className={styles.grid}>
                    {/* Free Tier */}
                    <div className={`${styles.card} glass`}>
                        <h3 className={styles.planName}>Starter</h3>
                        <div className={styles.price}>$0<span>/mo</span></div>
                        <ul className={styles.features}>
                            <li>3 Projects / Month</li>
                            <li>Basic AI Models</li>
                            <li>Standard Templates</li>
                            <li>Community Support</li>
                        </ul>
                        <Link href="/login" className={styles.planBtn}>Get Started</Link>
                    </div>

                    {/* Pro Tier (Highlighted) */}
                    <div className={`${styles.card} ${styles.proCard} glass`}>
                        <div className={styles.badge}>Most Popular</div>
                        <h3 className={styles.planName}>Pro</h3>
                        <div className={styles.price}>$29<span>/mo</span></div>
                        <ul className={styles.features}>
                            <li>Unlimited Projects</li>
                            <li>Advanced AI (GPT-4)</li>
                            <li>All Premium Templates</li>
                            <li>Priority Support</li>
                            <li>Export to PDF/Word</li>
                        </ul>
                        <Link href="/login" className={`neon-button ${styles.planBtn}`}>Upgrade to Pro</Link>
                    </div>

                    {/* Business Tier */}
                    <div className={`${styles.card} glass`}>
                        <h3 className={styles.planName}>Business</h3>
                        <div className={styles.price}>$99<span>/mo</span></div>
                        <ul className={styles.features}>
                            <li>Team Collaboration</li>
                            <li>Custom AI Agents</li>
                            <li>API Access</li>
                            <li>Dedicated Account Manager</li>
                            <li>White-label Export</li>
                        </ul>
                        <Link href="/login" className={styles.planBtn}>Contact Sales</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
