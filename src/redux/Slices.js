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
    refreshApp: false,
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
    setRefreshApp: (state, action) => {
      state.refreshApp = action.payload;
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
  setRefreshApp,
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

const NotificationInfo = createSlice({
  name: "Notification",
  initialState: {
    messageObj: [],
  },
  reducers: {
    setMessageObj: (state, action) => {
      state.messageObj = action.payload;
    },
  },
});

export const NotificationReducer = NotificationInfo.reducer;
export const { setMessageObj } = NotificationInfo.actions;

// This slice will hold all registered businesses and current registration information
const BusinessesInfo = createSlice({
  name: "registered businesses",
  initialState: {
    currentBusiness: {
      shareHolders: "",
      directors: "",
      beneficiaries: "",
    },
    businessesShown: { total: 0, shown: 0 },
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
    setBusinessesShown: (state, action) => {
      const { total, shown } = action.payload;
      state.businessesShown = { total: total, shown: shown };
    },
  },
});

export const BusinessesReducers = BusinessesInfo.reducer;
export const { setBusinessFormInfo, setBusinessesShown } =
  BusinessesInfo.actions;

// This slice will hold all launch application information
const launchApplicationInfo = createSlice({
  name: "launchApplication",
  initialState: {
    businessNames: [],
    selectedCountry: "",
    countryISO: "",
    selectedObjectives: [],
    selectedEntity: {},
    launchResponse: {},
    launchPaid: false,
    generatedLaunchCode: "",
    generatedMemberCode: "",
    businessAddress: {},
    shareHoldersLaunchInfo: [],
    directorsLaunchInfo: [],
    beneficiariesLaunchInfo: [],
    generatedBeneficialOwnerCode: "",
    editShareholderInfo: [],
    shareholderDocs: [],
    directorDocs: [],
    beneficiaryDocs: [],
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
    setLaunchPaid: (state, action) => {
      state.launchPaid = action.payload;
    },
    setGeneratedMemberCode: (state, action) => {
      state.generatedMemberCode = action.payload;
    },
    setBusinessAddress: (state, action) => {
      state.businessAddress = action.payload;
    },
    setShareHoldersLaunchInfo: (state, action) => {
      if (action.payload.type === "add") {
        state.shareHoldersLaunchInfo.push(action.payload.info);
      } else {
        state.shareHoldersLaunchInfo = action.payload.info;
      }
    },
    setDirectorsLaunchInfo: (state, action) => {
      if (action.payload.type === "add") {
        state.directorsLaunchInfo.push(action.payload.info);
      } else {
        state.directorsLaunchInfo = action.payload.info;
      }
    },
    setBeneficiariesLaunchInfo: (state, action) => {
      if (action.payload.type === "add") {
        state.beneficiariesLaunchInfo.push(action.payload.info);
      } else {
        state.beneficiariesLaunchInfo = action.payload.info;
      }
    },
    setGeneratedBeneficialOwnerCode: (state, action) => {
      state.generatedBeneficialOwnerCode = action.payload;
    },
    setShareholderDocs: (state, action) => {
      state.shareholderDocs = action.payload;
    },
    setDirectorDocs: (state, action) => {
      state.directorDocs = action.payload;
    },
    setBeneficiaryDocs: (state, action) => {
      state.beneficiaryDocs = action.payload;
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
  setLaunchPaid,
  setGeneratedLaunchCode,
  setGeneratedMemberCode,
  setBusinessAddress,
  setShareHoldersLaunchInfo,
  setDirectorsLaunchInfo,
  setBeneficiariesLaunchInfo,
  updateLaunchShareHolder,
  setGeneratedBeneficialOwnerCode,
  setUploadeddocs,
  setShareholderDocs,
  setDirectorDocs,
  setBeneficiaryDocs,
} = launchApplicationInfo.actions;

const RewardInfo = createSlice({
  //creating reward slice (object) then export reducers of the slice
  name: "Reward",
  initialState: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjI5NTZhODlmMGFkOTRiNjEwMmJlNCIsImlhdCI6MTY2MzIxMDg1OCwiZXhwIjoyNTI3MjEwODU4fQ.DWx81pLGpaVYdC_fD_vfr8spAScz3mP-GsXldfEGMoA",
    allRewards: [],
    myRewards: [],
    rewardsShown: { shown: 0, total: 0 },
  },
  reducers: {
    setAllAvailableRewards: (state, action) => {
      state.allRewards = action.payload;
    },
    setMyClaimedRewards: (state, action) => {
      state.myRewards = action.payload;
    },
    setRewardsShown: (state, action) => {
      const { shown, total } = action.payload;
      state.rewardsShown = { shown: shown, total: total };
    },
  },
});

export const RewardReducer = RewardInfo.reducer;
export const { setAllAvailableRewards, setMyClaimedRewards, setRewardsShown } =
  RewardInfo.actions;

const ServicesInfo = createSlice({
  //creating services slice (object) then export reducers of the slice
  name: "Reward",
  initialState: {
    allServices: [],
  },
  reducers: {
    setAllServices: (state, action) => {
      state.allServices = action.payload;
    },
  },
});

export const ServiceReducer = ServicesInfo.reducer;
export const { setAllServices } = ServicesInfo.actions;
