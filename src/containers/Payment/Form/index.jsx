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

export const PaymentForm = ({ USDprice, paymentProvider }) => {
  //stripe
  // const stripe = useStripe();
  // const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isUSD, setIsUSD] = useState(false);
  const [entityInfo, setEntityInfo] = useState({
    entityCurrency: "",
    entityFee: "",
  });

  const [payLaunch, payState] = usePayLaunchMutation();
  // const [payWithStripe, payWithStripeState] = usePayWithStripeMutation();

  // const [clientSecret, setClientSecret] = useState("");
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

  //testing

  // const PUBLIC_KEY =
  //   "pk_test_51HeX6TIfUU2kDtjPErnZWbbWJ0o68xZNSFm5448kvxfyCR7Hz0wfoU9eO035HGbA7KrYSYEXIxQJ0DLsrPUEaIHJ00KBYIckOc";

  // const stripePromise = loadStripe(PUBLIC_KEY);

  // const appearance = {
  //   theme: "stripe",
  // };

  // const options = {
  //   clientSecret,
  //   appearance,
  // };

  //
  useEffect(() => {
    // console.log(data);
    if (data) setEntityInfo(data);
  }, [data]);

  // //sending payment price to generate stripe secret key
  // const test = async () => {
  //   console.log("chec", data?.entityFee);
  //   const requiredData = {
  //     amount: `${data?.entityFee}`,
  //   };
  //   console.log("requiredData", requiredData);
  //   const paymentResponse = await payWithStripe(requiredData);
  //   console.log(paymentResponse);
  //   setClientSecret(paymentResponse?.data?.clientSecret);
  // };

  // useEffect(() => {
  //   test();
  // }, []);

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
        paymentAmount: entityInfo.entityFee,
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

  // const paymentElementOptions = {
  //   layout: "tabs",
  // };

  // useEffect(() => {
  //   if (!stripe) {
  //     return;
  //   }

  //   const clientSecret = new URLSearchParams(window.location.search).get(
  //     "payment_intent_client_secret"
  //   );

  //   if (!clientSecret) {
  //     return;
  //   }

  //   stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
  //     switch (paymentIntent.status) {
  //       case "succeeded":
  //         setMessage("Payment succeeded!");
  //         break;
  //       case "processing":
  //         setMessage("Your payment is processing.");
  //         break;
  //       case "requires_payment_method":
  //         setMessage("Your payment was not successful, please try again.");
  //         break;
  //       default:
  //         setMessage("Something went wrong.");
  //         break;
  //     }
  //   });
  // }, [stripe]);

  // //process stripe payment
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!stripe || !elements) {
  //     return;
  //   }

  //   const { error } = await stripe.confirmPayment({
  //     elements,
  //     confirmParams: {
  //       return_url: "http://localhost:3000",
  //     },
  //   });
  //   if (error.type === "card_error" || error.type === "validation_error") {
  //     setMessage(error.message);
  //   } else {
  //     setMessage("An unexpected error occurred.");
  //   }
  // };

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
      {paymentProvider === "stripe" && (
        <StripeForm amount={500} />
        // <>
        //   {clientSecret && (
        //     <Elements options={options} stripe={stripePromise}>
        //       <ButtonContainer id="payment-form" onSubmit={handleSubmit}>
        //         <LinkAuthenticationElement
        //           id="link-authentication-element"
        //         />
        //         <PaymentElement
        //           id="payment-element"
        //           options={paymentElementOptions}
        //         />
        //         <Button
        //           title="Pay with Stripe"
        //           type="submit"
        //           id='submit'
        //           disabled={
        //             payWithStripeState.isLoading || !stripe || !elements
        //           }
        //           loading={payWithStripeState.isLoading}
        //         />
        //         {/* Show any error or success messages */}
        //         {message && <div id="payment-message">{message}</div>}
        //       </ButtonContainer>
        //     </Elements>
        //   )}
        // </>
      )}
    </Container>
  );
};
