"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { PATH_PRIVATE_GALLERY } from '@/constants/paths';
import { useDispatch } from 'react-redux';
import { persistor, resetAll } from '../../store/store';
import { Trans, useTranslation } from 'react-i18next';


/**
 * 
 * @returns a JSX component to render the ID form to access the private gallery
 */
const TravelMemoriesAccessForm = () => {
    const { t } = useTranslation();
    const [galleryId, setGalleryId] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();

    //Redirect to the corresponding page 
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (galleryId) {
            router.push(`${PATH_PRIVATE_GALLERY}${galleryId}`);
        }
    };


    //Reinitialize the redux store when loading component
    useEffect(() => {
        const resetStore = async () => {
            await persistor.purge(); //Delete the data in navigator storage
            dispatch(resetAll()); // Reset all the redux store
        };

        resetStore();
    }, [dispatch]);

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a6c9e2] text-lg text-center"
                type="text"
                placeholder={t("landingPage.inputPlaceholder")}
                value={galleryId}
                onChange={(e) => setGalleryId(e.target.value)}
            ></input>
            <button className="w-full p-3 bg-[#b4e1b9] text-white rounded-xl text-lg font-semibold hover:bg-[#98d4a9] transition-all"
                type="submit">
                <Trans i18nKey="landingPage.buttonText"
                    defaults="View Now !"
                />
            </button>
        </form>
    )
}

export default TravelMemoriesAccessForm