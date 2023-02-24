import Success from "containers/Confirmation/Success";
import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { checkPaymentStatus } from "pages/Launch/actions";
import {
  useGetSingleEntityQuery,
  usePayLaunchMutation,
  useViewPayLaunchMutation,
} from "services/launchService";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import image from "../../../asset/images/SuccessStripe.png";
import { store } from "redux/Store";
import { setLaunchPaid } from "redux/Slices";
import { useState } from "react";
const StripePaymentSuccess = () => {
  const launchInfo = JSON.parse(localStorage.getItem("launchInfo"));
  const navigate = useNavigate();
  const location = useLocation();
  const [payLaunch, payState] = usePayLaunchMutation();
  const [entityInfo, setEntityInfo] = useState({
    entityCurrency: "",
    entityFee: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useGetSingleEntityQuery(launchInfo?.registrationType);
  console.log(launchInfo);

  console.log("entityyyy", data);
  //   useEffect(() => {
  //     console.log("entityyyy", data);
  //     if (data) setEntityInfo(data);
  //   }, [data]);

  const queryParams = new URLSearchParams(window.location.search);
  console.log("checking params", queryParams);

  const paymentStatus = queryParams.get("redirect_status");
  console.log("checking params status", paymentStatus);

  const paymentTransactionId = queryParams.get("payment_intent");
  console.log("checking params ID", paymentTransactionId);

  //   Send the payment reference information to the backend
  const sendRefToBackend = async () => {
    const requiredData = {
      launchCode: launchInfo.launchCode,
      paymentDetails: {
        paymentAmount: data?.entityFee,
        paymentCurrency: data?.entityCurrency,
        paymentTransactionId: paymentTransactionId,
        paymentProvider: "Stripe",
        paymentStatus: paymentStatus,
      },
    };

    console.log("requed", requiredData);
    localStorage.setItem(
      "paymentDetails",
      JSON.stringify(requiredData.paymentDetails)
    );
    store.dispatch(setLaunchPaid(paymentStatus));
    const payResponse = await payLaunch(requiredData);
    console.log("payResponse", payResponse);
    navigate("/launch/address");
  };

  //   useEffect(() => {
  //     sendRefToBackend();
  //   }, []);

  return (
    <MainWrapper>
      <Success image={image} onButtonClick={sendRefToBackend} />
    </MainWrapper>
  );
};

export default StripePaymentSuccess;

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;
