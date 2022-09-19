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
    rewardsPageHeader: true,
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
    setRewardsPageHeader: (state, action) => {
      state.rewardsPageHeader = action.payload;
    },
  },
});

export const LayoutInfoReducer = LayoutInfo.reducer;
export const { setSidebarWidth, setCheckoutProgress, setRewardsPageHeader } =
  LayoutInfo.actions;

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
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzNhYzlmNjUyMGZiMmVkNjk2OTliMSIsImlhdCI6MTY1Njk5MDg4MCwiZXhwIjoxNjY0NzY2ODgwfQ.O0AiYvD_MybRDhYmis03OdDOnvexu4fI9-hv8HlwETg",
    businessNames: [],
    selectedCountry: "",
    countryISO: "",
    selectedObjectives: [],
    setSelectedEntity: {},
    launchResponse: {},
    generatedLaunchCode: "",
    generatedMemberCode: "",
  },
  reducers: {
    setSelectedBusinessNames: (state, action) => {
      state.businessNames = action.payload;
    },
    setCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
    setCountryISO: (state, action) => {
      state.countryISO = action.payload;
    },
    setBusinessObjectives: (state, action) => {
      state.selectedObjectives = action.payload;
    },
    setSelectedEntity: (state, action) => {
      state.selectedEntity = action.payload;
    },
    setLaunchResponse: (state, action) => {
      state.launchResponse = action.payload;
    },
    setGeneratedLaunchCode: (state, action) => {
      state.generatedLaunchCode = action.payload;
    },

    setGeneratedMemberCode: (state, action) => {
      state.generatedMemberCode = action.payload;
    },
  },
});

export const LaunchReducer = launchApplicationInfo.reducer;
export const {
  setSelectedBusinessNames,
  setCountry,
  setCountryISO,
  setBusinessObjectives,
  setSelectedEntity,
  setLaunchResponse,
  setGeneratedLaunchCode,
  setGeneratedMemberCode,
} = launchApplicationInfo.actions;
