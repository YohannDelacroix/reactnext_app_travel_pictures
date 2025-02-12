import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Photo } from "../types/galleryTypes";

interface CartState {
    selectedPhotos: Photo[];
    totalNumberPhotos: number;
    unitPrice: number;
    currentUnitPrice: number;
    totalPrice: number;
    maxPrice: number;
}

const initialState: CartState = {
    selectedPhotos: [],
    totalNumberPhotos: 0,
    unitPrice: 0,
    currentUnitPrice: 0,
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
            const alreadySelected = state.selectedPhotos.find(photo => photo.id === action.payload.id);
            if (!alreadySelected) {
                state.selectedPhotos.push(action.payload);
            }
        },
        removePhoto: (state, action: PayloadAction<string>) => {
            state.selectedPhotos = state.selectedPhotos.filter(photo => photo.id !== action.payload);
        },
        setMaxPrice: (state, action: PayloadAction<number>) => {
            state.maxPrice = action.payload;
        },
        setUnitPrice: (state, action: PayloadAction<number>) => {
            state.unitPrice = action.payload;
        },
        setTotalNumberOfPhotos: (state, action: PayloadAction<number>) => {
            state.totalNumberPhotos = action.payload;
        },
        resetCart: (state) => {
            state.selectedPhotos = [];
            state.totalPrice = 0;
        },
    },
});

export const { addPhoto, removePhoto, setMaxPrice, setUnitPrice, setTotalNumberOfPhotos, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
