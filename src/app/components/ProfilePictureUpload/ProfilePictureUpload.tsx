'use client';
import React, { useState, useRef, ChangeEvent, MouseEvent } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { ApiClient, ApiError } from '@/app/api';
import styles from './ProfilePictureUpload.module.css';
import Image from 'next/image';

interface ProfilePictureUploadProps {
    onClose: () => void;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({ onClose }) => {
    const { token, user, updateProfilePictureInContext, logout } = useAuth();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setSuccess(null);
        const file = event.target.files?.[0];

        if (file) {
            if (file.size > 5 * 1024 * 1024) { 
                setError('Mynd má ekki vera stærri en 5MB.');
                setSelectedFile(null);
                setPreview(null);
                return;
            }
            if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
                setError('Aðeins JPG, PNG, eða GIF.');
                setSelectedFile(null);
                setPreview(null);
                return;
            }

            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setPreview(reader.result);
                }
            };
            reader.onerror = () => {
                setError("Villa við að lesa myndaskrá.");
                setPreview(null);
                setSelectedFile(null);
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedFile(null);
            setPreview(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
             setError("Engin mynd valin.");
             return;
         }
         if (!token || !user) {
            setError("Notandi ekki innskráður.");
            return;
        }

        setUploading(true);
        setError(null);
        setSuccess(null);

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('caption', `${user.username}'s profile picture`);

        const apiClient = new ApiClient();
        apiClient.setToken(token);

        try {
            const result = await apiClient.uploadImage(formData);
            setSuccess(result.message || "Mynd hlaðið upp!");
            updateProfilePictureInContext(result.imageUrl);
            setTimeout(onClose, 2000);
        } catch (err: any) {
            console.error("Upload error caught in component:", err);
            if (err instanceof ApiError) {
                setError(err.message || "Villa kom upp við að hlaða upp mynd.");
                if (err.status === 401) {
                    logout();
                }
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Óþekkt villa við upphal.");
            }
        } finally {
            setUploading(false);
        }
    };

    const handleModalContentClick = (e: MouseEvent) => {
        e.stopPropagation();
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
         <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={handleModalContentClick}>
                <h2>Hlaða inn nýrri prófílmynd</h2>
                <button onClick={onClose} className={styles.closeButton} aria-label="Loka glugga">×</button>

                {error && <p className={styles.errorMessage}>{error}</p>}
                {success && <p className={styles.successMessage}>{success}</p>}

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, image/gif"
                    style={{ display: 'none' }}
                    aria-hidden="true"
                />
                 <button
                     onClick={triggerFileInput}
                     disabled={uploading}
                     className={styles.selectButton}
                     type="button"
                 >
                     Velja mynd...
                 </button>

                {preview && (
                    <div className={styles.previewContainer}>
                        <p>Forskoðun:</p>
                        <Image
                          src={preview}
                          alt="Forskoðun"
                          width={100}
                          height={100}
                          style={{ objectFit: 'cover' }}
                          className={styles.previewImage}
                        />
                    </div>
                )}

                {selectedFile && (
                    <button
                        onClick={handleUpload}
                        disabled={uploading || !selectedFile}
                        className={styles.uploadButton}
                        type="button"
                    >
                        {uploading ? 'Hleð inn...' : 'Hlaða upp'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProfilePictureUpload;