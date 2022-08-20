import React, { useState } from "react";
import styled from "styled-components";
import TestButton from "../../../components/button";
import { DropDownInput, InputWithLabel } from "../../../components/input";
import { LogoNav } from "../../../components/navbar";
import { HeadText } from "../../../components/texts";
import TextsWithLink from "../../../components/texts/TextsWithLink";
import { AuthLayout } from "../../../layout";

const PartnerRegistration = () => {
  const [errors] = useState([]);

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

  return (
    <AuthLayout register={true} hideLeftAt="1000px">
      <Registration>
        <LogoNav stick={0} />
        <Form>
          <HeadText
            title="Get started with Sidebrief"
            body="Create a partner account to scale your business now"
            align="flex-start"
          />
          <Body>
            <div>
              <InputWithLabel label="First name" type="text" />
              <InputWithLabel label="Last name" type="text" />
              <InputWithLabel label="Corporate name" type="text" />
              <DropDownInput
                label="Operational country"
                OptionValues={countries}
              />
              <InputWithLabel label="Email" type="email" error={errors} />
              <InputWithLabel label="Password" type="password" />
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

// label,
//     labelStyle,
//     containerStyle,
//     edit,
//     error,
//     errorMessage,
//     OptionValues,
//     onSelectedChange = () =>{},
//     container,
//     placeholder,
//     secureTextEntry,
//     type,

// label,
//     labelStyle,
//     containerStyle,
//     edit,
//     error,
//     errorMessage,
//     rightText,
//     leftIcon,
//     container,
//     placeholder,
//     secureTextEntry,
//     type,

export default PartnerRegistration;

const Registration = styled.div`
  display: flex;
  flex-flow: column;
  gap: 8px;
  height: max-content;
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
