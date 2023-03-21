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
<<<<<<< HEAD
  id,
=======
>>>>>>> 912a7d2c (Service form Section implemented)
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
<<<<<<< HEAD
        LoadingIcon || <Puff stroke={puffColor || "#ffffff"} fill="white" width={24} height={24} />
=======
        <Puff stroke={puffColor || "#ffffff"} fill="white" width={24} height={24} />
>>>>>>> 912a7d2c (Service form Section implemented)
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
