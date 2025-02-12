"use client"
import React, { useEffect, useState } from 'react'
import { parentSrcType } from '../types/parentSrcType'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import classNames from 'classnames';
import Link from 'next/link';

interface SideBarProps {
    parentSrc: parentSrcType;
}

const SideBar = ({ parentSrc }: SideBarProps) => {
    const [isShrunk, setIsShrunk] = useState(false); // Par défaut, elle est rétrécie


    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;  //Visible height 
            const pageHeight = document.documentElement.scrollHeight;  //Total height 
            const currentScrollY = window.scrollY;  //Actual position relative to top (0)
            const sideBar = document.getElementById("sidebar");

            if(sideBar){
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
        <div    id="sidebar"
                className={classNames(
                    "flex flex-col items-center gap-y-1 p-8 text-[3vw] overflow-visible bg-black bg-opacity-50 text-[#f0e4d7]",
                    { "sticky bottom-0": parentSrc === parentSrcType.PRIVATE_GALLERY }
        )}>

            {parentSrc === parentSrcType.CART && 
                <div className="flex flex-col items-center gap-y-1 w-full my-20">
                    <p className="text-center">Get the best deal and purchase the entire collection!</p>
                    <button className="w-[70%] bg-mygreen font-bold py-10 text-[3vw] text-black">GET ALL PHOTOS FOR ONLY 21,99€</button>
                </div>
            }
                                                              
            <div    className={classNames(
                    "flex flex-col items-center gap-y-1 w-full ",
                    { "my-20": parentSrc === parentSrcType.CART }
            )}>
                <h2 className="text-center font-bold">🎯 Your Order Summary 🎯</h2>

                <p className='w-full'>Congratulations! You saved <span className="text-mygreen text-[4vw] font-bold">3€</span> on your order!</p>
                <div className="flex justify-between items-end w-full">
                    <span>Total before discount:</span>
                    <span className="leading-[3vw] line-through text-red-500">18.99€</span>
                </div>
                <div className="flex justify-between items-center w-full">
                    <span>Total:</span>
                    <span className="text-mygreen text-[4vw] font-bold">15,99€</span>
                </div>
            </div>

            {parentSrc === parentSrcType.CART ?
                <div className="flex flex-col items-center gap-y-3 w-full my-20">
                    <p>🔒 Secure payment with SSL encryption.</p>
                    <button className="flex justify-center items-center gap-x-2 w-[90%] bg-mygreen py-14 text-black">
                        <span>PROCEED TO CHECKOUT</span>
                    </button>
                    <p>📩 Instant delivery! Your download link will be sent via email.</p>
                </div>
                :
                <button className="flex justify-center items-center gap-x-2 w-full bg-[#B4E1B9] py-2 text-black">
                    <span><Link href="/shopping/cart">GO TO CART</Link></span><FaLongArrowAltRight />
                </button>
            }

            {parentSrc === parentSrcType.CART &&
                <button className="flex justify-center items-center gap-x-2 self-start w-[40%] py-2 bg-myblue text-black">
                    <FaLongArrowAltLeft /> Back to gallery
                </button>
            }

            {/* Fixed menu in CART mode */}
            {(isShrunk && parentSrc === parentSrcType.CART) && <div className="fixed bottom-0 left-global2 right-global2 bg-black bg-opacity-50 text-[#f0e4d7]">
                <div className="flex flex-col items-center gap-y-3 w-full my-20">
                    <p>🔒 Secure payment with SSL encryption.</p>
                    <button className="flex justify-around items-center gap-x-2 w-[90%] bg-mygreen py-14 text-black">
                        <span>PROCEED TO CHECKOUT </span>                        
                    </button>
                    <p>📩 Instant delivery! Your download link will be sent via email.</p>
                </div>
            </div>}

        </div>
    )
}

export default SideBar