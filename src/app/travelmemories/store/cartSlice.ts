import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Photo } from "../types/galleryTypes";
import { setCartPayload } from "./types/setCartPayload";

interface CartState {
    selectedPhotos: Photo[];
    prices: number[];
    totalNumberPhotos: number;
    unitPrice: number;
    currentUnitPrice: number;
    totalPrice: number;
    totalPriceBeforeDiscount: number;
    maxPrice: number;
    savedPrice: number;
}

const initialState: CartState = {
    selectedPhotos: [],
    prices: [],
    totalNumberPhotos: 0,
    unitPrice: 0,
    currentUnitPrice: 0,
    totalPrice: 0,
    totalPriceBeforeDiscount: 0,
    maxPrice: 0,
    savedPrice: 0
};

/**
 * calculateCurrentPrice depending of the total number of photos, the number of selected photo and the start price
 * @returns the new current price
 */
function calculateCurrentPrice(totalPhotos: number, purchasedPhotos: number, basePrice: number, factor: number) {
    if(purchasedPhotos === 0){ //No discount applied if 0 photos purchased
        return basePrice;
    }
    else{
        const remainingPhotos = totalPhotos - purchasedPhotos;
        const currentDiscount = basePrice * Math.pow(factor, remainingPhotos);
        const currentPrice = Math.round((basePrice - currentDiscount) * 100) / 100;
        return currentPrice;
    }
}



/**
 * calculateCurrentTotalPrice uses calculateCurrentPrice to calculate the totalPrice given the number of photos purchased
 * @returns the new total price
 */
function calculateCurrentTotalPrice(prices: number[], purchasedPhotos: number) {
    let totalPrice = 0;
    for(let i = 0; i < purchasedPhotos; i++){
        //totalPrice += calculateCurrentPrice(totalPhotos, i, basePrice, degressiveFactor)
        totalPrice += prices[i];
    }
    return Math.round(totalPrice * 100) / 100;
}

/**
 * calculateSavedPrice evaluates the saved money comparing current total with total with base price
 * @returns the saved money rounded X.XX€
 */
function calculateSavedPrice(totalPrice: number, basePrice: number, purchasedPhotos: number){
    const savedPrice = basePrice * purchasedPhotos - totalPrice;
    return Math.round(savedPrice * 100) / 100;
}


function updateCartPricing(state: CartState){
    state.totalPrice = calculateCurrentTotalPrice(state.prices, state.selectedPhotos.length);
    state.currentUnitPrice = calculateCurrentPrice(state.totalNumberPhotos, state.selectedPhotos.length, state.unitPrice, degressiveFactor);
    state.savedPrice = calculateSavedPrice(state.totalPrice, state.unitPrice, state.selectedPhotos.length);
    state.totalPriceBeforeDiscount = state.selectedPhotos.length * state.unitPrice;
}


const degressiveFactor = 0.85; //Degressive factor for the promotion


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addPhoto: (state, action: PayloadAction<Photo>) => {
            const alreadySelected = state.selectedPhotos.find(photo => photo.id === action.payload.id);
            if (!alreadySelected) {
                state.selectedPhotos.push(action.payload);
            }
            
            updateCartPricing(state);
        },
        removePhoto: (state, action: PayloadAction<string>) => {
            state.selectedPhotos = state.selectedPhotos.filter(photo => photo.id !== action.payload);
            
            updateCartPricing(state);
        },
        buyAllPhotos: (state, action: PayloadAction<Photo[]>) => {
            state.selectedPhotos = action.payload;

            updateCartPricing(state);
        },
        setCart: (state, action: PayloadAction<setCartPayload>) => { //At the beginning set unit, current and max price
            const { basePrice, numberOfPhotos } = action.payload;
            state.unitPrice = basePrice;
            state.currentUnitPrice = basePrice;
            state.totalNumberPhotos = numberOfPhotos;

            let maxPrice = 0;
            for(let i = 0; i < state.totalNumberPhotos; i++){
                const iPrice = calculateCurrentPrice(state.totalNumberPhotos, i, state.unitPrice, degressiveFactor);
                state.prices[i] = iPrice;
                maxPrice += iPrice; 
            }
            state.maxPrice = Math.round(maxPrice * 100) / 100;;
        },
        resetCart: (state) => {
            state.selectedPhotos = [];
            updateCartPricing(state);
        },
    },
});

export const { addPhoto, buyAllPhotos, removePhoto, setCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
