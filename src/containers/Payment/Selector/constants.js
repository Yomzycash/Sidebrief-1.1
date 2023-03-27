import FlutterwaveImg from "asset/payment/flutterwave.png";
import StripeImg from "asset/payment/stripe.png";

export const paymentProviders = [
  {
    provider: "Flutterwave",
    image: FlutterwaveImg,
    supported: ["USD", "KES", "NGN"],
  },
  {
    provider: "Stripe",
    image: StripeImg,
    supported: ["USD", "KES"],
  },
];
