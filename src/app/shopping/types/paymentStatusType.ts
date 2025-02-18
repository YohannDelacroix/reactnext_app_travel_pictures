/**
 * 
 * This enum is used in Payment process to identify what is the current status of a payment for a given user and his cart
 * 
 * The payment status can take this values:
 * - `PENDING`: The user is making its choice.
 * - `COMPLETED`: The user have paid.
 * - `FAILED`: The user have tried to pay but the payment failed
 * 
 * This enum ensures that only valid values are used throughout the application, 
 * improving type safety and reducing errors related to string values.
 * 
 * @author Yohann Delacroix
 */
export enum paymentStatusType{
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed"
}