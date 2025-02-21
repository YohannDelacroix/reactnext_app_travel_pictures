/**
 * 
 * This enum is used in CardImage component to identify the parent component, in order to adjust 
 * the display or behavior of the element based on its context. The possible 
 * values are:
 * - `PRIVATE_GALLERY`: Represents the source of the private gallery.
 * - `CART`: Represents the source of the shopping cart.
 * 
 * This enum ensures that only valid values are used throughout the application, 
 * improving type safety and reducing errors related to string values.
 * 
 * @example
 * // Usage in a component
 * const source = parentSrcForCardType.PRIVATE_GALLERY;
 * <CardImage parentSrc={source} ... />
 * 
 * @author Yohann Delacroix
 */

export enum parentSrcType{
    PRIVATE_GALLERY = "private_gallery",
    CART = "cart",
    PAYMENT = "payment"
}