"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UploadShooting = () => {
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Veuillez sélectionner une image.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('photo', file); // Le nom 'photo' doit correspondre à celui du champ dans ton back-end

        try {
            const response = await axios.post('/api/uploadPhoto', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setImageUrl(response.data.imageUrl); // URL de l'image retournée par ton back-end
        } catch (error) {
            console.error('Erreur lors de l\'upload de l\'image', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("imageUrl = ", imageUrl)
    }, [imageUrl])

    return (
        <div className="flex flex-col items-center">
            <input type="file" onChange={handleFileChange} accept="image/*" />
            <button
                onClick={handleUpload}
                disabled={loading}
                className="mt-2 p-2 bg-blue-500 text-white rounded"
            >
                {loading ? "Téléchargement..." : "Uploader"}
            </button>
            {imageUrl && (
                <div className="mt-4">
                    <p>Image uploadée :</p>
                    <img src={imageUrl} alt="Uploaded" className="w-64 h-auto rounded" />
                    <p>{imageUrl}</p>
                </div>
            )}
        </div>
    )
}

export default UploadShooting