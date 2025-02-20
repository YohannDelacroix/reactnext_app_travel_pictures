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
import LinkButton, { buttonType } from './LinkButton';
import { ShootingInfo, UserInfo } from '../types/galleryTypes';
import { FaRegTrashAlt } from "react-icons/fa";
import ShoppingGallery from './ShoppingGallery';
import { setUserInfo } from '../store/userSlice';
import { Trans, useTranslation } from 'react-i18next';

const PrivateGallery = ({ id }: { id: string }) => {
    //Ensure CardImage will work for PrivateGallery uses
    const parentSrc = parentSrcType.PRIVATE_GALLERY;

    const dispatch = useDispatch<AppDispatch>();
    const photos = useSelector((state: RootState) => state.gallery.photos);
    const { city, country, modelName } = useSelector((state: RootState) => state.gallery.shootingInfo);

    const { t } = useTranslation();


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

                const userInfo: UserInfo = { ...data.userInfo };
                console.log("userInfo = ", userInfo);
                //Only -----TO REMOVE LATER--------------------

                // Updates redux state with userInfo
                dispatch(setUserInfo(userInfo));

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
        <form className="flex flex-col gap-y-2">
            <h2 className="text-[4vw] font-bold">
                <Trans defaults="Welcome to your private gallery!" i18nKey="privateGallery.title" /> 
            </h2>
            <p>
                {/* You can watch and enjoy the pictures of your last trip in <b>{city}</b>, <b>{country}</b>. */}
                <Trans  i18nKey="privateGallery.p1" 
                        defaults="You can watch and enjoy the pictures of your last trip in <b>{{city}}</b>, <b>{{country}}</b>."
                        values={{ city, country }} 
                        components={{ 1: <b />, 3: <b /> }} />
            </p>
            <p>
                <Trans  i18nKey="privateGallery.p2"
                        defaults="Now, review the gallery and select the pictures you want to buy and keep forever. The more you buy, the more the price decreases."
                        />
            </p>
            <p>
                <Trans i18nKey="privateGallery.p3" 
                        defaults="I really thank you {{modelName}} because you help me living and i hope you will find it incredible !"
                        values={{ modelName }} 
                         />
            </p>

            <LinkButton
                type={buttonType.CLEAR}
            >
                <span className=""><FaRegTrashAlt /></span> 
                <Trans i18nKey="privateGallery.clear" 
                        defaults="Clear Selection"
                         />
            </LinkButton>

            <ShoppingGallery parentSrc={parentSrc}>
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
            </ShoppingGallery>
        </form>
    );
}

export default PrivateGallery