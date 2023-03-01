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
  const [status, setStatus] = useState("");
  const [entityInfo, setEntityInfo] = useState({
    entityCurrency: "",
    entityFee: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useGetSingleEntityQuery(launchInfo?.registrationType);

  //   useEffect(() => {
  //     console.log("entityyyy", data);
  //     if (data) setEntityInfo(data);
  //   }, [data]);

  const queryParams = new URLSearchParams(window.location.search);

  const paymentStatus = queryParams.get("redirect_status");

  const paymentTransactionId = queryParams.get("payment_intent");

  //   Send the payment reference information to the backend
  // const sendRefToBackend = async () => {
  //   const requiredData = {
  //     launchCode: launchInfo.launchCode,
  //     paymentDetails: {
  //       paymentAmount: data?.entityFee,
  //       paymentCurrency: data?.entityCurrency,
  //       paymentTransactionId: paymentTransactionId,
  //       paymentProvider: "Stripe",
  //       paymentStatus: paymentStatus === "succeeded" && "successful",
  //     },
  //   };
  //   localStorage.setItem(
  //     "paymentDetails",
  //     JSON.stringify(requiredData.paymentDetails)
  //   );
  //   store.dispatch(setLaunchPaid(status));
  //   const payResponse = await payLaunch(requiredData);
  //   console.log("payResponse", payResponse);
  //   navigate("/launch/address");
  // };

  return (
    <MainWrapper>
      <Success image={image} />
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
