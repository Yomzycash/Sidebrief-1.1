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
} from "./styles";
import numeral from "numeral";
import { useActions } from "./actions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	useGetSingleEntityQuery,
	usePayLaunchMutation,
} from "services/launchService";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

export const PaymentForm = ({ USDprice, paymentProvider }) => {
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
		// amount: `${numeral(entityInfo.entityFee).format("0.00").replace(".", "")}`,
		amount: `${entityInfo.entityFee}`,

		currency: entityInfo?.entityCurrency,
		payment_options: "card,mobilemoney,ussd",
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

		const payResponse = await payLaunch(requiredData);

		// console.log(payResponse);

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
					{numeral(isUSD ? USDprice : entityInfo.entityFee).format(
						"0,0.00"
					)}
				</Price>
				<Text>Total amount for this purchase</Text>
			</TextContainer>
			{paymentProvider === "flutterwave" && (
				<Paystack>
					<FlutterWaveButton
						className="paystack-button"
						{...fwConfig}
					/>
				</Paystack>
			)}
			{/* {paymentProvider === "stripe" && (
        <ButtonContainer onSubmit={handleSubmit(stripe, elements)}>
          {/* <PaymentElement /> */}
			{/* <Button title="Pay with Stripe" disabled={!stripe} />
        </ButtonContainer>
      )}  */}
		</Container>
	);
};

// import { useEffect, useState } from "react";
// import {
//   Container,
//   RadioButtons,
//   Price,
//   Text,
//   TextContainer,
//   Radio,
//   RadioInput,
//   RadioLabel,
//   FormContainer,
//   PaymentButton,
//   Paystack,
// } from "./styles";
// import numeral from "numeral";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { cardInfoSchema } from "./constants";

// import { InputWithLabel } from "components/input";
// import { useActions } from "./actions";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import {
//   useGetSingleEntityQuery,
//   usePayLaunchMutation,
// } from "services/launchService";
// import { PaystackButton } from "react-paystack";

// export const PaymentForm = ({ USDprice, paymentProvider, currency }) => {
//   const [isUSD, setIsUSD] = useState(false);
//   const [entityInfo, setEntityInfo] = useState({
//     entityCurrency: "",
//     entityFee: "",
//   });

//   const navigate = useNavigate();

//   const launchResponse = useSelector(
//     (store) => store.LaunchReducer.launchResponse
//   );

//   const [payLaunch, payState] = usePayLaunchMutation();
//   const { launchCode, registrationType } = launchResponse;

//   const { data, isLoading, isSuccess, isError } =
//     useGetSingleEntityQuery(registrationType);

//   const { symbol, onSelectCurrencyType } = useActions({
//     isUSD,
//     setIsUSD,
//     currency: entityInfo ? entityInfo.entityCurrency : "",
//     // setValue,
//   });

//   useEffect(() => {
//     console.log(data);
//     if (data) setEntityInfo(data);
//   }, [data]);

//   let userEmail = localStorage.getItem("userEmail");

//   const config = {
//     reference: new Date().getTime().toString(),
//     email: userEmail,
//     amount: `${numeral(entityInfo.entityFee).format("0.00").replace(".", "")}`,
//     publicKey:
//       process.env.NODE_ENV === "production"
//         ? process.env.REACT_APP_PAYSTACK_LIVE_KEY
//         : process.env.REACT_APP_PAYSTACK_TEST_KEY,
//   };

//   // you can call this function anything
//   const handlePaystackSuccessAction = async (reference) => {
//     // Implementation for whatever you want to do with reference and after success call.
//     console.log(reference);

//     const requiredData = {
//       launchCode: launchCode,
//       paymentDetails: {
//         paymentAmount: entityInfo.entityFee,
//         paymentCurrency: entityInfo?.entityCurrency,
//         paymentTransactionId: reference.transaction,
//         paymentProvider: "Paystack",
//         paymentStatus: reference.status,
//       },
//     };

//     console.log(requiredData);

//     const payResponse = await payLaunch(requiredData);

//     console.log(payResponse);

//     navigate("/launch/address");
//   };

//   // you can call this function anything
//   const handlePaystackCloseAction = () => {
//     // implementation for  whatever you want to do when the Paystack dialog closed.
//     console.log("closed");
//   };

//   const componentProps = {
//     ...config,
//     text: `Pay in ${isUSD ? "USD" : entityInfo?.entityCurrency}`,
//     onSuccess: (reference) => handlePaystackSuccessAction(reference),
//     onClose: handlePaystackCloseAction,
//   };

//   return (
//     <Container>
//       <RadioButtons>
//         <Radio>
//           <RadioInput
//             id={entityInfo?.entityCurrency}
//             type="radio"
//             value={entityInfo?.entityCurrency}
//             name="currency"
//             onChange={onSelectCurrencyType}
//             checked={!isUSD}
//           />
//           <RadioLabel htmlFor={entityInfo.entityCurrency}>
//             {entityInfo.entityCurrency}
//           </RadioLabel>
//         </Radio>
//         {/* <Radio>
// 					<RadioInput
// 						id={"USD"}
// 						type="radio"
// 						value="USD"
// 						name="currency"
// 						onChange={onSelectCurrencyType}
// 						checked={isUSD}
// 					/>
// 					<RadioLabel htmlFor="USD">USD</RadioLabel>
// 				</Radio> */}
//       </RadioButtons>
//       <TextContainer>
//         <Price>
//           {symbol ? symbol : "??"}
//           {numeral(isUSD ? USDprice : entityInfo.entityFee).format("0,0.00")}
//         </Price>
//         <Text>Total amount for this purchase</Text>
//       </TextContainer>
//       <Paystack>
//         <PaystackButton className="paystack-button" {...componentProps} />
//       </Paystack>
//     </Container>
//   );
// };
