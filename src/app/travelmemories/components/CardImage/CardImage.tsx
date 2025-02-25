/**
 * @description Card image component renders an image card with different functionnalities wether the parent source is a privateGallery (Adding to the cart functions) or a cart (remove from cart).
 * 
 * @param parentSrc to identify which parent is calling the component
 * @param index photo index in the gallery
 * @param photo Photo object containing all the details related to the photo
 * @returns a Card image that display a photo and its metadata
 * 
 * @author Yohann Delacroix
 */

"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import classNames from 'classnames';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { parentSrcType } from '../../types/parentSrcType';
import useCardImageForPrivateGallery from "@/app/travelmemories/components/CardImage/hooks/useCardImageForPrivateGallery"
import useCardImageForCart from './hooks/useCardImageForCart';
import { Photo } from '../../types/galleryTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Modal from '../Modal';
import { Trans, useTranslation } from 'react-i18next';

interface cardImageProps {
    //Configuration props
    parentSrc: parentSrcType;                   //Source component
    // Main props
    photo: Photo                                //Photo object
    index: number;                              //Index of the photo in the gallery
}


const CardImage = ({ index, photo, parentSrc }: cardImageProps) => {
    //STATES
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false); //Control the visibility of the description
    const { selectedPhotos, prices } = useSelector((state: RootState) => state.cart);
    const { unitPrice, currentUnitPrice } = useSelector((state: RootState) => state.cart);

    //HOOKS
    const { handleChecking } = useCardImageForPrivateGallery();
    const { removeConfirmation, handleToggleRemoveConfirmation, handleKeepPhoto, handleRemovePhoto } = useCardImageForCart();

    //METHODS
    const isPhotoSelected = () => {
        return selectedPhotos.some((p) => p.id === photo.id)
    }

    const toggleDescription = () => {
        setIsDescriptionVisible(prevIsDescriptionVisible => !prevIsDescriptionVisible);
    }

    const titleClass = classNames(
        isDescriptionVisible ? "" : "truncate overflow-hidden whitespace-nowrap"
    );

    // Find photo index in selectedPhotos
    const photoIndex = selectedPhotos.findIndex(p => p.id === photo.id);

    // Determines the price to display
    const priceToDisplay = photoIndex !== -1 ? prices[photoIndex] : currentUnitPrice;

    //Declare the hook translation, enabling <Trans> to work correctly
    useTranslation();

    return (
        <div className={classNames(
            "flex flex-col gap-y-2 w-full p-global shadow-[0px_4px_8px_rgba(0,0,0,0.25)]",
            "md:max-w-[49%]",
            "lg:max-w-[49%]",
            { "bg-[#B4E1B9]": isPhotoSelected() }
        )}>
            <div className="relative">
                {
                    removeConfirmation &&
                    <Modal handleClose={handleKeepPhoto} isOpen={removeConfirmation}>
                        <p className='text-center'>
                            <Trans i18nKey="cardImage.removeMessage"
                                defaults="Are you sure you want to remove this photo from your cart ?"
                            />
                        </p>
                        <div className="flex justify-around">
                            <button type="button"
                                className="block w-[33%] px-1 py-[0.5em] bg-[#B4E1B9]"
                                onClick={handleKeepPhoto}>
                                <Trans i18nKey="cardImage.removeButtonKeep"
                                    defaults="Keep"
                                />
                            </button>
                            <button type="button"
                                className="block w-[33%] px-1 py-[0.5em] bg-[#D1B3E0]"
                                onClick={() => handleRemovePhoto(photo.id)}>
                                <Trans i18nKey="cardImage.removeButtonRemove"
                                    defaults="Remove"
                                />
                            </button>
                        </div>
                    </Modal>
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

            {/* Metadatas */}
            <div className="flex flex-col gap-y-2">
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
                            {unitPrice !== priceToDisplay && <span><span className='text-[0.5rem] leading-[1rem] line-through text-red-500'>{unitPrice.toFixed(2)}€</span> - </span>}
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
                                    <ImCross className="text-red-500 hover:text-red-700" />
                                </button>

                        }

                    </div>
                </div>
                {isDescriptionVisible && <div>
                    {photo.resolution &&
                        <div className="flex flex-row justify-between"><b>
                            <Trans i18nKey="cardImage.resolution"
                                defaults="Resolution:"
                            />
                        </b> <span>{photo.resolution}</span></div>
                    }
                    {photo.description &&
                        <div>
                            <b>
                                <Trans i18nKey="cardImage.description"
                                    defaults="Description:"
                                />
                            </b>
                            <p className="italic text-[0.5rem] text-justify">{photo.description}</p>
                        </div>
                    }
                </div>}
            </div>
        </div>
    )
}

export default CardImage