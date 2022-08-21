import React from "react";
import Navbar from "components/navbar";
import { SuccessWrapper, Image, TextWrapper } from "./styled";
import success from "asset/images/Success.png";
import { PrimaryText, SecondaryText} from "components/text/text";

const Success = ({ title, paragraph }) => {
	return (
		<>
			<Navbar />

			<SuccessWrapper>
				<Image src={success} alt="success" />
				<TextWrapper>
					<PrimaryText>{title}</PrimaryText>
					<SecondaryText align='center'>{paragraph}</SecondaryText>
				</TextWrapper>
			</SuccessWrapper>
		</>
	);
};

export default Success;
