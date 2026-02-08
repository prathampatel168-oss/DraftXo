import { Handle, Position, NodeResizer } from '@xyflow/react';
import { useState } from 'react';
import styles from './AgentNode.module.css';
import { AIAgentService } from '@/services/aiService';

export default function AgentNode({ data, selected }) {
    const isCover = data.imageStyle === 'cover';
    const [isProcessing, setIsProcessing] = useState(false);
    const [aiOutput, setAiOutput] = useState(null);

    const handleRunAgent = async (e) => {
        e.stopPropagation(); // Prevent node selection
        setIsProcessing(true);
        setAiOutput(null);

        try {
            // Use the node label as the "prompt"
            const response = await AIAgentService.generateResponse(data.label || "Analysis Task");
            setAiOutput(response);
        } catch (error) {
            setAiOutput("Error: Failed to connect to AI Agent network.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className={`${styles.agentNode} glass`} style={{ padding: isCover ? '0' : '15px' }}>
            <NodeResizer
                color="#bc13fe"
                isVisible={selected}
                minWidth={250}
                minHeight={200}
            />
            {/* Input Handle */}
            <Handle type="target" position={Position.Top} className={styles.handleTop} />

            {isCover && data.image ? (
                <>
                    <div className={styles.coverImageContainer}>
                        <img src={data.image} alt="Agent Cover" className={styles.coverImage} />
                    </div>
                    <div className={styles.contentParams}>
                        <div className={styles.header}>
                            <span className={styles.icon}>{data.icon || '🤖'}</span>
                            <span className={styles.title}>AI Agent</span>
                        </div>
                        <div className={styles.content}>
                            {data.label}
                        </div>
                        {aiOutput && <div className={styles.aiOutput}>{aiOutput}</div>}
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.header}>
                        {data.image ? (
                            <img src={data.image} alt="Agent Icon" className={styles.userImage} />
                        ) : (
                            <span className={styles.icon}>{data.icon || '🤖'}</span>
                        )}
                        <span className={styles.title}>AI Agent</span>
                    </div>

                    <div className={styles.content}>
                        {data.label}
                    </div>

                    {aiOutput && (
                        <div className={styles.aiResult}>
                            <div className={styles.resultHeader}>💡 AI Output:</div>
                            {aiOutput}
                        </div>
                    )}
                </>
            )}

            {!isCover && (
                <div className={styles.footer}>
                    <div className={styles.status}>
                        <span className={`${styles.statusDot} ${isProcessing ? styles.processing : ''}`}></span>
                        {isProcessing ? 'Thinking...' : 'Ready'}
                    </div>
                    <button
                        className={styles.runBtn}
                        onClick={handleRunAgent}
                        disabled={isProcessing}
                    >
                        {isProcessing ? '■' : '▶ Run'}
                    </button>
                </div>
            )}

            {/* Output Handles - Distributed for effect */}
            <Handle type="source" position={Position.Bottom} id="a" className={styles.handleBottom} style={{ left: '25%' }} />
            <Handle type="source" position={Position.Bottom} id="b" className={styles.handleBottom} style={{ left: '50%' }} />
            <Handle type="source" position={Position.Bottom} id="c" className={styles.handleBottom} style={{ left: '75%' }} />
        </div>
    );
}
