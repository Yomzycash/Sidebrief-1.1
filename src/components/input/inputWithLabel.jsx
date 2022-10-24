import React, { useState, useEffect, useRef } from "react";
import {
  InputWrapper,
  Wrapper,
  Input,
  Label,
  Iconwrapper,
  ErrMsg,
  Top,
  Show,
  BottomText,
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
  text,
  name,
  password,
  register,
  bottomText,
  topStyles,
  inputClass,
  bottomTextClass,
  ...rest
}) => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (active) {
      inputRef.current.focus();
    }
  }, [active]);
  const handleBorder = (bool) => {
    setActive(bool);
  };
  return (
    <Wrapper
      key="InputWithLabel"
      className={containerStyle}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Top>
        {label && <Label className={labelStyle}>{label}</Label>}

        {errorMessage ? <ErrMsg>{errorMessage}</ErrMsg> : null}
      </Top>

      <InputWrapper
        border={
          errorMessage
            ? "1px solid red"
            : active
            ? "1px solid #00A2D4"
            : "1px solid #ececec"
        }
        className={inputClass}
        ref={inputRef}
        onFocus={() => handleBorder(true)}
        onBlur={() => handleBorder(false)}
      >
        {leftIcon && <Iconwrapper>{leftIcon}</Iconwrapper>}
        {register ? (
          <Input
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            edit={edit}
            type={!show ? type || "password" : "text"}
            name={name}
            {...register(name)}
            {...rest}
          />
        ) : (
          <Input
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            edit={edit}
            type={!show ? type || "password" : "text"}
            name={name}
            {...rest}
          />
        )}

        {rightText ? (
          <div onClick={() => setShow(!show)}>
            <Show>{!show ? "show" : "hide"}</Show>
          </div>
        ) : null}
      </InputWrapper>

      {bottomText ? (
        <BottomText className={bottomTextClass}>{bottomText}</BottomText>
      ) : null}
    </Wrapper>
  );
};

export default InputWithLabel;
