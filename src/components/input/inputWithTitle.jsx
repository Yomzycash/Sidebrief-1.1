import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import "./flag.css";
import {
  InputWrapper,
  Wrapper,
  Input,
  Label,
  Iconwrapper,
  ErrMsg,
  Top,
  Show,
} from "./styled";

const InputWithTitle = ({
  label,
  labelStyle,
  containerStyle,
  edit,
  error,
  errorMessage = false,
  rightText,
  leftIcon,
  container,
  placeholder,
  select,
  onChange,
  secureTextEntry,
  type,
  text,
  name,
  password,
  register,
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
  const handleBorder = () => {
    setActive(!active);
  };

  const titleOptions = [
    { value: "Mr.", label: "Mr" },
    { value: "Mrs.", label: "Mrs" },
    { value: "Miss.", label: "Miss" },
  ];

  const selectStyle = {
    background: "red",
    container: (base, state) => ({
      ...base,
      width: "50px",
      marginTop: -5,
      outline: "none",
      border: "none",
    }),
    control: (base, state) => ({
      ...base,
      boxShadow: "none",
      //   borderRadius: 10,
      alignItems: "center",
      height: 40,
      paddingLeft: -20,
      border: `1px solid ${
        state.isFocused ? "#ffffff" : errorMessage ? "red" : "#ffffff"
      }`,
      outlineColor: "white",
    }),
    placeholder: (base, state) => ({
      ...base,
    }),
    input: (provided, state) => ({
      ...provided,
      height: 26,
      //   borderRadius: 15,
      //   marginLeft: 10,
      outlineColor: "#00A2D4",
    }),
    option: (provided, state) => ({
      ...provided,
      padding: 15,
    }),
  };

  return (
    <Wrapper
      key="InputWithTitle"
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
        ref={inputRef}
        onFocus={handleBorder}
      >
        {leftIcon && <Iconwrapper>{leftIcon}</Iconwrapper>}
        {select && (
          <Select
            onChange={onChange}
            options={titleOptions}
            styles={selectStyle}
          />
        )}
        <Input
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          edit={edit}
          type={!show ? type || "password" : "text"}
          name={name}
          {...register(name)}
          {...rest}
        />

        {rightText ? (
          <div onClick={() => setShow(!show)}>
            <Show>{!show ? "show" : "hide"}</Show>
          </div>
        ) : null}
      </InputWrapper>
    </Wrapper>
  );
};

export default InputWithTitle;
