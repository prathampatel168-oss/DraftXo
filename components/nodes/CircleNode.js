import { Handle, Position, NodeResizer } from '@xyflow/react';
import styles from './CircleNode.module.css';

export default function CircleNode({ data, selected }) {
    const shapeClass = styles[data.shape || 'circle'];
    const isCover = data.imageStyle === 'cover';

    return (
        <div className={styles.wrapper}>
            <NodeResizer
                color="#00f3ff"
                isVisible={selected}
                minWidth={60}
                minHeight={60}
                keepAspectRatio={!isCover && (data.shape === 'circle' || data.shape === 'hexagon' || data.shape === 'diamond')}
            />

            <Handle type="target" position={Position.Top} className={styles.handle} />

            <div
                className={`${styles.nodeBody} ${shapeClass} ${!data.backgroundColor && data.shape !== 'text' ? 'glass' : ''} ${isCover ? styles.cardLayout : ''}`}
                style={{
                    backgroundColor: data.shape === 'text' ? 'transparent' : (data.backgroundColor || undefined),
                    color: data.color || '#fff',
                    fontSize: data.fontSize || undefined,
                    fontWeight: data.fontWeight || undefined
                }}
            >
                {data.image ? (
                    isCover ? (
                        <>
                            <div className={styles.coverImageContainer}>
                                <img src={data.image} alt={data.label} className={styles.coverImage} />
                            </div>
                            <div className={styles.cardContent}>
                                <p className={styles.cardLabel}>{data.label}</p>
                            </div>
                        </>
                    ) : (
                        <img src={data.image} alt={data.label} className={styles.nodeImage} />
                    )
                ) : (
                    <span className={styles.icon}>{data.icon || '🛠️'}</span>
                )}
            </div>

            {/* Hide external label if using cover/card layout */}
            {(!data.image || !isCover) && (
                <div className={styles.labelContainer}>
                    <p
                        className={styles.label}
                        style={{
                            fontSize: data.fontSize || undefined,
                            fontWeight: data.fontWeight || undefined,
                            textAlign: data.textAlign || 'center'
                        }}
                    >
                        {data.label}
                    </p>
                    {data.subLabel && <p className={styles.subLabel}>{data.subLabel}</p>}
                </div>
            )}

            <Handle type="source" position={Position.Bottom} className={styles.handle} />
        </div>
    );
}
