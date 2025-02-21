import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../types/galleryTypes";
import { paymentStatusType } from "../types/paymentStatusType";

interface UserState {
    userInfo: UserInfo;
    paymentStatus: paymentStatusType;
}

const initialState: UserState = {
    userInfo: { firstName: "", lastName: "", email:"" },
    paymentStatus: paymentStatusType.FAILED, 
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInfo: (
            state,
            action: PayloadAction<UserInfo>
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
