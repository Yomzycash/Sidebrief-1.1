import { createSlice } from "@reduxjs/toolkit";

const UserData = createSlice({
  name: "User data",
  initialState: {
    userInfo: {},
  },
  reducers: {
    saveUserInfo: (state, action) => {
      state.UserData = action.payload;
    },
  },
});
export const UserDataReducer = UserData.reducer;

export const { saveUserInfo } = UserData.actions;
