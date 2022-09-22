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
import currencySymbol from "currency-symbol";
import { InputWithLabel } from "components/input";

export const PaymentForm = ({ amount, currency, USDprice }) => {
	const [isUSD, setIsUSD] = useState(false);

	const symbol = String.fromCharCode(
		currencySymbol.symbol(isUSD ? "USD" : currency).slice(2, -1)
	);

	const onSelectValue = (event) => {
		const value = event.target.value;
		if (value === "USD") {
			setIsUSD(true);
		} else {
			setIsUSD(false);
		}
	};

	return (
		<Container>
			<RadioButtons onChange={onSelectValue}>
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
			<FormContainer>
				<InputWithLabel
					label={"Card Number"}
					placeholder={"--"}
					name={"cardNumber"}
					labelStyle={"payment--label"}
					type={"text"}
				/>
				<InputWithLabel
					label={"EXP. DATE"}
					placeholder={"--"}
					labelStyle={"payment--label"}
					name={"expDate"}
					type={"text"}
				/>
				<InputWithLabel
					label={"CVV"}
					placeholder={"--"}
					name={"cvv"}
					labelStyle={"payment--label"}
					type={"text"}
				/>
				<PaymentButton>Pay In {isUSD ? "USD" : currency}</PaymentButton>
			</FormContainer>
		</Container>
	);
};
