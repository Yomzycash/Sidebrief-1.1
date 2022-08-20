import React from "react";
import { SuccessWrapper, Image } from "./styled";
import success from "../../../../../asset/images/Success.png";
import {
  PrimaryText,
  SecondaryText,
} from "../../../../../components/text/text";
import NavBar from "../../../../../components/navbar";

const Success = () => {
  return (
    <>
      <NavBar />

      <SuccessWrapper>
        <Image src={success} alt="success" />
        <PrimaryText>Account Creation Success</PrimaryText>
        <SecondaryText>
          Your Sidebrief account has been successfully created. We are
          redirecting you to your dashboard.
        </SecondaryText>
      </SuccessWrapper>
    </>
  );
};

export default Success;
