import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.branding}>
                    <Link href="/" className={styles.logo}>
                        Draft<span className={styles.highlight}>Xo</span>
                    </Link>
                    <p className={styles.tagline}>
                        Empowering the next generation of builders with AI.
                    </p>
                    <div className={styles.socials}>
                        <a href="#" className={styles.socialLink}>🐦</a>
                        <a href="#" className={styles.socialLink}>📸</a>
                        <a href="#" className={styles.socialLink}>💼</a>
                    </div>
                </div>

                <div className={styles.links}>
                    <div className={styles.column}>
                        <h4>Product</h4>
                        <Link href="/tools">Tools</Link>
                        <Link href="/templates">Templates</Link>
                        <Link href="/pricing">Pricing</Link>
                    </div>
                    <div className={styles.column}>
                        <h4>Company</h4>
                        <Link href="/about">About Us</Link>
                        <Link href="/careers">Careers</Link>
                        <Link href="/blog">Blog</Link>
                    </div>
                    <div className={styles.column}>
                        <h4>Legal</h4>
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
            <div className={styles.copyright}>
                &copy; {new Date().getFullYear()} DraftXo Inc. All rights reserved.
            </div>
        </footer>
    );
}
