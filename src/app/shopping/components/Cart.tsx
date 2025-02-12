"use client"
import React from 'react'
import CardImage from "@/app/shopping/components/CardImage";
import { parentSrcType } from "../types/parentSrcType";
import SideBar from "@/app/shopping/components/SideBar";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Cart = () => {
    const parentSrc = parentSrcType.CART; //Ensure CardImage will work for PrivateGallery uses
    const selectedPhotos = useSelector((state: RootState) => state.cart.selectedPhotos);


    return (
        <form className="flex flex-col gap-y-2 text-[3vw]">
            <p className="text-center">Review your selected photos and complete your order.</p>
            <p className="text-center">⏳ You can modify your selection before checkout.</p>



            {/* Image Card (render with a map)*/}
            {
                selectedPhotos.map((photo, index) => {
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

export default Cart