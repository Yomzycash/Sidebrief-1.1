import React from "react";
import Navbar from "../../../../../components/navbar";
import {
	SuccessWrapper,
	Image,
	ParagraphText,
	TextWrapper,
} from "../../../../../layout/successAction/styled";
import success from "../../../../../asset/images/Success.png";
import { PrimaryText } from "../../../../../components/text/text";

const Success = () => {
	return (
		<>
			<Navbar />

			<SuccessWrapper>
				<Image src={success} alt="success" />
				<TextWrapper>
					<PrimaryText>Account Creation Success</PrimaryText>
					<ParagraphText>
						Your Sidebrief account has been successfully created. We
						are redirecting you to your dashboard.
					</ParagraphText>
				</TextWrapper>
			</SuccessWrapper>
		</>
	);
};

export default Success;
