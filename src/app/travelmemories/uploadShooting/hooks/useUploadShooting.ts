import { useState } from "react";
import axios from "axios";
import { Photo, ShootingInfo, UserInfo, getEmptyPhoto, getEmptyShootingInfo, getEmptyUserInfo } from '../../types/galleryTypes';

export const useUploadShooting = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [shootingInfo, setShootingInfo] = useState<ShootingInfo>(getEmptyShootingInfo);
    const [userInfo, setUserInfo] = useState<UserInfo>(getEmptyUserInfo);
    const [unitPrice, setUnitPrice] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    // Handle file input change and create Photo objects
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setFiles(filesArray);

            // Create Photo objects for each file
            const newPhotos = filesArray.map((file) => ({
                id: crypto.randomUUID(), // Generate a unique ID
                title: file.name, // Use file name as title temporarily
                resolution: "", // Empty by default
                description: "", // Empty by default
                src: URL.createObjectURL(file), // Temporary URL for display
            }));

            // Append new photos to existing ones
            setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
        }
    };

    /**
     * Handle photo information change
     */
    const handlePhotoChange = (index: number, field: keyof Photo, value: string | number) => {
        if (!photos) return; // Ensure photos is not null

        const updatedPhotos = [...photos];
        updatedPhotos[index] = {
            ...updatedPhotos[index],
            [field]: value as never, // Type assertion to avoid TypeScript error
        };

        setPhotos(updatedPhotos);
    };

    /**
     * Handle shooting information change
     */
    const handleShootingInfoChange = (field: keyof ShootingInfo, value: string) => {
        setShootingInfo(prev => ({ ...prev, [field]: value }));
    };

    /**
     * Handle user information change
     */
    const handleUserInfoChange = (field: keyof UserInfo, value: string) => {
        setUserInfo(prev => ({ ...prev, [field]: value }));
    };

    const uploadPhotosOnS3 = async () => {
        if (files.length === 0) {
            alert("Please select at least one image.");
            return null;
        }

        setLoading(true);
        const formData = new FormData();
        files.forEach(file => formData.append("photos", file));

        try {
            // Upload photos to AWS
            const response = await axios.post("/api/uploadPhotos", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            // Update photo URLs after upload to AWS
            if (response.status === 200) {
                const uploadedPaths: { [key: string]: string } = response.data.paths;
                // uploadedPaths est un objet { "nom_fichier1.jpg": "chemin_S3_1", ... }
    
                return uploadedPaths;
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Error while sending the data.");
        } finally {
            setLoading(false);
        }
    }

    /**
     * Handle upload of photos to AWS and save to Firebase
     */
    const handleUpload = async () => {
        //Checking validity on the form fields

        if(uploadPhotosOnS3() === null) return;
        console.log("Uploading shooting on data base")
    };

    // Return all states and functions for use in the calling component
    return {
        files,
        photos,
        shootingInfo,
        userInfo,
        unitPrice, 
        loading,
        setUnitPrice,
        handleFileChange,
        handlePhotoChange,
        handleShootingInfoChange,
        handleUserInfoChange,
        handleUpload,
    };
};
