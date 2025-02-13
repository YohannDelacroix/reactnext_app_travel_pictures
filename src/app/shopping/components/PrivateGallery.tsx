"use client"
import React from 'react'
import CardImage from "@/app/shopping/components/CardImage/CardImage"
import staticPrivateGallery from "@/../data/staticPrivateGallery.json"
import { parentSrcType } from "../types/parentSrcType";
import SideBar from "@/app/shopping/components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { setSessionInfo } from "../store/gallerySlice";
import { setCart } from "../store/cartSlice";
import Link from 'next/link';
import LinkButton, { buttonType } from './LinkButton';
import { ShootingInfo } from '../types/galleryTypes';

const PrivateGallery = ({ id }: { id: string }) => {
    //Ensure CardImage will work for PrivateGallery uses
    const parentSrc = parentSrcType.PRIVATE_GALLERY;

    const dispatch = useDispatch<AppDispatch>();
    const photos = useSelector((state: RootState) => state.gallery.photos);
    const { city, country, modelName } = useSelector((state: RootState) => state.gallery.shootingInfo);


    //Only for debugging
    const selectedPhotos = useSelector((state: RootState) => state.cart.selectedPhotos);
    useEffect(() => {
        console.log("seelcted photos ", selectedPhotos)
    }, [selectedPhotos])

    const prices = useSelector((state: RootState) => state.cart.prices);
    useEffect(() => {
        console.log("prices ", prices)
    }, [prices])

    useEffect(() => {
        console.log("id = ", id);
    }, [id])
    //Only for debugging

    useEffect(() => {
        /**
        * call the database to load the session info (photos, name, country, ...)
        * store the datas in the redux store
        * @param id relative to the photo session with the clients
        */
        const fetchGalleryData = async (id: string) => {
            //let url = ""
            //const response = await fetch(url); 
            //const data = await response.json();

            const data = staticPrivateGallery;

            if (data) {
                //Only for debugging and test the ID param page, waiting for database implementation
                const shootingInfo: ShootingInfo = { ...data.shootingInfo, id: id }
                console.log("shootingInfo = ", shootingInfo);
                //Only -----TO REMOVE LATER--------------------

                // Updates redux state with main data : photos and shooting info
                dispatch(setSessionInfo({ photos: data.photos, shootingInfo: shootingInfo }));

                //Define the number of photos and define prices
                console.log("data.ph=", data.photos.length)
                dispatch(setCart({ basePrice: data.unitPrice, numberOfPhotos: data.photos.length }))
            }
        };

        fetchGalleryData(id);
    }, []);


    return (
        <form className="flex flex-col gap-y-2 text-[3vw]">
            <h2 className="text-[4vw] font-bold">Welcome to your private gallery! </h2>
            <p>
                You can watch and enjoy the pictures of your last trip in <b>{city}</b>, <b>{country}</b>.
            </p>
            <p>
                Now, review the gallery and select the pictures you want to buy and keep forever. The more you buy, the more the price is decreasing. 
            </p>
            <p>
                I really thank you {modelName} because you help me living and i hope you will find it incredible !
            </p>
            {/* Image Card (render with a map)*/}
            {
                photos.map((photo, index) => {
                    return (
                        <CardImage
                            parentSrc={parentSrc}
                            photo={photo}
                            key={index}
                            index={index}
                        />
                    )
                }
                )
            }

            <SideBar parentSrc={parentSrc} />
        </form>
    );
}

export default PrivateGallery