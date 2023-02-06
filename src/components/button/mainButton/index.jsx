import React from "react";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Oval } from "react-loading-icons";

const Button = ({
  title = "Test",
  onClick,
  type,
  disabled,
  outline,
  bg_color,
  color,
  hover_bg_color,
  hv_color,
  loading,
}) => {
  return (
    <ButtonWrapper
      key="MainButton"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      // transition={{ duration: 0.5 }}
      // whileTap={{ scale: 0.9 }}
      onClick={onClick}
      type={type}
      disabled={disabled}
      bg_color={bg_color}
      outline={outline}
      color={color}
      hv_color={hv_color}
      hover_bg_color={hover_bg_color}
    >
      {loading ? (
        <Oval stroke="#ffffff" fill="white" width={24} height={24} />
      ) : (
        <p>{title}</p>
      )}
    </ButtonWrapper>
  );
};

export default Button;

const ButtonWrapper = styled(motion.button)`
  width: 100%;
  height: clamp(48px, 5vw, 59px);
  background-color: ${({ theme }) => theme.blue2};
  background-color: ${(props) => (props.bg_color ? props.bg_color : "#00a2d4")};
  border-radius: 8px;
  color: ${(props) => (props.color ? props.color : "#ffffff")};
  text-align: center;
  font-size: clamp(16px, 1.6vw, 18px);
  border: ${(props) => (props.border ? props.border : "none")};
  outline: ${(props) => (props.outline ? props.outline : "none")};
  cursor: pointer;
  transition: 0.3s all ease;
  padding-inline: 10px;

  :hover {
    background-color: ${(props) =>
      props.hover_bg_color ? props.hover_bg_color : "#0082AA"};
    color: ${(props) => (props.hv_color ? props.hv_color : "")};
  }

  :active {
    transform: scale(0.98);
  }

  :focus {
    background-color: ${(props) =>
      props.focus_bg_color ? props.focus_bg_color : "#5bc3e3"};
    color: ${(props) => (props.fc_color ? props.fc_color : "")};
  }

  :disabled {
    background-color: #79c7df;
    color: #fff;
  }

  @media screen and (max-width: 600px) {
    height: 48px;
  }
`;
