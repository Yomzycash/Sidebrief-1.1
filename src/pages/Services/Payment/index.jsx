import React from "react";
import { Body, Loading } from "./styles.js";
import { CheckoutController, CheckoutSection } from "containers";
import { Bottom, Container } from "pages/Launch/styled";
import { useNavigate, useParams } from "react-router-dom";
import { store } from "redux/Store";
import { setServiceCheckoutProgress } from "redux/Slices";
import { useEffect } from "react";
import ServicesCheckoutHeader from "components/Header/ServicesCheckoutHeader.jsx";
import { setLaunchPaid } from "redux/Slices";
import { useGetSingleServiceQuery } from "services/staffService.js";
import { useAddComplyPaymentMutation } from "services/complyService.js";
import Payment from "containers/Payment/index.jsx";
import { Puff } from "react-loading-icons";
import { getPromoPrice } from "../actions.js";

const ServicePayment = () => {
  const navigate = useNavigate();

  let complyInfo = JSON.parse(localStorage.getItem("complyInfo"));
  let promoInfo = JSON.parse(localStorage.getItem("promoInfo"));
  let serviceId = complyInfo?.serviceId;

  const [addServicePayment] = useAddComplyPaymentMutation();
  const viewService = useGetSingleServiceQuery(serviceId);

  const serviceData = viewService.data;
  const serviceForm = serviceData?.serviceForm;
  const serviceRequirements = serviceData?.serviceRequirements;

  let { option } = useParams();

  const handlePrev = () => {
    navigate(-1);
  };

  //
  // console.log(option);

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

    let link = `/services/${option}/form`;
    link = serviceForm?.length < 1 ? `/services/${option}/documents` : link;
    link = serviceRequirements?.length < 1 ? `/services/${option}/review/info` : link;
    navigate(link);
  };

  // Stripe required data to be sent to the backend a successful payment
  const sendStripeRefToBackend = async (paymentIntent) => {
    const requiredData = {
      complyCode: complyInfo.complyCode,
      complyPayment: {
        paymentAmount: paymentIntent.amount,
        paymentCurrency: paymentIntent.currency,
        paymentTransactionId: paymentIntent.id,
        paymentProvider: "Stripe",
        paymentStatus: paymentIntent.status === "succeeded" ? "successful" : "",
      },
    };
    localStorage.setItem("paymentDetails", JSON.stringify(requiredData.complyPayment));
    store.dispatch(setLaunchPaid(requiredData));
    const payResponse = await addServicePayment(requiredData);

    let link = `/services/${option}/form`;
    link = serviceForm?.length < 1 ? `/services/${option}/documents` : link;
    link = serviceRequirements?.length < 1 ? `/services/${option}/review/info` : link;
    navigate(link);

    return payResponse;
  };

  //
  let promoPrice = getPromoPrice(serviceData);
  promoPrice = promoPrice ? parseInt(promoPrice.replace(/,/g, ""), 10) : 0;
  //

  // Passed to the payment component
  let paymentInfo = {
    sendFlutterwaveRefToBackend: sendFlutterwaveRefToBackend,
    sendStripeRefToBackend: sendStripeRefToBackend,
    amount: promoPrice ? promoPrice : serviceData?.servicePrice,
    currency: serviceData?.serviceCurrency,
    title: serviceData?.serviceName,
    description: `Payment for ${serviceData?.serviceName} in ${serviceData?.serviceCountry}`,
    isSubscription: option === "onboard",
    productId: serviceData?.productId || "",
    priceId: serviceData?.priceId || "",
  };

  // Set the progress of the application
  useEffect(() => {
    store.dispatch(setServiceCheckoutProgress({ total: 2, current: 1 })); // total- total pages and current - current page
  }, []);

  //

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
            forwardText="Next"
          />
        </Bottom>
      </Body>
    </Container>
  );
};

export default ServicePayment;
