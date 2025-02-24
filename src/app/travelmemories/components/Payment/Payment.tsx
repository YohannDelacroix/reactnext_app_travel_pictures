"use client"
import React, { useState } from 'react'
import { paymentType } from './types/paymentType'
import PaymentOption from './PaymentOption'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { parentSrcType } from '../../types/parentSrcType'
import PageContainer from '../PageContainer'


/**
 * 
 * @returns a JSX element with two paylent option : credit card and paypal
 */
const Payment = () => {
    const [selectedPayment, setSelectedPayment] = useState<paymentType | null>(null);
    const purchasedPhotos: number = useSelector((state: RootState) => state.cart.selectedPhotos.length);
    const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

    return (
        <PageContainer parentSrc={parentSrcType.PAYMENT}>
            <div className="flex flex-col w-full gap-y-8
                            lg: mr-global">
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
            </div>
        </PageContainer>
    )
}

export default Payment