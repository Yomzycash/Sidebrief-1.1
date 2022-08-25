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
import CountryInput from "components/input/countryInput";

const schema = yup.object().shape({
  Firstname: yup.string().required("First name is a required field"),
  Lastname: yup.string().required("Last name is a required field"),
  Email: yup.string().email("Enter a valid email address").required(),
  PhoneNumber: yup.string().required("Phone number is a required field"),
  Password: yup.string().min(8).max(15).required(),
  Country: yup.string().required(),
  CorporateName: yup.string().required("Corporate name is a required field"),
});

const PartnerRegistration = () => {
  const [navSticked, setNavSticked] = useState(false);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue);
      });
  }, []);

  const TestRef = useRef();

  const location = useLocation();
  const navigate = useNavigate();

  const options = [
    { value: "Nigeria", label: "Nigeria" },
    { value: "Ghana", label: "Ghana" },
    { value: "Cameroon", label: "Cameroon" },
    { value: "Kenya", label: "Kenya" },
  ];

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
    navigate(`${location.pathname}/verifyotp`);
  };

  const handleCountryChange = (value) => {
    setSelectedCountry(value)
    console.log(value);
    setValue("Country", value, { shouldValidate: true });
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
                placeholder="Corporate Name"
                label="Corporate name"
                type="text"
                name="CorporateName"
                register={register}
                errorMessage={errors.CorporateName?.message}
              />
              <DropDown
                label="Operational country"
                name="Country"
                register={register}
                value={selectedCountry}
                onChange={handleCountryChange}
                options={countries}
                errorMessage={errors.Country?.message}
              />
              <InputWithLabel
                placeholder="example@example.com"
                label="Email"
                type="email"
                name="Email"
                register={register}
                errorMessage={errors.Email?.message}
                error={errors}
              />
              <InputWithLabel
                placeholder="Min. of 8  characters"
                label="Password"
                rightText
                name="Password"
                register={register}
                errorMessage={errors.Password?.message}
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
