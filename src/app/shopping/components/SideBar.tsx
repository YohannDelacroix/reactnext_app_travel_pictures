"use client"
import React, { useEffect, useState } from 'react'
import { parentSrcType } from '../types/parentSrcType'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import classNames from 'classnames';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface SideBarProps {
    parentSrc: parentSrcType;
}

const SideBar = ({ parentSrc }: SideBarProps) => {
    const [isShrunk, setIsShrunk] = useState(false); // Par défaut, elle est rétrécie
    const galleryId = 1; //Set to 1 before implementation

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
                "flex flex-col items-center gap-y-1 p-8 text-[3vw] overflow-visible bg-black bg-opacity-50 text-[#f0e4d7]",
                { "sticky bottom-0": parentSrc === parentSrcType.PRIVATE_GALLERY }
            )}>

            {parentSrc === parentSrcType.CART &&
                <div className="flex flex-col items-center gap-y-1 w-full my-20">
                    <p className="text-center">Get the best deal and purchase the entire collection!</p>
                    <Link   href="/shopping/cart/payment"
                            className="block w-[70%] bg-mygreen font-bold py-10 text-[3vw] text-black text-center"
                            /* TODO : onClick={handleBestDeal} */>
                                GET ALL PHOTOS FOR ONLY {maxPrice}€
                    </Link>
                </div>
            }

            <div className={classNames(
                "flex flex-col items-center gap-y-1 w-full ",
                { "my-20": parentSrc === parentSrcType.CART }
            )}>
                <h2 className="text-center font-bold">🎯 Your Order Summary 🎯</h2>

                <p className='w-full'>Congratulations! You saved <span className="text-mygreen text-[4vw] font-bold">{savedPrice}€</span> on your order!</p>
                <div className="flex justify-between items-end w-full">
                    <span>Total before discount:</span>
                    <span className="leading-[3vw] line-through text-red-500">{totalPriceBeforeDiscount}€</span>
                </div>
                <div className="flex justify-between items-center w-full">
                    <span>Total:</span>
                    <span className="text-mygreen text-[4vw] font-bold">{totalPrice}€</span>
                </div>
            </div>

            {parentSrc === parentSrcType.CART ?
                <div className="flex flex-col items-center gap-y-3 w-full my-20">
                    <p>🔒 Secure payment with SSL encryption.</p>
                    <Link   href="/shopping/cart/payment"
                            className="flex justify-center items-center gap-x-2 w-[90%] bg-mygreen py-14 text-black">
                        <span>PROCEED TO CHECKOUT</span>
                    </Link>
                    <p>📩 Instant delivery! Your download link will be sent via email.</p>
                </div>
                :
                <Link href="/shopping/cart" className="flex justify-center items-center gap-x-2 w-full bg-[#B4E1B9] py-2 text-black">
                    <span>GO TO CART</span><FaLongArrowAltRight />
                </Link>
            }

            {parentSrc === parentSrcType.CART &&
                <Link   href={`/shopping/privateGallery/${galleryId}`} 
                        className="flex justify-center items-center gap-x-2 self-start w-[40%] py-2 bg-myblue text-black">
                    <FaLongArrowAltLeft /> Back to gallery
                </Link>
            }

            {/* Fixed menu in CART mode */}
            {(isShrunk && parentSrc === parentSrcType.CART) && <div className="fixed bottom-0 left-global2 right-global2 bg-black bg-opacity-50 text-[#f0e4d7]">
                <div className="flex flex-col items-center gap-y-3 w-full my-20">
                    <p>🔒 Secure payment with SSL encryption.</p>
                    <Link href="/shopping/cart/payment"
                        className="flex justify-around items-center gap-x-2 w-[90%] bg-mygreen py-14 text-black">
                        <span>PROCEED TO CHECKOUT </span>
                    </Link>
                    <p>📩 Instant delivery! Your download link will be sent via email.</p>
                </div>
            </div>}

        </div>
    )
}

export default SideBar