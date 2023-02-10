import { navigateToDetailPage } from "utils/globalFunctions";

export const useActions = ({
	navigate,
	setShowDelete,
	launchInfo,
	viewPayLaunch,
}) => {
	const showDeleteModal = () => {
		setShowDelete(true);
	};

	const hideDeleteModal = () => {
		setShowDelete(false);
	};

	const viewAction = () => {
		navigateToDetailPage(navigate, launchInfo);
	};

	const editAction = async () => {
		await handleEditNavigation();
	};

	const deleteAction = () => {
		showDeleteModal();
	};

	const checkPaymentStatus = async () => {
		let viewResponse = await viewPayLaunch(launchInfo);
		// console.log(viewResponse);
		return viewResponse;
	};

	const handleEditNavigation = async () => {
		let status = await checkPaymentStatus();

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
		viewAction,
		editAction,
		deleteAction,
		hideDeleteModal,
	};
};
