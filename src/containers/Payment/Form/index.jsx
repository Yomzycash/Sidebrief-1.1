import { useState } from "react";
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
} from "./styles";
import numeral from "numeral";
import { useActions } from "./actions";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useGetSingleEntityQuery, usePayLaunchMutation } from "services/launchService";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
// import { store } from "redux/Store";
// import {
//   CardElement,
//   useStripe,
//   useElements,
//   PaymentElement,
//   LinkAuthenticationElement,
// } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import StripePayment from "./stripePayment";

export const PaymentForm = ({
  USDprice,
  paymentProvider,
  amount,
  onPaymentComplete,
  title,
  description,
  currency,
}) => {
  // console.log(serviceData);
  // const [message, setMessage] = useState(null);
  const [isUSD, setIsUSD] = useState(false);

  const { symbol, onSelectCurrencyType } = useActions({
    isUSD,
    setIsUSD,
    currency,
    // setValue,
  });

  let userEmail = localStorage.getItem("userEmail");
  let userInfo = localStorage.getItem("userInfo");

  // Flutterwave config object
  const config = {
    public_key:
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_FLUTTERWAVE_LIVE_KEY
        : process.env.REACT_APP_FLUTTERWAVE_TEST_KEY,
    tx_ref: Date.now(),
    amount: amount,

    currency: currency,
    payment_options: "card, mobilemoney, ussd",
    customer: {
      email: userEmail,
      phone_number: "070********",
      name: `${userInfo.first_name + userInfo.last_name}`,
    },
    customizations: {
      title: title,
      description: description,
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave",
    callback: (response) => {
      if (response?.status === "successful") toast.success("Payment successful");
      onPaymentComplete(response);
      // if (serviceData) {
      //   sendServiceRefToBackend(response);
      // } else {
      //   sendRefToBackend(response);
      // }
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {
      toast.error("Payment failed");
    },
  };

  return (
    <Container>
      <RadioButtons>
        <Radio>
          <RadioInput
            id={currency}
            type="radio"
            value={currency}
            name="currency"
            onChange={onSelectCurrencyType}
            checked={!isUSD}
          />
          <RadioLabel htmlFor={currency}>{currency}</RadioLabel>
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
          {numeral(amount).format("0,0.00")}
        </Price>
        <Text>Total amount for this purchase</Text>
      </TextContainer>
      {paymentProvider === "flutterwave" && (
        <Paystack>
          <FlutterWaveButton className="paystack-button" {...fwConfig} />
        </Paystack>
      )}
      {paymentProvider === "stripe" && currency === "USD" && <StripePayment amount={amount} />}
    </Container>
  );
};
