import React, { useState, useRef } from "react";
import styled from "styled-components";
import TestButton from "../../../components/button";
import {
  DateInput,
  DropDown,
  InputWithLabel,
} from "../../../components/input";
import LogoNav from "../../../components/navbar/LogoNav";
import { HeadText } from "../../../components/texts";
import TextsWithLink from "../../../components/texts/TextWithLinks";
import { AuthLayout } from "../../../layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  Firstname: yup.string().required("First name is a required field"),
  Lastname: yup.string().required("Last name is a required field"),
  Email: yup.string().email("Enter a valid email address").required(),
  PhoneNumber: yup.string().required("Phone number is a required field"),
  Password: yup.string().min(8).max(15).required(),
  Gender: yup.string().required(),
  Date: yup.string().required(),
});

const UserRegistration = () => {
  const [navSticked, setNavSticked] = useState(false);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const TestRef = useRef();

  const options = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Transgender', label: 'Transgender' },
    { value: 'Non-binary', label: 'Non-binary' },
    { value: 'Other', label: 'Other' }
  ]


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
                onChange={handleDateChange}
                errorMessage={errors.Date?.message}
              />
              <DropDown
                label="Gender"
                options={options}
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
                { text: "&", link: { text: "Terms of Use", to: "/" } },
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

const Registration = styled.div`
  display: flex;
  flex-flow: column;
  height: max-content;
`;
const TestBlock = styled.div`
  height: 1px;
  width: 100%;
`;
const Form = styled.form`
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
