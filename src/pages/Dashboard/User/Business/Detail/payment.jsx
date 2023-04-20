import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useViewLaunchRequestQuery } from "services/launchService";
import PaymentDetailsCard from "../../../../../components/cards/PaymentCard";
import { DetailContainer } from "./styles";

const Payment = () => {
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const { first_name, last_name } = useSelector((store) => store.UserDataReducer.userInfo);
  const launchResponse = {
    launchCode: searchParams.get("launchCode"),
    registrationCountry: searchParams.get("registrationCountry"),
    registrationType: searchParams.get("registrationType"),
  };

  const launchRequest = useViewLaunchRequestQuery(launchResponse);

  let paymentDetails = launchRequest?.data?.businessPayment[0];
  // console.log("checking", launchRequest?.data?.createdAt);

  return (
    <DetailContainer>
      <PaymentDetailsCard
        amount={paymentDetails?.paymentAmount}
        currency={paymentDetails?.paymentCurrency}
        id={paymentDetails?.paymentTransactionId}
        provider={paymentDetails?.paymentProvider}
        status={paymentDetails?.paymentStatus}
        code={paymentDetails?.launchCode}
        launchRequest={launchRequest}
        firstname={first_name}
        lastname={last_name}
        date={launchRequest?.data?.createdAt.slice(0, 10)}
        isLoading={launchRequest?.isLoading}
      />
    </DetailContainer>
  );
};

export default Payment;
