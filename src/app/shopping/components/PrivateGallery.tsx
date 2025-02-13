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

const PrivateGallery = () => {
    const parentSrc = parentSrcType.PRIVATE_GALLERY; //Ensure CardImage will work for PrivateGallery uses
    //const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const photos = useSelector((state: RootState) => state.gallery.photos)
    const { maxPrice } = useSelector((state: RootState) => state.cart);


    //Only for debugging
    const selectedPhotos = useSelector((state: RootState) => state.cart.selectedPhotos);
    useEffect(() => {
        console.log("seelcted photos ", selectedPhotos)
    }, [selectedPhotos])

    const prices = useSelector((state: RootState) => state.cart.prices);
    useEffect(() => {
        console.log("prices ", prices)
    }, [prices])
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
                // Updates redux state with main data : photos and shooting info
                dispatch(setSessionInfo({ photos: data.photos, shootingInfo: data.shootingInfo }));

                //Define the number of photos and define prices
                console.log("data.ph=", data.photos.length)
                dispatch(setCart({ basePrice: data.unitPrice, numberOfPhotos: data.photos.length }))
            }
        };

        fetchGalleryData("54646"); //Call with a fake id waiting backend implementation
    }, []);


    return (
        <form className="flex flex-col gap-y-2 text-[3vw]">
            <p className="text-center">Get the best deal and purchase the entire collection!</p>
            <LinkButton href="/shopping/cart/payment"
                type={buttonType.GET_THE_BEST_DEAL}>
                GET ALL PHOTOS FOR ONLY {maxPrice.toFixed(2)}€
            </LinkButton>

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