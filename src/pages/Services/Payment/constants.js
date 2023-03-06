import FlutterwaveImg from "asset/payment/flutterwave.png";
import Stripe from "asset/payment/stripe.png";

export const paymentProviders = [

  {
    name: "flutterwave",
    image: FlutterwaveImg,
    text: "Pay With Naira"
  },
  {
    name: "stripe",
    image: Stripe,
    text:"Pay With USD"
  },
];
