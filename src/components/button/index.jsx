import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ButtonWrapper = styled.button`
  width: 100%;
  height: 59px;
  background-color: #00a2d4;
  border-radius: 8px;
  color: #ffffff;
  text-align: center;
  font-size: 18px;
  border: none;
  cursor: pointer;
`;

const Button = ({ title = "Test", onClick, type }) => {
  return (
    <ButtonWrapper onClick={onClick} type={type}>
      {title}
    </ButtonWrapper>
  );
};

export default Button;
