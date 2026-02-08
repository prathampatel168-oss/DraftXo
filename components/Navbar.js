import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContainer}`}>
                <Link href="/" className={styles.logo}>
                    Draft<span className={styles.highlight}>Xo</span>
                </Link>
                <ul className={styles.navLinks}>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/tools">Tools</Link></li>
                    <li><Link href="/templates">Templates</Link></li>
                    <li><Link href="/pricing">Pricing</Link></li>
                </ul>
                <div className={styles.authButtons}>
                    <Link href="/login" className={styles.loginBtn}>Login</Link>
                    <Link href="/signup" className={`neon-button ${styles.signupBtn}`}>Sign Up</Link>
                    <Link href="/dashboard" className={styles.dashboardBtn}>Dashboard</Link>
                </div>
            </div>
        </nav>
    );
}
