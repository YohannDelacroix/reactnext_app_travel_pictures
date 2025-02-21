/**
 * enum for the differents types of form inputs of a payment form
 */
export enum formInputType {
    CC_HOLDER = "cc_holder",        //Credit card holder name
    CC_NUMBER = "cc_input",         //Credit card number
    CC_EXP = "cc_exp",              //Credit card expiration
    CC_CVC = "cc_cvc",              //Credit card cvc
}

/**
 * @interface paymentCcFormDataType 
 * Describe the inputs of a payment form
 * The attributes keys are given by @enum formInputType 
 */
export interface paymentCcFormDataType {
    [formInputType.CC_HOLDER]: string;
    [formInputType.CC_NUMBER]: string,
    [formInputType.CC_EXP]: string,
    [formInputType.CC_CVC]: string,
}

/**
 * @interface inputMetadataType
 * Extended metadata for input fields, including maxLength
 * 
 */
export const inputMetadata: Record<formInputType, {
    label: string;
    placeholder: string;
    pattern?: string;
    inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
    maxLength?: number; // Limite le nombre de caractères
}> = {
    [formInputType.CC_HOLDER]: {
        label: "Cardholder Name",
        placeholder: "Your name",
        inputMode: "text",
        maxLength: 50, // Exemple: 50 caractères max pour le nom
    },
    [formInputType.CC_NUMBER]: {
        label: "Card Number",
        placeholder: "1111 1111 1111 1111",
        pattern: "[0-9\\s]{13,19}", // 13 à 19 chiffres avec espaces optionnels
        inputMode: "numeric",
        maxLength: 19, // Limiter à 19 caractères (pour la carte)
    },
    [formInputType.CC_EXP]: {
        label: "Expiration Date",
        placeholder: "MM/YY",
        pattern: "(0[1-9]|1[0-2])\\/([0-9]{2})", // Format MM/YY
        inputMode: "numeric",
        maxLength: 5, // Exemple: 5 caractères pour le format MM/YY
    },
    [formInputType.CC_CVC]: {
        label: "CVC",
        placeholder: "123",
        pattern: "[0-9]{3,4}", // 3 ou 4 chiffres
        inputMode: "numeric",
        maxLength: 4, // Limiter à 4 chiffres pour le CVV
    },
};