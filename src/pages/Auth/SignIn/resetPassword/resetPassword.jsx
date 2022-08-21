import React, { useState, useRef } from "react";
import styled from "styled-components";
import TestButton from "components/button";
import { InputWithLabel } from "components/input";
import LogoNav from "components/navbar/LogoNav";
import { HeadText } from "components/texts";
import TextsWithLink from "components/texts/TextWithLinks";
import { AuthLayout } from "layout";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
	const [errors] = useState([]);
	const [navSticked, setNavSticked] = useState(false);
	const navigate = useNavigate();
	// const [hide, setHide] = useState(false);

	const TestRef = useRef();

	var observer = new IntersectionObserver((e) => {
		if (e[0].intersectionRatio === 0) {
			setNavSticked(true);
		} else if (e[0].intersectionRatio === 1) {
			setNavSticked(false);
		}
	});

	// if (TestRef.current !== undefined) {
	setTimeout(() => {
		observer.observe(TestRef.current);
	}, 500);
	// }

	const handleClick = () => {
		navigate("/resetverify")
	}
	return (
		<AuthLayout register={true}>
			<Registration>
				<TestBlock ref={TestRef} id="testdiv" />
				<LogoNav stick={0} navSticked={navSticked} />
				<Form>
					<HeadText
						title="Reset your password?"
						body="Kindly enter the new password you would like to use to sign in to your account."
						align="flex-start"
						marginT="8px"
					/>
					<Body>
						<div>
							<InputWithLabel
								placeholder="********"
								label="Password"
								type="password"
								error={errors}
							/>
                            <InputWithLabel
								placeholder="********"
								label="confirm Password"
								type="password"
								error={errors}
							/>
						</div>
						<TextsWithLink
							text={[
								{
									text: "By creating an account , you agree to Sidebrief's",
									link: { text: "Privacy Policy", to: "/" },
								},
								{
									text: "&",
									link: { text: "Terms of Use", to: "/" },
								},
							]}
						/>
						<TestButton title="Reset Password" onClick={handleClick} />
					</Body>
					<Bottom>
						<TextsWithLink
							text={[
								{
									text: "Already have an account? ",
									link: { text: "Sign In", to: "/login" },
								},
							]}
						/>
					</Bottom>
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
`;
const TestBlock = styled.div`
	height: 1px;
	width: 100%;
`;
const Form = styled.div`
	display: flex;
	flex-flow: column;
	gap: 4rem;
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
