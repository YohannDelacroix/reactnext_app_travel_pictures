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
    CLEAR = "clear"
}

// Props definition for the LinkButton component
interface linkButtonProps {
    href?: string;                  // The destination URL - If not defined the link acts like a basic button
    type: buttonType;               // Defines the button's style
    children: React.ReactNode;      // Content inside the button (text, icons, etc.)
}

const LinkButton = ({ children, href, type }: linkButtonProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const photos = useSelector((state: RootState) => state.gallery.photos);
    const selectedPhotosLength = useSelector((state: RootState) => state.cart.selectedPhotos.length);

    const handleClick = () => {
        if (type === buttonType.GET_THE_BEST_DEAL) {
            dispatch(buyAllPhotos(photos));
        }
        else if (type === buttonType.CLEAR) {
            dispatch(resetCart());
        }
    }

    const isVisible = !(type === buttonType.GET_THE_BEST_DEAL && selectedPhotosLength === photos.length);

    const commonClasses = classNames(
        "flex justify-center items-center gap-x-2 relative text-black text-center",
        { "w-full p-5 bg-mygreen": type === buttonType.NEXT },
        { "w-full font-bold p-4 bg-mygreen": type === buttonType.GET_THE_BEST_DEAL },
        { "self-start w-[40%] p-2 bg-myblue": type === buttonType.BACK },
        { "self-end w-[40%] p-2 bg-myred": type === buttonType.CLEAR }
    );

    return (
        isVisible && (
            href ? (
                <Link href={href} className={commonClasses} onClick={handleClick}>
                    {children}
                </Link>) : (
                <span className={classNames(commonClasses, "inline-block cursor-pointer")} onClick={handleClick}>
                    {children}
                </span>
            )
        )
    )
}

export default LinkButton