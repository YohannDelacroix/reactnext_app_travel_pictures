import React from 'react'
import { paymentType } from './types/paymentType'
import CreditCardForm from './CreditCardForm';
import PaypalForm from './PaypalForm';
import PaymentRadioCard from './PaymentRadioCard';
import classNames from 'classnames';

interface paymentOptionProps {
    type: paymentType;
    selectedPayment: paymentType;
    setSelectedPayment: (value: paymentType) => void;
}

/**
 * 
 * @param type The payment type PAYPAL or CC
 * @param selectedPayment The selected Payment is the payment user have chosen now
 * @param setSelectedPayment If the radio button is checked, we use this method to set this payment option
 * @returns 
 */
const PaymentOption = ({ type, selectedPayment, setSelectedPayment }: paymentOptionProps) => {
    return (
        <li className={classNames(
            "border border-myblue p-4 rounded-[1rem]",
            { "bg-myblue bg-opacity-30 border-2": type === selectedPayment }
        )}>
            {/* Radio card choice */}
            <PaymentRadioCard type={type} selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment} />
            {
                type === selectedPayment && <div>
                    <hr className="border-black0.1 mt-3"></hr>
                    {/* Render a CreditCardForm or Paypal component given the Type in props */}
                    <div className="mt-7">
                        {type === paymentType.CC ? <CreditCardForm /> : <PaypalForm />}
                    </div>
                </div>
            }
        </li>
    )
}

export default PaymentOption