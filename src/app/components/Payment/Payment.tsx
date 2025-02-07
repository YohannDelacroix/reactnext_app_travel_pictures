"use client"
import React, { useState } from 'react'
import PaymentRadioCard from './PaymentRadioCard'
import { paymentType } from './types/paymentType'
import PaymentOption from './PaymentOption'

const Payment = () => {
    const [selectedPayment, setSelectedPayment] = useState<paymentType | null>(null);

    return (
        <ul className="flex flex-col gap-y-global text-[1rem]">
            {/* Card payment option */}
            <PaymentOption  type={paymentType.CC} 
                            selectedPayment={selectedPayment!} 
                            setSelectedPayment={setSelectedPayment} />

            {/* Paypal option */}
            <PaymentOption  type={paymentType.PAYPAL} 
                            selectedPayment={selectedPayment!} 
                            setSelectedPayment={setSelectedPayment} />
        </ul>
    )
}

export default Payment