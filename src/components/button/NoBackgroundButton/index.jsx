import React from "react";
import { ButtonContainer } from "./styled";

const NoBackgroundButton = ({
  LeftIcon,
  text,
  RightIcon,
  action = () => {},
  style,
  leftIconColor,
  rightIconColor,
}) => {
  return (
    <ButtonContainer onClick={action} style={style}>
      {LeftIcon && ( <LeftIcon size={24} color={leftIconColor || "white"} />)}
      {text && <span>{text}</span>}
      {RightIcon && (<RightIcon size={24} color={rightIconColor || "white"} />)}
    </ButtonContainer>
  );
};

export default NoBackgroundButton;
