import React from "react";
import { Container } from "./styles";

export const CheckoutButton = ({ text, action, back }) => {
	return (
		<Container onClick={action} isBack={back}>
			<span>{text}</span>
		</Container>
	);
};
