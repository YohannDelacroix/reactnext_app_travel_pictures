import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import LinkButton, { buttonType } from './LinkButton'

/**
 * TODO
 * @returns a JSX element rendering the header of the private shopping gallery
 */
const GalleryHeader = () => {
    const sessionInfo = useSelector((state: RootState) => state.gallery);
    const { maxPrice } = useSelector((state: RootState) => state.cart);

    return (
        <div className="flex flex-col relative text-[3vw] border-b border-solid border-black py-4 mb-5">
            <h1>Hello {sessionInfo.shootingInfo.modelName}</h1>
            <p>Your pictures are ready to be downloaded</p>

            <div className="absolute right-0 top-0">
                <select>
                    <option>EN</option>
                    <option>FR</option>
                    <option>ES</option>
                    <option>DE</option>
                    <option>IT</option>
                </select>
            </div> 

            <p className="text-center">Get the best deal and purchase the entire collection!</p>
            <LinkButton href="/shopping/cart/payment"
                type={buttonType.GET_THE_BEST_DEAL}>
                GET ALL PHOTOS FOR ONLY {maxPrice.toFixed(2)}€
            </LinkButton>
        </div>
    )
}

export default GalleryHeader