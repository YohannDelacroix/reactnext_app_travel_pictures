import Image from 'next/image'
import React from 'react'

const PaypalForm = () => {
    return (
        <div className="flex flex-col gap-y-5">
            <p>
                Al elegir este método de pago, serás redirigido al servidor seguro de PayPal y accederás a tu cuenta de PayPal. Tu pedido se registrará una vez que hayas validado tu pago en tu banca en línea o en tu aplicación móvil.
            </p>
            <button className="flex justify-center items-center gap-x-2 w-full bg-[#ffc439] py-3 text-black font-bold text-[1.5rem]">
                <Image
                    className="w-32"
                    src={"/icons/payment_icons/svg/paypal.svg"}
                    alt={"Paypal"}
                    width={4}
                    height={4}
                    sizes={"100vw"}
                ></Image>
            </button>
        </div>
    )
}

export default PaypalForm