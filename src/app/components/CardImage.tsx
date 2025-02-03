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
import { parentSrcForCardImageType } from '../types/parentSrcForCardImageType';
import useCardImageForPrivateGallery from "@/app/hooks/useCardImageForPrivateGallery"
import useCardImageForCart from '../hooks/useCardImageForCart';


interface cardImageProps {
    //Configuration props
    parentSrc: parentSrcForCardImageType;       //Source component
    // Main props
    index: number;                              //Index of the photo in the gallery
    price: number;                              //Price in euros
    src: string;                                //Source file
    // Facultative props
    title?: string;                             //Explicit title of the photo or nothing
    resolution?: string;                        //Resolution like 6000x4000
    description?: string;                       //Photo Description or nothing
}

const CardImage = ({ index, price, src, title, resolution, description, parentSrc }: cardImageProps) => {
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);    //Control the visibility of the description
    
    const { checked, handleChecking } = useCardImageForPrivateGallery();
    const { removeConfirmation, handleToggleRemoveConfirmation, handleKeepPhoto, handleRemovePhoto} = useCardImageForCart();


    const titleClass = classNames(
        isDescriptionVisible ? "" : "truncate overflow-hidden whitespace-nowrap"
    );

    /*
    *   Method: ToggleDescription         
    */
    const toggleDescription = () => {
        setIsDescriptionVisible(prevIsDescriptionVisible => !prevIsDescriptionVisible);
    }

    return (
        <div className={classNames(
            "flex flex-col gap-y-2 w-full p-4 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]",
            { "bg-[#B4E1B9]": checked }
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
                                    onClick={handleRemovePhoto}>Remove</button>
                        </div>
                    </div>
                }

                <Image
                    src={src}
                    alt={description ? description : `photo-${index}`}
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
                        <h2 className={titleClass}>#{index} {title && <span> - {title}</span>}</h2>
                    </div>
                    <div className="flex flex-row self-start items-center justify-end gap-x-2">
                        <span><span className='text-[2vw] leading-[3vw] line-through text-red-500'>{price}€</span> - {price}€</span>
                        {
                            parentSrc === parentSrcForCardImageType.PRIVATE_GALLERY ?
                                <input
                                    type="checkbox"
                                    id={`check-photo-${index}`}
                                    name={`check-photo-${index}`}
                                    onChange={handleChecking}
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
                    {resolution &&
                        <div className="flex flex-row justify-between"><b>Resolution :</b> <span>{resolution}</span></div>
                    }
                    {description &&
                        <div><b>Description :</b> <p className="italic text-[2vw] text-justify">{description}</p></div>
                    }
                </div>}
            </div>
        </div>
    )
}

export default CardImage