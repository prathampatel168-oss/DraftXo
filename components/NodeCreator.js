import { useState, useEffect, useRef, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utils/cropUtils';
import styles from './NodeCreator.module.css';

const ICONS = ['🧠', '💾', '🌍', '📧', '🎨', '📊', '📅', '🔍', '⚙️', '🛡️', '💬', '🚀', '👤', '🛒', '🎵'];
const SHAPES = [
    { id: 'circle', name: 'Circle' },
    { id: 'square', name: 'Square' },
    { id: 'diamond', name: 'Diamond' },
    { id: 'hexagon', name: 'Hexagon' }
];

export default function NodeCreator({ onClose, onCreate, initialData, isEditing = false, onDelete }) {
    const [label, setLabel] = useState(initialData?.label || 'New Node');
    const [selectedIcon, setSelectedIcon] = useState(initialData?.icon || '⚙️');
    const [selectedShape, setSelectedShape] = useState(initialData?.shape || 'circle');
    const [customImage, setCustomImage] = useState(initialData?.image || null);
    const [imageStyle, setImageStyle] = useState(initialData?.imageStyle || 'fill'); // fill, cover

    // Table State
    const [isTable, setIsTable] = useState(initialData?.isTable || false);
    const [tableRows, setTableRows] = useState(initialData?.rows || 3);
    const [tableCols, setTableCols] = useState(initialData?.cols || 3);

    // Cropper State
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [isCropping, setIsCropping] = useState(false);

    const fileInputRef = useRef(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                imageSrc,
                croppedAreaPixels
            )
            setCustomImage(croppedImage);
            setSelectedIcon(null);
            setIsCropping(false);
        } catch (e) {
            console.error(e)
        }
    }, [imageSrc, croppedAreaPixels]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate({
            label,
            icon: selectedIcon,
            shape: selectedShape,
            image: customImage,
            imageStyle,
            isTable,
            rows: tableRows,
            cols: tableCols
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageSrc(event.target.result);
                setIsCropping(true);
            };
            reader.readAsDataURL(file);
        }
        // reset input
        e.target.value = null;
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>

            {/* Cropper Modal Overlay */}
            {isCropping && (
                <div className={styles.cropperOverlay} onClick={e => e.stopPropagation()}>
                    <div className={styles.cropperContainer}>
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            cropShape={selectedShape === 'circle' ? 'round' : 'rect'}
                            showGrid={true}
                        />
                    </div>
                    <div className={styles.cropperControls}>
                        <div className={styles.sliderContainer}>
                            <label>Zoom</label>
                            <input
                                type="range"
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={(e) => setZoom(e.target.value)}
                                className={styles.slider}
                            />
                        </div>
                        <div className={styles.cropperActions}>
                            <button type="button" className={styles.btn + ' ' + styles.cancelBtn} onClick={() => setIsCropping(false)}>Cancel</button>
                            <button type="button" className={styles.btn + ' ' + styles.createBtn} onClick={showCroppedImage}>Done</button>
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <h2 className={`glow-text ${styles.title}`}>{isEditing ? 'Edit Node' : 'Create New Node'}</h2>

                <form onSubmit={handleSubmit}>
                    <div className={styles.section}>
                        <label className={styles.label}>Node Name / Header</label>
                        <textarea
                            className={styles.input}
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            rows={3}
                            style={{ resize: 'none' }}
                        />
                    </div>

                    {/* Table Configuration */}
                    {isTable && (
                        <div className={styles.section}>
                            <label className={styles.label}>Table Dimensions</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div style={{ flex: 1 }}>
                                    <span className={styles.label} style={{ fontSize: '0.8rem' }}>Rows</span>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        className={styles.input}
                                        value={tableRows}
                                        onChange={(e) => setTableRows(parseInt(e.target.value))}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <span className={styles.label} style={{ fontSize: '0.8rem' }}>Columns</span>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        className={styles.input}
                                        value={tableCols}
                                        onChange={(e) => setTableCols(parseInt(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {!isTable && (
                        <>
                            <div className={styles.section}>
                                <label className={styles.label}>Select Shape</label>
                                <div className={styles.grid}>
                                    {SHAPES.map(shape => (
                                        <div
                                            key={shape.id}
                                            className={`${styles.optionBtn} ${selectedShape === shape.id ? styles.selected : ''}`}
                                            onClick={() => setSelectedShape(shape.id)}
                                        >
                                            <div className={`${styles.shapePreview} ${styles[shape.id]}`}></div>
                                            <span style={{ fontSize: '0.7rem' }}>{shape.name}</span>
                                        </div>
                                    ))}
                                </div>
                                <p style={{ fontSize: '0.7rem', color: '#666', marginTop: '5px' }}>Image crop will match selected shape.</p>
                            </div>

                            <div className={styles.section}>
                                <label className={styles.label}>Icon or Image</label>

                                {/* Custom Image Upload */}
                                <div className={styles.uploadContainer}>
                                    <button type="button" className={styles.uploadBtn} onClick={() => fileInputRef.current.click()}>
                                        {customImage ? 'Change Image' : 'Upload Image'}
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                    {customImage && (
                                        <div className={styles.imagePreviewContainer}>
                                            <div className={styles.imagePreview}>
                                                <img src={customImage} alt="Preview" style={{ objectFit: imageStyle === 'cover' ? 'cover' : 'contain' }} />
                                                <button type="button" className={styles.removeImageBtn} onClick={() => setCustomImage(null)}>×</button>
                                            </div>

                                            <div className={styles.styleOptions}>
                                                <label className={styles.radioLabel}>
                                                    <input
                                                        type="radio"
                                                        name="imageStyle"
                                                        value="fill"
                                                        checked={imageStyle === 'fill'}
                                                        onChange={() => setImageStyle('fill')}
                                                    />
                                                    <span>Fill Shape</span>
                                                </label>
                                                <label className={styles.radioLabel}>
                                                    <input
                                                        type="radio"
                                                        name="imageStyle"
                                                        value="cover"
                                                        checked={imageStyle === 'cover'}
                                                        onChange={() => setImageStyle('cover')}
                                                    />
                                                    <span>Upper/Cover</span>
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {!customImage && (
                                    <div className={styles.grid}>
                                        {ICONS.map(icon => (
                                            <button
                                                key={icon}
                                                type="button"
                                                className={`${styles.optionBtn} ${selectedIcon === icon ? styles.selected : ''}`}
                                                onClick={() => setSelectedIcon(icon)}
                                            >
                                                <span className={styles.optionIcon}>{icon}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    <div className={styles.actions}>
                        {isEditing && (
                            <button type="button" className={styles.btn + ' ' + styles.deleteBtn} onClick={onDelete}>Delete Node</button>
                        )}
                        <button type="button" className={styles.btn + ' ' + styles.cancelBtn} onClick={onClose}>Cancel</button>
                        <button type="submit" className={styles.btn + ' ' + styles.createBtn}>{isEditing ? 'Save Changes' : 'Create Node'}</button>
                    </div>
                </form >
            </div >
        </div >
    );
}
