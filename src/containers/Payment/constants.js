import RemitaImg from "asset/payment/remita.png";
import FlutterwaveImg from "asset/payment/flutterwave.png";
import PaypalImg from "asset/payment/paypal.png";
import InterSwitchImg from "asset/payment/interswitch.png";

export const paymentProviders = [
	{
		name: "remita",
		image: RemitaImg,
	},
	{
		name: "interswitch",
		image: InterSwitchImg,
	},
	{
		name: "paypal",
		image: PaypalImg,
	},
	{
		name: "flutterwave",
		image: FlutterwaveImg,
	},
];
