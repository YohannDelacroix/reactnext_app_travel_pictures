import React, { useEffect, useState } from 'react'

import { formInputType, inputMetadata, paymentCcFormDataType } from './types/formInputTypes';
import usePaymentForm from './hooks/usePaymentForm';
import classNames from 'classnames';

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
    const { label, placeholder, pattern, inputMode, maxLength } = inputMetadata[type];
    const { errors, cardType, handleCCNChange, detectCardType, handleExpDateChange, handleCVCChange } = usePaymentForm();

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
        else if (name === formInputType.CC_CVC){
            setFormData({ ...formData, [name]: handleCVCChange(value) });
        }
        else setFormData({ ...formData, [name]: value });
    }


    useEffect(() => {
        detectCardType(formData[formInputType.CC_NUMBER])
    }, [formData[formInputType.CC_NUMBER]])

    useEffect(() => {
        console.log("Card type : ", cardType)
    }, [cardType])

    return (
        <div>
            <label htmlFor={`${type}`}></label>
            {/* Field container */}

            {/* div for displaying error message */}
            <div id="payment-form-error-message"></div>

            <div>
                <input type="text"
                    name={`${type}`}
                    value={formData[type]}
                    onChange={handleChange}
                    autoComplete={`${type}`}
                    inputMode={inputMode}
                    pattern={pattern}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    required
                    className={classNames(
                        "",
                        { "text-red-500": errors[type] }
                    )} />
            </div>
        </div>
    )
}

export default FormInput