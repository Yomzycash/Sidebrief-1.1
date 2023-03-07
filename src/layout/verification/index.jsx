import React, { useEffect, useState } from "react";
import Navbar from "components/navbar";
import { SuccessWrapper, Image } from "./styled";
import verify from "asset/images/verify.png";
import OtpInput from "react-otp-input";
import { HeadText } from "components/texts";
import TextsWithLink from "components/texts/TextWithLinks";
import { useLocation, useNavigate } from "react-router-dom";
import {
	useSendVerificationMutation,
	useValidateResetCodeMutation,
} from "services/authService";
import toast from "react-hot-toast";
import { checkStaffEmail } from "utils/globalFunctions";
import { useValidateResetCodeStaffMutation } from "services/staffService";

const Verify = ({ title, paragraph }) => {
	const [otpcode, setOtpCode] = useState("");
	const [validateResetCode] = useValidateResetCodeMutation();
	const [sendVerification] = useSendVerificationMutation();
	const [validateResetCodeStaff] = useValidateResetCodeStaffMutation();

	const handleChange = (otp) => {
		setOtpCode(otp);
	};

	const { state } = useLocation();
	// console.log("state is", state);
	const location = useLocation();
	const navigate = useNavigate();

	const handleOtpResponse = async () => {
		const requiredData = {
			email: state,
			code: otpcode,
		};
		// console.log(requiredData);
		const staffCheck = checkStaffEmail(requiredData.email);

		const response = staffCheck
			? await validateResetCodeStaff(requiredData)
			: await validateResetCode(requiredData);
		const resData = response?.data;
		const error = response?.error;

		// console.log(response);
		if (resData) {
			// console.log(resData);
			toast.success(resData.message);
			navigate(`${location.pathname}/resetpassword`, {
				state: requiredData.email,
			});
		} else {
			// console.log(error);
			toast.error(error.data.message);
		}
	};

	useEffect(() => {
		if (otpcode.length === 5) {
			handleOtpResponse();
		}
	}, [otpcode]);

	const resendVerification = async () => {
		// console.log("sent");
		const data = {
			email: state,
		};

		// console.log(data);
		const response = await sendVerification(data);
		const resData = response?.data;
		const error = response?.error;

		if (resData) {
			// console.log(resData);
			toast.success(resData?.message);
			// navigate(`${location.pathname}/verifyotp`, { email: data.email });
		} else {
			if (error.status === "FETCH_ERROR") {
				toast.error("Connection error");
			} else {
				toast.error(error.data?.message);
			}
			// console.log(error);
		}
	};
	return (
		<div>
			<Navbar $displayMobile />
			<SuccessWrapper>
				<Image src={verify} alt="verify" />
				<HeadText
					title={title}
					body={paragraph}
					titleAlign="center"
					bodyAlign="center"
					gap="clamp(8px, 1.5vw, 16px)"
					bodyStyle={{ textAlign: "center" }}
				/>
				<OtpInput
					value={otpcode}
					onChange={handleChange}
					numInputs={5}
					inputStyle={{
						maxWidth: "64px",
						maxHeight: "64px",
						width: "8vw",
						height: "8vw",
						margin: "30px clamp(5px, 12%, 16px)",
						fontSize: "18px",
						borderRadius: 8,
						border: "1px solid #ECECEC",
						backgroundColor: "#f1f1f1",
						outlineColor: "#00A2D4",
						minWidth: "30px",
						minHeight: "30px",
					}}
				/>
				{/* <div style={{ display: "flex" }}>
          <SecondaryText>Didn't get the code?</SecondaryText>
          <SecondaryText clickColor $cursor onClick={resendVerification}>
            Resend verification
          </SecondaryText>
        </div> */}
				<TextsWithLink
					text={[
						{
							text: "Didn't get the code? ",
							link: {
								text: "Resend verification",
								to: location.pathname,
							},
							action: resendVerification,
						},
					]}
				/>
			</SuccessWrapper>
		</div>
	);
};

export default Verify;
