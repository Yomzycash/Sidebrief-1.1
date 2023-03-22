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
import { useAddComplyPaymentMutation } from "services/complyService";

export const PaymentForm = ({ USDprice, paymentProvider }) => {
  const serviceData = JSON.parse(localStorage.getItem("serviceData"));
  const complyCode = JSON.parse(localStorage.getItem("complyData"));
  console.log(serviceData);
  const [message, setMessage] = useState(null);
  const [isUSD, setIsUSD] = useState(false);
  const [entityInfo, setEntityInfo] = useState({
    entityCurrency: "",
    entityFee: "",
  });

  const [payLaunch, payState] = usePayLaunchMutation();

  const [addServicePayment] = useAddComplyPaymentMutation();

  const navigate = useNavigate();

  const launchResponse = useSelector((store) => store.LaunchReducer.launchResponse);

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
    amount: serviceData ? `${serviceData.servicePrice}` : `${entityInfo.entityFee}`,

    currency: entityInfo?.entityCurrency,
    payment_options: "card, mobilemoney, ussd",
    customer: {
      email: userEmail,
      phone_number: "070********",
      name: `${userInfo.first_name + userInfo.last_name}`,
    },
    customizations: {
      title: serviceData ? "service payment" : "Business registration",
      description: serviceData
        ? `Payment for business registration in ${serviceData.serviceCountry}`
        : `Payment for business registration in ${entityInfo.entityCountry}`,
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave",
    callback: (response) => {
      if (response?.status === "successful") toast.success("Payment successful");
      if (serviceData) {
        sendServiceRefToBackend(response);
      } else {
        sendRefToBackend(response);
      }
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {
      toast.error("Payment failed");
    },
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
    localStorage.setItem("paymentDetails", JSON.stringify(requiredData.paymentDetails));
    store.dispatch(setLaunchPaid(reference.status));
    const payResponse = await payLaunch(requiredData);

    navigate("/launch/address");
  };

  const sendServiceRefToBackend = async (reference) => {
    const requiredData = {
      complyCode: complyCode.complyCode,
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
    console.log("laptop", payResponse);
    if (payResponse.data) {
      localStorage.removeItem("serviceData");
    }
    navigate("/services/form");
  };

  return (
    <Container>
      <RadioButtons>
        <Radio>
          <RadioInput
            id={entityInfo?.entityCurrency}
            type="radio"
            value={serviceData ? serviceData.serviceData : entityInfo?.entityCurrency}
            name="currency"
            onChange={onSelectCurrencyType}
            checked={!isUSD}
          />
          <RadioLabel htmlFor={entityInfo.entityCurrency}>{entityInfo.entityCurrency}</RadioLabel>
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
          {serviceData ? (
            <>{numeral(serviceData.servicePrice).format("0,0.00")}</>
          ) : (
            <>
              {" "}
              {symbol ? symbol : "??"}
              {numeral(isUSD ? USDprice : entityInfo.entityFee).format("0,0.00")}
            </>
          )}
        </Price>
        <Text>Total amount for this purchase</Text>
      </TextContainer>
      {paymentProvider === "flutterwave" && (
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
