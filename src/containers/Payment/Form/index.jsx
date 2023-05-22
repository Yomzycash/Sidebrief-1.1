import { Container, Price, Text, TextContainer, Flutterwave, Title } from "./styles";
import numeral from "numeral";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import toast from "react-hot-toast";
import StripePayment from "./stripePayment";
import { getCurrencyInfo } from "utils/globalFunctions";
import { SubscriptionForm } from "./subscription";

export const PaymentForm = ({ paymentProvider, paymentInfo }) => {
  const symbol = getCurrencyInfo(paymentInfo?.currency)?.symbol;

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
    payment_options: "card, mobilsemoney, ussd",
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
      paymentInfo?.sendFlutterwaveRefToBackend(response);
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
          {symbol && symbol}
          {numeral(paymentInfo?.amount).format("0,0.00")}
        </Price>
        <Text>Total amount for this purchase</Text>
      </TextContainer>
      {paymentInfo.isSubscription ? (
        <SubscriptionForm
          subInfo={{
            priceId: paymentInfo.priceId,
            productId: paymentInfo.productId,
          }}
        />
      ) : (
        <>
          {paymentProvider.toLowerCase() === "flutterwave" && (
            <Flutterwave>
              <FlutterWaveButton className="flutterwave-button" {...fwConfig} />
            </Flutterwave>
          )}
          {paymentProvider.toLowerCase() === "stripe" && (
            <StripePayment
              amount={paymentInfo?.amount}
              sendStripeRefToBackend={paymentInfo.sendStripeRefToBackend}
            />
          )}
        </>
      )}
    </Container>
  );
};
