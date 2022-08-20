import React, { useState, useRef } from "react";
import styled from "styled-components";
import TestButton from "components/button";
import { DropDownInput, InputWithLabel } from "components/input";
import LogoNav from "components/navbar/LogoNav";
import { HeadText } from "components/texts";
import TextsWithLink from "components/texts/TextWithLinks";
import { AuthLayout } from "layout";

const PartnerRegistration = () => {
	const [errors] = useState([]);
	const [navSticked, setNavSticked] = useState(false);
	// const [hide, setHide] = useState(false);

	const TestRef = useRef();

	const countries = [
		{
			id: 1,
			value: "Nigeria",
		},
		{
			id: 2,
			value: "Nigeria",
		},
		{
			id: 3,
			value: "Nigeria",
		},
	];

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

	return (
		<AuthLayout register={true}>
			<Registration>
				<TestBlock ref={TestRef} id="testdiv" />
				<LogoNav stick={0} navSticked={navSticked} />
				<Form>
					<HeadText
						title="Get started with Sidebrief"
						body="Create a partner  account to scale your business now"
						align="flex-start"
						marginT="8px"
					/>
					<Body>
						<div>
							<InputWithLabel
								placeholder="First Name"
								label="First name"
								type="text"
							/>
							<InputWithLabel
								placeholder="Last Name"
								label="Last name"
								type="text"
							/>
							<InputWithLabel
								placeholder="Corporate Name"
								label="Corporate name"
								type="text"
							/>
							<DropDownInput
								label="Operational country"
								OptionValues={countries}
							/>
							<InputWithLabel
								placeholder="example@example.com"
								label="Email"
								type="email"
								error={errors}
							/>
							<InputWithLabel
								placeholder="Min. of 8  characters"
								label="Password"
								type="password"
								rightText
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
						<TestButton title="Get started" to="/verify" />
					</Body>
					<Bottom>
						<TextsWithLink
							text={[
								{
									text: "Already have an account? ",
									link: { text: "Sign In", to: "/" },
								},
							]}
						/>
					</Bottom>
				</Form>
			</Registration>
		</AuthLayout>
	);
};

export default PartnerRegistration;

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
