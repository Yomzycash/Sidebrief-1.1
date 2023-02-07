import { store } from "redux/Store";
import { setLaunchResponse } from "redux/Slices";

export const navigateToDetailPage = (navigate, launchInfo) => {
	// set the launchInfo to store and localstorage
	store.dispatch(setLaunchResponse(launchInfo)); // !important DO NOT DELETE
	localStorage.setItem("launchInfo", JSON.stringify(launchInfo));
	localStorage.setItem("countryISO", launchInfo.registrationCountry);
	// navigate
	navigate(`/dashboard/business/${launchInfo.launchCode}/detail`);
};
