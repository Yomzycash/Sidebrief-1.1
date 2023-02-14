import { navigateToDetailPage } from "utils/globalFunctions";
import { store } from "redux/Store";
import { setLaunchPaid, setLaunchResponse } from "redux/Slices";
import { checkPaymentStatus } from "pages/Launch/actions";

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
    navigateToDetailPage(navigate, launchInfo, viewPayLaunch);
  };

  const editAction = async () => {
    await handleEditNavigation();
  };

  const deleteAction = () => {
    showDeleteModal();
  };

  // const checkPaymentStatus = async () => {
  //   let viewResponse = await viewPayLaunch(launchInfo);
  //   // console.log(viewResponse);
  //   return viewResponse;
  // };

  const handleEditNavigation = async () => {
    localStorage.setItem("launchInfo", JSON.stringify(launchInfo));

    let paymentInfo = await checkPaymentStatus({
      ...launchInfo,
      viewPayLaunch,
    });
    if (paymentInfo?.data) {
      localStorage.setItem("paymentDetails", JSON.stringify(paymentInfo?.data));
      store.dispatch(setLaunchPaid(paymentInfo));
      store.dispatch(setLaunchResponse(launchInfo));
      localStorage.setItem("countryISO", launchInfo.registrationCountry);
      navigate("/launch/address");
    } else {
      navigate("/launch");
    }
  };

  return {
    viewAction,
    editAction,
    deleteAction,
    hideDeleteModal,
  };
};
