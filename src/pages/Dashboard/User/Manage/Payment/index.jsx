import React, { useReducer } from "react";
import HeaderCheckout from "components/Header/HeaderCheckout";
// import DropDownWithSearch from "components/input/DropDownWithSearch";
import { Body } from "./styles.js";

import {
  CheckoutController,
  CheckoutSection,
  PaymentForm,
  PaymentSelector,
} from "containers";
import { Bottom, Container, Header } from "pages/Launch/styled";
import { providerReducer, actions } from "./reducer";
import { paymentProviders } from "./constants";
import { useNavigate } from "react-router-dom";
import { store } from "redux/Store";
import { useSelector } from "react-redux";
import { setCheckoutProgress } from "redux/Slices";
import { useEffect } from "react";

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

  const activateProvider = (id) => {
    dispatch({ type: actions.ACTIVATE, id: id });
  };

  // get current active
  const getActive = () => {
    return providers.find((el) => el.active === true).name.toLowerCase();
  };
  const selectedEntity = useSelector(
    (state) => state.LaunchReducer.selectedEntity
  );

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
            currency={selectedEntity.entityCurrency}
            amount={selectedEntity.entityFee}
            USDprice={845}
            paymentProvider={getActive()}
          />
        </div>
        <Bottom>
          <CheckoutController
            backText={"Previous"}
            hideForward
            backAction={handlePrev}
          />
        </Bottom>
      </Body>
      {/* <AppFeedback subProject="Payment page" /> */}
    </Container>
  );
};

export default PaymentPage;
