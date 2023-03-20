import React from "react";
import { Puff } from "react-loading-icons";
import { ButtonContainer } from "./styled";

const CommonButton = ({
  LeftIcon,
  text,
  RightIcon,
  action = () => {},
  style,
  textStyle,
  leftIconColor,
  rightIconColor,
  classname,
  component,
  type,
  loading,
}) => {
  return (
    <ButtonContainer
      onClick={action}
      style={style}
      className={"button__effect" || classname}
      type={type || "button"}
    >
      {loading ? (
        <Puff stroke="#ffffff" fill="white" width={24} height={24} />
      ) : (
        <>
          {LeftIcon && <LeftIcon size={20} color={leftIconColor || "white"} />}
          {text && <span style={textStyle}>{text}</span>}
          {RightIcon && <RightIcon size={24} color={rightIconColor || "white"} />}
          {component && <>{component}</>}
        </>
      )}
    </ButtonContainer>
  );
};

export default CommonButton;
