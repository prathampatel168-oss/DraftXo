import { useState, useRef, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utils/cropUtils';
import styles from './NodeCreator.module.css'; // Reusing modal styles

export default function ProjectMetadataModal({ onClose, onSave, initialData }) {
    const [name, setName] = useState(initialData?.name || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [image, setImage] = useState(initialData?.image || null);

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
            setImage(croppedImage);
            setIsCropping(false);
        } catch (e) {
            console.error(e)
        }
    }, [imageSrc, croppedAreaPixels]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name, description, image });
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
                            aspect={16 / 9} // Project cover is usually wide
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
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
                <h2 className={`glow-text ${styles.title}`}>
                    {initialData ? 'Edit Project Details' : 'Start New Project'}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className={styles.section}>
                        <label className={styles.label}>Project / Business Name</label>
                        <input
                            type="text"
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. My Awesome Startup"
                            autoFocus
                            required
                        />
                    </div>

                    <div className={styles.section}>
                        <label className={styles.label}>Project Description</label>
                        <textarea
                            className={styles.input}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="What is this project about?"
                            rows={3}
                            style={{ resize: 'none' }}
                        />
                    </div>

                    <div className={styles.section}>
                        <label className={styles.label}>Project Cover Image (Optional)</label>
                        <div className={styles.uploadContainer}>
                            <button type="button" className={styles.uploadBtn} onClick={() => fileInputRef.current.click()}>
                                {image ? 'Change Cover' : 'Upload Cover'}
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            {image && (
                                <div className={styles.imagePreview} style={{ width: '100%', height: '150px' }}>
                                    <img src={image} alt="Preview" style={{ objectFit: 'cover' }} />
                                    <button type="button" className={styles.removeImageBtn} onClick={() => setImage(null)}>×</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button type="button" className={styles.btn + ' ' + styles.cancelBtn} onClick={onClose}>
                            {initialData ? 'Cancel' : 'Skip & Use Default'}
                        </button>
                        <button type="submit" className={styles.btn + ' ' + styles.createBtn}>
                            {initialData ? 'Save Changes' : 'Create Project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
