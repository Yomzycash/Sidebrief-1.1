import { useState } from "react";
import { Container, Price, Text, TextContainer, Paystack, Title } from "./styles";
import numeral from "numeral";
import { useActions } from "./actions";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import toast from "react-hot-toast";
import StripePayment from "./stripePayment";

export const PaymentForm = ({ paymentProvider, paymentInfo }) => {
  const [isUSD, setIsUSD] = useState(false);

  const { symbol } = useActions({
    isUSD,
    setIsUSD,
    currency: paymentInfo?.currency || "",
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
    amount: paymentInfo?.amount,
    currency: paymentInfo?.currency,
    payment_options: "card, mobilemoney, ussd",
    customer: {
      email: userEmail,
      phone_number: "070********",
      name: `${userInfo.first_name + userInfo.last_name}`,
    },
    customizations: {
      title: paymentInfo?.title,
      description: paymentInfo?.description,
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave",
    callback: (response) => {
      if (response?.status === "successful") toast.success("Payment successful");
      paymentInfo?.sendRefsToBackend(response);
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {
      toast.error("Payment failed");
    },
  };

  return (
    <Container>
      <Title>{paymentInfo?.title}</Title>
      <TextContainer>
        <Price>
          {symbol ? symbol : "??"}
          {numeral(paymentInfo?.amount).format("0,0.00")}
        </Price>
        <Text>Total amount for this purchase</Text>
      </TextContainer>
      {paymentProvider === "flutterwave" && (
        <Paystack>
          <FlutterWaveButton className="paystack-button" {...fwConfig} />
        </Paystack>
      )}
      {paymentProvider === "stripe" && paymentInfo?.currency === "USD" && (
        <StripePayment amount={paymentInfo?.amount} />
      )}
    </Container>
  );
};
