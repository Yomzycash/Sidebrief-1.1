import React, { useEffect, useRef, useState } from "react";
import { Wrapper, Label, ErrMsg, Top } from "./styled";
import CountryDropdown from "country-dropdown-with-flags-for-react";
import "./flag.css";

const CountryInput = ({
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
        <CountryDropdown
          preferredCountries={["ng", "gh"]}
          value=""
          handleChange={onChange}
        ></CountryDropdown>
      </div>
    </Wrapper>
  );
};

export default CountryInput;
