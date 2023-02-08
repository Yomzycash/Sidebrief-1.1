export const checkPaymentStatus = async () => {
  let viewResponse = await viewPayLaunch(launchResponse);

  let data = viewResponse?.data?.businessPayment[0];
  let error = viewResponse?.error;
  store.dispatch(setLaunchResponse(launchResponse));
  if (data) {
    if (data?.paymentStatus === "successful") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
