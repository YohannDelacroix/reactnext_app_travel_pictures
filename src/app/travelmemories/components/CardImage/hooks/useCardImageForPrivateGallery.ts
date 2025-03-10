import { useState } from "react";
import { Photo } from "../../../types/galleryTypes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { addPhoto, removePhoto } from "../../../store/cartSlice";


/**
 * Custom hook for managing the images in the ImageCard componentn when Private Gallery is the caller.
 * 
 * This hook controls the state of whether an image is selected or not via checkboxes.
 * It provides functionality to handle checkbox changes and track the selection state.
 * 
 */

function useCardImageForPrivateGallery() {
    const [isChecked, setIsChecked] = useState(false);    //Control the pictures selected
    const dispatch = useDispatch<AppDispatch>();

    /* 
    *   Method: handleChecking                  
    *   Manage the photo's checkboxes
    */
    const handleChecking = (e: React.ChangeEvent<HTMLInputElement> | boolean, photo: Photo) => {
        let checked: boolean;

        if (typeof e === "boolean") {
            checked = e; // Appel direct (depuis le clic sur la card)
        } else {
            checked = e.target.checked; // Appel depuis un input checkbox
        }

        if(checked){ //The photo have been selected and need to be added
            dispatch(addPhoto(photo));
        }
        else{ //to be removed
            dispatch(removePhoto(photo.id));
        }

        setIsChecked(checked);
    };

    return {
        isChecked, setIsChecked, handleChecking
    }
}

export default useCardImageForPrivateGallery;