"use client"
import React, { useState } from 'react'
import PaymentRadioCard from './PaymentRadioCard'
import { paymentType } from './types/paymentType'
import PaymentOption from './PaymentOption'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

const Payment = () => {
    const [selectedPayment, setSelectedPayment] = useState<paymentType | null>(null);

    const purchasedPhotos: number = useSelector((state: RootState) => state.cart.selectedPhotos.length);
    const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

    return (
        <div className="flex flex-col w-full gap-y-8 text-[3vw]">
            <h2 className="text-center font-bold">One Step Away from Your Photos!</h2>

            {/* Recap */}
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
            </div>

            <ul className="flex flex-col gap-y-global text-[1.2rem]">
                {/* Card payment option */}
                <PaymentOption type={paymentType.CC}
                    selectedPayment={selectedPayment!}
                    setSelectedPayment={setSelectedPayment} />

                {/* Paypal option */}
                <PaymentOption type={paymentType.PAYPAL}
                    selectedPayment={selectedPayment!}
                    setSelectedPayment={setSelectedPayment} />
            </ul>
        </div>

    )
}

export default Payment