import React, { useEffect, useState } from 'react'
import FormInput from './FormInput'

import { formInputType, paymentCcFormDataType } from './types/formInputTypes';

const CreditCardForm = () => {
    // State to control the form inputs
    const [formData, setFormData] = useState<paymentCcFormDataType>({
        [formInputType.CC_HOLDER]: "",
        [formInputType.CC_NUMBER]: "",
        [formInputType.CC_EXP]: "",
        [formInputType.CC_CVC]: "",
    });

    // Constants to display what will be displayed for each input component
    const formInputsSrc = [
        { type: "", name: "", label: "", placeholder: "" }
    ]

    //DEBUG : Tracking formData
    useEffect(() => {
        console.log("formData = ", formData);
    }, [formData])

    return (
        <form className="flex flex-col gap-y-3">
            {/* Form Inputs */}
            <FormInput type={formInputType.CC_HOLDER} formData={formData} setFormData={setFormData} />
            <FormInput type={formInputType.CC_NUMBER} formData={formData} setFormData={setFormData} />
            <FormInput type={formInputType.CC_EXP} formData={formData} setFormData={setFormData} />
            <FormInput type={formInputType.CC_CVC} formData={formData} setFormData={setFormData} />

            {/* Form Validation (submit) */}
            <div>
                <button></button>
                <p>secure</p>
                <p>email</p>
            </div>

        </form>
    )
}

export default CreditCardForm