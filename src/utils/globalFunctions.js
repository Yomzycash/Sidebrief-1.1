import toast from "react-hot-toast";
import { store } from "redux/Store";
import { setLaunchResponse } from "redux/Slices";

// handle error encountered in endpoints call
export const handleError = (error) => {
  if (error?.status === "FETCH_ERROR") {
    toast.error("Please check your internet connection");
  } else if (error?.originalStatus === "404") {
    toast.error("Please check credentiaal");
  } else if (error?.data?.message) {
    toast.error(error?.data.message);
  } else if (typeof error === "string") {
    toast.error(error);
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

export const navigateToDetailPage = (navigate, launchInfo) => {
	// set the launchInfo to store and localstorage
	store.dispatch(setLaunchResponse(launchInfo)); // !important DO NOT DELETE
	localStorage.setItem("launchInfo", JSON.stringify(launchInfo));
	localStorage.setItem("countryISO", launchInfo.registrationCountry);
	// navigate
	navigate(`/dashboard/business/${launchInfo.launchCode}/detail`);
};
