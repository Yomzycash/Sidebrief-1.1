import { createSlice } from "@reduxjs/toolkit";

const UserData = createSlice({
  name: "User data",
  initialState: {
    userInfo: {},
    PartnerInfo: {},
    ResellerInfo: {},
  },
  reducers: {
    saveUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    savePartnerInfo: (state, action) => {
      state.PartnerInfo = action.payload;
    },
    saveResellerInfo: (state, action) => {
      state.ResellerInfo = action.payload;
    },
  },
});
export const UserDataReducer = UserData.reducer;

export const { saveUserInfo, savePartnerInfo, saveResellerInfo} = UserData.actions;
