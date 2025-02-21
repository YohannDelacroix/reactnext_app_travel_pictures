import { imageAttributes } from '@/app/travelmemories/types/imageAttributes'
import Image from 'next/image'
import React from 'react'
import { paymentType } from './types/paymentType'


interface paymentIconListProps {
    icons: imageAttributes[]
    type: paymentType
}

/**
 * @description Map an icon list and display it
 * 
 * @param icons A list of icons with attributes src and alt
 * 
 * @returns An horizontal flex payment icon list
 */
const PaymentIconList = ({ icons, type }: paymentIconListProps) => {
    return (
        icons.map((icon, index) => <li  key={`icon-${index}`}
                                        className=""
                                    >
            <Image
                className={type === paymentType.PAYPAL ? "w-24" : "w-10"}
                src={icon.src}
                alt={icon.alt}
                width={4}
                height={4}
                sizes="100vw"></Image>
        </li>)
    )
}

export default PaymentIconList