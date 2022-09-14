import React from "react";
import { Container } from "./styles";
import { CheckoutButton } from "components/button";

export const CheckoutController = ({
	backAction,
	forwardAction,
	backText,
	forwardText,
	hidePrev,
	forwardSubmit,
}) => {
	return (
		<Container>
			<CheckoutButton
				back
				action={backAction}
				text={backText}
				hide={hidePrev}
				type={"button"}
			/>
			<CheckoutButton
				action={() => {
					if (!forwardSubmit) {
						forwardAction();
					}
				}}
				text={forwardText}
				type={forwardSubmit ? "submit" : "button"}
			/>
		</Container>
	);
};
