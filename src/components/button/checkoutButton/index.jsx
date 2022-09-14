import React from "react";
import { Container } from "./styles";

export const CheckoutButton = ({ text, action, back, hide, type }) => {
	return (
		<Container onClick={action} isBack={back} hide={hide} type={type}>
			<span>{text}</span>
		</Container>
	);
};
