import { store } from "redux/Store";
import { setLaunchResponse } from "redux/Slices";
// import { handleErrorHook } from "utils/hooks/staff";

export const useActions = ({
	setShowContext,
	navigate,
	setShowDelete,
	launchInfo,
	viewPayLaunch,
}) => {
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

	const viewAction = () => {
		hideContext();
		navigateToDetailPage();
	};

	const editAction = async () => {
		await handleEditNavigation();
		hideContext();
	};

	const deleteAction = () => {
		hideContext();
		showDeleteModal();
	};

	const navigateToDetailPage = () => {
		// set the launchInfo to store and localstorage
		store.dispatch(setLaunchResponse(launchInfo)); // !important DO NOT DELETE
		localStorage.setItem("launchInfo", JSON.stringify(launchInfo));
		// navigate
		navigate(`/dashboard/business/${launchInfo.launchCode}/detail`);
	};

	const checkPaymentStatus = async () => {
		let viewResponse = await viewPayLaunch(launchInfo);
		// console.log(viewResponse);
		return viewResponse;
	};

	const handleEditNavigation = async () => {
		let status = await checkPaymentStatus();
		console.log(status);

		let data = status?.data?.businessPayment;
		let error = status?.error;

		if (data) {
			if (data.length === 0) {
				navigate("/launch");
			} else {
				navigate("/launch/address");
			}
		} else {
			// console.log("This block ran");
			console.log(error);
		}
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
