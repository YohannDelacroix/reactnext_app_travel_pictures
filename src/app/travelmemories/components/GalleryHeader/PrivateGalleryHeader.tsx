"use client"
import React from 'react'
import { useTranslation } from 'react-i18next';
import LinkButton, { buttonType } from '../LinkButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { PATH_PAYMENT } from '@/constants/paths';

/**
 * 
 * @returns a JSX element rendering the private Gallery header visible in all the private gallery section after the user have filled the ID
 */
const PrivateGalleryHeader = () => {
    const sessionInfo = useSelector((state: RootState) => state.gallery);
    const { maxPrice } = useSelector((state: RootState) => state.cart);

    const { t } = useTranslation();
    
    //Doesn't return anything if no ID is defined
    if(!sessionInfo.shootingInfo.id) return null;

    return (
        <div className="flex flex-col gap-y-3 
                            md:flex-row md:justify-between md:items-end
                            ">
            {/* Hello {sessionInfo.shootingInfo.modelName}, your pictures are ready ! */}
            <p>{t("galleryHeader.greeting", { modelName: sessionInfo.shootingInfo.modelName })}</p>

            <div className="md:w-[40%]">
                <LinkButton href={PATH_PAYMENT}
                    type={buttonType.GET_THE_BEST_DEAL}>
                    {t("galleryHeader.bestDealButtonText", { maxPrice: maxPrice.toFixed(2) })}
                    {/* GET ALL PHOTOS FOR ONLY {maxPrice.toFixed(2)}€ */}
                </LinkButton>
            </div>
        </div>
    )
}

export default PrivateGalleryHeader