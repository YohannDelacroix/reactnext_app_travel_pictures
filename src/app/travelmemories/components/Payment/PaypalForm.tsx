import Image from 'next/image'
import React from 'react'
import LinkButton, { buttonType } from '../LinkButton'
import { PATH_PAYMENT_CONFIRMATION } from "@/constants/paths"
import { Trans, useTranslation } from 'react-i18next'

/**
 * 
 * @returns a paypal form with a button payment
 */
const PaypalForm = () => {
    //Declare the hook translation, enabling <Trans> to work correctly
    useTranslation();

    return (
        <div className="flex flex-col gap-y-5">
            <p>
                <Trans i18nKey="payment.paypalDescription"
                    defaults="By choosing this payment method, you will be redirected to PayPal’s secure server and log into your PayPal account. Your order will be recorded once you have validated your payment via online banking or your mobile app."
                />
            </p>
            <LinkButton href={PATH_PAYMENT_CONFIRMATION}
                type={buttonType.PAY_PAYPAL}>
                <Image
                    className="w-32"
                    src={"/icons/payment_icons/svg/paypal.svg"}
                    alt={"Paypal"}
                    width={4}
                    height={4}
                    sizes={"100vw"}
                ></Image>
            </LinkButton>
        </div>
    )
}

export default PaypalForm