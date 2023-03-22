import React from "react";
import { Body, Loading } from "./styles.js";
import { CheckoutController, CheckoutSection, PaymentForm, PaymentSelector } from "containers";
import { Bottom, Container, Header } from "pages/Launch/styled";
import { usePaymentReducer } from "./reducer";
import { useNavigate } from "react-router-dom";
import { store } from "redux/Store";
import { setServiceCheckoutProgress } from "redux/Slices";
import { useEffect } from "react";
import ServicesCheckoutHeader from "components/Header/ServicesCheckoutHeader.jsx";
import { setLaunchPaid } from "redux/Slices";
import { Puff } from "react-loading-icons";
import { useGetSingleServiceQuery } from "services/staffService.js";
import { useAddComplyPaymentMutation } from "services/complyService.js";

const ServicePayment = () => {
  // const serviceData = JSON.parse(localStorage.getItem("serviceData"));
  // const complyData = JSON.parse(localStorage.getItem("complyInfo"));
  const navigate = useNavigate();

  let complyInfo = JSON.parse(localStorage.getItem("complyInfo"));
  let serviceId = complyInfo?.serviceId;

  const [addServicePayment] = useAddComplyPaymentMutation();
  const viewService = useGetSingleServiceQuery(serviceId);

  const serviceData = viewService.data;

  const handleNext = () => {
    navigate("/services/form");
  };

  const { activateProvider, getActive, providers } = usePaymentReducer();

  const handlePrev = () => {
    navigate(-1);
  };

  // Set the progress of the application
  useEffect(() => {
    store.dispatch(setServiceCheckoutProgress({ total: 4, current: 1 })); // total- total pages and current - current page
  }, []);

  // Send the payment reference information to the backend
  const sendServiceRefToBackend = async (reference) => {
    const requiredData = {
      complyCode: complyInfo.complyCode,
      complyPayment: {
        paymentAmount: serviceData?.servicePrice,
        paymentCurrency: serviceData?.serviceCurrency,
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

  let paymentInfo = {
    sendRefsToBackend: sendServiceRefToBackend,
    amount: serviceData?.servicePrice,
    currency: serviceData?.serviceCurrency,
    title: serviceData?.serviceName,
    description: `Payment for ${serviceData?.serviceName} in ${serviceData?.serviceCountry}`,
  };

  return (
    <Container>
      <Header>
        <ServicesCheckoutHeader />
      </Header>

      <Body>
        <CheckoutSection
          title="Payment Method"
          // HeaderParagraph="Please select a payment method to continue with."
        />
        <PaymentSelector providers={providers} activate={activateProvider} />
        {/* <button onClick={() => console.log(getActive().name)}>
					Get active
				</button> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "40px",
          }}
        >
          {viewService.isLoading ? (
            <Loading>
              <Puff stroke="#00A2D4" />
            </Loading>
          ) : (
            <PaymentForm paymentProvider={getActive()} paymentInfo={paymentInfo} />
          )}
        </div>
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
      {/* <AppFeedback subProject="Payment page" /> */}
    </Container>
  );
};

export default ServicePayment;
