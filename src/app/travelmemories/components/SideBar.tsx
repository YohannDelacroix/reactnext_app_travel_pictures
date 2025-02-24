"use client"
import React, { useEffect, useState } from 'react'
import { parentSrcType } from '../types/parentSrcType'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import LinkButton, { buttonType } from './LinkButton';
import { PATH_CART, PATH_PRIVATE_GALLERY, PATH_PAYMENT } from "@/constants/paths"
import { Trans, useTranslation } from 'react-i18next';

interface SideBarProps {
    parentSrc: parentSrcType;
}

const SideBar = ({ parentSrc }: SideBarProps) => {
    const [isShrunk, setIsShrunk] = useState(false); // Par défaut, elle est rétrécie
    const galleryId = useSelector((state: RootState) => state.gallery.shootingInfo.id);

    const { totalPrice, maxPrice, savedPrice, totalPriceBeforeDiscount, totalNumberPhotos } = useSelector((state: RootState) => state.cart);
    const purchasedPhotos: number = useSelector((state: RootState) => state.cart.selectedPhotos.length);

    const { t } = useTranslation();

    //Used to track when the fixed block appears on screen in mobile view
    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;  //Visible height 
            const pageHeight = document.documentElement.scrollHeight;  //Total height 
            const currentScrollY = window.scrollY;  //Actual position relative to top (0)
            const sideBar = document.getElementById("sidebar");

            if (sideBar) {
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
                "flex flex-col items-center gap-y-4 p-8 overflow-visible bg-black bg-opacity-50 text-[#f0e4d7] shadow-md rounded-lg",
                "lg:sticky lg:top-1 lg:min-w-[25%] lg:p-4 lg:gap-y-4",
                { "sticky bottom-0": parentSrc === parentSrcType.PRIVATE_GALLERY }
            )}>

            {/* PAYMENT SIDEBAR */}
            {
                parentSrc === parentSrcType.PAYMENT &&
                <div className="flex flex-col items-center w-full gap-y-2">
                    <h2 className="text-center font-bold">
                        <Trans i18nKey="sidebar.paymentTitle"
                            defaults="One Step Away from Your Photos!" />
                    </h2>
                    <div className="flex justify-between items-center w-full">
                        <span>
                            <Trans i18nKey="sidebar.numberPhotos"
                            defaults="Number of photos purchased:" />
                        </span>
                        <span>{purchasedPhotos}</span>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <span>{t("sidebar.total")}</span>
                        <span className="text-mygreen text-[1.5rem] font-bold">{totalPrice}€</span>
                    </div>
                    <p className="text-[0.7rem]">
                        <Trans i18nKey="sidebar.instantDelivery"
                            defaults="📩 Instant delivery! Your download link will be sent via email." />
                    </p>
                </div>
            }

            {/* GET THE BEST DEAL LinkButton */}
            {(parentSrc === parentSrcType.CART && purchasedPhotos !== totalNumberPhotos)&&
                <div className="flex flex-col items-center gap-y-1 w-full mb-5
                                lg:hidden">
                    <p className="text-center">
                        <Trans i18nKey="galleryHeader.bestDealText"
                                    defaults="Get the best deal and purchase the entire collection!" />
                    </p>
                    <LinkButton href={PATH_PAYMENT}
                        type={buttonType.GET_THE_BEST_DEAL}>
                        {t("galleryHeader.bestDealButtonText", { maxPrice: maxPrice.toFixed(2) })}
                        {/* GET ALL PHOTOS FOR ONLY {maxPrice.toFixed(2)}€ */}
                    </LinkButton>
                </div>
            }

            {/* Order Summary before Payment */}
            {
                (parentSrc === parentSrcType.CART || parentSrc === parentSrcType.PRIVATE_GALLERY) && (
                    <div className={classNames(
                        "flex flex-col items-center gap-y-1 w-full ",
                        "lg: gap-y-4",
                        { "mb-5": parentSrc === parentSrcType.CART }
                    )}>
                        <h2 className="text-center font-bold">

                            <Trans i18nKey="sidebar.orderSummary"
                                defaults="🎯 Your Order Summary 🎯" />
                        </h2>

                        <p className='w-full'>
                            <Trans i18nKey="sidebar.congratulations"
                                defaults="Congratulations! You saved <1>{{savedPrice}}€</1> on your order!"
                                values={{ savedPrice: savedPrice.toFixed(2) }}
                                components={{ 1: <span className="text-mygreen text-[1.5rem] font-bold" /> }} />
                        </p>
                        <div className="flex justify-between items-end w-full
                                        lg:flex-col">
                            <span className="lg:self-start">
                                <Trans i18nKey="sidebar.totalBeforeDiscount"
                                    defaults="Total before discount:" />
                            </span>
                            <span className="leading-[1rem] line-through text-red-500">{totalPriceBeforeDiscount.toFixed(2)}€</span>
                        </div>
                        <div className="flex justify-between items-center w-full
                                        lg:flex-col lg:items-end">
                            <span className="lg:self-start">
                                <Trans i18nKey="sidebar.total"
                                    defaults="Total:" />
                            </span>
                            <span className="text-mygreen text-[1.5rem] font-bold">{totalPrice.toFixed(2)}€</span>
                        </div>
                    </div>
                )
            }

            {/* Buttons - Proceed to Checkout (Cart mode) - Go to cart (Private Gallery mode) */}
            {(parentSrc === parentSrcType.CART || parentSrc === parentSrcType.PRIVATE_GALLERY) && (
                parentSrc === parentSrcType.CART ? (
                    <div className="flex flex-col items-center gap-y-3 w-full text-center">
                        <p className="text-[0.7rem]">
                            <Trans i18nKey="sidebar.securePayment"
                                defaults="🔒 Secure payment with SSL encryption." />
                        </p>
                        <LinkButton href={PATH_PAYMENT} type={buttonType.NEXT}>
                            <span className="uppercase">
                                <Trans i18nKey="sidebar.proceed"
                                    defaults="PROCEED TO CHECKOUT" />
                            </span>
                        </LinkButton>
                        <p className="text-[0.7rem]">
                            <Trans i18nKey="sidebar.instantDelivery"
                                defaults="📩 Instant delivery! Your download link will be sent via email." />
                        </p>
                    </div>
                ) : (
                    <LinkButton href={PATH_CART} type={buttonType.NEXT}>
                        <span className="uppercase">
                            <Trans i18nKey="sidebar.goToCart"
                                defaults="GO TO CART" />
                        </span> <FaLongArrowAltRight />
                    </LinkButton>
                )
            )}

            {/* Back buttons */}
            {(parentSrc === parentSrcType.CART || parentSrc === parentSrcType.PAYMENT) &&
                <LinkButton href={parentSrc === parentSrcType.CART ? `${PATH_PRIVATE_GALLERY}${galleryId}` : `${PATH_CART}`}
                    type={buttonType.BACK}>
                    <FaLongArrowAltLeft /> {parentSrc === parentSrcType.CART ? t("sidebar.BackToGalery") : t("sidebar.BackToCart")}
                </LinkButton>
            }

            {/* Fixed menu in CART mode */}
            {(isShrunk && parentSrc === parentSrcType.CART) &&
                <div className="fixed bottom-0 left-global2 right-global2 bg-black bg-opacity-50 text-[#f0e4d7]
                            lg:hidden">
                    <div className="flex flex-col items-center gap-y-3 relative w-full my-10 px-4 text-center">
                        <p>
                            <Trans i18nKey="sidebar.securePayment"
                                defaults="🔒 Secure payment with SSL encryption." />
                        </p>
                        <LinkButton href={PATH_PAYMENT}
                            type={buttonType.NEXT}>
                            <span className="uppercase">
                                <Trans i18nKey="sidebar.proceed"
                                    defaults="PROCEED TO CHECKOUT" />
                            </span>
                        </LinkButton>
                        <LinkButton href={`${PATH_PRIVATE_GALLERY}${galleryId}`}
                            type={buttonType.BACK}>
                            <FaLongArrowAltLeft /> {t("sidebar.BackToGalery")}
                        </LinkButton>

                        <div className="flex justify-between items-center absolute right-global bottom-0 w-[40%]">
                            <span>{t("sidebar.total")}</span>
                            <span className="text-mygreen text-[4vw] font-bold">{totalPrice.toFixed(2)}€</span>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default SideBar