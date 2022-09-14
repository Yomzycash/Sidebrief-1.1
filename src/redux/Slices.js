import { createSlice } from "@reduxjs/toolkit";

// This slice will hold user needed information
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

// This slice will hold all glabally needed layout and similar information
const LayoutInfo = createSlice({
  name: "layout",
  initialState: {
    sidebarWidth: "",
    checkoutProgress: 0,
  },
  reducers: {
    setSidebarWidth: (state, action) => {
      state.sidebarWidth = action.payload;
    },
    setCheckoutProgress: (state, action) => {
      const { total, current } = action.payload;
      let progress = (current / total) * 100;
      state.checkoutProgress = progress;
    },
  },
});

export const LayoutInfoReducer = LayoutInfo.reducer;
export const { setSidebarWidth, setCheckoutProgress } = LayoutInfo.actions;

// This slice will hold all registered businesses and current registration information
const RegisteredBusinessesInfo = createSlice({
  name: "registered businesses",
  initialState: {
    currentBusiness: {
      shareHolders: "",
      directors: "",
      beneficiaries: "",
    },
  },
  reducers: {
    setBusinessFormInfo: (state, action) => {
      const { name, number } = action.payload;
      switch (name) {
        case "shareholders":
          state.currentBusiness.shareHolders = number;
          break;

        case "directors":
          state.currentBusiness.directors = number;
          break;

        case "beneficiaries":
          state.currentBusiness.beneficiaries = number;
          break;

        default:
          break;
      }
    },
  },
});

export const RegisteredBusinessesReducers = RegisteredBusinessesInfo.reducer;
export const { setBusinessFormInfo } = RegisteredBusinessesInfo.actions;

// This slice will hold all launch application information
const launchApplicationInfo = createSlice({
  name: "launchApplication",
  initialState: {
    launchCode: "",
  },
  reducers: {
    launchCode: (state, action) => {
      state.launchCode = action.payload;
    },
  },
});

export const LaunchReducer = launchApplicationInfo.reducers;
export const { launchCode } = launchApplicationInfo.actions;
