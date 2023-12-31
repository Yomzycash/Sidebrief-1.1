import toast from "react-hot-toast";
import { store } from "redux/Store";
import {
  resetLaunchInfo,
  saveUserInfo,
  setBusinessObjectives,
  setCountry,
  setCountryISO,
  setGeneratedLaunchCode,
  setLaunchPaid,
  setLaunchResponse,
  setSelectedBusinessNames,
  setSelectedEntity,
} from "redux/Slices";
import { countriesInfo } from "./allCountries";
import { checkPaymentStatus } from "pages/Launch/actions";
import { authApi } from "services/authService";
import { launchApi } from "services/launchService";
import { RewardApi } from "services/RewardService";
import { staffApi } from "services/staffService";
import { ChatApi } from "services/chatService";

// handle error encountered in endpoints call
export const handleError = (error) => {
  if (error?.status === "FETCH_ERROR") {
    toast.error("Connection error");
  } else if (error?.originalStatus === "404") {
    toast.error("Please check credentiaal");
  } else if (typeof error?.data?.message === "string") {
    toast.error(error?.data.message);
  } else if (error?.data?.error) {
    toast.error(error?.data.error);
  } else if (error?.data?.message?.code) {
    toast.error(error?.data?.message?.code);
  } else if (typeof error?.data === "string") {
    toast.error(error.data);
  } else if (typeof error === "string") {
    toast.error(error);
  }
};

// handle response received from endpoints call
export const handleResponse = (response, successMessage, successAction, errorAction) => {
  if (response?.data) {
    toast.success(successMessage);
    if (successAction) successAction();
  } else {
    if (errorAction) errorAction();
    handleError(response?.error);
  }
};

// Check if an email is a staff email
export const checkStaffEmail = (email) => {
  let emailArr = email?.split("");
  let index = emailArr?.indexOf("@");
  let check = email?.slice(index + 1, index + 10)?.toLowerCase();
  let staff = check === "sidebrief" ? true : false;
  return staff;
};

const setInfoToLocalStorageAndStore = (launchInfo) => {
  // set the launchInfo to store and localstorage
  store.dispatch(setLaunchResponse(launchInfo)); // !important DO NOT DELETE
  localStorage.setItem("launchInfo", JSON.stringify(launchInfo));
  localStorage.setItem("countryISO", launchInfo.registrationCountry);
};

export const navigateToDetailPage = async (navigate, launchInfo, viewPayLaunch) => {
  let paymentInfo = await checkPaymentStatus({
    ...launchInfo,
    viewPayLaunch,
  });

  if (paymentInfo?.data) {
    localStorage.setItem("paymentDetails", JSON.stringify(paymentInfo?.data));
    store.dispatch(setLaunchPaid(paymentInfo));
  }
  // setInfoToLocalStorageAndStore(launchInfo);
  // navigate
  navigate(
    `/dashboard/my-products/business/detail?launchCode=${launchInfo.launchCode}&registrationCountry=${launchInfo.registrationCountry}&registrationType=${launchInfo.registrationType}`
  );
};

export const staffNavigateToDetailPage = (navigate, launchInfo) => {
  // setInfoToLocalStorageAndStore(launchInfo);
  // navigate
  navigate(
    `/staff-dashboard/business/detail?launchCode=${launchInfo.launchCode}&registrationCountry=${launchInfo.registrationCountry}&registrationType=${launchInfo.registrationType}`
  );
};

export const userNavigateToServiceDetailPage = (navigate, complyCode) => {
  navigate(`/dashboard/services/${complyCode}/info`);
};

export const staffNavigateToServiceDetailPage = (navigate, complycode) => {
  navigate(`/staff-dashboard/businesses/services/${complycode}/info`);
};

export const getCurrencyInfo = (currency) => {
  let currencyInfo = countriesInfo?.filter(
    (country) => country.currency?.toLowerCase() === currency?.toLowerCase()
  )[0];
  if (currency) return currencyInfo;
  else return "";
};

export const handleLogout = (navigate) => {
  // clear localstorage
  localStorage.clear();
  // clear all cache
  store.dispatch(ChatApi.util.resetApiState());
  store.dispatch(RewardApi.util.resetApiState());
  store.dispatch(authApi.util.resetApiState());
  store.dispatch(launchApi.util.resetApiState());
  store.dispatch(staffApi.util.resetApiState());

  store.dispatch(saveUserInfo({}));

  //navigate
  navigate("/login");
};

export const removeLaunchFromLocalStorage = () => {
  localStorage.removeItem("launchInfo");
  localStorage.removeItem("countryISO");
  localStorage.removeItem("paymentDetails");
  localStorage.removeItem("promoInfo");
  localStorage.removeItem("useSidebriefShareholders");
  localStorage.removeItem("useSidebriefDirectors");
  localStorage.removeItem("beneficiaries");
};

export const removeLaunchFromStore = () => {
  store.dispatch(resetLaunchInfo());
};

export const removeComplyFromLocalStorage = () => {
  localStorage.removeItem("complyInfo");
  localStorage.removeItem("paymentDetails");
};

export const clearProductsInfo = () => {
  removeLaunchFromStore();
  removeLaunchFromLocalStorage();
  removeComplyFromLocalStorage();
};

export function debounce(func, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
