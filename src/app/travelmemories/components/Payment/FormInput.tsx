import React, { useEffect } from 'react'
import { formInputType, inputMetadata, paymentCcFormDataType } from './types/formInputTypes';
import usePaymentForm from './hooks/usePaymentForm';
import classNames from 'classnames';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

interface formInputProps {
    type: formInputType;
    formData: paymentCcFormDataType;
    setFormData: (value: paymentCcFormDataType) => void;
}

/**
 * 
 * Renders an input field and control the user input
 * 
 * @param type Use enum formInputType to describe the behaviour of the input
 * @param formData main state with all the data inputs
 * @param setFormData main set state function to change the state 
 * @returns An input field with a label
 */
const FormInput = ({ type, formData, setFormData }: formInputProps) => {
    const { placeholder, pattern, inputMode, maxLength } = inputMetadata[type];
    const { errors, cardType, handleCCNChange, detectCardType, handleExpDateChange, handleCVCChange } = usePaymentForm();

    const {t} = useTranslation();

    /**
    * handle change on this FormInput field
    * @param e changeEvent of the input element
    */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Si l'input est pour le numéro de carte, on le formate avec des espaces
        if (name === formInputType.CC_NUMBER) {
            setFormData({ ...formData, [name]: handleCCNChange(value) });
        }
        else if (name === formInputType.CC_EXP) {
            setFormData({ ...formData, [name]: handleExpDateChange(value) });
        }
        else if (name === formInputType.CC_CVC) {
            setFormData({ ...formData, [name]: handleCVCChange(value) });
        }
        else setFormData({ ...formData, [name]: value });
    }

    const getLabel = (type: formInputType) => {
        switch (type) {
            case formInputType.CC_HOLDER:
                return t("payment.nameLabel");
            case formInputType.CC_NUMBER:
                return t("payment.ccLabel");
            case formInputType.CC_EXP:
                return t("payment.expirationLabel");
            case formInputType.CC_CVC:
                return t("payment.cvcLabel");
        }
    };

    //Each time the credit card number changes, detect the card type and store it with detectCardType()
    useEffect(() => {
        detectCardType(formData[formInputType.CC_NUMBER])
    }, [formData, detectCardType])

    return (
        <div className="flex flex-col gap-y-2 tracking-wider">
            <label className="font-[500]"
                htmlFor={`${type}`}>
                {getLabel(type)}
            </label>
            {/* Field container */}

            <div className='relative'>
                <input type="text"
                    name={`${type}`}
                    value={formData[type]}
                    onChange={handleChange}
                    autoComplete="off"
                    inputMode={inputMode}
                    pattern={pattern}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    required
                    className={classNames(
                        "w-full p-2 rounded-[0.5rem] border border-black border-opacity-30",
                        { "w-[50%]": [formInputType.CC_CVC, formInputType.CC_EXP].includes(type) },
                        { "text-red-500": errors[type] }
                    )} />
                {/* Card icon */}
                {
                    (cardType && type === formInputType.CC_NUMBER && ["visa", "mastercard", "american-express", "diners-club"].includes(cardType.type) && formData[type] !== "") &&
                    <div className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 ">
                        <Image
                            className={"w-10"}
                            src={`/icons/payment_icons/svg/${cardType.type}.svg`}
                            alt={`${cardType.type}`}
                            width={4}
                            height={4}
                            sizes="100vw"></Image>
                    </div>
                }
            </div>
        </div>
    )
}

export default FormInput