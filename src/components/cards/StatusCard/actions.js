import { store } from "redux/Store";
import { setLaunchResponse } from "redux/Slices";

export const useActions = ({ setShowContext, navigate, setShowDelete }) => {
	const hideContext = () => {
		setShowContext(false);
	};

	const showDeleteModal = () => {
		setShowDelete(true);
	};

	const hideDeleteModal = () => {
		setShowDelete(false);
	};

	const toggleContext = () => {
		setShowContext((prev) => !prev);
	};

	const viewAction = (launchInfo) => {
		hideContext();
		navigateToDetailPage(launchInfo);
	};

	const editAction = () => {
		hideContext();
	};

	const deleteAction = () => {
		hideContext();
		showDeleteModal();
	};

	const navigateToDetailPage = (launchInfo) => {
		// set the launchInfo to store and localstorage
		store.dispatch(setLaunchResponse(launchInfo)); // !important DO NOT DELETE
		localStorage.setItem("launchInfo", JSON.stringify(launchInfo));
		// navigate
		navigate(`/dashboard/business/${launchInfo.launchCode}/detail`);
	};

	return {
		toggleContext,
		hideContext,
		viewAction,
		editAction,
		deleteAction,
		hideDeleteModal,
	};
};
