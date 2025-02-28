/**
 * @component LinkButton
 * @description A reusable button component that wraps a Next.js <Link> 
 *              and applies different styles based on the provided button type.
 * 
 * @prop {string} href - The URL where the button navigates.
 * @prop {buttonType} type - Determines the button's appearance.
 * @prop {React.ReactNode} children - The content inside the button (text, icons, etc.).
 * 
 * @enum {string} buttonType
 * @property {string} NEXT - Standard green button to progress in the payment process
 * @property {string} BACK - Smaller blue button to navigate back in the process
 * @property {string} GET_THE_BEST_DEAL - Larger bold button to emphasize an offer
 * @property {string} CLEAR - Red button allowing user to clear cart
 * 
 * @example
 * <LinkButton href="/next" type={buttonType.NEXT}>Next</LinkButton>
 * 
 * @returns {JSX.Element}
 */

import classNames from 'classnames';
import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { buyAllPhotos, resetCart } from '../store/cartSlice';

// Enum defining available button types
export enum buttonType {
    NEXT = "next",
    BACK = "back",
    GET_THE_BEST_DEAL = "get_the_best_deal",
    CLEAR = "clear",
    PAY_CB = "pay_cb",
    PAY_PAYPAL = "pay_paypal"
}

// Props definition for the LinkButton component
interface linkButtonProps {
    href?: string;                  // The destination URL - If not defined the link acts like a basic button
    type: buttonType;               // Defines the button's style
    children: React.ReactNode;      // Content inside the button (text, icons, etc.)
    width?: number;                 // Optionnal width for button
    disabled?: boolean;
}

const LinkButton = ({ children, href, type, width, disabled }: linkButtonProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const photos = useSelector((state: RootState) => state.gallery.photos);
    const selectedPhotosLength = useSelector((state: RootState) => state.cart.selectedPhotos.length);

    const handleClick = () => {
        if(!disabled){
            if (type === buttonType.GET_THE_BEST_DEAL) {
                dispatch(buyAllPhotos(photos));
            }
            else if (type === buttonType.CLEAR) {
                dispatch(resetCart());
            }
            else if (type === buttonType.PAY_CB){
                //TODO
            }
            else if (type === buttonType.PAY_PAYPAL){
                //TODO
            }
        }
    }

    const isVisible = !(type === buttonType.GET_THE_BEST_DEAL && selectedPhotosLength === photos.length);

    const commonClasses = classNames(
        //Common styles
        "block flex justify-center items-center gap-x-2 relative text-black text-center hover:brightness-95 transition-all",
        //Next buttons styles 
        { "w-full p-5 bg-mygreen": type === buttonType.NEXT },
        //Get the best deal buttons styles
        { "w-full font-bold p-4 bg-mygreen uppercase": type === buttonType.GET_THE_BEST_DEAL },
        //Back buttons styles  (mobile-first / desktop large screens)
        { "self-start w-full p-3 bg-myblue": type === buttonType.BACK },
        { "sm:w-[40%]": type === buttonType.BACK },
        { "lg:w-[100%] lg:max-w-[39vw]": type === buttonType.BACK }, 
        //Clear buttons styles (mobile-first / desktop large screens)
        { "self-end w-full p-3 bg-myred": type === buttonType.CLEAR },
        { "sm:w-[40%]": type === buttonType.CLEAR },
        { "lg:w-[25%]": type === buttonType.CLEAR },
        //Pay by CB button styles
        { "w-full bg-mygreen py-3 font-bold text-[1.5rem]": type === buttonType.PAY_CB},
        //Pay by Paypal button styles
        { "w-full bg-[#ffc439] py-3 font-bold text-[1.5rem]": type === buttonType.PAY_PAYPAL},
    );

    const customStyle = {
        ...(width ? { width: `${width}%` } : {}),
        ...(disabled ? { opacity: 0.5, cursor: 'default' } : {})
    };

    return (
        isVisible && (
            href && !disabled ? (
                <Link   href={href} 
                        className={commonClasses} 
                        onClick={handleClick} 
                        style={customStyle}>
                    {children}
                </Link>) : (
                <span   className={classNames(commonClasses, "inline-block cursor-pointer")} 
                        onClick={handleClick}
                        style={customStyle}>
                    {children}
                </span>
            )
        )
    )
}

export default LinkButton