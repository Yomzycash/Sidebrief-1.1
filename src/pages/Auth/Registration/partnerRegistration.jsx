import React, { useState, useRef } from "react";
import styled from "styled-components";
import TestButton from "components/button";
import { InputWithLabel } from "components/input";
import LogoNav from "components/navbar/LogoNav";
import { HeadText } from "components/texts";
import TextsWithLink from "components/texts/TextWithLinks";
import { AuthLayout } from "layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useRegisterNewPartnerMutation } from "services/authService";
import toast from "react-hot-toast";
import CountryInput from "components/input/countryInput";
import { partnerRegistrationSchema } from "utils/config";
import { savePartnerInfo } from "redux/Slices";
import { store } from "redux/Store";



const PartnerRegistration = () => {
  const [navSticked, setNavSticked] = useState(false);
  const [registerNewPartner] = useRegisterNewPartnerMutation();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(partnerRegistrationSchema),
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

  const submitForm = async (formData) => {
    let response = await registerNewPartner(JSON.stringify(formData));
    console.log(response)
    let data = response?.data;
    let error = response?.error;
    if (data) {
     store.dispatch(savePartnerInfo(data));
     console.log(data.message);
      toast.success(data.message)
     navigate(`${location.pathname}/verifyotp`);
    } else if (error) {
     console.log(error.data.message);
     toast.error(error.data.message)
    }
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
