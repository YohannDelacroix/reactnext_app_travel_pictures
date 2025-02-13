"use client"
/* Component that render an image card to buy
*   PARAMS :
        INDEX
        TITLE (facultatif)
        PRICE
        RESOLUTION (facultatif)
        DESCRIPTION (facultatif)

*/
import Image from 'next/image';
import React, { useState } from 'react'
import classNames from 'classnames';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { parentSrcType } from '../../types/parentSrcType';
import useCardImageForPrivateGallery from "@/app/shopping/components/CardImage/hooks/useCardImageForPrivateGallery"
import useCardImageForCart from './hooks/useCardImageForCart';
import { Photo } from '../../types/galleryTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';


interface cardImageProps {
    //Configuration props
    parentSrc: parentSrcType;                   //Source component
    // Main props
    photo: Photo                                //Photo object
    index: number;                              //Index of the photo in the gallery
}

const CardImage = ({ index, photo, parentSrc }: cardImageProps) => {
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);    //Control the visibility of the description

    const { isChecked, handleChecking } = useCardImageForPrivateGallery();
    const { removeConfirmation, handleToggleRemoveConfirmation, handleKeepPhoto, handleRemovePhoto } = useCardImageForCart();

    const { selectedPhotos, prices } = useSelector((state: RootState) => state.cart);

    const isPhotoSelected = () => {
        return selectedPhotos.some((p) => p.id === photo.id)
    }

    const { unitPrice, currentUnitPrice } = useSelector((state: RootState) => state.cart);

    const titleClass = classNames(
        isDescriptionVisible ? "" : "truncate overflow-hidden whitespace-nowrap"
    );

    /*
    *   Method: ToggleDescription         
    */
    const toggleDescription = () => {
        setIsDescriptionVisible(prevIsDescriptionVisible => !prevIsDescriptionVisible);
    }


    // Find photo index in selectedPhotos
    const photoIndex = selectedPhotos.findIndex(p => p.id === photo.id);

    // Determines the price to display
    const priceToDisplay = photoIndex !== -1 ? prices[photoIndex] : currentUnitPrice;


    return (
        <div className={classNames(
            "flex flex-col gap-y-2 w-full p-global shadow-[0px_4px_8px_rgba(0,0,0,0.25)]",
            { "bg-[#B4E1B9]": isPhotoSelected() }
        )}>
            <div className="relative">
                {
                    removeConfirmation && <div className="w-[60%] p-3 flex flex-col justify-around gap-y-2 bg-[#A6C9E2] bg-opacity-60 absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-[2vw]">
                        <p className='text-center text-white'>Are you sure you want to remove this photo from your cart ?</p>
                        <div className="flex justify-around">
                            <button type="button"
                                className="block w-[33%] px-1 py-[0.5em] bg-[#B4E1B9]"
                                onClick={handleKeepPhoto}>Keep</button>
                            <button type="button"
                                className="block w-[33%] px-1 py-[0.5em] bg-[#D1B3E0]"
                                onClick={() => handleRemovePhoto(photo.id)}>Remove</button>
                        </div>
                    </div>
                }

                <Image
                    src={photo.src}
                    alt={photo.description ? photo.description : `photo-${index}`}
                    width={16}
                    height={9}
                    sizes="100vw"
                    className='w-full'
                ></Image>
            </div>


            <div className="flex flex-col gap-y-2 text-[3vw]">
                <div className="flex flex-row justify-between max-w ">
                    <div className="flex flex-row items-start justify-start gap-x-2 max-w-[65%]">
                        <button className="block h-3"
                            type="button"
                            onClick={toggleDescription}>
                            {isDescriptionVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </button>
                        <h2 className={titleClass}>#{index} {photo.title && <span> - {photo.title}</span>}</h2>
                    </div>
                    <div className="flex flex-row self-start items-center justify-end gap-x-2">
                        <span>
                            {unitPrice !== priceToDisplay && <span><span className='text-[2vw] leading-[3vw] line-through text-red-500'>{unitPrice.toFixed(2)}€</span> - </span>}
                            <span>
                                {priceToDisplay.toFixed(2)}€
                            </span>

                        </span>
                        {
                            parentSrc === parentSrcType.PRIVATE_GALLERY ?
                                <input
                                    type="checkbox"
                                    id={`check-photo-${index}`}
                                    name={`check-photo-${index}`}
                                    checked={isPhotoSelected()}
                                    onChange={(e) => handleChecking(e, photo)}
                                    className="align-middle w-[1em]" />
                                :
                                <button onClick={handleToggleRemoveConfirmation}
                                    type="button"
                                >
                                    <ImCross className="text-red-500" />
                                </button>

                        }

                    </div>
                </div>
                {isDescriptionVisible && <div>
                    {photo.resolution &&
                        <div className="flex flex-row justify-between"><b>Resolution :</b> <span>{photo.resolution}</span></div>
                    }
                    {photo.description &&
                        <div><b>Description :</b> <p className="italic text-[2vw] text-justify">{photo.description}</p></div>
                    }
                </div>}
            </div>
        </div>
    )
}

export default CardImage