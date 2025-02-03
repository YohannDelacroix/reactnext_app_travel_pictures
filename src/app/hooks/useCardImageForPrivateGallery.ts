import { useState } from "react";

/**
 * Custom hook for managing the images in the ImageCard componentn when Private Gallery is the caller.
 * 
 * This hook controls the state of whether an image is selected or not via checkboxes.
 * It provides functionality to handle checkbox changes and track the selection state.
 * 
 */

function useCardImageForPrivateGallery() {
    const [checked, setChecked] = useState(false);    //Control the pictures selected

    /*
    *   Method: handleChecking                  
    *   Manage the photo's checkboxes
    */
    const handleChecking = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setChecked(checked);
        console.log(name, checked);
    };

    return {
        checked, setChecked, handleChecking
    }
}

export default useCardImageForPrivateGallery;