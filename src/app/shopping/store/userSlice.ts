import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../types/galleryTypes";

interface UserState {
    userInfo: UserInfo;
    paymentStatus: "pending" | "completed" | "failed";
}

const initialState: UserState = {
    userInfo: { firstName: "", lastName: "" },
    paymentStatus: "pending",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInfo: (
            state,
            action: PayloadAction<{ firstName: string; lastName: string }>
        ) => {
            state.userInfo = action.payload;
        },
        setPaymentStatus: (state, action: PayloadAction<UserState["paymentStatus"]>) => {
            state.paymentStatus = action.payload;
        },
    },
});

export const { setUserInfo, setPaymentStatus } = userSlice.actions;
export default userSlice.reducer;
