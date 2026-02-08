import Navbar from '@/components/Navbar';
import Link from 'next/link';
import styles from '../templates/page.module.css'; // Reuse templates styles

const tools = [
    { id: 1, title: 'AI Project Generator', category: 'Core', icon: '🚀', description: 'Generate complete project drafts from a single prompt.' },
    { id: 2, title: 'Smart Chat Agent', category: 'Assistant', icon: '💬', description: 'Conversational agent with context memory.' },
    { id: 3, title: 'Market Researcher', category: 'Analysis', icon: '🔍', description: 'Deep dive into market trends and competitors.' },
    { id: 4, title: 'Financial Modeler', category: 'Finance', icon: '💸', description: 'Create revenue projections and budget plans.' },
    { id: 5, title: 'Pitch Deck Creator', category: 'Presentation', icon: '📊', description: 'Auto-generate slide decks for investors.' },
    { id: 6, title: 'Code Architect', category: 'Dev', icon: '💻', description: 'Plan software architecture and tech stacks.' },
];

export default function Tools() {
    return (
        <main className={styles.main}>
            <Navbar />
            <div className={`container ${styles.container}`}>
                <h1 className={`glow-text ${styles.title}`}>AI Tools Suite</h1>
                <p className={styles.subtitle}>Powerful agents to automate your workflow.</p>

                <div className={styles.grid}>
                    {tools.map((tool) => (
                        <div key={tool.id} className={`${styles.card} glass`}>
                            <div className={styles.iconWrapper}>{tool.icon}</div>
                            <h3 className={styles.cardTitle}>{tool.title}</h3>
                            <span className={styles.category}>{tool.category}</span>
                            <p className={styles.description}>{tool.description}</p>
                            <Link href="/dashboard" className={`neon-button ${styles.useBtn}`}>
                                Try Tool
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
