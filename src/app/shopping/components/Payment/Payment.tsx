"use client"
import React, { useState } from 'react'
import PaymentRadioCard from './PaymentRadioCard'
import { paymentType } from './types/paymentType'
import PaymentOption from './PaymentOption'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import LinkButton, { buttonType } from '../LinkButton'
import { FaLongArrowAltLeft } from "react-icons/fa";
import SideBar from '../SideBar'
import { parentSrcType } from '../../types/parentSrcType'
import PageContainer from '../PageContainer'

const Payment = () => {
    const [selectedPayment, setSelectedPayment] = useState<paymentType | null>(null);

    const purchasedPhotos: number = useSelector((state: RootState) => state.cart.selectedPhotos.length);
    const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

    return (
        <PageContainer parentSrc={parentSrcType.PAYMENT}>
            <div className="flex flex-col w-full gap-y-8
                            lg: mr-global">
                

                {/* Recap
                <div className="flex flex-col items-center w-full gap-y-1">
                    <div className="flex justify-between items-center w-full">
                        <span>Number of photos purchased:</span>
                        <span>{purchasedPhotos}</span>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <span>Total:</span>
                        <span className="text-mygreen text-[7vw] font-bold">{totalPrice}€</span>
                    </div>
                    <p>📩 Instant delivery: Your download link will be sent via email immediately after payment.</p>
                </div> */}

                <ul className="flex flex-col gap-y-global">
                    {/* Card payment option */}
                    <PaymentOption type={paymentType.CC}
                        selectedPayment={selectedPayment!}
                        setSelectedPayment={setSelectedPayment} />

                    {/* Paypal option */}
                    <PaymentOption type={paymentType.PAYPAL}
                        selectedPayment={selectedPayment!}
                        setSelectedPayment={setSelectedPayment} />
                </ul>

                <LinkButton href={`/shopping/cart`}
                    type={buttonType.BACK}>
                    <FaLongArrowAltLeft /> Back to cart
                </LinkButton>
            </div>
        </PageContainer>
    )
}

export default Payment