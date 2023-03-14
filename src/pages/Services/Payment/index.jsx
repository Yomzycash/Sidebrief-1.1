import React, { useReducer } from "react";
import { Body } from "./styles.js";
import { CheckoutController, CheckoutSection, PaymentForm, PaymentSelector } from "containers";
import { Bottom, Container, Header } from "pages/Launch/styled";
import { providerReducer, actions } from "./reducer";
import { paymentProviders } from "./constants";
import { useNavigate } from "react-router-dom";
import { store } from "redux/Store";
import { useSelector } from "react-redux";
import { setServiceCheckoutProgress } from "redux/Slices";
import { useEffect } from "react";
import ServicesCheckoutHeader from "components/Header/ServicesCheckoutHeader.jsx";
import { useAddServicePaymentMutation } from "services/complyService";
import { setLaunchPaid } from "redux/Slices";

const ServicePayment = () => {
  const serviceData = JSON.parse(localStorage.getItem("serviceData"));
  const complyData = JSON.parse(localStorage.getItem("complyData"));
  const [addServicePayment] = useAddServicePaymentMutation();

  const [providers, dispatch] = useReducer(
    providerReducer,
    paymentProviders.map((provider, index) => {
      return {
        ...provider,
        id: index + 1,
        active: index === 0,
      };
    })
  );

  const activateProvider = (id) => {
    dispatch({ type: actions.ACTIVATE, id: id });
  };

  // get current active
  const getActive = () => {
    return providers.find((el) => el.active === true).name.toLowerCase();
  };

  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/services/form");
  };

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
    // console.log("laptop", payResponse);
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
          <PaymentForm
            currency={serviceData.serviceCurrency}
            amount={serviceData.servicePrice}
            paymentProvider={getActive()}
            onPaymentComplete={sendServiceRefToBackend}
            title={"service payment"}
            description={`Payment for business registration in ${serviceData.serviceCountry}`}
          />
        </div>
        <Bottom>
          <CheckoutController
            backText={"Previous"}
            // hideForward
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
