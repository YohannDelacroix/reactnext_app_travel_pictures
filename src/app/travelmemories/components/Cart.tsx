"use client"
import React from 'react'
import CardImage from "@/app/travelmemories/components/CardImage/CardImage";
import { parentSrcType } from "../types/parentSrcType";
import SideBar from "@/app/travelmemories/components/SideBar";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import LinkButton, { buttonType } from './LinkButton';
import { FaRegTrashAlt } from "react-icons/fa";
import Gallery from './ShoppingGallery';

const Cart = () => {
    const parentSrc = parentSrcType.CART; //Ensure CardImage will work for PrivateGallery uses
    const selectedPhotos = useSelector((state: RootState) => state.cart.selectedPhotos);

    const galleryId = useSelector((state: RootState) => state.gallery.shootingInfo.id);


    return (
        <form className="flex flex-col gap-y-2">

            <p className="text-center
                            md:text-left">Review your selected photos and complete your order.</p>
            <p className="text-center
                            md:text-left">⏳ You can modify your selection before checkout.</p>

            <LinkButton
                href={`/shopping/privateGallery/${galleryId}`}
                type={buttonType.CLEAR}
            >
                <span className="absolute left-3"><FaRegTrashAlt /></span> Clear Cart
            </LinkButton>

            <Gallery parentSrc={parentSrc}>
                {/* Image Card (render with a map)*/}
                {
                    selectedPhotos.map((photo, index) => {
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
            </Gallery>
        </form>
    );
}

export default Cart