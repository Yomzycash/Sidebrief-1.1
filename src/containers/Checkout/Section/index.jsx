import React from "react";
import { Container, Heading, ContentWrapper } from "./styles";

export const CheckoutSection = ({ title, subtitle, children }) => {
	return (
		<Container>
			<Heading>
				{title}: <span>{subtitle}</span>
			</Heading>
			<ContentWrapper>{children}</ContentWrapper>
		</Container>
	);
};
