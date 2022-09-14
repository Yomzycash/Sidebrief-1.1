import React, { useEffect, useRef, useState } from "react";
import { Wrapper, Label, ErrMsg, Top } from "./styled";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./flag.css";

const NumberInput = ({
  label,
  labelStyle,
  containerStyle,
  edit,
  error,
  errorMessage,
  container,
  onSelectedChange = () => {},
  placeholder,
  onChange,
  value,
  type,
  options,
  name,
  register,
  ...rest
}) => {
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
  return (
    <Wrapper
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
      <div
        className={errorMessage ? "error" : active ? "active" : "nonActive"}
        ref={inputRef}
        onFocus={handleBorder}
      >
        <PhoneInput
          country={"ng"}
          value={value}
          onChange={onChange}
          containerStyle={{
            height: "100%",
            borderRadius: "20px",
          }}
          inputStyle={{
            paddingLeft: "80px",
            width: "100%",
            height: "95%",
          }}
        />
      </div>
    </Wrapper>
  );
};

export default NumberInput;
