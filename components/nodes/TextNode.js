import { Handle, Position, NodeResizer } from '@xyflow/react';
import styles from './TextNode.module.css';

export default function TextNode({ data, selected }) {
    return (
        <div className={styles.textNode} style={{ textAlign: data.textAlign || 'left' }}>
            <NodeResizer
                isVisible={selected}
                minWidth={100}
                color="#00f3ff"
                handleStyle={{ width: 8, height: 8 }}
            />

            <Handle type="target" position={Position.Top} className={styles.handle} />

            <div
                className={styles.content}
                style={{
                    fontSize: data.fontSize || '1rem',
                    fontWeight: data.fontWeight || 'normal',
                    color: data.color || '#ffffff',
                }}
            >
                {data.label}
            </div>

            <Handle type="source" position={Position.Bottom} className={styles.handle} />
        </div>
    );
}
