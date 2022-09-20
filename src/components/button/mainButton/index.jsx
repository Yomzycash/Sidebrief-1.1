import React from "react";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";



const Button = ({ title = "Test", onClick, type, disabled, outline,bg_color, color,hover_bg_color,hv_color}) => {
  return (
    <ButtonWrapper 
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.03,
        opacity: 0.9,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      type={type}
      disabled={disabled}
      bg_color={bg_color}
      outline={outline}
      color={color}
      hv_color={hv_color}
      hover_bg_color={hover_bg_color}
    >
      {title}
    </ButtonWrapper>
  );
};

export default Button;
const ButtonWrapper = styled(motion.button)`
  width: 100%;
  height: 59px;
  background-color: #00a2d4;
  background-color:${(props) => (props.bg_color ? props.bg_color: "#00a2d4")};
  border-radius: 8px;
  color: ${(props) => (props.color ? props.color: "#ffffff")};
  text-align: center;
  font-size: 18px;
  border: ${(props) => (props.border ? props.border : "none")};
  outline: ${(props) => (props.outline ? props.outline : "none")};
  cursor: pointer;
  :hover {
    background-color:${(props) => (props.hover_bg_color ? props.hover_bg_color: "")};
    color: ${(props) => (props.hv_color ? props.hv_color: "")};
  }

  @media screen and (max-width: 600px) {
    height: 48px;
  }
`;
