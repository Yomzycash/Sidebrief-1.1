import React, { useState, useRef } from "react";
import { Body, Bottom, Form, Registration, TestBlock } from "./styles";
import TestButton from "components/button";
import { DateInput, DropDown, InputWithLabel } from "components/input";
import LogoNav from "components/navbar/LogoNav";
import { HeadText, TextsWithLink } from "components/texts";
import { AuthLayout } from "layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userRegistrationSchema, genderOptions } from "./constants";

const UserRegistration = () => {
	const [navSticked, setNavSticked] = useState(false);
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(userRegistrationSchema),
	});
	const TestRef = useRef();

	var observer = new IntersectionObserver((e) => {
		if (e[0].intersectionRatio === 0) {
			setNavSticked(true);
		} else if (e[0].intersectionRatio === 1) {
			setNavSticked(false);
		}
	});

	setTimeout(() => {
		observer.observe(TestRef.current);
	}, 500);

	const submitForm = (data) => {
		console.log(data);
		console.log("You clicked submit button");
	};

	const handleGenderChange = (value) => {
		setValue("Gender", value, { shouldValidate: true });
	};
	const handleDateChange = (value) => {
		setValue("Date", value, { shouldValidate: true });
	};

	return (
		<AuthLayout register={true}>
			<Registration>
				<TestBlock ref={TestRef} id="testdiv" />
				<LogoNav stick={0} navSticked={navSticked} />
				<Form onSubmit={handleSubmit(submitForm)}>
					<HeadText
						title="Get started with Sidebrief"
						body="Create an account to scale your business now"
						align="flex-start"
						marginT="8px"
					/>
					<Body>
						<div>
							<InputWithLabel
								placeholder="First Name"
								label="First name"
								type="text"
								name="Firstname"
								register={register}
								errorMessage={errors.Firstname?.message}
							/>
							<InputWithLabel
								placeholder="Last Name"
								label="Last name"
								type="text"
								name="Lastname"
								register={register}
								errorMessage={errors.Lastname?.message}
							/>
							<InputWithLabel
								placeholder="example@example.com"
								label="Email"
								type="email"
								name="Email"
								register={register}
								errorMessage={errors.Email?.message}
							/>
							<InputWithLabel
								placeholder="Min. of 8  characters"
								label="Password"
								type="text"
								rightText
								name="Password"
								register={register}
								errorMessage={errors.Password?.message}
							/>
							<DateInput
								label={"Date of birth"}
								name="Date"
								register={register}
								selectDate={handleDateChange}
								errorMessage={errors.Date?.message}
							/>
							<DropDown
								label="Gender"
								options={genderOptions}
								name="Gender"
								register={register}
								onSelectedChange={handleGenderChange}
								errorMessage={errors.Gender?.message}
							/>
							<InputWithLabel
								placeholder="Phone number"
								label="Phone Number"
								name="PhoneNumber"
								type="number"
								register={register}
								errorMessage={errors.PhoneNumber?.message}
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
						<TestButton title="Get started" type="submit" />
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

export default UserRegistration;
