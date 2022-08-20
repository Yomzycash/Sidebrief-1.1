import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  background-color: #00a2d4;
  border-radius: 8px;
  padding: 10px 24px;
  color: #ffffff;
  text-align: center;
  font-size: clamp(14px, 1vw, 18px);
  border: none;
  cursor: pointer;
`;

const TestButton = ({ title = "Test", to = "/" }) => {
  return (
    <Link to={to}>
      <Button>{title}</Button>
    </Link>
  );
};

export default TestButton;
