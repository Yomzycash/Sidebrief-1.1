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
	FormContainer,
	PaymentButton,
} from "./styles";
import numeral from "numeral";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cardInfoSchema } from "./constants";

import { InputWithLabel } from "components/input";
import { useActions } from "./actions";

export const PaymentForm = ({ amount, currency, USDprice }) => {
	const [isUSD, setIsUSD] = useState(false);

	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(cardInfoSchema),
	});

	const { symbol, onSelectCurrencyType, formatInput } = useActions({
		isUSD,
		setIsUSD,
		currency,
		setValue,
	});

	const completePayment = (data) => {
		console.log(data);
		// api calls can be made here
		// depending on api, you might want to trim the card number first
		// change data to fit api, thanks
		// price and currency can also be gotten from above
	};

	return (
		<Container>
			<RadioButtons onChange={onSelectCurrencyType}>
				<Radio>
					<RadioInput
						id={currency}
						type="radio"
						value={currency}
						name="currency"
						checked={!isUSD}
					/>
					<RadioLabel htmlFor={currency}>{currency}</RadioLabel>
				</Radio>
				<Radio>
					<RadioInput
						id={"USD"}
						type="radio"
						value="USD"
						name="currency"
						checked={isUSD}
					/>
					<RadioLabel htmlFor="USD">USD</RadioLabel>
				</Radio>
			</RadioButtons>
			<TextContainer>
				<Price>
					{symbol}
					{numeral(isUSD ? USDprice : amount).format("0,0.00")}
				</Price>
				<Text>Total amount for this purchase</Text>
			</TextContainer>
			<FormContainer onSubmit={handleSubmit(completePayment)}>
				<InputWithLabel
					label={"Card Number"}
					placeholder={"--"}
					name={"cardNumber"}
					labelStyle={"payment--label"}
					type={"text"}
					register={register}
					onChange={(event) => {
						formatInput(event.target.value, "cardNumber");
					}}
					errorMessage={errors["cardNumber"]?.message}
				/>
				<InputWithLabel
					label={"EXP. DATE"}
					placeholder={"--"}
					labelStyle={"payment--label"}
					name={"expDate"}
					type={"text"}
					register={register}
					onChange={(event) => {
						formatInput(event.target.value, "expDate");
					}}
					errorMessage={errors["expDate"]?.message}
				/>
				<InputWithLabel
					label={"CVV"}
					placeholder={"--"}
					name={"cvv"}
					labelStyle={"payment--label"}
					type={"text"}
					register={register}
					onChange={(event) => {
						formatInput(event.target.value, "cvv");
					}}
					errorMessage={errors["cvv"]?.message}
				/>
				<PaymentButton>Pay In {isUSD ? "USD" : currency}</PaymentButton>
			</FormContainer>
		</Container>
	);
};
