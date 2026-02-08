import Navbar from '@/components/Navbar';
import Link from 'next/link';
import styles from './page.module.css';

const templates = [
    { id: 1, title: 'Startup Idea Generator', category: 'Business', icon: '💡', description: 'Generate unique startup ideas based on market trends.' },
    { id: 2, title: 'SaaS Architecture Planner', category: 'Engineering', icon: '🏗️', description: 'Plan the tech stack and database schema for your SaaS.' },
    { id: 3, title: 'Marketing Campaign Strategy', category: 'Marketing', icon: '📢', description: 'Create a comprehensive marketing plan with ROI analysis.' },
    { id: 4, title: 'Investor Pitch Deck', category: 'Finance', icon: '📊', description: 'Structure a winning pitch deck for VCs.' },
    { id: 5, title: 'Research Paper Outline', category: 'Academic', icon: '🎓', description: 'Draft a structured outline for your thesis or paper.' },
    { id: 6, title: 'E-commerce Launch Plan', category: 'Business', icon: '🛍️', description: 'Step-by-step guide to launching your online store.' },
];

export default function Templates() {
    return (
        <main className={styles.main}>
            <Navbar />
            <div className={`container ${styles.container}`}>
                <h1 className={`glow-text ${styles.title}`}>Explore Templates</h1>
                <p className={styles.subtitle}>Start with a pre-built workflow to fast-track your project.</p>

                <div className={styles.grid}>
                    {templates.map((template) => (
                        <div key={template.id} className={`${styles.card} glass`}>
                            <div className={styles.iconWrapper}>{template.icon}</div>
                            <h3 className={styles.cardTitle}>{template.title}</h3>
                            <span className={styles.category}>{template.category}</span>
                            <p className={styles.description}>{template.description}</p>
                            <Link href="/dashboard" className={`neon-button ${styles.useBtn}`}>
                                Use Template
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
