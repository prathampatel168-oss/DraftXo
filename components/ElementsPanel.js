import { useState } from 'react';
import styles from './WorkflowCanvas.module.css';

const ELEMENTS = [
    // Text Elements
    { id: 'heading', name: 'Heading', icon: 'H', color: '#ffffff', type: 'text', data: { label: 'Heading', fontSize: '2.5rem', fontWeight: '800', textAlign: 'left', color: '#fff' } },
    { id: 'subheading', name: 'Subheading', icon: 'T', color: '#dddddd', type: 'text', data: { label: 'Subheading', fontSize: '1.5rem', fontWeight: '600', textAlign: 'left', color: '#ccc' } },
    { id: 'body', name: 'Body Text', icon: 't', color: '#aaaaaa', type: 'text', data: { label: 'Add a little bit of body text. This element is great for descriptions.', fontSize: '1rem', fontWeight: '400', textAlign: 'left', color: '#aaa' } },

    // Shapes & Tools
    { id: 'sticky', name: 'Sticky Note', icon: '📝', color: '#ffd700', type: 'sticky', data: { backgroundColor: '#ffd700', label: 'Stick to the plan!', color: '#000' } },
    { id: 'card', name: 'Image Card', icon: '🖼️', color: '#00f3ff', type: 'circle', data: { shape: 'square', imageStyle: 'cover', label: 'Image Card', image: 'https://via.placeholder.com/300' } },
    { id: 'shape', name: 'Shape', icon: '🔷', color: '#ff00ff', type: 'circle', data: { shape: 'hexagon', label: 'Shape' } },
    { id: 'agent', name: 'AI Agent', icon: '🤖', color: '#00ff00', type: 'agent', data: { label: 'New Agent' } },

    // Tools
    { id: 'table', name: 'Table', icon: '▦', color: '#ffffff', type: 'table', data: { label: 'New Table', isTable: true, rows: 3, cols: 3 } },
];

export default function ElementsPanel({ onAddElement }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.elementsWrapper}>
            <button
                className={`${styles.controlBtn} ${isOpen ? styles.activeBtn : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                🎨 Elements
            </button>

            {isOpen && (
                <div className={styles.elementsPopup}>
                    <h3 className={styles.elementsTitle}>Add Element</h3>
                    <div className={styles.elementsGrid}>
                        {ELEMENTS.map(el => (
                            <div
                                key={el.id}
                                className={styles.elementItem}
                                onClick={() => {
                                    onAddElement(el);
                                    setIsOpen(false);
                                }}
                            >
                                <div className={styles.elementIcon} style={{ borderColor: el.color }}>
                                    {el.icon}
                                </div>
                                <span className={styles.elementName}>{el.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
