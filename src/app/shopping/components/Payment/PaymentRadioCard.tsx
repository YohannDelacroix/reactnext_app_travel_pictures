import React from 'react'
import { paymentType } from './types/paymentType'
import { imageAttributes } from '@/app/shopping/types/imageAttributes';
import PaymentIconList from './PaymentIconList';

interface paymentRadioCardProps {
    type: paymentType;
    selectedPayment: paymentType;
    setSelectedPayment: (value: paymentType) => void;
}

/**
 * @description PaymentRadioCard is a component that display a clickable block to switch between different payment modes, it shows a list of payment icon for better UX
 * 
 * @param type Payment type (Paypal or Credit card)
 * 
 * @returns input checkbox, label and list of payment icons
 * @author Yohann Delacroix
 */
const PaymentRadioCard = ({ type, selectedPayment, setSelectedPayment }: paymentRadioCardProps) => {


    const ccSrcIcons: imageAttributes[] = [
        { src: "/icons/payment_icons/svg/visa.svg", alt: "Visa" },
        { src: "/icons/payment_icons/svg/diners-club.svg", alt: "Diners" },
        { src: "/icons/payment_icons/svg/mastercard.svg", alt: "Mastercard" },
        { src: "/icons/payment_icons/svg/american-express.svg", alt: "American Express" },
    ]

    const paypalSrcIcon: imageAttributes[] = [
        { src: "/icons/payment_icons/svg/paypal.svg", alt: "Paypal" },
    ]

    const handleRadioButton = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPayment(event.target.value as paymentType);
    }

    return (
        <div className="flex flex-row justify-between w-full items-center gap-x-2 h-8 max-[216px]:h-auto cursor-pointer">
                {/* On the left : Checkbox and label */}
                <input id={`payment-type-method/${type}`} type="radio" name="payment-radio"
                    value={type}
                    checked={selectedPayment === type}
                    className="block relative w-4 h-full align-middle cursor-pointer"
                    onChange={handleRadioButton} />
                <label className="flex justify-between items-center w-full font-bold cursor-pointer"
                    htmlFor={`payment-type-method/${type}`}>
                        <div className="grid items-center">
                            {type === paymentType.CC ? "Pay by card" : "Pay by Paypal"}
                        </div>
                    {/* On the right : Payment Icons */}
                    <ul className="flex flex-row justify-end flex-wrap">
                        {
                            <PaymentIconList type={type}
                                            icons={type === paymentType.PAYPAL ? paypalSrcIcon : ccSrcIcons} 
                            />
                        }
                    </ul>
                </label>
        </div>
    )
}

export default PaymentRadioCard