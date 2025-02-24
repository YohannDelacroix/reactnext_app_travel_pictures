"use client"
import React from 'react'
import LinkButton, { buttonType } from '../LinkButton'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { paymentStatusType } from '../../types/paymentStatusType';
import classNames from 'classnames';


/**
 * Use the paymentStatusType to determine and render the payment status
 * @returns a payment confirmation page (success or failure)
 */
const PaymentConfirmation = () => {
    const galleryId = useSelector((state: RootState) => state.gallery.shootingInfo.id);
    const { selectedPhotos, totalPrice } = useSelector((state: RootState) => state.cart);
    const paymentStatus = useSelector((state: RootState) => state.user.paymentStatus);
    const userEmail = useSelector((state: RootState) => state.user.userInfo.email);

    return (
        <div className='flex flex-col gap-y-4'>
            <h2 className={classNames(
                "mb-2 font-bold text-[1.5rem]",
                {"text-red-500": paymentStatus === paymentStatusType.FAILED},
                {"text-mygreen": paymentStatus === paymentStatusType.COMPLETED}
            )}>
                {paymentStatus === paymentStatusType.COMPLETED ? "Thank you for your purchase!" : "Something went wrong with your payment."}

            </h2>
            {
                paymentStatus === paymentStatusType.COMPLETED ? <>

                    <p>Your payment has been successfully processed and have purchased {selectedPhotos.length} photo{selectedPhotos.length > 1 && "s"} for <span className="text-mygreen text-[1.5rem] font-bold">{totalPrice.toFixed(2)}€</span>.</p>
                    <p>📩 The download link will be sent via email shortly on <span className="italic tracking-wider font-bold">{userEmail}</span>.</p>
                    <LinkButton href={`/shopping/privateGallery/${galleryId}`}
                        type={buttonType.BACK}>
                        <FaLongArrowAltLeft /> Back to gallery
                    </LinkButton>
                </> :
                    <>
                        <p>It seems there was an issue with your payment method. Please check your payment details or try another method.</p>
                        <LinkButton href={`/shopping/cart/payment`}
                            type={buttonType.BACK}>
                            <FaLongArrowAltLeft /> Retry Payment
                        </LinkButton>
                    </>
            }

        </div>
    )
}

export default PaymentConfirmation