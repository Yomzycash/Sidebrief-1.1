import { createSlice } from "@reduxjs/toolkit";

const UserData = createSlice({
  name: "User data",
  initialState: {
    userInfo: {},
    PartnerInfo: {},
    ResellerInfo: {},
    userLoginInfo: {},
    partnerLoginInfo: {},
    resellerLoginInfo: {},
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
    saveUserLoginInfo: (state, action) => {
      state.loginIfo = action.payload;
    },
    savePartnerLoginInfo: (state, action) => {
      state.loginIfo = action.payload;
    },
    saveResellerLoginInfo: (state, action) => {
      state.loginIfo = action.payload;
    },
  },
});
export const UserDataReducer = UserData.reducer;

export const {
  saveUserInfo,
  savePartnerInfo,
  saveResellerInfo,
  saveUserLoginInfo,
  savePartnerLoginInfo,
  saveResellerLoginInfo,
} = UserData.actions;

// This slice will hold all glabally needed layout information
const LayoutInfo = createSlice({
  name: "layout",
  initialState: {
    sidebarWidth: "",
  },
  reducers: {
    setSidebarWidth: (state, action) => {
      state.sidebarWidth = action.payload;
    },
  },
});

export const LayoutInfoReducer = LayoutInfo.reducer;
export const { setSidebarWidth } = LayoutInfo.actions;
