import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import TestButton from "components/button";
import { DropDown, InputWithLabel } from "components/input";
import LogoNav from "components/navbar/LogoNav";
import { HeadText } from "components/texts";
import TextsWithLink from "components/texts/TextWithLinks";
import { AuthLayout } from "layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useRegisterNewPartnerMutation } from "services/authService";
import toast from "react-hot-toast";
import CountryInput from "components/input/countryInput";

const schema = yup.object().shape({
  first_name: yup.string().required("First name is a required field"),
  last_name: yup.string().required("Last name is a required field"),
  email: yup.string().email("Enter a valid email address").required(),
  phone: yup.string().required("Phone number is a required field"),
  password: yup.string().min(8).max(15).required(),
  operational_country: yup.string().required(),
  corporate_name: yup.string().required("Corporate name is a required field"),
});

const PartnerRegistration = () => {
  const [navSticked, setNavSticked] = useState(false);
  const [registerNewPartner] = useRegisterNewPartnerMutation();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const TestRef = useRef();

  const location = useLocation();
  const navigate = useNavigate();


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

  const submitForm = async (data, e) => {
    e.preventDefault();
    let values = JSON.stringify(data);
   await registerNewPartner(values)
   .then((response) => {
    console.log(response)
    toast.success(response?.data.message);
    })
   .then((error) => {
    console.log(error) 
    toast.error(error.error.data.message);
  })
  console.log(values)

    // navigate(`${location.pathname}/verifyotp`);
  };

  const handleCountryChange = (e) => {
    let value = e.target.value;
    setValue("operational_country", value, { shouldValidate: true });
  };

  return (
    <AuthLayout register={true}>
      <Registration>
        <TestBlock ref={TestRef} id="testdiv" />
        <LogoNav stick={0} navSticked={navSticked} />
        <Form onSubmit={handleSubmit(submitForm)}>
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
                name="first_name"
                register={register}
                errorMessage={errors.first_name?.message}
              />
              <InputWithLabel
                placeholder="Last Name"
                label="Last name"
                type="text"
                name="last_name"
                register={register}
                errorMessage={errors.last_name?.message}
              />
              <InputWithLabel
                placeholder="Corporate Name"
                label="Corporate name"
                type="text"
                name="corporate_name"
                register={register}
                errorMessage={errors.corporate_name?.message}
              />
              <CountryInput
                label="Operational country"
                name="operational_country"
                register={register}
                onChange={handleCountryChange}
                errorMessage={errors.operational_country?.message}
              />
              <InputWithLabel
                placeholder="example@example.com"
                label="Email"
                type="email"
                name="email"
                register={register}
                errorMessage={errors.email?.message}
                error={errors}
              />
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
                placeholder="Phone number"
                label="Phone Number"
                name="phone"
                type="number"
                register={register}
                errorMessage={errors.phone?.message}
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
