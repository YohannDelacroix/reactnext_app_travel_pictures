"use client"
import Image from 'next/image';
import React from 'react'
import { useTranslation } from 'react-i18next';

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

const LanguageSelection = () => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language; // Récupère la langue actuelle

    const handleChangeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    }
    return (
        <div className="flex justify-end flex-wrap gap-x-1 max-w-[30%] absolute right-0 top-global">
            {
                flagIconsSrc.map((icon, index) => (
                    <label key={icon.id} className="cursor-pointer">
                        <input
                            type="radio"
                            name="language-selection"
                            id={`radio-lang-${icon.id}`}
                            className="hidden peer"
                            checked={currentLang === icon.id}
                            onChange={() => handleChangeLanguage(icon.id)}
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
    )
}

export default LanguageSelection