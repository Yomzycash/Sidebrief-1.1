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
    refreshNotifications: false,
    unreadLaunchNotifications: 0,
    batchDeleteArray: [],
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
    setRefreshNotifications: (state, action) => {
      state.refreshNotifications = action.payload;
    },
    setUnreadLaunchNotifications: (state, action) => {
      state.unreadLaunchNotifications = action.payload;
    },
    setBatchDeleteArray: (state, action) => {
      state.batchDeleteArray = action.payload;
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
  setRefreshNotifications,
  setUnreadLaunchNotifications,
  setBatchDeleteArray,
} = UserData.actions;

// This slice will hold all glabally needed layout and similar information
const LayoutInfo = createSlice({
  name: "layout",
  initialState: {
    sidebarWidth: "",
    checkoutProgress: 0,
    serviceCheckoutProgress: 0,
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
    setServiceCheckoutProgress: (state, action) => {
      const { total, current } = action.payload;
      let progress = (current / total) * 100;
      state.serviceCheckoutProgress = progress;
    },
  },
});

export const LayoutInfoReducer = LayoutInfo.reducer;
export const {
  setSidebarWidth,
  setCheckoutProgress,
  setServiceCheckoutProgress,
  setRewardsPageHeader,
} = LayoutInfo.actions;

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
export const { setBusinessFormInfo, setBusinessesShown } = BusinessesInfo.actions;

const launchInfoInitialState = {
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
  directorsLaunchInfo: [],
  beneficiariesLaunchInfo: [],
  editShareholderInfo: [],
  shareholderDocs: [],
  directorDocs: [],
  beneficiaryDocs: [],
  currentPage: false,
};

// This slice will hold all launch application information
const launchApplicationInfo = createSlice({
  name: "launchApplication",
  initialState: launchInfoInitialState,
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
    setDirectorsLaunchInfo: (state, action) => {
      state.directorsLaunchInfo = action.payload;
    },
    setBeneficiariesLaunchInfo: (state, action) => {
      state.beneficiariesLaunchInfo = action.payload;
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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetLaunchInfo: (state, action) => {
      return launchInfoInitialState;
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
  setDirectorsLaunchInfo,
  setBeneficiariesLaunchInfo,
  updateLaunchShareHolder,
  setUploadeddocs,
  setShareholderDocs,
  setDirectorDocs,
  setBeneficiaryDocs,
  setCurrentPage,
  resetLaunchInfo,
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
export const { setAllAvailableRewards, setMyClaimedRewards, setRewardsShown } = RewardInfo.actions;

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
