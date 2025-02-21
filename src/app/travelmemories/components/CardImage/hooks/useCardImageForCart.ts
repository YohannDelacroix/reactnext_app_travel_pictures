import { removePhoto } from "@/app/travelmemories/store/cartSlice";
import { AppDispatch } from "@/app/travelmemories/store/store";
import { useState } from "react";
import { useDispatch } from "react-redux";


/**
 * Custom hook for managing the images in the ImageCard component when Cart is the caller.
 * 
 */
function useCardImageForCart() {
    const [removeConfirmation, setRemoveConfirmation] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    /*
    *   Method: handleToggleRemoveConfirmation   
    *   Display a confirmation before the user delete a photo
    */
    const handleToggleRemoveConfirmation = () => {
        setRemoveConfirmation((prevState) => !prevState)
    }

    /*
    *   Method: handleKeepPhoto                 
    *   Cancel the remove operation, nothing is done
    */
    const handleKeepPhoto = () => {
        setRemoveConfirmation(false);
    }

    /*
    *   Method: handleRemovePhoto                 
    *   Remove the photo from the shopping cart
    */
    const handleRemovePhoto = (id: string) => {
        dispatch(removePhoto(id));
        setRemoveConfirmation(false);
    }

    return {
        removeConfirmation,
        setRemoveConfirmation,
        handleToggleRemoveConfirmation,
        handleKeepPhoto,
        handleRemovePhoto
    }
}

export default useCardImageForCart;