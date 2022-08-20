import React from "react";
import Navbar from "components/navbar";
import { SuccessWrapper, Image, ParagraphText, TextWrapper } from "./styled";
import success from "asset/images/Success.png";
import { PrimaryText } from "components/text/text";

const Success = ({ title, paragraph }) => {
	return (
		<>
			<Navbar />

			<SuccessWrapper>
				<Image src={success} alt="success" />
				<TextWrapper>
					<PrimaryText>{title}</PrimaryText>
					<ParagraphText>{paragraph}</ParagraphText>
				</TextWrapper>
			</SuccessWrapper>
		</>
	);
};

export default Success;
