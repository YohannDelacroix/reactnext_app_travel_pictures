import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Photo } from "../types/galleryTypes";

interface CartState {
    selectedPhotos: Photo[];
    unitPrice: number;
    totalPrice: number;
    maxPrice: number;
}

const initialState: CartState = {
    selectedPhotos: [],
    unitPrice: 0,
    totalPrice: 0,
    maxPrice: 0,
};

/**
 * calculateNewPrice depending of the total number of photos, the number of selected photo and the start price
 * @returns a price to add
 */
const calculateNewPrice = () => {
    //TODO
    return 1;
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addPhoto: (state, action: PayloadAction<Photo>) => {
            //TODO
        },
        removePhoto: (state, action: PayloadAction<string>) => {
            //TODO
        },
        setMaxPrice: (state, action: PayloadAction<number>) => {
            state.maxPrice = action.payload;
        },
        resetCart: (state) => {
            state.selectedPhotos = [];
            state.totalPrice = 0;
        },
    },
});

export const { addPhoto, removePhoto, setMaxPrice, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
