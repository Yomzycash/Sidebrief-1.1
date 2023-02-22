import React from "react";
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
}) => {
  return (
    <ButtonContainer
      onClick={action}
      style={style}
      className={"button__effect" || classname}
      type={type || "button"}
    >
      {LeftIcon && <LeftIcon size={24} color={leftIconColor || "white"} />}
      {text && <span style={textStyle}>{text}</span>}
      {RightIcon && <RightIcon size={24} color={rightIconColor || "white"} />}
      {component && <>{component}</>}
    </ButtonContainer>
  );
};

export default CommonButton;
