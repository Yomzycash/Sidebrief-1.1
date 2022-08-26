import React from "react";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import {motion} from 'framer-motion'

const ButtonWrapper = styled(motion.button)`
  width: 100%;
  height: 59px;
  background-color: #00a2d4;
  border-radius: 8px;
  color: #ffffff;
  text-align: center;
  font-size: 18px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #03769a;
  }

  @media screen and (max-width: 600px) {
  height: 48px;
	}
`;

const Button = ({ title = "Test", onClick, type }) => {
  return (
    <ButtonWrapper 
    initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{ duration: 0.5 }}

    whileHover={{
      scale: 1.03,
      transition: { duration: 0.2 },
    }}
    whileTap={{ scale: 0.9 }}
        onClick={onClick} 
        type={type}
    >
      {title}
    </ButtonWrapper>
  );
};

export default Button;
