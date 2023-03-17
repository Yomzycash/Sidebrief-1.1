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
import { useAddServicePaymentMutation, useViewServiceQuery } from "services/complyService";
import { setLaunchPaid } from "redux/Slices";
import { Puff } from "react-loading-icons";

const ServicePayment = () => {
  // const serviceData = JSON.parse(localStorage.getItem("serviceData"));
  const complyData = JSON.parse(localStorage.getItem("complyData"));
  const [addServicePayment] = useAddServicePaymentMutation();
  let serviceId = complyData.serviceId;
  const viewService = useViewServiceQuery(serviceId);
  const serviceData = viewService.data;

  const navigate = useNavigate();

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

  const sendServiceRefToBackend = async (reference) => {
    const requiredData = {
      complyCode: complyData.complyCode,
      complyPayment: {
        paymentAmount: serviceData?.servicePrice,
        paymentCurrency: "NGN",
        paymentTransactionId: reference.transaction_id,
        paymentProvider: "Flutterwave",
        paymentStatus: reference.status,
      },
    };
    localStorage.setItem("servicePaymentDetails", JSON.stringify(requiredData.complyPayment));
    store.dispatch(setLaunchPaid(reference.status));
    const payResponse = await addServicePayment(requiredData);
    if (payResponse.data) {
      localStorage.removeItem("serviceData");
    }
    navigate("/services/form");
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
            <PaymentForm
              currency={serviceData?.serviceCurrency || "--"}
              amount={serviceData?.servicePrice || 0}
              paymentProvider={getActive()}
              onPaymentComplete={sendServiceRefToBackend}
              title={"service payment"}
              description={`Payment for business registration in ${
                serviceData?.serviceCountry || "country"
              }`}
            />
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
