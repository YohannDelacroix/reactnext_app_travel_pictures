"use client"
import React from 'react'
import CardImage from "@/app/shopping/components/CardImage"
import staticPrivateGallery from "@/../data/staticPrivateGallery.json"
import { parentSrcType } from "../types/parentSrcType";
import SideBar from "@/app/shopping/components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { setSessionInfo } from "../store/gallerySlice";
import { setTotalNumberOfPhotos, setUnitPrice } from "../store/cartSlice";
import { useRouter } from "next/router";

const PrivateGallery = () => {
    const parentSrc = parentSrcType.PRIVATE_GALLERY; //Ensure CardImage will work for PrivateGallery uses
    //const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const photos = useSelector((state: RootState) => state.gallery.photos)


    const selectedPhotos = useSelector((state: RootState) => state.cart.selectedPhotos);
    useEffect(() => {
        console.log("seelcted photos ", selectedPhotos)
    }, [selectedPhotos])

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

            /*let data = {
                photos: [],
                shootingInfo: {
                    id: "2354636",
                    modelName: "James Hetfield",
                    country: "Spain",
                    city: "Barcelona"
                },
                unitPrice: 8.99,
            }*/

            if (data) {
                // Met à jour Redux avec les photos et les infos du shooting
                dispatch(setSessionInfo({ photos: data.photos, shootingInfo: data.shootingInfo }));

                // Définir le prix unitaire et maximal
                const unitPrice = data.unitPrice ?? 10; // Valeur par défaut
                dispatch(setUnitPrice(unitPrice));

                //Define the number of photos
                dispatch(setTotalNumberOfPhotos(data.photos.length));

                //dispatch(setMaxPrice(data.photos.length * unitPrice));
            }
        };

        fetchGalleryData("54646"); //Call with a fake id to test
    }, []);


    return (
        <form className="flex flex-col gap-y-2 text-[3vw]">
            <p className="text-center">Get the best deal and purchase the entire collection!</p>
            <button className="bg-[#B4E1B9] font-bold py-4 text-[3vw]">GET ALL PHOTOS FOR ONLY 21,99€</button>

            {/* Image Card (render with a map)*/}
            {
                photos.map((photo, index) => {
                    return (
                        <CardImage
                            parentSrc={parentSrc}
                            photo={photo}
                            key={index}
                            index={index}
                            price={8.99}
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