import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import MainButton from "components/button";
import { InputWithLabel } from "components/input";
import { HeadText } from "components/texts";
import TextsWithLink from "components/texts/TextWithLinks";
import { AuthLayout } from "layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useSendResetPasswordCodeMutation } from "services/authService";
import { checkStaffEmail } from "utils/globalFunctions";
import { useSendResetPasswordCodeStaffMutation } from "services/staffService";

const schema = yup.object().shape({
	email: yup
		.string()
		.email("Enter a valid email address")
		.required("Email is a required field"),
});

const ForgotPassword = () => {
	const [navSticked, setNavSticked] = useState("");
	const [sendResetPasswordCode, { isLoading, isSuccess }] =
		useSendResetPasswordCodeMutation();
	const [sendresetPasswordCodeStaff, sendResetCodeStaffState] =
		useSendResetPasswordCodeStaffMutation();

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const location = useLocation();
	const navigate = useNavigate();

	const TestRef = useRef();

	useEffect(() => {
		var observer = new IntersectionObserver((e) => {
			if (e[0].intersectionRatio === 0) {
				setNavSticked("true");
			} else if (e[0].intersectionRatio === 1) {
				setNavSticked("");
			}
		});
		if (TestRef.current) {
			observer.observe(TestRef.current);
		} else {
			const mutationObserver = new MutationObserver(() => {
				if (TestRef.current) {
					mutationObserver.disconnect();
					observer.observe(TestRef.current);
				}
				mutationObserver.observe(document, {
					subtree: true,
					childList: true,
				});
			});
		}
		return () => {
			observer.disconnect();
		};
	}, []);

	const submitForm = async (data) => {
		// console.log(data);
		const staffCheck = checkStaffEmail(data.email);
		const response = staffCheck
			? await sendresetPasswordCodeStaff(JSON.stringify(data))
			: await sendResetPasswordCode(JSON.stringify(data));
		const resData = response?.data;
		const error = response?.error;

		if (resData) {
			// console.log(resData);
			toast.success(resData.message);
			navigate(`${location.pathname}/verifyotp`, { state: data.email });
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
		<AuthLayout
			linkText="Sign In"
			link="/login"
			question="Remember your password?"
		>
			<Registration>
				<Form onSubmit={handleSubmit(submitForm)}>
					<HeadText
						title="Forgot your password?"
						body="Kindly enter the email address linked to your account, and a verfication link would be sent to you."
						align="flex-start"
						margintop="8px"
					/>
					<Body>
						<div>
							<InputWithLabel
								error={errors}
								placeholder="example@example.com"
								label="Email"
								type="email"
								name="email"
								register={register}
								errorMessage={errors.email?.message}
							/>
						</div>
						<MainButton
							title="Reset Password"
							type="submit"
							loading={
								isLoading || sendResetCodeStaffState.isLoading
							}
							disabled={
								isLoading || sendResetCodeStaffState.isLoading
							}
						/>
					</Body>
				</Form>
			</Registration>
			<OrWrapper>
				<hr />
				<OrText> OR </OrText>
				<hr />
			</OrWrapper>
			<Bottom>
				<TextsWithLink
					text={[
						{
							text: "Remember your password? ",
							link: { text: "Sign In", to: "/login" },
						},
					]}
					// $mobileResponsive
				/>
			</Bottom>
			{/* <AppFeedback subProject="Forgot Password" /> */}
		</AuthLayout>
	);
};

export default ForgotPassword;

const Registration = styled.div`
	display: flex;
	flex-flow: column;
	height: max-content;
	gap: 8px;
	padding: 59px;
	background-color: white;
	border: 1px solid #edf1f7;
	box-shadow: -10px -10px 10px -5px #9596970a, 10px 10px 10px -5px #9596970a;
	border-radius: 12px;
	@media screen and (max-width: 1000px) {
		gap: 32px;
	}
`;

const TestBlock = styled.div`
	height: 1px;
	width: 100%;
`;

const Form = styled.form`
	display: flex;
	flex-flow: column;
	gap: 48px;
	height: max-content;
`;

const Body = styled.div`
	display: flex;
	flex-flow: column;
	gap: 1rem;
`;

const Bottom = styled.div`
	display: flex;
	flex-flow: column;
	gap: 16px;
	justify-content: center;
	align-items: center;
	margin-bottom: 230px;
`;
const OrWrapper = styled.div`
	display: flex;
	gap: 24px;
	padding: 24px;
	hr {
		width: 40%;
		height: 0.1px;
		margin-top: 6px;
		color: #f4f4f4;
		opacity: 0.2;
	}
`;
const OrText = styled.p`
	font-weight: 400;
	font-size: 14px;
	color: #959697;
`;
