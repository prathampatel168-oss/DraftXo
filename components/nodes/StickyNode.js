import { Handle, Position, NodeResizer } from '@xyflow/react';
import styles from './StickyNode.module.css';

export default function StickyNode({ data, selected }) {
    return (
        <div
            className={styles.stickyNode}
            style={{ backgroundColor: data.backgroundColor || '#ffd700' }}
        >
            <NodeResizer
                isVisible={selected}
                minWidth={100}
                minHeight={100}
                color="#000"
            />

            <div className={styles.pin}></div>

            <Handle type="target" position={Position.Top} className={styles.handle} />

            <div className={styles.content} style={{ color: data.color || '#000' }}>
                {data.label}
            </div>

            <Handle type="source" position={Position.Bottom} className={styles.handle} />
        </div>
    );
}
