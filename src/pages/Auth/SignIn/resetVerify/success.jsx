import React from "react";
import Success from "containers/Confirmation/Success";
import { useNavigate } from "react-router-dom";
import SuccessImage from "asset/svg/SuccessImage.svg";
import styled from "styled-components";

const ResetSuccess = () => {
  const navigate = useNavigate();
  return (
    <Body>
      <Success
        title="Password Reset Success"
        description="Your Sidebrief account passsword has been changed successfully."
        image={SuccessImage}
        buttonTitle="Sign In"
        onClick={() => navigate("/login")}
      />
    </Body>
  );
};

export default ResetSuccess;

const Body = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 99.5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
