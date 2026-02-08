
"use client";
import React, { useState } from 'react';
import styles from './ExportSettingsPanel.module.css';

const ExportSettingsPanel = ({ isOpen, onClose, onExport }) => {
    const [format, setFormat] = useState('a4'); // a4, a3, letter, custom
    const [orientation, setOrientation] = useState('landscape'); // portrait, landscape
    const [unit, setUnit] = useState('px'); // px, mm, inch
    const [width, setWidth] = useState(1920);
    const [height, setHeight] = useState(1080);
    const [isExporting, setIsExporting] = useState(false);

    if (!isOpen) return null;

    const handleExport = () => {
        setIsExporting(true);
        // Convert known formats to pixels if needed or pass raw configs
        // For simplicity, we pass the raw config and let the exporter handle jsPDF logic

        // Define standard sizes in pixels (approx for screen 96dpi or high res)
        // Actually jsPDF handles 'a4', 'a3' strings natively.

        onExport({
            format,
            orientation,
            unit,
            customSize: format === 'custom' ? { width, height } : null
        });

        // Reset after a delay or let parent close
        setTimeout(() => setIsExporting(false), 2000);
    };

    return (
        <div className={styles.overlay}>
            <div className={`${styles.panel} glass`}>
                <div className={styles.header}>
                    <h3>Export Settings</h3>
                    <button onClick={onClose} className={styles.closeBtn}>×</button>
                </div>

                <div className={styles.body}>

                    {/* Format Selection */}
                    <div className={styles.group}>
                        <label>Page Size</label>
                        <select value={format} onChange={(e) => setFormat(e.target.value)}>
                            <option value="a4">A4</option>
                            <option value="a3">A3</option>
                            <option value="letter">Letter</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>

                    {/* Custom Dimensions */}
                    {format === 'custom' && (
                        <div className={styles.row}>
                            <div className={styles.group}>
                                <label>Width</label>
                                <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} />
                            </div>
                            <div className={styles.group}>
                                <label>Height</label>
                                <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
                            </div>
                            <div className={styles.group}>
                                <label>Unit</label>
                                <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                                    <option value="px">px</option>
                                    <option value="mm">mm</option>
                                    <option value="in">in</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Orientation */}
                    {format !== 'custom' && (
                        <div className={styles.group}>
                            <label>Orientation</label>
                            <div className={styles.radioGroup}>
                                <label className={orientation === 'portrait' ? styles.active : ''}>
                                    <input
                                        type="radio"
                                        name="orientation"
                                        value="portrait"
                                        checked={orientation === 'portrait'}
                                        onChange={() => setOrientation('portrait')}
                                    />
                                    Portrait
                                </label>
                                <label className={orientation === 'landscape' ? styles.active : ''}>
                                    <input
                                        type="radio"
                                        name="orientation"
                                        value="landscape"
                                        checked={orientation === 'landscape'}
                                        onChange={() => setOrientation('landscape')}
                                    />
                                    Landscape
                                </label>
                            </div>
                        </div>
                    )}

                    <div className={styles.info}>
                        <p>ℹ️ Content will be auto-scaled to fit.</p>
                    </div>

                </div>

                <div className={styles.footer}>
                    <button onClick={onClose} className={styles.cancelBtn}>Cancel</button>
                    <button onClick={handleExport} className={`neon-button ${styles.exportBtn}`}>
                        {isExporting ? 'Exporting...' : 'Export PDF'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExportSettingsPanel;
