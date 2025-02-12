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
    const handleChecking = (e: React.ChangeEvent<HTMLInputElement>, photo: Photo) => {
        const { name, checked } = e.target;

        if(checked){ //The photo have been selected and need to be added
            dispatch(addPhoto(photo));
        }
        else{ //to be removed
            dispatch(removePhoto(photo.id));
        }

        setIsChecked(checked);
        console.log(name, checked); 
    };

    return {
        isChecked, setIsChecked, handleChecking
    }
}

export default useCardImageForPrivateGallery;