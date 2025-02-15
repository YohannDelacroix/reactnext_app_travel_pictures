"use client"
import React, { useEffect, useState } from 'react'
import { parentSrcType } from '../types/parentSrcType'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import classNames from 'classnames';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import LinkButton, { buttonType } from './LinkButton';

interface SideBarProps {
    parentSrc: parentSrcType;
}

const SideBar = ({ parentSrc }: SideBarProps) => {
    const [isShrunk, setIsShrunk] = useState(false); // Par défaut, elle est rétrécie
    const galleryId = useSelector((state: RootState) => state.gallery.shootingInfo.id); 

    const { totalPrice, maxPrice, savedPrice, totalPriceBeforeDiscount } = useSelector((state: RootState) => state.cart);


    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;  //Visible height 
            const pageHeight = document.documentElement.scrollHeight;  //Total height 
            const currentScrollY = window.scrollY;  //Actual position relative to top (0)
            const sideBar = document.getElementById("sidebar");

            if (sideBar) {
                //console.log("sideBar.scrollHeight", sideBar.scrollHeight)
                //console.log("windowHeight", windowHeight)
                //console.log("currentScrollY", currentScrollY, " VS pageHeight", pageHeight);
                if (currentScrollY > pageHeight - windowHeight - sideBar.scrollHeight) {
                    setIsShrunk(false);
                } else {
                    setIsShrunk(true);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div id="sidebar"
            className={classNames(
                "flex flex-col items-center gap-y-4 p-8 overflow-visible bg-black bg-opacity-50 text-[#f0e4d7]",
                "lg:sticky lg:top-1 lg:min-w-[25%] lg:p-4 lg:gap-y-4",
                { "sticky bottom-0": parentSrc === parentSrcType.PRIVATE_GALLERY }
            )}>

            {parentSrc === parentSrcType.CART &&
                <div className="flex flex-col items-center gap-y-1 w-full mb-5
                                lg:hidden">
                    <p className="text-center">Get the best deal and purchase the entire collection!</p>
                    <LinkButton href="/shopping/cart/payment"
                        type={buttonType.GET_THE_BEST_DEAL}>
                        GET ALL PHOTOS FOR ONLY {maxPrice.toFixed(2)}€
                    </LinkButton>
                </div>
            }

            <div className={classNames(
                "flex flex-col items-center gap-y-1 w-full ",
                "lg: gap-y-4",
                { "mb-5": parentSrc === parentSrcType.CART }
            )}>
                <h2 className="text-center font-bold whitespace-nowrap
                                ">🎯 Your Order Summary 🎯</h2>

                <p className='w-full'>Congratulations! You saved <span className="text-mygreen text-[1.5rem] font-bold">{savedPrice.toFixed(2)}€</span> on your order!</p>
                <div className="flex justify-between items-end w-full
                                lg:flex-col">
                    <span className="lg:self-start">Total before discount:</span>
                    <span className="leading-[1rem] line-through text-red-500">{totalPriceBeforeDiscount.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between items-center w-full
                                lg:flex-col lg:items-end">
                    <span className="lg:self-start">Total:</span>
                    <span className="text-mygreen text-[1.5rem] font-bold">{totalPrice.toFixed(2)}€</span>
                </div>
            </div>

            {parentSrc === parentSrcType.CART ?
                <div className="flex flex-col items-center gap-y-3 w-full text-center">
                    <p className="text-[0.7rem]">🔒 Secure payment with SSL encryption.</p>
                    <LinkButton href="/shopping/cart/payment"
                        type={buttonType.NEXT}>
                        PROCEED TO CHECKOUT
                    </LinkButton>
                    <p className="text-[0.7rem]">📩 Instant delivery! Your download link will be sent via email.</p>
                </div>
                :
                <LinkButton href="/shopping/cart"
                    type={buttonType.NEXT}>
                    <span>GO TO CART</span><FaLongArrowAltRight />
                </LinkButton>


            }

            {parentSrc === parentSrcType.CART &&
                <LinkButton href={`/shopping/privateGallery/${galleryId}`}
                    type={buttonType.BACK}>
                    <FaLongArrowAltLeft /> Back to gallery
                </LinkButton>
            }

            {/* Fixed menu in CART mode */}
            {(isShrunk && parentSrc === parentSrcType.CART) && 
            <div className="fixed bottom-0 left-global2 right-global2 bg-black bg-opacity-50 text-[#f0e4d7]
                            lg:hidden">
                <div className="flex flex-col items-center gap-y-3 relative w-full my-10 px-4 text-center">
                    <p>🔒 Secure payment with SSL encryption.</p>
                    <LinkButton href="/shopping/cart/payment"
                        type={buttonType.NEXT}>
                        PROCEED TO CHECKOUT
                    </LinkButton>
                    <LinkButton href={`/shopping/privateGallery/${galleryId}`}
                        type={buttonType.BACK}>
                        <FaLongArrowAltLeft /> Back to gallery
                    </LinkButton>

                    <div className="flex justify-between items-center absolute right-global bottom-0 w-[40%]">
                        <span>Total:</span>
                        <span className="text-mygreen text-[4vw] font-bold">{totalPrice.toFixed(2)}€</span>
                    </div>
                </div>
            </div>}

        </div>
    )
}

export default SideBar