import React, { useState } from "react";
import {
  InputWrapper,
  Wrapper,
  Input,
  Label,
  Iconwrapper,
  ErrMsg,
  Top,
} from "./styled";

const InputWithLabel = ({
  label,
  labelStyle,
  containerStyle,
  edit,
  error,
  errorMessage,
  rightText,
  leftIcon,
  container,
  placeholder,
  secureTextEntry,
  type,
  ...rest
}) => {
  const [show, setShow] = useState(true);
  return (
    <Wrapper className={containerStyle}>
      <Top>
        {label && <Label className={labelStyle}>{label}</Label>}

        {errorMessage ? <ErrMsg>{errorMessage}</ErrMsg> : null}
      </Top>

      <InputWrapper>
        {leftIcon && <Iconwrapper>{leftIcon}</Iconwrapper>}

        <Input
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          edit={edit}
          type={show ? "text" : "password"}
          {...rest}
        />

        {rightText ? (
          <div onClick={() => setShow(!show)}>
            <h1 className="show">{show ? "hide" : "show"}</h1>
          </div>
        ) : null}
      </InputWrapper>
    </Wrapper>
  );
};

export default InputWithLabel;
