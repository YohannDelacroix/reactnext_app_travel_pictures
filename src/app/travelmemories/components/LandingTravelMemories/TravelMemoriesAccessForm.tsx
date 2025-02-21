"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { PATH_PRIVATE_GALLERY } from '@/constants/paths';

const TravelMemoriesAccessForm = () => {
    const [galleryId, setGalleryId] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (galleryId) {
            router.push(`${PATH_PRIVATE_GALLERY}${galleryId}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a6c9e2] text-lg text-center"
                type="text"
                placeholder="Entrez l'ID de votre galerie"
                value={galleryId}
                onChange={(e) => setGalleryId(e.target.value)}
            ></input>
            <button className="w-full p-3 bg-[#b4e1b9] text-white rounded-xl text-lg font-semibold hover:bg-[#98d4a9] transition-all"
                type="submit">
                Watch it !
            </button>
        </form>
    )
}

export default TravelMemoriesAccessForm