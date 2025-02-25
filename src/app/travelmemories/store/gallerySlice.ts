import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Photo, ShootingInfo } from "../types/galleryTypes";

interface GalleryState {
    photos: Photo[];
    shootingInfo: ShootingInfo;
}

const initialState: GalleryState = {
    photos: [],
    shootingInfo: { id: "", city: "", country: "", modelName: "" },
};

const gallerySlice = createSlice({
    name: "gallery",
    initialState,
    reducers: {
        setSessionInfo: (state, action: PayloadAction<GalleryState>) => {
            state.photos = action.payload.photos;
            state.shootingInfo = action.payload.shootingInfo;
        },
    },
});

export const { setSessionInfo } = gallerySlice.actions;
export default gallerySlice.reducer;
