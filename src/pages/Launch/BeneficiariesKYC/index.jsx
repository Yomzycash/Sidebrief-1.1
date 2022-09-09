import React from "react";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { Page, Inputs } from "../styled";
import {
	CheckoutController,
	CheckoutSection,
	CheckoutInfoKYC,
} from "containers";

const BeneficiariesKYC = () => {
	return (
		<>
			<HeaderCheckout />
			<Page>
				<CheckoutSection
					title={"Beneficiary KYC Information(Optional)"}
				>
					<CheckoutInfoKYC name={"Mr. Sayochukwu Martin"} />
				</CheckoutSection>
				<CheckoutController
					backText={"Previous"}
					forwardText={"Next"}
				/>
			</Page>
		</>
	);
};

export default BeneficiariesKYC;
