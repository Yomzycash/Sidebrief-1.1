import { useEffect, useState } from "react";
import {
  Container,
  RadioButtons,
  Price,
  Text,
  TextContainer,
  Radio,
  RadioInput,
  RadioLabel,
  Paystack,
  ButtonContainer,
  FormData,
} from "./styles";
import numeral from "numeral";
import { useActions } from "./actions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetSingleEntityQuery,
  usePayLaunchMutation,
  usePayWithStripeMutation,
} from "services/launchService";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { store } from "redux/Store";
import { setLaunchPaid } from "redux/Slices";
import Button from "components/button";
import {
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "./StripeForm";
import StripePayment from "./stripePayment";

export const PaymentForm = ({ USDprice, paymentProvider }) => {
  const [message, setMessage] = useState(null);
  const [isUSD, setIsUSD] = useState(false);
  const [entityInfo, setEntityInfo] = useState({
    entityCurrency: "",
    entityFee: "",
  });

  const [payLaunch, payState] = usePayLaunchMutation();

  const navigate = useNavigate();

  const launchResponse = useSelector(
    (store) => store.LaunchReducer.launchResponse
  );

  const { launchCode, registrationType } = launchResponse;

  const { data } = useGetSingleEntityQuery(registrationType);

  const { symbol, onSelectCurrencyType } = useActions({
    isUSD,
    setIsUSD,
    currency: entityInfo ? entityInfo.entityCurrency : "",
    // setValue,
  });

  useEffect(() => {
    // console.log(data);
    if (data) setEntityInfo(data);
  }, [data]);

  let userEmail = localStorage.getItem("userEmail");
  let userInfo = localStorage.getItem("userInfo");

  // Flutterwave config object
  const config = {
    public_key:
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_FLUTTERWAVE_LIVE_KEY
        : process.env.REACT_APP_FLUTTERWAVE_TEST_KEY,
    tx_ref: Date.now(),
    amount: `${entityInfo.entityFee}`,

    currency: entityInfo?.entityCurrency,
    payment_options: "card, mobilemoney, ussd",
    customer: {
      email: userEmail,
      phone_number: "070********",
      name: `${userInfo.first_name + userInfo.last_name}`,
    },
    customizations: {
      title: "Business registration",
      description: `Payment for business registration in ${entityInfo.entityCountry}`,
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave",
    callback: (response) => {
      console.log(response);
      sendRefToBackend(response);
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {},
  };

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
    localStorage.setItem(
      "paymentDetails",
      JSON.stringify(requiredData.paymentDetails)
    );
    store.dispatch(setLaunchPaid(reference.status));
    const payResponse = await payLaunch(requiredData);

    navigate("/launch/address");
  };

  return (
    <Container>
      <RadioButtons>
        <Radio>
          <RadioInput
            id={entityInfo?.entityCurrency}
            type="radio"
            value={entityInfo?.entityCurrency}
            name="currency"
            onChange={onSelectCurrencyType}
            checked={!isUSD}
          />
          <RadioLabel htmlFor={entityInfo.entityCurrency}>
            {entityInfo.entityCurrency}
          </RadioLabel>
        </Radio>
        {/* <Radio>
					<RadioInput
						id={"USD"}
						type="radio"
						value="USD"
						name="currency"
						onChange={onSelectCurrencyType}
						checked={isUSD}
					/>
					<RadioLabel htmlFor="USD">USD</RadioLabel>
				</Radio> */}
      </RadioButtons>
      <TextContainer>
        <Price>
          {symbol ? symbol : "??"}
          {numeral(isUSD ? USDprice : entityInfo.entityFee).format("0,0.00")}
        </Price>
        <Text>Total amount for this purchase</Text>
      </TextContainer>
      {paymentProvider === "flutterwave" && entityInfo.entityFee && (
        <Paystack>
          <FlutterWaveButton className="paystack-button" {...fwConfig} />
        </Paystack>
      )}
      {paymentProvider === "stripe" && entityInfo.entityCurrency === "USD" && (
        <StripePayment amount={entityInfo.entityFee} />
      )}
    </Container>
  );
};
