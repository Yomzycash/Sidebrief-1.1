import React, { useState } from "react";
import Navbar from "components/navbar";
import {
	SuccessWrapper,
	Image,
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
					<SecondaryText align="center">{paragraph}</SecondaryText>
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
					<SecondaryText>
						Didn't get the code?{" "}
					</SecondaryText>
					<SecondaryText clickColor left='10px'>
						Resend verification
					</SecondaryText>
				</ResendTextWrapper>
			</SuccessWrapper>
		</>
	);
};

export default Verify;
