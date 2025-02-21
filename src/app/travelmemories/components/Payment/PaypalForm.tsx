import Image from 'next/image'
import React from 'react'
import LinkButton, { buttonType } from '../LinkButton'
import { PATH_PAYMENT_CONFIRMATION } from "@/constants/paths"

const PaypalForm = () => {
    return (
        <div className="flex flex-col gap-y-5">
            <p>
                Al elegir este método de pago, serás redirigido al servidor seguro de PayPal y accederás a tu cuenta de PayPal. Tu pedido se registrará una vez que hayas validado tu pago en tu banca en línea o en tu aplicación móvil.
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