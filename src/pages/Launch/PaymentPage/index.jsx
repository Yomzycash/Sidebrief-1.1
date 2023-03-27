import React, { useReducer, useState } from "react";
import HeaderCheckout from "components/Header/HeaderCheckout";
// import DropDownWithSearch from "components/input/DropDownWithSearch";
import { Body } from "./styles.js";
import { CheckoutController, CheckoutSection } from "containers";
import { Bottom, Container, Header } from "../styled";
import { providerReducer, actions } from "./reducer";
import { paymentProviders } from "./constants";
import { useNavigate } from "react-router-dom";
import { store } from "redux/Store";
import { useSelector } from "react-redux";
import { setCheckoutProgress } from "redux/Slices";
import { useEffect } from "react";
import { useGetSingleEntityQuery, usePayLaunchMutation } from "services/launchService";
import { setLaunchPaid } from "redux/Slices";

const PaymentPage = () => {
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

  const [entityInfo, setEntityInfo] = useState({
    entityCurrency: "",
    entityFee: "",
  });

  const [payLaunch] = usePayLaunchMutation();

  const launchResponse = useSelector((store) => store.LaunchReducer.launchResponse);

  const { launchCode, registrationType } = launchResponse;

  const { data } = useGetSingleEntityQuery(registrationType);

  useEffect(() => {
    // console.log(data);
    if (data) setEntityInfo(data);
  }, [data]);

  const activateProvider = (id) => {
    dispatch({ type: actions.ACTIVATE, id: id });
  };

  // get current active
  const getActive = () => {
    return providers.find((el) => el.active === true).name.toLowerCase();
  };
  const selectedEntity = useSelector((state) => state.LaunchReducer.selectedEntity);

  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/launch/entity");
  };

  const handlePrev = () => {
    navigate(-1);
  };

  // Set the progress of the application
  useEffect(() => {
    store.dispatch(setCheckoutProgress({ total: 13, current: 4 })); // total- total pages and current - current page
  }, []);

  // Send the payment reference information to the backend
  const sendRefToBackend = async (reference) => {
    const requiredData = {
      launchCode: launchCode,
      paymentDetails: {
        paymentAmount: entityInfo?.entityFee,
        paymentCurrency: entityInfo?.entityCurrency,
        paymentTransactionId: reference.transaction_id,
        paymentProvider: "Flutterwave",
        paymentStatus: reference.status,
      },
    };
    localStorage.setItem("paymentDetails", JSON.stringify(requiredData.paymentDetails));
    store.dispatch(setLaunchPaid(reference.status));
    await payLaunch(requiredData);

    navigate("/launch/address");
  };

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
        {/* <PaymentSelector providers={providers} activate={activateProvider} /> */}
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
          {/* <PaymentForm
            currency={entityInfo.entityCurrency || "--"}
            amount={entityInfo.entityFee}
            USDprice={845}
            paymentProvider={getActive()}
            onPaymentComplete={sendRefToBackend}
            title={"Business registration"}
            description={`Payment for business registration in ${selectedEntity.entityCountry}`}
          /> */}
        </div>
        <Bottom>
          <CheckoutController
            backText={"Previous"}
            hideForward
            backAction={handlePrev}
            forwardAction={handleNext}
          />
        </Bottom>
      </Body>
      {/* <AppFeedback subProject="Payment page" /> */}
    </Container>
  );
};

export default PaymentPage;
