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
	FormContainer,
	PaymentButton,
	Paystack,
} from "./styles";
import numeral from "numeral";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cardInfoSchema } from "./constants";

import { InputWithLabel } from "components/input";
import { useActions } from "./actions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	useGetSingleEntityQuery,
	usePayLaunchMutation,
} from "services/launchService";
import { PaystackButton } from "react-paystack";

export const PaymentForm = ({ USDprice, paymentProvider }) => {
	const [isUSD, setIsUSD] = useState(false);
	const [entityInfo, setEntityInfo] = useState({
		entityCurrency: "",
		entityFee: "",
	});

	const navigate = useNavigate();

	const launchResponse = useSelector(
		(store) => store.LaunchReducer.launchResponse
	);

	const [payLaunch, payState] = usePayLaunchMutation();
	const { launchCode, registrationType } = launchResponse;

	const { data, isLoading, isSuccess, isError } =
		useGetSingleEntityQuery(registrationType);

	const { symbol, onSelectCurrencyType, formatInput } = useActions({
		isUSD,
		setIsUSD,
		currency: entityInfo ? entityInfo.entityCurrency : "",
		// setValue,
	});

	useEffect(() => {
		console.log(data);
		if (data) setEntityInfo(data);
	}, [data]);

	let userEmail = localStorage.getItem("userEmail");

	const config = {
		reference: new Date().getTime().toString(),
		email: userEmail,
		amount: `${entityInfo.entityFee}00`,
		publicKey: "pk_test_fd6e1523c925ea654377d019c35bd5955c69bdfc",
	};

	// you can call this function anything
	const handlePaystackSuccessAction = async (reference) => {
		// Implementation for whatever you want to do with reference and after success call.
		console.log(reference);

		const requiredData = {
			launchCode: launchCode,
			paymentDetails: {
				paymentAmount: entityInfo.entityFee,
				paymentCurrency: entityInfo?.entityCurrency,
				paymentTransactionId: reference.transaction,
				paymentProvider: "Paystack",
				paymentStatus: reference.status,
			},
		};

		console.log(requiredData);

		const payResponse = await payLaunch(requiredData);

		console.log(payResponse);

		navigate("/launch/address");
	};

	// you can call this function anything
	const handlePaystackCloseAction = () => {
		// implementation for  whatever you want to do when the Paystack dialog closed.
		console.log("closed");
	};

	const componentProps = {
		...config,
		text: `Pay in ${isUSD ? "USD" : entityInfo?.entityCurrency}`,
		onSuccess: (reference) => handlePaystackSuccessAction(reference),
		onClose: handlePaystackCloseAction,
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
			<Paystack>
				<PaystackButton
					className="paystack-button"
					{...componentProps}
				/>
			</Paystack>
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

// export const PaymentForm = ({ USDprice }) => {
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

//   const {
//     handleSubmit,
//     register,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(cardInfoSchema),
//   });

//   const { symbol, onSelectCurrencyType, formatInput } = useActions({
//     isUSD,
//     setIsUSD,
//     currency: entityInfo ? entityInfo.entityCurrency : "",
//     setValue,
//   });

//   const completePayment = (data) => {
//     console.log(data);
//     navigate("/launch/address");
//     // api calls can be made here
//     // depending on api, you might want to trim the card number first
//     // change data to fit api, thanks
//     // price and currency can also be gotten from above
//   };

//   useEffect(() => {
//     console.log(data);
//     if (data) setEntityInfo(data);
//   }, [data]);

//   const config = {
//     reference: new Date().getTime().toString(),
//     email: "femi@sidebrief.com",
//     amount: `${entityInfo.entityFee}00`,
//     publicKey: "pk_test_fd6e1523c925ea654377d019c35bd5955c69bdfc",
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
//         <Radio>
//           <RadioInput
//             id={"USD"}
//             type="radio"
//             value="USD"
//             name="currency"
//             onChange={onSelectCurrencyType}
//             checked={isUSD}
//           />
//           <RadioLabel htmlFor="USD">USD</RadioLabel>
//         </Radio>
//       </RadioButtons>
//       <TextContainer>
//         <Price>
//           {symbol ? symbol : "??"}
//           {numeral(isUSD ? USDprice : entityInfo.entityFee).format("0,0.00")}
//         </Price>
//         <Text>Total amount for this purchase</Text>
//       </TextContainer>
//       <FormContainer onSubmit={handleSubmit(completePayment)}>
// 				<InputWithLabel
// 					label={"Card Number"}
// 					placeholder={"--"}
// 					name={"cardNumber"}
// 					labelStyle={"payment--label"}
// 					type={"text"}
// 					register={register}
// 					onChange={(event) => {
// 						formatInput(event.target.value, "cardNumber");
// 					}}
// 					errorMessage={errors["cardNumber"]?.message}
// 				/>
// 				<InputWithLabel
// 					label={"EXP. DATE"}
// 					placeholder={"--"}
// 					labelStyle={"payment--label"}
// 					name={"expDate"}
// 					type={"text"}
// 					register={register}
// 					onChange={(event) => {
// 						formatInput(event.target.value, "expDate");
// 					}}
// 					errorMessage={errors["expDate"]?.message}
// 				/>
// 				<InputWithLabel
// 					label={"CVV"}
// 					placeholder={"--"}
// 					name={"cvv"}
// 					labelStyle={"payment--label"}
// 					type={"text"}
// 					register={register}
// 					onChange={(event) => {
// 						formatInput(event.target.value, "cvv");
// 					}}
// 					errorMessage={errors["cvv"]?.message}
// 				/>
// 			</FormContainer>
//       <Paystack>
//         <PaystackButton className="paystack-button" {...componentProps} />
//       </Paystack>
//       <PaymentButton type="submit">
//         Pay In {isUSD ? "USD" : currency}
//       </PaymentButton>
//     </Container>
//   );
// };
