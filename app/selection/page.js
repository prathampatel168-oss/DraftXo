"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import WorkspaceLoading from '@/components/WorkspaceLoading';

export default function ProjectSelection() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [showNewProjectModal, setShowNewProjectModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [projectName, setProjectName] = useState('');

    const handleNewProjectClick = () => {
        setShowNewProjectModal(true);
    };

    const handleStartProject = () => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('currentProject', JSON.stringify({
                name: projectName || 'Untitled Project',
                createdAt: new Date().toISOString()
            }));
            // Clear previous workflow state
            localStorage.removeItem('draftXo_state');
        }
        setShowNewProjectModal(false);
        router.push('/dashboard');
    };

    const handleContinueClick = () => {
        setShowImportModal(true);
    };

    const handleImportFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            // Dynamically import the utility to avoid SSR issues if any (though utils are safe)
            const { parseProjectFile } = await import('@/utils/importUtils');

            const flowData = await parseProjectFile(file);

            if (flowData) {
                // Save to localStorage so Dashboard can pick it up
                // We preserve metadata if it exists in the flowData, or default to filename
                const projectName = file.name.replace('.pdf', '').replace('.json', '');

                localStorage.setItem('currentProject', JSON.stringify({
                    name: projectName,
                    createdAt: new Date().toISOString()
                }));

                localStorage.setItem('draftXo_state', JSON.stringify(flowData));

                setIsLoading(true);
                setShowImportModal(false);

                // Simulate loading delay for effect
                setTimeout(() => {
                    router.push('/dashboard');
                }, 1000);
            }
        } catch (error) {
            alert('Failed to load project: ' + error.message);
            console.error(error);
        }
    };

    const handleNavigationComplete = () => {
        router.push('/dashboard');
    };

    return (
        <main className={styles.container}>
            <div className={styles.background}>
                <div className={styles.orb1}></div>
                <div className={styles.orb2}></div>
            </div>

            <button className={styles.backBtn} onClick={() => router.push('/onboarding')}>
                ← Back
            </button>

            <div className={styles.content}>
                <h1 className={styles.title}>Create Your New Project</h1>
                <p className={styles.subtitle}>Turn your idea into smart draft instantly</p>

                <div className={styles.grid}>
                    {/* New Project Card */}
                    <div className={`${styles.card} ${styles.primaryCard}`} onClick={handleNewProjectClick}>
                        <div className={styles.cardIcon}>✨</div>
                        <h3 className={styles.cardTitle}>New Project</h3>
                        <p className={styles.cardDesc}>Start from scratch with AI assistance</p>
                        <div className={styles.glowEffect}></div>
                    </div>

                    {/* Continue Project */}
                    <div className={styles.card} onClick={handleContinueClick}>
                        <div className={styles.cardIcon}>📂</div>
                        <h3 className={styles.cardTitle}>Continue Project</h3>
                        <p className={styles.cardDesc}>Pick up where you left off</p>
                    </div>

                    {/* Templates */}
                    <div className={styles.card}>
                        <div className={styles.cardIcon}>💠</div>
                        <h3 className={styles.cardTitle}>Templates</h3>
                        <p className={styles.cardDesc}>Use pre-built industry workflows</p>
                    </div>

                    {/* AI Generate */}
                    <div className={styles.card}>
                        <div className={styles.cardIcon}>🤖</div>
                        <h3 className={styles.cardTitle}>AI Generate</h3>
                        <p className={styles.cardDesc}>Let AI build the entire draft</p>
                    </div>
                </div>
            </div>

            {/* New Project Modal */}
            {showNewProjectModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2 className={styles.modalTitle}>Start New Project</h2>
                        <input
                            type="text"
                            placeholder="Project Name"
                            className={styles.modalInput}
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                        <div className={styles.modalActions}>
                            <button className={styles.cancelBtn} onClick={() => setShowNewProjectModal(false)}>Cancel</button>
                            <button className={styles.createBtn} onClick={handleStartProject}>Create Project</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Import Modal */}
            {showImportModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2 className={styles.modalTitle}>Open Project</h2>
                        <div className={styles.uploadArea}>
                            <div className={styles.uploadIcon}>📂</div>
                            <p>Drag & drop your .draftxo file here</p>
                            <input type="file" className={styles.fileInput} onChange={handleImportFile} />
                        </div>
                        <div className={styles.modalActions}>
                            <button className={styles.cancelBtn} onClick={() => setShowImportModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
