import React, { useState } from "react";
import Navbar from "components/navbar";
import {
	SuccessWrapper,
	Image,
	ParagraphText,
	TextWrapper,
	ResendTextWrapper,
} from "./styled";
import verify from "asset/images/verify.png";
import { PrimaryText, SecondaryText } from "components/text/text";
import OtpInput from "react-otp-input";

const Verify = ({ title, paragraph }) => {
	const [otpcode, setOtpCode] = useState("");

	const handleChange = (otp) => {
		setOtpCode(otp);
	};

	return (
		<>
			<Navbar />

			<SuccessWrapper>
				<Image src={verify} alt="verify" />
				<TextWrapper>
					<PrimaryText>{title}</PrimaryText>
					<ParagraphText>{paragraph}</ParagraphText>
				</TextWrapper>

				<OtpInput
					value={otpcode}
					onChange={handleChange}
					numInputs={6}
					inputStyle={{
						width: "92px",
						height: "92px",
						margin: "64px 16px",
						fontSize: "18px",
						borderRadius: 8,
						border: "1px solid #ECECEC",
						backgroundColor: "#f1f1f1",
					}}
				/>

				<ResendTextWrapper>
					<SecondaryText
						color="#4e5152"
						fontSize={16}
						marginRight={5}
					>
						Didn't get the code?{" "}
					</SecondaryText>
					<SecondaryText
						color="#00a2d4"
						fontSize={16}
						cursor="pointer"
					>
						Resend verification
					</SecondaryText>
				</ResendTextWrapper>
			</SuccessWrapper>
		</>
	);
};

export default Verify;
