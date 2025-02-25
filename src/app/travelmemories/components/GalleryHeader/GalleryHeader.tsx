import React from 'react'
import PrivateGalleryHeader from './PrivateGalleryHeader';
import LanguageSelection from './LanguageSelection';



/**
 * 
 * @returns a JSX element rendering the header visible in all the TravelMemories section
 */
const GalleryHeader = () => {
   

    return (
        <div className="flex flex-col gap-y-3 relative border-b border-solid border-black py-4 mb-5">
            <h1 className="text-[6vw]">Travel Memories</h1>
            <LanguageSelection />
            <PrivateGalleryHeader />
        </div>
    )
}

export default GalleryHeader