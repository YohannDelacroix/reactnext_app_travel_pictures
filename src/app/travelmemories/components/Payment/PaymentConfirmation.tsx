"use client"
import React from 'react'
import LinkButton, { buttonType } from '../LinkButton'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { paymentStatusType } from '../../types/paymentStatusType';
import classNames from 'classnames';
import { Trans, useTranslation } from 'react-i18next';
import { PATH_PAYMENT } from '@/constants/paths';


/**
 * Use the paymentStatusType to determine and render the payment status
 * @returns a payment confirmation page (success or failure)
 */
const PaymentConfirmation = () => {
    const galleryId = useSelector((state: RootState) => state.gallery.shootingInfo.id);
    const { selectedPhotos, totalPrice } = useSelector((state: RootState) => state.cart);
    const paymentStatus = useSelector((state: RootState) => state.user.paymentStatus);
    const userEmail = useSelector((state: RootState) => state.user.userInfo.email);
    const { i18n } = useTranslation();
    const currentLang = i18n.language;
    const { t } = useTranslation();

    return (
        <div className='flex flex-col gap-y-4'>
            {/* TITLE : Payment confirmed or payment rejected */}
            <h2 className={classNames(
                "mb-2 font-bold text-[1.5rem]",
                { "text-red-500": paymentStatus === paymentStatusType.FAILED },
                { "text-mygreen": paymentStatus === paymentStatusType.COMPLETED }
            )}>
                {paymentStatus === paymentStatusType.COMPLETED ? t("payment.confirmation.completed.title") : t("payment.confirmation.rejected.title")}
            </h2>

            {
                paymentStatus === paymentStatusType.COMPLETED ?
                    <>
                        <p>
                            <Trans i18nKey="payment.confirmation.completed.p1"
                                defaults="Your payment has been successfully processed and have purchased {{selectedPhotosLength}} photo{{s}} for <1>{{totalPrice}}€</1>."
                                values={{
                                    selectedPhotosLength: selectedPhotos.length,
                                    //s to write the correct orthographic form if there is more than one photo
                                    s: (selectedPhotos.length > 1 && currentLang != "it") ? "s" : "",
                                    totalPrice: totalPrice.toFixed(2)
                                }}
                                components={{ 1: <span className="text-mygreen text-[1.5rem] font-bold" /> }} />
                        </p>
                        <p>
                            <Trans i18nKey="payment.confirmation.completed.p2"
                                defaults="📩 The download link will be sent via email shortly on <1>{{userEmail}}</1>"
                                values={{
                                    userEmail
                                }}
                                components={{ 1: <span className="italic tracking-wider font-bold" /> }} />
                        </p>
                        <LinkButton href={`/shopping/privateGallery/${galleryId}`}
                            type={buttonType.BACK}>
                            <FaLongArrowAltLeft /> <span>
                                <Trans i18nKey="sidebar.BackToGalery"
                                    defaults="Back to Gallery"
                                />
                            </span>
                        </LinkButton>
                    </> :
                    <>
                        <p>
                            <Trans i18nKey="payment.confirmation.rejected.p1"
                                defaults="It seems there was an issue with your payment method. Please check your payment details or try another method."
                            />
                        </p>
                        <LinkButton href={PATH_PAYMENT}
                            type={buttonType.BACK}>
                            <FaLongArrowAltLeft /> <span>
                                <Trans i18nKey="payment.confirmation.rejected.retryButton"
                                    defaults="Retry Payment"
                                />
                            </span>
                        </LinkButton>
                    </>
            }
        </div>
    )
}

export default PaymentConfirmation