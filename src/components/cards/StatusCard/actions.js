import { store } from "redux/Store";
import { setLaunchResponse } from "redux/Slices";

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
    navigateToDetailPage();
  };

  const editAction = async () => {
    await handleEditNavigation();
  };

  const deleteAction = () => {
    showDeleteModal();
  };

  const navigateToDetailPage = async () => {
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
