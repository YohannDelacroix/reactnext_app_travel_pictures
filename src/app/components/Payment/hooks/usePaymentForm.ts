import { useCallback, useEffect, useState } from "react";
import creditCardType from 'credit-card-type';
import { formInputType } from "../types/formInputTypes";

const usePaymentForm = () => {
    const [errors, setErrors] = useState<{ [key in formInputType]?: string }>({});
    const [cardType, setCardType] = useState<ReturnType<typeof creditCardType>[0] | null>(null);

    /**
    * Detect and store the card type in cardType state
    * If a card is detected store the cvcLength (3 or 4)
    * @param ccn credit card number typed in the input
    */
    const detectCardType = useCallback((ccn: string) => {
        const cardInfo = creditCardType(ccn);
        if (cardInfo.length > 0) {
            setCardType(cardInfo[0]); // Mettre à jour le type de carte
        } else {
            setCardType(null);
        }
    }, [])

    /*************************** CREDIT CARD NUMBER ***************************/

    /**
     * formatCCN
     * @param ccn is a string corresponding to the card number "1111111111111111"
     * @returns a formatted credit card number (ccn) adding spaces and limit length
     */
    const formatCCN = useCallback((ccn: string) => {
        let formattedCCN = ccn;

        // Delete all no numeric characters
        formattedCCN = formattedCCN.replace(/\D/g, "");

        if (!cardType) {
            //Do nothing if cardType is not defined
            return formattedCCN;
        }
        else if (cardType.type === "american-express" || (cardType.type === "diners-club" && formattedCCN.length < 16 /*Format XXXX XXXX XXXX XXXX when reaching 16 digits (jump on the else) */)) {
            //Format XXXX XXXXXX XXXX or XXXX XXXXXX XXXXX for 14-15 digits
            formattedCCN = formattedCCN.replace(/(\d{4})(?=\d)/, "$1 "); // Add a space after 4 digits
            formattedCCN = formattedCCN.replace(/(\d{6})(?=\d)/, "$1 "); // Add a space after 6 digits

            // Limit to 17 charachters for american-express (14 digits + 2 spaces)
            if (cardType.type === "american-express" && formattedCCN.length > 16) {
                formattedCCN = formattedCCN.slice(0, 16);
            }
        }
        else {
            //International type with format XXXX XXXX XXXX XXXX
            formattedCCN = formattedCCN.replace(/(.{4})(?=.)/g, "$1 ");

            // Limit to 19 charachters (16 digits + 3 spaces)
            if (formattedCCN.length > 19) {
                formattedCCN = formattedCCN.slice(0, 19);
            }
        }

        return formattedCCN;
    }, [cardType])

    /**
     * 
     * @param ccn 
     * @returns a string describing the error
     */
    const validateCCN = (ccn: string): string | null => {

        /**
         * isValidLuhn implements Lunh algorithm to determine if the card number is valid
         * @param number credit card number
         * @returns a boolean to determine wether the ccn is valid or not
         */
        const isValidLuhn = (number: string): boolean => {
            let sum = 0;
            let shouldDouble = false;
        
            // Parcours les chiffres de droite à gauche
            for (let i = number.length - 1; i >= 0; i--) {
                let digit = parseInt(number[i], 10);
        
                if (shouldDouble) {
                    digit *= 2;
                    if (digit > 9) digit -= 9;
                }
        
                sum += digit;
                shouldDouble = !shouldDouble;
            }
        
            return sum % 10 === 0;
        };

        const cleanedCCN = ccn.replace(/\D/g, "");

        if (!cardType) return "Card type not recognized";

        const possibleLengths = cardType.lengths;
        if (!possibleLengths.includes(cleanedCCN.length)) {
            return `Invalid card number length (expected ${possibleLengths.join(" or ")} digits)`;
        }

        if (!isValidLuhn(cleanedCCN)) {
            return "Invalid card number";
        }

        return null; //No error
    };

    /**
     * 
     * @param expDate typed by the user
     * @returns a formatted date
     */
    const handleCCNChange = useCallback((ccn: string) => {
        const formattedExpDate = formatCCN(ccn);

        const errorMessage = validateCCN(formattedExpDate);

        setErrors((prevErrors) => ({
            ...prevErrors,
            [formInputType.CC_NUMBER]: errorMessage || undefined,
        }));

        return formattedExpDate;
    },[formatCCN, validateCCN, setErrors])


    /*************************** EXPIRATION DATE ***************************/

    /**
     * 
     * @param expDate expiration date as a string
     * @returns a string describing the error
     */
    const validateExpDate = (expDate: string): string | null => {
        const [month, year] = expDate.split("/").map(Number);
        if (!month || !year) return "Invalid format (MM/YY)";

        if (month < 1 || month > 12) return "Invalid month";

        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;

        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            return "Expired card";
        }

        return null; //No error
    };

    /**
     * 
     * @param expDate a non formatted expDate typed by the user on the interface
     * @returns a formatted MM/YY date 
     */
    const formatExpDate = (expDate: string) => {
        // Delete all no numeric characters
        const cleanedValue = expDate.replace(/\D/g, "");

        const month = cleanedValue.slice(0, 2);
        const year = cleanedValue.slice(2, 4);

        // Add a slash after month
        if (cleanedValue.length > 2) {
            return `${month}/${year}`;
        }

        return month;
    }

    /**
     * Format the expiration date and fill an error report
     * @param expDate typed by the user
     * @returns a formatted date
     */
    const handleExpDateChange = useCallback((expDate: string) => {
        const formattedExpDate = formatExpDate(expDate);

        const errorMessage = validateExpDate(formattedExpDate);

        setErrors((prevErrors) => ({
            ...prevErrors,
            [formInputType.CC_EXP]: errorMessage || undefined,
        }));

        return formattedExpDate;
    }, [formatExpDate, validateExpDate, setErrors]);


    /*************************** CVC ***************************/
    /**
        * 
        * @param cvc as a string
        * @returns a string describing the error
        */
    const validateCVC = (cvc: string): string | null => {
        //TODO

        return null; //No error
    };

    /**
     * 
     * @param cvc a non formatted cvc typed by the user on the interface
     * @returns a formatted cvc
     */
    const formatCVC = (cvc: string) => {
        // Delete all no numeric characters
        let formattedCVC = cvc.replace(/\D/g, "");

        //Ensure there is a correct number of digits

        if(cardType){
            // Limit to 19 charachters (16 digits + 3 spaces)
            if (formattedCVC.length > cardType.code.size) {
                formattedCVC = formattedCVC.slice(0, cardType.code.size);
            }
        }
            
        return formattedCVC;
    }

    /**
     * Format the expiration date and fill an error report
     * @param cvc typed by the user
     * @returns a formatted date
     */
    const handleCVCChange = useCallback((cvc: string) => {
        const formattedCVC = formatCVC(cvc);

        const errorMessage = validateCVC(formattedCVC);

        setErrors((prevErrors) => ({
            ...prevErrors,
            [formInputType.CC_EXP]: errorMessage || undefined,
        }));

        return formattedCVC;
    }, [formatCVC, validateCVC, setErrors]);


    useEffect(() => {
        console.log("errors = ", errors)
    }, [errors])

    return {
        errors,
        cardType, detectCardType,
        handleCCNChange, 
        handleExpDateChange, 
        handleCVCChange
    }
}

export default usePaymentForm;