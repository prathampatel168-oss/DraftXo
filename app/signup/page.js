import Link from 'next/link';
import styles from '../login/page.module.css'; // Reuse login styles

export default function Signup() {
    return (
        <main className={styles.main}>
            <div className={`${styles.loginCard} glass`}>
                <Link href="/" className={styles.logo}>
                    Draft<span className={styles.highlight}>Xo</span>
                </Link>
                <h2 className={styles.title}>Create Account</h2>
                <p className={styles.subtitle}>Start building your empire today</p>

                <form className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>Full Name</label>
                        <input type="text" placeholder="John Doe" className={styles.input} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Email Address</label>
                        <input type="email" placeholder="name@company.com" className={styles.input} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <input type="password" placeholder="••••••••" className={styles.input} />
                    </div>
                    <button type="button" className={`neon-button ${styles.submitBtn}`}>Sign Up Free</button>
                </form>

                <div className={styles.divider}>OR</div>

                <button className={styles.socialBtn}>
                    <span>G</span> Sign up with Google
                </button>

                <p className={styles.footerText}>
                    Already have an account? <Link href="/login" className={styles.link}>Sign in</Link>
                </p>
            </div>
        </main>
    );
}
