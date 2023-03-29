import React from "react";
import { Body, Loading } from "./styles.js";
import { CheckoutController, CheckoutSection } from "containers";
import { Bottom, Container } from "pages/Launch/styled";
import { useNavigate } from "react-router-dom";
import { store } from "redux/Store";
import { setServiceCheckoutProgress } from "redux/Slices";
import { useEffect } from "react";
import ServicesCheckoutHeader from "components/Header/ServicesCheckoutHeader.jsx";
import { setLaunchPaid } from "redux/Slices";
import { useGetSingleServiceQuery } from "services/staffService.js";
import { useAddComplyPaymentMutation } from "services/complyService.js";
import Payment from "containers/Payment/index.jsx";
import { Puff } from "react-loading-icons";

const ServicePayment = () => {
  const navigate = useNavigate();

  let complyInfo = JSON.parse(localStorage.getItem("complyInfo"));
  let serviceId = complyInfo?.serviceId;

  const [addServicePayment] = useAddComplyPaymentMutation();
  const viewService = useGetSingleServiceQuery(serviceId);

  const serviceData = viewService.data;

  const handleNext = () => {
    navigate("/services/form");
  };

  const handlePrev = () => {
    navigate(-1);
  };

  // Send the payment reference information to the backend
  const sendFlutterwaveRefToBackend = async (reference) => {
    const requiredData = {
      complyCode: complyInfo.complyCode,
      complyPayment: {
        paymentAmount: reference.amount,
        paymentCurrency: reference.currency,
        paymentTransactionId: reference.transaction_id,
        paymentProvider: "Flutterwave",
        paymentStatus: reference.status,
      },
    };
    localStorage.setItem("paymentDetails", JSON.stringify(requiredData.complyPayment));
    store.dispatch(setLaunchPaid(reference.status));
    const payResponse = await addServicePayment(requiredData);

    navigate("/services/form");
  };

  // Stripe required data to be sent to the backend a successful payment
  const sendStripeRefToBackend = async (paymentIntent) => {
    const requiredData = {
      complyCode: complyInfo.complyCode,
      paymentDetails: {
        paymentAmount: paymentIntent.amount,
        paymentCurrency: paymentIntent.currency,
        paymentTransactionId: paymentIntent.id,
        paymentProvider: "Stripe",
        paymentStatus: paymentIntent.status === "succeeded" ? "successful" : "",
      },
    };
    localStorage.setItem("paymentDetails", JSON.stringify(requiredData.paymentDetails));
    store.dispatch(setLaunchPaid(requiredData));
    const payResponse = await addServicePayment(requiredData);

    navigate("/services/form");
  };

  // Passed to the payment component
  let paymentInfo = {
    sendFlutterwaveRefToBackend: sendFlutterwaveRefToBackend,
    sendStripeRefToBackend: sendStripeRefToBackend,
    amount: serviceData?.servicePrice,
    currency: serviceData?.serviceCurrency,
    title: serviceData?.serviceName,
    description: `Payment for ${serviceData?.serviceName} in ${serviceData?.serviceCountry}`,
  };

  // Set the progress of the application
  useEffect(() => {
    store.dispatch(setServiceCheckoutProgress({ total: 2, current: 1 })); // total- total pages and current - current page
  }, []);
  return (
    <Container>
      <ServicesCheckoutHeader />

      <Body>
        <CheckoutSection
          title="Payment Method"
          // HeaderParagraph="Please select a payment method to continue with."
        />
        {viewService.isLoading ? (
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
            forwardText="Next"
          />
        </Bottom>
      </Body>
    </Container>
  );
};

export default ServicePayment;
