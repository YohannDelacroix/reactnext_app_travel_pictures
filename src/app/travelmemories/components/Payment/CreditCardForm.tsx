"use client"
import React, { useState } from 'react'
import FormInput from './FormInput'
import { formInputType, paymentCcFormDataType } from './types/formInputTypes';
import LinkButton, { buttonType } from '../LinkButton';
import { PATH_PAYMENT_CONFIRMATION } from "@/constants/paths"
import { Trans, useTranslation } from 'react-i18next';
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setPaymentStatus } from '../../store/userSlice';
import { paymentStatusType } from '../../types/paymentStatusType';
import { useRouter } from 'next/navigation';

/**
 * Renders a credit card form with the help of FormInput components
 * @returns a credit card form 
 */
const CreditCardForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const totalPrice = useSelector((state: RootState) => state.cart.totalPrice); 
    const paymentStatus = useSelector((state: RootState) => state.user.paymentStatus);

    const handlePaymentSuccess = () => {
        dispatch(setPaymentStatus(paymentStatusType.COMPLETED));
    };

    const handlePaymentFailure = () => {
        dispatch(setPaymentStatus(paymentStatusType.FAILED));
    };

    // State to control the form inputs
    const [formData, setFormData] = useState<paymentCcFormDataType>({
        [formInputType.CC_HOLDER]: "",
        [formInputType.CC_NUMBER]: "",
        [formInputType.CC_EXP]: "",
        [formInputType.CC_CVC]: "",
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);

        // Ask the backend for client secret IDs
        const res = await fetch("/api/checkout/stripe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: Math.round(totalPrice * 100), currency: "eur" }),
        });

        const { clientSecret } = await res.json();

        // Stripe checks for card number
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)!,
                billing_details: { name },
            },
        });

        if (result.error) {
            console.error(result.error.message);
            dispatch(setPaymentStatus(paymentStatusType.FAILED));
            router.push(PATH_PAYMENT_CONFIRMATION);
        } else if (result.paymentIntent.status === "succeeded") {
            console.log("payment successful")
            dispatch(setPaymentStatus(paymentStatusType.COMPLETED));
            router.push(PATH_PAYMENT_CONFIRMATION); 
        }

        setLoading(false);
    };

    //Declare the hook translation, enabling <Trans> to work correctly
    useTranslation();

    return (
        <form className="flex flex-col gap-y-4">
            {/* Form Inputs 
            <FormInput type={formInputType.CC_HOLDER} formData={formData} setFormData={setFormData} />
            <FormInput type={formInputType.CC_NUMBER} formData={formData} setFormData={setFormData} />
            <FormInput type={formInputType.CC_EXP} formData={formData} setFormData={setFormData} />
            <FormInput type={formInputType.CC_CVC} formData={formData} setFormData={setFormData} />
            */}
            {/* Form Inputs STRIPE */}
            <div className="border border-gray-300 p-3 rounded-lg bg-white">
                <CardElement options={{ style: { base: { fontSize: "16px", color: "#1F2937" } } }} />
            </div>

            {/* Form Validation (submit) */}
            <div className="flex flex-col gap-y-3 mt-4">
                {/* 
                <LinkButton href={PATH_PAYMENT_CONFIRMATION}
                    type={buttonType.PAY_CB}>
                    <span className="uppercase">
                        <Trans i18nKey="payment.confirmCardButton"
                            defaults="Confirm and pay"
                        />
                    </span>
                </LinkButton>
                 */}

                <button onClick={handleSubmit}
                    className="block flex justify-center items-center gap-x-2 relative text-black text-center hover:brightness-95 transition-all w-full bg-mygreen py-3 font-bold text-[1.4rem]">
                    <span className="uppercase">
                        <Trans i18nKey="payment.confirmCardButton"
                            defaults="Confirm and pay"
                        />
                    </span>
                </button>
                <p className="text-center">
                    <Trans i18nKey="sidebar.securePayment"
                        defaults="🔒 Secure payment with SSL encryption." />
                </p>
            </div>
        </form>
    )
}

export default CreditCardForm