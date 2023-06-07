import React, { useState } from "react";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { Body, Loading } from "./styles.js";
import { CheckoutController, CheckoutSection } from "containers";
import { Bottom, Container, Header } from "../styled";
import { useNavigate } from "react-router-dom";
import { store } from "redux/Store";
import { useSelector } from "react-redux";
import { setCheckoutProgress } from "redux/Slices";
import { useEffect } from "react";
import { useGetSingleEntityQuery, usePayLaunchMutation } from "services/launchService";
import { setLaunchPaid } from "redux/Slices";
import Payment from "containers/Payment/index.jsx";
import { Puff } from "react-loading-icons";
import { getPromoPrice, useLaunchActions } from "../actions.js";

const PaymentPage = () => {
  const [entityInfo, setEntityInfo] = useState({
    entityCurrency: "",
    entityFee: "",
  });

  const [payLaunch] = usePayLaunchMutation();
  const { handleUserUpdate } = useLaunchActions();

  const launchResponse = JSON.parse(localStorage.getItem("launchInfo"));
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const email = localStorage.getItem("userEmail");
  let promoInfo = JSON.parse(localStorage.getItem("promoInfo"));

  const { launchCode, registrationType } = launchResponse;

  const { data, isLoading } = useGetSingleEntityQuery(registrationType);

  useEffect(() => {
    if (data) setEntityInfo(data);
  }, [data]);

  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/launch/entity");
  };

  const handlePrev = () => {
    navigate(-1);
  };

  //

  // Send the payment reference information to the backend
  const sendFlutterwaveRefToBackend = async (reference) => {
    const requiredData = {
      launchCode: launchCode,
      paymentDetails: {
        paymentAmount: reference.amount.toString(),
        paymentCurrency: reference.currency.toString(),
        paymentTransactionId: reference.transaction_id.toString(),
        paymentProvider: "Flutterwave",
        paymentStatus: reference.status.toString(),
      },
    };
    localStorage.setItem("paymentDetails", JSON.stringify(requiredData.paymentDetails));
    store.dispatch(setLaunchPaid(reference.status));
    const payResponse = await payLaunch(requiredData);
    await updateHasUsedRef();

    navigate("/launch/address");
    return payResponse;
  };

  //

  // Stripe required data to be sent to the backend a successful payment
  const sendStripeRefToBackend = async (paymentIntent) => {
    const requiredData = {
      launchCode: launchCode,
      paymentDetails: {
        paymentAmount: paymentIntent.amount.toString(),
        paymentCurrency: paymentIntent.currency.toString(),
        paymentTransactionId: paymentIntent.id.toString(),
        paymentProvider: "Stripe",
        paymentStatus: paymentIntent.status === "succeeded" ? "successful" : "",
      },
    };
    localStorage.setItem("paymentDetails", JSON.stringify(requiredData.paymentDetails));
    store.dispatch(setLaunchPaid(requiredData.paymentStatus));
    const payResponse = await payLaunch(requiredData);
    await updateHasUsedRef();

    navigate("/launch/address");

    return payResponse;
  };

  //

  //
  const updateHasUsedRef = async () => {
    const promoCode = promoInfo?.promoCode;
    if (promoCode) {
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ ...userInfo, has_used_referral_code: true })
      );
      await handleUserUpdate({ useReferralCode: true }, email);
    }
  };

  // Passed to the payment component
  let paymentInfo = {
    sendFlutterwaveRefToBackend: sendFlutterwaveRefToBackend,
    sendStripeRefToBackend: sendStripeRefToBackend,
    amount: getPromoPrice(entityInfo) || entityInfo?.entityFee,
    currency: entityInfo?.entityCurrency,
    title: "Business Registration",
    description: `Payment for Business Registration in ${entityInfo?.entityCountry}`,
  };

  // Set the progress of the application
  useEffect(() => {
    store.dispatch(setCheckoutProgress({ total: 13, current: 4 })); // total- total pages and current - current page
  }, []);

  return (
    <Container>
      <Header>
        <HeaderCheckout />
      </Header>

      <Body>
        <CheckoutSection
          title="Payment Method"
          // HeaderParagraph="Please select a payment method to continue with."
        />
        {isLoading ? (
          <Loading>
            <Puff stroke="#00A2D4" fill="white" />
          </Loading>
        ) : (
          <Payment paymentInfo={paymentInfo} />
        )}

        <Bottom>
          <CheckoutController
            backText={"Previous"}
            hideForward
            backAction={handlePrev}
            forwardAction={handleNext}
          />
        </Bottom>
      </Body>
    </Container>
  );
};

export default PaymentPage;
