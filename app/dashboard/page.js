"use client";
import React, { useRef, useState, useEffect } from 'react';
import WorkflowCanvas from '@/components/WorkflowCanvas';
import styles from './page.module.css';
import ExportSettingsPanel from '@/components/ExportSettingsPanel';

export default function Dashboard() {
    const canvasRef = useRef();
    const router = require('next/navigation').useRouter();
    const [pageTitle, setPageTitle] = React.useState('New Project Workflow');
    const [userRole, setUserRole] = React.useState(null);
    const [isExportPanelOpen, setIsExportPanelOpen] = React.useState(false);

    React.useEffect(() => {
        // Enforce Intro: Check if user came from intro page
        if (typeof window !== 'undefined') {
            const storedProject = localStorage.getItem('currentProject');

            // If they don't have a project and didn't just come from intro, send them back
            if (!storedProject && !window.introSeen) {
                router.push('/');
            }

            // Load Project Name
            if (storedProject) {
                const projectData = JSON.parse(storedProject);
                setPageTitle(projectData.name);
            }

            // Load User Role
            const role = localStorage.getItem('draftxo_role');
            if (role) {
                // Capitalize first letter
                setUserRole(role.charAt(0).toUpperCase() + role.slice(1));
            }
        }
    }, [router]);

    const handleExport = (settings) => {
        canvasRef.current?.exportPDF(pageTitle, settings);
        setIsExportPanelOpen(false);
    };

    return (
        <div className={styles.dashboardPage}>
            <div className={styles.header}>
                <div className={styles.leftSection}>
                    <button className={styles.backBtn} onClick={() => router.push('/selection')}>
                        ←
                    </button>
                    <div className={styles.titleWrapper}>
                        <h1 className={styles.pageTitle}>{pageTitle}</h1>
                        {userRole && <span className={styles.roleBadge}>{userRole}</span>}
                    </div>
                </div>
                <div className={styles.actions}>
                    <button
                        className={`neon-button ${styles.exportBtn}`}
                        onClick={() => setIsExportPanelOpen(true)}
                    >
                        EXPORT PDF
                    </button>
                </div>
            </div>
            <div className={styles.canvasArea}>
                <WorkflowCanvas ref={canvasRef} />
            </div>

            <ExportSettingsPanel
                isOpen={isExportPanelOpen}
                onClose={() => setIsExportPanelOpen(false)}
                onExport={handleExport}
            />
        </div>
    );
}
