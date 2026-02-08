"use client";
import React, { useCallback, useState } from 'react';
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    Background,
    Controls,
    MiniMap,
    MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css'; // Mandatory CSS import

import AgentNode from './nodes/AgentNode';
import CircleNode from './nodes/CircleNode';
import TableNode from './nodes/TableNode';
import TextNode from './nodes/TextNode';
import StickyNode from './nodes/StickyNode';
import NodeCreator from './NodeCreator';
import ElementsPanel from './ElementsPanel';

import ProjectMetadataModal from './ProjectMetadataModal';

import styles from './WorkflowCanvas.module.css';

const nodeTypes = {
    agent: AgentNode,
    circle: CircleNode,
    table: TableNode,
    text: TextNode,
    sticky: StickyNode
};

const initialNodes = [
    {
        id: '1',
        position: { x: 0, y: 0 },
        data: { label: 'OpenAI Chat Model', icon: '🧠', subLabel: 'gpt-4-turbo', shape: 'circle' },
        type: 'circle',
        style: { width: 80, height: 80 }
    },
    {
        id: '2',
        position: { x: -80, y: 150 },
        data: { label: 'AI Agent' },
        type: 'agent',
        style: { width: 280, height: 200 }
    },
    {
        id: '3',
        position: { x: 50, y: 400 },
        data: { label: 'Simple Memory', icon: '💾', shape: 'square' },
        type: 'circle',
        style: { width: 80, height: 80 }
    },
];

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#aaa', strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#aaa', strokeDasharray: '5,5' } },
];

export default React.forwardRef(function WorkflowCanvas(props, ref) {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [rfInstance, setRfInstance] = useState(null);

    // Load Initial State
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedState = localStorage.getItem('draftXo_state');
            if (savedState) {
                try {
                    const parsed = JSON.parse(savedState);
                    if (parsed.nodes) setNodes(parsed.nodes);
                    if (parsed.edges) setEdges(parsed.edges);
                    // Clear it so it doesn't persist forever if they start a new project later? 
                    // Actually keeping it is fine, but "New Project" should clear it.
                } catch (e) {
                    console.error("Failed to load state", e);
                    setNodes(initialNodes);
                    setEdges(initialEdges);
                }
            } else {
                setNodes(initialNodes);
                setEdges(initialEdges);
            }
        }
    }, [setNodes, setEdges]);

    // Modal States
    const [creatorMode, setCreatorMode] = useState(null); // 'create' or 'edit'
    const [editingNodeId, setEditingNodeId] = useState(null);

    // Project Metadata State
    const [projectMetadata, setProjectMetadata] = useState(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('currentProject');
            return stored ? JSON.parse(stored) : null;
        }
        return null;
    });
    const [isProjectModalOpen, setProjectModalOpen] = useState(false); // Don't open on load

    // Expose Export Function to Parent
    React.useImperativeHandle(ref, () => ({

        exportPDF: async (fileName = 'draftxo-report', settings = {}) => {
            const html2canvas = (await import('html2canvas')).default;
            const jsPDF = (await import('jspdf')).default;

            const element = document.querySelector(`.${styles.canvasContainer}`);

            // 1. Fit View to ensure everything is captured
            // We use the settings to determine if we need a specific fit or just default
            // For now, consistent fitView is best for "No content cut off"
            if (rfInstance) {
                await rfInstance.fitView({ padding: 0.1, duration: 200 });
            }

            // Wait for smooth render
            await new Promise(resolve => setTimeout(resolve, 300));

            const scale = 2; // High Res

            html2canvas(element, {
                useCORS: true,
                logging: false,
                scale: scale,
                backgroundColor: '#111111', // Force dark background for white edges to show
                onclone: (clonedDoc) => {
                    // 2. Hide UI Elements in the CLONE only
                    const controls = clonedDoc.querySelector(`.${styles.controls}`);
                    const rfControls = clonedDoc.querySelector('.react-flow__controls');
                    const rfMinimap = clonedDoc.querySelector('.react-flow__minimap');
                    const rfAttribution = clonedDoc.querySelector('.react-flow__attribution');

                    if (controls) controls.style.display = 'none';
                    if (rfControls) rfControls.style.display = 'none';
                    if (rfMinimap) rfMinimap.style.display = 'none';
                    if (rfAttribution) rfAttribution.style.display = 'none';

                    // 3. Force Edge Visibility (Make them pop)
                    const edges = clonedDoc.querySelectorAll('.react-flow__edge path');
                    edges.forEach(edge => {
                        edge.style.stroke = '#ffffff';
                        edge.style.strokeWidth = '2px';
                    });
                }
            }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');

                // 3. Configure PDF based on Settings
                // Default: Landscape, scaled canvas size
                let pdfConfig = {
                    orientation: settings.orientation || (canvas.width > canvas.height ? 'landscape' : 'portrait'),
                    unit: settings.unit || 'px',
                };

                if (settings.format && settings.format !== 'custom') {
                    pdfConfig.format = settings.format; // a4, a3, letter
                } else if (settings.customSize) {
                    pdfConfig.format = [settings.customSize.width, settings.customSize.height];
                } else {
                    // Default fallback: match image size
                    pdfConfig.format = [canvas.width / scale, canvas.height / scale];
                }

                const pdf = new jsPDF(pdfConfig);

                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();

                // Set Black Background
                pdf.setFillColor(17, 17, 17); // #111 to match app background
                pdf.rect(0, 0, pageWidth, pageHeight, 'F');

                // 4. Image Fitting Logic (Contain)
                // We want to fit the captured canvas INTO the PDF page while maintaining aspect ratio
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pageWidth;
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                // If calculated height is greater than page height, fit by height instead
                let finalX = 0;
                let finalY = 0;
                let finalW = pdfWidth;
                let finalH = pdfHeight;

                if (pdfHeight > pageHeight) {
                    finalH = pageHeight;
                    finalW = (imgProps.width * finalH) / imgProps.height;
                    // Center horizontally
                    finalX = (pageWidth - finalW) / 2;
                } else {
                    // Center vertically
                    finalY = (pageHeight - finalH) / 2;
                }

                pdf.addImage(imgData, 'PNG', finalX, finalY, finalW, finalH);

                // 5. Watermark (Bottom Right of the Page)
                pdf.setTextColor(255, 255, 255); // Pure white for better contrast
                pdf.setFontSize(16);
                pdf.setFont('helvetica', 'bold');
                const watermarkText = 'Created with DraftXo';
                const textWidth = pdf.getTextWidth(watermarkText);
                pdf.text(watermarkText, pageWidth - textWidth - 20, pageHeight - 20);

                const pdfBlob = pdf.output('blob');
                const flow = { nodes, edges };
                const flowString = JSON.stringify(flow);

                const finalBlob = new Blob([pdfBlob, DELIMITER, flowString], { type: 'application/pdf' });

                const url = URL.createObjectURL(finalBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${fileName}.pdf`;
                link.click();
            });
        }

    }));


    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#fff', strokeDasharray: '5,5' } }, eds)),
        [setEdges],
    );

    const onNodeClick = (event, node) => {
        // Open edit modal on click for both circle and agent nodes
        setEditingNodeId(node.id);
        setCreatorMode('edit');
    };

    const runWorkflow = () => {
        setIsRunning(true);
        setTimeout(() => {
            setNodes((nds) => nds.map(n => {
                if (n.id === '2') return { ...n, data: { ...n.data, label: 'Processing...' } };
                return n;
            }));
        }, 1000);

        setTimeout(() => {
            setNodes((nds) => nds.map(n => {
                if (n.id === '2') return { ...n, data: { ...n.data, label: 'Agents Complete' } };
                if (['3', '4', '5', '6'].includes(n.id)) return { ...n, style: { filter: 'drop-shadow(0 0 10px #00f3ff)' } };
                return n;
            }));
            setIsRunning(false);
        }, 3000);
    };

    const DELIMITER = "\n\n---DRAFTXO-STATE---\n";

    return (
        <div className={styles.canvasContainer}>
            {/* Project Header Overlay */}
            {/* Project Header Overlay Removed (Redundant with Dashboard Header) */}

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                nodeTypes={nodeTypes}
                fitView
                onInit={(instance) => {
                    setRfInstance(instance);
                    setTimeout(() => {
                        instance.fitView({ padding: 0.2 });
                    }, 100);
                }}
                nodesDraggable={true}
                nodesConnectable={true}
                elementsSelectable={true}
                panOnDrag={true}
                zoomOnScroll={true}
                zoomOnPinch={true}
                panOnScroll={false}
                preventScrolling={true}
            >
                <Background color="#111" gap={20} className={styles.background} variant="dots" />
                <Controls position="top-left" />
                <MiniMap style={{ height: 120, backgroundColor: '#000' }} zoomable pannable position="bottom-right" />
            </ReactFlow>

            {/* Project Metadata Modal */}
            {isProjectModalOpen && (
                <ProjectMetadataModal
                    initialData={projectMetadata}
                    onClose={() => {
                        if (projectMetadata) {
                            setProjectModalOpen(false);
                        } else {
                            // Default Project Data if skipped
                            setProjectMetadata({
                                name: 'My New Project',
                                description: 'DraftXo Workflow',
                                image: null
                            });
                            setProjectModalOpen(false);
                        }
                    }}
                    onSave={(data) => {
                        setProjectMetadata(data);
                        setProjectModalOpen(false);
                    }}
                />
            )}

            {/* Node Creator/Editor Modal */}
            {creatorMode && (
                <NodeCreator
                    isEditing={creatorMode === 'edit'}
                    initialData={creatorMode === 'edit' ? nodes.find(n => n.id === editingNodeId)?.data : null}
                    onClose={() => {
                        setCreatorMode(null);
                        setEditingNodeId(null);
                    }}
                    onDelete={() => {
                        if (confirm('Delete this node?')) {
                            setNodes((nds) => nds.filter((n) => n.id !== editingNodeId));
                            setEdges((eds) => eds.filter((e) => e.source !== editingNodeId && e.target !== editingNodeId));
                            setCreatorMode(null);
                            setEditingNodeId(null);
                        }
                    }}
                    onCreate={(nodeData) => {
                        if (creatorMode === 'create') {
                            const newNode = {
                                id: Math.random().toString(),
                                position: { x: Math.random() * 500, y: Math.random() * 500 },
                                data: nodeData,
                                type: 'circle',
                                style: { width: 80, height: 80 }
                            };
                            setNodes((nds) => nds.concat(newNode));
                        } else {
                            setNodes((nds) => nds.map((n) => {
                                if (n.id === editingNodeId) {
                                    return { ...n, data: { ...n.data, ...nodeData } };
                                }
                                return n;
                            }));
                        }
                        setCreatorMode(null);
                        setEditingNodeId(null);
                    }}
                />
            )}

            {/* Floating Controls Overlay */}
            <div className={`${styles.controls} glass`}>
                <ElementsPanel onAddElement={(element) => {
                    const newNode = {
                        id: Math.random().toString(),
                        position: { x: Math.random() * 500 + 100, y: Math.random() * 500 + 100 },
                        data: element.data,
                        type: element.type,
                        style: { width: 100, height: 100 }
                    };
                    setNodes((nds) => nds.concat(newNode));
                }} />

                <div className={styles.divider}></div>

                <button className={styles.controlBtn} onClick={() => setCreatorMode('create')}>+ Custom</button>
                <button className={styles.controlBtn} onClick={runWorkflow} disabled={isRunning}>
                    {isRunning ? 'Running...' : '▶ Run'}
                </button>

                <div className={styles.divider}></div>

                <label className={styles.controlBtn}>
                    📂 Import
                    <input type="file" accept=".json,.pdf" style={{ display: 'none' }} onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            const content = event.target.result;
                            try {
                                let flowData;
                                if (content.includes(DELIMITER.trim())) {
                                    const parts = content.split(DELIMITER.trim());
                                    if (parts.length > 1) {
                                        flowData = JSON.parse(parts[parts.length - 1]);
                                    }
                                }
                                if (!flowData) {
                                    flowData = JSON.parse(content);
                                }

                                if (flowData && flowData.nodes && flowData.edges) {
                                    setNodes(flowData.nodes);
                                    setEdges(flowData.edges);
                                    alert('Project Imported Successfully!');
                                } else {
                                    throw new Error('Invalid structure');
                                }
                            } catch (err) {
                                alert('Could not load project.');
                            }
                        };
                        reader.readAsText(file);
                    }} />
                </label>
            </div>
        </div>
    );
});
