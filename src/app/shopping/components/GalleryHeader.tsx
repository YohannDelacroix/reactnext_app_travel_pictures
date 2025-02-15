import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import LinkButton, { buttonType } from './LinkButton'
import Image from 'next/image';

interface flagIcon {
    id: string;         //A country code like fr, en, it
    src: string;        //Path to the icon
    alt: string;        //Alt attribute for Image
}

const flagIconsSrc: flagIcon[] = [
    { id: "fr", src: "/icons/flag_icons/fr.svg", alt: "FR" },
    { id: "de", src: "/icons/flag_icons/de.svg", alt: "DE" },
    { id: "en", src: "/icons/flag_icons/en.svg", alt: "EN" },
    { id: "it", src: "/icons/flag_icons/it.svg", alt: "IT" },
    { id: "es", src: "/icons/flag_icons/es.svg", alt: "ES" },
]


/**
 * TODO
 * @returns a JSX element rendering the header of the private shopping gallery
 */
const GalleryHeader = () => {
    const sessionInfo = useSelector((state: RootState) => state.gallery);
    const { maxPrice } = useSelector((state: RootState) => state.cart);
    const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

    return (
        <div className="flex flex-col gap-y-3 relative border-b border-solid border-black py-4 mb-5">
            <h1 className="text-[6vw]">Travel Memories</h1>
            

            <div className="flex justify-end flex-wrap gap-x-1 max-w-[30%] absolute right-0 top-global">
                {
                    flagIconsSrc.map((icon, index) => (
                        <label key={icon.id} className="cursor-pointer">
                            <input
                                type="radio"
                                name="language-selection"
                                id={`radio-lang-${icon.id}`}
                                className="hidden peer"
                                checked={selectedLanguage === icon.id}
                                onChange={() => setSelectedLanguage(icon.id)}
                            />
                            <Image
                                className="w-[4vw] transition-transform peer-checked:scale-110 hover:brightness-125"
                                src={icon.src}
                                alt={icon.alt}
                                width={40}
                                height={40}
                                sizes="100vw"
                            />
                        </label>
                    ))
                }
            </div>
            <div className="flex flex-col gap-y-3 
                            md:flex-row md:justify-between md:items-end
                            ">
            <p>Hello {sessionInfo.shootingInfo.modelName}, your pictures are ready !</p>

            
                <p className="hidden text-center">Get the best deal and purchase the entire collection!</p>
                <div className="md:w-[40%]">
                    <LinkButton href="/shopping/cart/payment"
                        type={buttonType.GET_THE_BEST_DEAL}>
                        GET ALL PHOTOS FOR ONLY {maxPrice.toFixed(2)}€
                    </LinkButton>
                </div>
            </div>
        </div>
    )
}

export default GalleryHeader