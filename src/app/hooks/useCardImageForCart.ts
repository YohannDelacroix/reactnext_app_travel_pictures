import { useState } from "react";


/**
 * Custom hook for managing the images in the ImageCard component when Cart is the caller.
 * 
 */
function useCardImageForCart() {
    const [removeConfirmation, setRemoveConfirmation] = useState(false);

    /*
    *   Method: handleToggleRemoveConfirmation   (only in Cart mode)
    *   Display a confirmation before the user delete a photo
    */
    const handleToggleRemoveConfirmation = () => {
        setRemoveConfirmation((prevState) => !prevState)
    }

    /*
    *   Method: handleKeepPhoto                 (only in Cart mode)
    *   Cancel the remove operation 
    */
    const handleKeepPhoto = () => {
        setRemoveConfirmation(false);
    }

    /*
    *   Method: handleRemovePhoto                 (only in Cart mode)
    *   Remove the photo from the shopping cart
    */
    const handleRemovePhoto = () => {
        //TODO
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