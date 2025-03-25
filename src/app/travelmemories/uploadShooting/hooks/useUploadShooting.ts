import { useState } from "react";
import axios from "axios";
import { Photo, ShootingInfo, UserInfo, getEmptyPhoto, getEmptyShootingInfo, getEmptyUserInfo } from '../../types/galleryTypes';

export const useUploadShooting = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [shootingInfo, setShootingInfo] = useState<ShootingInfo>(getEmptyShootingInfo);
    const [userInfo, setUserInfo] = useState<UserInfo>(getEmptyUserInfo);
    const [unitPrice, setUnitPrice] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [srcToFileNameMap, setSrcToFileNameMap] = useState<Map<string, string>>(new Map()); // Stores src → file.name mapping

    /**
     * Handle file input change and create Photo objects
     * @param event 
     */
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setFiles(filesArray);
            const newMap = new Map(srcToFileNameMap);

            // Create Photo objects for each file
            const newPhotos = filesArray.map((file) => {
                const src = URL.createObjectURL(file); // Temporary URL for display
                newMap.set(src, file.name); // Store src → file.name association
    
                return {
                    id: crypto.randomUUID(), // Generate a unique ID
                    title: file.name, // Temporarily use the file name as title
                    resolution: "",
                    description: "",
                    src, // Temporary URL
                };
            });

            setSrcToFileNameMap(newMap);
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

    const handleUnitPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUnitPrice(value);
    };
    /**
    * Uploads photos to AWS S3 with a given shooting ID
    * @param shootingId - The unique ID of the shooting session
    * @returns A list of S3 paths corresponding to uploaded photos
    */
    const uploadPhotosOnS3 = async (shootingId: string) => {
        if (!shootingId) {
            console.error("Error: No shooting ID provided.");
            alert("Internal error: Missing shooting ID.");
            return null;
        }

        if (files.length === 0) {
            alert("Please select at least one image.");
            return null;
        }

        const formData = new FormData();
        formData.append("shootingId", shootingId);
        files.forEach(file => formData.append("photos", file));

        try {
            // Upload photos to AWS
            const response = await axios.post("/api/uploadPhotos", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            // Update photo URLs after upload to AWS
            if (response.status === 200) {
                const uploadedPaths: { [key: string]: string } = response.data.paths;
                // uploadedPaths is an object like { "file_name1.jpg": "S3_path/file_name1.jpg", ... }
                console.log("uploadedPaths = ", uploadedPaths)
                return uploadedPaths;
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Error while sending the data.");
        }
    }

    /**
     * 
     * @param finalShootingData 
     * @returns a boolean that inform if the privateGallery have been add on the database
     */
    const saveShootingData = async (finalShootingData: any) => {
        try {
            const response = await axios.post("/api/privateGallery", finalShootingData);

            if (response.status === 201) {
                console.log("Shooting successfully saved:", response.data);
                return true;
            } else {
                console.error("Error saving shooting:", response.data);
                alert("Failed to save shooting data.");
            } 
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while saving the shooting data.");
        }

        return false;
    };

    /**
     * 
     * @returns false if the form contains errors and must be reviewed, otherwise returns true
     */
    const validateForm = () => {
        const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}$/;

        if (photos.length === 0) {
            alert("You must upload at least one photo.");
            return false;
        }

        if (!shootingInfo.modelName.trim() || !nameRegex.test(shootingInfo.modelName)) {
            alert("Model Name is required and must only contain letters, spaces, apostrophes, or hyphens.");
            return false;
        }

        if (!shootingInfo.city.trim() || !nameRegex.test(shootingInfo.city)) {
            alert("City is required and must only contain letters, spaces, apostrophes, or hyphens.");
            return false;
        }

        if (!shootingInfo.country.trim() || !nameRegex.test(shootingInfo.country)) {
            alert("Country is required and must only contain letters, spaces, apostrophes, or hyphens.");
            return false;
        }

        if (!userInfo.firstName.trim() || !nameRegex.test(userInfo.firstName)) {
            alert("First Name must only contain letters, spaces, apostrophes, or hyphens.");
            return false;
        }

        if (!userInfo.lastName.trim() || !nameRegex.test(userInfo.lastName)) {
            alert("Last Name must only contain letters, spaces, apostrophes, or hyphens.");
            return false;
        }

        if (!userInfo.email.trim() || !emailRegex.test(userInfo.email)) {
            alert("Invalid email format. Please enter a valid email (example: name@domain.com).");
            return false;
        }

        if (!/^\d*\.?\d+$/.test(unitPrice)) {
            alert("Please enter a valid positive number for unit price.");
            try{
                Number(unitPrice)
            }catch(error){
                alert("Conversion to number failed")
                return false;
            }
            return false;
        }
        
        return true;
    };

    /**
     * Handle upload of photos to AWS and save to Firebase
     */
    const handleUpload = async () => {
        setLoading(true);

        //Checking form validity
        if (!validateForm()) {
            setLoading(false);
            return; // Stop the process if validation fails
        }

        try {
            // Request a unique ID from the backend
            const idResponse = await fetch("/api/generateShootingId", { method: "POST" });
            const { shootingId } = await idResponse.json();
            if (!shootingId) throw new Error("Failed to generate ID");

            console.log("Generated shooting ID:", shootingId);

            // Upload photos to AWS using this ID
            const uploadedPathNames = await uploadPhotosOnS3(shootingId);
            if (!uploadedPathNames) throw new Error("Upload failed");

            // Inject shootingId into shootingInfo
            const updatedShootingInfo = { ...shootingInfo, id: shootingId };

            // Construct final data object
            const finalShootingData = {
                photos: photos.map(photo => {
                    const originalFileName = srcToFileNameMap.get(photo.src); // 🔹 Retrieve original file name
                    console.log("origi = ", originalFileName)
                    
                    if (!originalFileName || !uploadedPathNames[originalFileName]) {
                        throw new Error(`Missing path for photo: ${photo.title || "Untitled"}`);
                    }
    
                    return {
                        ...photo,
                        src: uploadedPathNames[originalFileName] // 📌 Assign the correct S3 path
                    };
                }),
                shootingInfo: updatedShootingInfo,
                unitPrice: Number(unitPrice),
                userInfo
            };

            const saveShooting = await saveShootingData(finalShootingData);
            if (saveShooting) {
                //Displays the imported gallery on screen and remove the form
            }

        } catch (error) {
            console.error("Error during upload:", error);
            alert("An error occurred during upload.");
        } finally {
            setLoading(false);
        }
    };

    // Return all states and functions for use in the calling component
    return {
        files,
        photos,
        shootingInfo,
        userInfo,
        unitPrice,
        loading,
        handleUnitPrice,
        handleFileChange,
        handlePhotoChange,
        handleShootingInfoChange,
        handleUserInfoChange,
        handleUpload,
    };
};
