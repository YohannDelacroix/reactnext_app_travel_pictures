"use client"
import React, { useState } from 'react'
import CardImage from "@/app/travelmemories/components/CardImage/CardImage"
import staticPrivateGallery from "@/../data/staticPrivateGallery.json"
import { parentSrcType } from "../types/parentSrcType";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, persistor, resetAll, RootState } from "../store/store";
import { useEffect } from "react";
import { setSessionInfo } from "../store/gallerySlice";
import { setCart } from "../store/cartSlice";
import LinkButton, { buttonType } from './LinkButton';
import { ShootingInfo, UserInfo } from '../types/galleryTypes';
import { FaRegTrashAlt } from "react-icons/fa";
import ShoppingGallery from './ShoppingGallery';
import { setUserInfo } from '../store/userSlice';
import { Trans, useTranslation } from 'react-i18next';
import axios from 'axios';
import Loading from './Loading/Loading';
import { redirect } from 'next/navigation';
import { DOMAIN_PATH, PATH_LANDING_TRAVEL_MEMORIES } from '@/constants/paths';
import Modal from './Modal';

const PrivateGallery = ({ id }: { id: string }) => {
    //Ensure CardImage will work for PrivateGallery uses
    const parentSrc = parentSrcType.PRIVATE_GALLERY;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const dispatch = useDispatch<AppDispatch>();
    const photos = useSelector((state: RootState) => state.gallery.photos);
    const { city, country, modelName } = useSelector((state: RootState) => state.gallery.shootingInfo);

    //Declare the hook translation, enabling <Trans> to work correctly
    useTranslation();

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

            try {
                let data = undefined;

                console.log("process.env.static_mode = ", process.env.NEXT_PUBLIC_STATIC_MODE)

                if (process.env.NEXT_PUBLIC_STATIC_MODE === "true") {
                    console.log("IF VRAI")
                    data = staticPrivateGallery;
                } else {
                    const response = await axios.get(`${DOMAIN_PATH}api/privateGallery/${id}`);
                    data = response.data;
                }

                // Updates redux state with userInfo
                dispatch(setUserInfo(data.userInfo));

                // Updates redux state with main data : photos and shooting info
                dispatch(setSessionInfo({ photos: data.photos, shootingInfo: data.shootingInfo }));

                //Define the number of photos and define prices
                dispatch(setCart({ basePrice: data.unitPrice, numberOfPhotos: data.photos.length }))

            } catch (err) {
                setError("Failed to fetch gallery data.");
                console.error("Error fetching gallery:", err);
            } finally {
                setLoading(false);
            }

            /*
            if (process.env.STATIC_MODE) {
                const data = staticPrivateGallery;

                if (data) {
                    //Only for debugging and test the ID param page, waiting for database implementation
                    const shootingInfo: ShootingInfo = { ...data.shootingInfo, id: id }
                    //console.log("shootingInfo = ", shootingInfo);

                    const userInfo: UserInfo = { ...data.userInfo };
                    //console.log("userInfo = ", userInfo);
                    //Only -----TO REMOVE LATER--------------------

                    // Updates redux state with userInfo
                    dispatch(setUserInfo(userInfo));

                    // Updates redux state with main data : photos and shooting info
                    dispatch(setSessionInfo({ photos: data.photos, shootingInfo: shootingInfo }));

                    //Define the number of photos and define prices
                    //console.log("data.ph=", data.photos.length)
                    dispatch(setCart({ basePrice: data.unitPrice, numberOfPhotos: data.photos.length }))
                }
            }
            else {

                try {
                    const response = await axios.get(`/api/privateGallery/${id}`);
                    //setGalleryData(response.data);

                    // Updates redux state with userInfo
                    dispatch(setUserInfo(response.data.userInfo));

                    // Updates redux state with main data : photos and shooting info
                    dispatch(setSessionInfo({ photos: response.data.photos, shootingInfo: response.data.shootingInfo }));

                    //Define the number of photos and define prices
                    dispatch(setCart({ basePrice: response.data.unitPrice, numberOfPhotos: response.data.photos.length }))

                } catch (err) {
                    setError("Failed to fetch gallery data.");
                    console.error("Error fetching gallery:", err);
                } finally {
                    setLoading(false);
                }



            }*/


        };

        fetchGalleryData(id);
    }, [dispatch, id]);

    if (loading) return <Loading />

    if (error) {
        //Redirect to the landing page
        const handleRedirect = () => {
            setLoading(true);
            redirect(PATH_LANDING_TRAVEL_MEMORIES)
        }

        //Store reset in case of another one is already loaded in memory
        const resetStore = async () => {
            await persistor.purge(); //Delete the data in navigator storage
            dispatch(resetAll()); // Reset all the redux store
        };
        resetStore()

        return <Modal isOpen={true} handleClose={handleRedirect}>
            <div className='flex flex-col justify-around items-center min-h-full text-center'>
                <p>Unable to load privateGallery page</p>

                <button className="block w-[33%] px-1 py-[0.5em] bg-[#B4E1B9] hover:brightness-95 transition-all" onClick={handleRedirect}>
                    Retry
                </button>
            </div>
        </Modal>
    }
    //if(error) return <p className='w-full text-center text-red-500'>Unable to load privateGallery page</p>

    return (
        <form className="flex flex-col gap-y-2">
            <h2 className="text-[4vw] font-bold">
                <Trans defaults="Welcome to your private gallery!" i18nKey="privateGallery.title" />
            </h2>
            <p>
                {/* You can watch and enjoy the pictures of your last trip in <b>{city}</b>, <b>{country}</b>. */}
                <Trans i18nKey="privateGallery.p1"
                    defaults="You can watch and enjoy the pictures of your last trip in <b>{{city}}</b>, <b>{{country}}</b>."
                    values={{ city, country }}
                    components={{ 1: <b />, 3: <b /> }} />
            </p>
            <p>
                <Trans i18nKey="privateGallery.p2"
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