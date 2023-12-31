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
  puffColor,
  id,
  classname,
  component,
  type,
  loading,
  LoadingIcon,
}) => {
  return (
    <ButtonContainer
      onClick={action}
      style={style}
      id={id}
      className={`button__effect ${classname}`}
      type={type || "button"}
    >
      {loading ? (
        LoadingIcon || <Puff stroke={puffColor || "#ffffff"} fill="white" width={20} height={20} />
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
