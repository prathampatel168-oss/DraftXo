import { useState, useEffect, useCallback } from 'react';
import { Handle, Position, NodeResizer, useReactFlow } from '@xyflow/react';
import styles from './TableNode.module.css';

export default function TableNode({ id, data, selected }) {
    const { setNodes } = useReactFlow();
    const rows = data.rows || 3;
    const cols = data.cols || 3;
    const tableData = data.tableData || {}; // Format: { "0-0": "Value" }

    const [editingCell, setEditingCell] = useState(null); // { r, c }
    const [inputValue, setInputValue] = useState("");

    const handleCellClick = (e, r, c) => {
        if (e) e.stopPropagation(); // Stop propagation if event exists
        setEditingCell({ r, c });
        setInputValue(tableData[`${r}-${c}`] || "");
    };

    const handleWriteClick = (e) => {
        e.stopPropagation();
        handleCellClick(null, 0, 0); // Pass null for event as we handled it here
    };

    const addRow = (e) => {
        e.stopPropagation();
        setNodes((nds) => nds.map((node) => {
            if (node.id === id) {
                return { ...node, data: { ...node.data, rows: rows + 1 } };
            }
            return node;
        }));
    };

    const addCol = (e) => {
        e.stopPropagation();
        setNodes((nds) => nds.map((node) => {
            if (node.id === id) {
                return { ...node, data: { ...node.data, cols: cols + 1 } };
            }
            return node;
        }));
    };

    return (
        <div className={styles.wrapper}>
            <NodeResizer
                color="#00f3ff"
                isVisible={selected}
                minWidth={150}
                minHeight={100}
            />

            <Handle type="target" position={Position.Top} className={styles.handle} />

            <div className={`${styles.nodeBody} glass`}>
                <div className={styles.headerRow}>
                    <div className={styles.tableHeader}>{data.label}</div>
                    {selected && (
                        <div className={styles.controls}>
                            <button className={styles.miniBtn} title="Click any cell to edit contents">✎</button>
                            <button
                                className={styles.miniBtn}
                                onClick={handleWriteClick}
                                title="Start Writing"
                            >
                                ✍ Write
                            </button>
                            <button className={styles.miniBtn} onClick={addRow} title="Add Row">+Row</button>
                            <button className={styles.miniBtn} onClick={addCol} title="Add Col">+Col</button>
                        </div>
                    )}
                </div>

                <table className={styles.table}>
                    <tbody>
                        {Array.from({ length: rows }).map((_, r) => (
                            <tr key={r}>
                                {Array.from({ length: cols }).map((_, c) => {
                                    const isEditing = editingCell?.r === r && editingCell?.c === c;
                                    const cellValue = tableData[`${r}-${c}`] || '';

                                    return (
                                        <td
                                            key={`${r}-${c}`}
                                            className={`${styles.cell} nodrag`}
                                            onClick={(e) => !isEditing && handleCellClick(e, r, c)}
                                        >
                                            {isEditing ? (
                                                <textarea
                                                    autoFocus
                                                    className={`${styles.cellInput} nodrag`}
                                                    value={inputValue}
                                                    onClick={(e) => e.stopPropagation()}
                                                    onChange={(e) => setInputValue(e.target.value)}
                                                    onBlur={commitChange}
                                                    onKeyDown={(e) => {
                                                        e.stopPropagation();
                                                        if (e.key === 'Enter' && !e.shiftKey) {
                                                            e.preventDefault();
                                                            commitChange();
                                                        }
                                                    }}
                                                />
                                            ) : (
                                                <span className={styles.cellContent}>{cellValue}</span>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Handle type="source" position={Position.Bottom} className={styles.handle} />
        </div>
    );
}
