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
 * 
 * @example
 * <LinkButton href="/next" type={buttonType.NEXT}>Next</LinkButton>
 * 
 * @returns {JSX.Element}
 */

import classNames from 'classnames';
import Link from 'next/link'
import React from 'react'

// Enum defining available button types
export enum buttonType {
    NEXT = "next",
    BACK = "back",
    GET_THE_BEST_DEAL = "get_the_best_deal"
}

// Props definition for the LinkButton component
interface linkButtonProps {
    href: string;                   // The destination URL
    type: buttonType;               // Defines the button's style
    children: React.ReactNode;      // Content inside the button (text, icons, etc.)
}

const LinkButton = ({ children, href, type }: linkButtonProps) => {
    return (
        <Link 
            href={href}
            className={classNames(
                "flex justify-center items-center gap-x-2 text-black",
                { "w-full py-5 bg-mygreen " : type === buttonType.NEXT},
                { "w-full font-bold py-4 bg-mygreen  text-[3vw]" : type === buttonType.GET_THE_BEST_DEAL},
                { "self-start w-[40%] py-2 bg-myblue" : type === buttonType.BACK}
            )}
        >
            {children} {/* Renders the content inside the button */}
        </Link>
    )
}

export default LinkButton