import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import MainButton from "components/button";
import { InputWithLabel } from "components/input";
import LogoNav from "components/navbar/LogoNav";
import { HeadText } from "components/texts";
import { AuthLayout } from "layout";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useChangePasswordMutation } from "services/authService";
import { useChangePasswordStaffMutation } from "services/staffService";
import { checkStaffEmail } from "utils/globalFunctions";

const schema = yup.object().shape({
	password: yup.string().min(8).required(),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "Passwords must match"),
});

const ResetPassword = () => {
	const [navSticked, setNavSticked] = useState("");
	const [changePassword, { isLoading, isSuccess }] =
		useChangePasswordMutation();
	const [changePasswordStaff, changePasswordStaffState] =
		useChangePasswordStaffMutation();
	const { state } = useLocation();
	// console.log(state);
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

		const requiredData = {
			email: state,
			password: data.password,
		};

		// console.log(requiredData);
		const staffCheck = checkStaffEmail(requiredData.email);
		const response = staffCheck
			? await changePasswordStaff(requiredData)
			: await changePassword(requiredData);
		const resData = response?.data;
		const error = response?.error;

		if (response) {
			// console.log(resData);
			toast.success(resData.message);
			navigate(`${location.pathname}/success`);
		} else {
			toast.error(error.data.message);
		}
	};

	return (
		<AuthLayout
			linkText="Sign In"
			link="/login"
			question="Remember your password?"
		>
			<Registration>
				<TestBlock ref={TestRef} id="testdiv" />
				<LogoNav stick={0} nav_sticked={navSticked} />
				<Form onSubmit={handleSubmit(submitForm)}>
					<HeadText
						title="Reset your password?"
						body="Kindly enter the new password you would like to use to sign in to your account."
						align="flex-start"
						margintop="8px"
					/>
					<Body>
						<div>
							<InputWithLabel
								placeholder="Min. of 8  characters"
								label="Password"
								type="password"
								rightText
								name="password"
								register={register}
								errorMessage={errors.password?.message}
							/>
							<InputWithLabel
								label="Confirm Password"
								placeholder="Min. of 8  characters"
								type="password"
								rightText
								name="confirmPassword"
								register={register}
								errorMessage={errors.confirmPassword?.message}
							/>
						</div>
						<MainButton
							title="Reset Password"
							type="submit"
							loading={isLoading}
							disabled={isLoading}
						/>
					</Body>
					{/* <Bottom>
            <TextsWithLink
              text={[
                {
                  text: "Remember your password? ",
                  link: { text: "Sign In", to: "/login" },
                },
              ]}
              $mobileResponsive
            />
          </Bottom> */}
				</Form>
			</Registration>
		</AuthLayout>
	);
};

export default ResetPassword;

const Registration = styled.div`
	display: flex;
	flex-flow: column;
	height: max-content;
	gap: 8px;
	margin-bottom: 150px;
	background-color: white;
	padding: 59px;
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
`;
