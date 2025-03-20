"use client"
import React from 'react'
import { useUploadShooting } from './hooks/useUploadShooting';

/**
 * 
 * @returns a form that the photographer fills to store the images on AWS and the data on Firebase
 */
const UploadShooting = () => {
    const {
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
    } = useUploadShooting();
    
    return (
        <form className="flex flex-col items-center">
            {/* Photo selection */}
            <input type="file" multiple onChange={handleFileChange} accept="image/*" />
            
            {/* Displaying previews */}
            {photos.length > 0 && <div className="flex flex-wrap gap-4 mt-4">
                {
                    photos.map((photo, index) => (
                        <div key={`${photo.id}-${index}`} className="flex flex-col items-center p-2 border rounded m-2">
                            <img src={photo.src}
                                alt={`Photo${index}`}
                                className="w-32 h-32 rounded" />

                            <input
                                type="text"
                                placeholder="Title"
                                value={photo.title}
                                onChange={(e) => handlePhotoChange(index, "title", e.target.value)}
                                className="block mt-2 p-1"
                            />
                            <input
                                type="text"
                                placeholder="Resolution"
                                value={photo.resolution}
                                onChange={(e) => handlePhotoChange(index, "resolution", e.target.value)}
                                className="block mt-2 p-1"
                            />
                            <textarea
                                placeholder="Description"
                                value={photo.description}
                                onChange={(e) => handlePhotoChange(index, "description", e.target.value)}
                                className="block mt-2 p-1"
                            />
                        </div>
                    ))
                }
            </div>}

            {/* Shooting information */}
            <div className="mt-4">
                <h2>Shooting Information</h2>
                <input type="text" placeholder="Model Name" value={shootingInfo.modelName} onChange={(e) => handleShootingInfoChange("modelName", e.target.value)} className="border p-1 mt-1" />
                <input type="text" placeholder="Country" value={shootingInfo.country} onChange={(e) => handleShootingInfoChange("country", e.target.value)} className="border p-1 mt-1" />
                <input type="text" placeholder="City" value={shootingInfo.city} onChange={(e) => handleShootingInfoChange("city", e.target.value)} className="border p-1 mt-1" />
            </div>

            {/* User information */}
            <div className="mt-4">
                <h2>User Information</h2>
                <input type="text" placeholder="First Name" value={userInfo.firstName} onChange={(e) => handleUserInfoChange("firstName", e.target.value)} className="border p-1 mt-1" />
                <input type="text" placeholder="Last Name" value={userInfo.lastName} onChange={(e) => handleUserInfoChange("lastName", e.target.value)} className="border p-1 mt-1" />
                <input type="email" placeholder="Email" value={userInfo.email} onChange={(e) => handleUserInfoChange("email", e.target.value)} className="border p-1 mt-1" />
            </div>

            {/* Unit price */}
            <div className="mt-4">
                <h2>Unit Price</h2>
                <input type="number" value={unitPrice} onChange={(e) => setUnitPrice(Number(e.target.value))} className="border p-1 mt-1" />
            </div>

            {/* Submit button */}
            <button
                onClick={handleUpload}
                disabled={loading}
                className="mt-2 p-2 bg-blue-500 text-white rounded"
                type="button"
            >
                {loading ? "Uploading..." : "Upload"}
            </button>
        </form>
    )
}

export default UploadShooting
