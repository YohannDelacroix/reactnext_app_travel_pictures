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

interface cardImageProps {
    // Main props
    index: number;          //Index of the photo in the gallery
    price: number;          //Price in euros
    src: string;            //Source file
    // Facultative props
    title?: string;         //Explicit title of the photo or nothing
    resolution?: string;    //Resolution like 6000x4000
    description?: string;   //Photo Description or nothing
}

const CardImage = ({ index, price, src, title, resolution, description }: cardImageProps) => {
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

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
        <div className='flex flex-col gap-y-2 w-full p-4 shadow-[0px_4px_8px_rgba(0,0,0,0.25)]'>
            <Image
                src={src}
                alt={description ? description : `photo-${index}`}
                width={16}
                height={9}
                sizes="100vw"
                className='w-full'
            ></Image>

            <div className="flex flex-col gap-y-2 text-[3vw]">
                <div className="flex flex-row justify-between max-w ">
                    <div className="flex flex-row items-start justify-start gap-x-2 max-w-[65%]">
                        <button type="button" onClick={toggleDescription}>X</button>
                        <h2 className={titleClass}>#{index} {title && <span> - {title}</span>}</h2>
                    </div>
                    <div className="flex flex-row self-start items-center justify-end gap-x-2">
                        <span><span>{price}€ - </span>{price}€</span>
                        <input
                            type="checkbox"
                            id={`check-photo-${index}`}
                            name={`check-photo-${index}`}
                            className="align-middle" />
                    </div>
                </div>
                {isDescriptionVisible && <div>
                    {resolution &&
                        <div className="flex flex-row justify-between"><b>Resolution :</b> <span>{resolution}</span></div>
                    }
                    {description &&
                        <div><b>Description :</b> <span className="italic text-[2vw]">{description}</span></div>
                    }
                </div>}
            </div>
        </div>
    )
}

export default CardImage