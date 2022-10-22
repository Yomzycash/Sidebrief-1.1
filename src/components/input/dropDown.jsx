import React from "react";
import { Wrapper, Label, ErrMsg, Top } from "./styled";
import Select from "react-select";

const DropDown = ({
  label,
  labelStyle,
  containerStyle,
  error,
  errorMessage,
  container,
  onSelectedChange = () => {},
  placeholder,
  onChange,
  type,
  options,
  name,
  value,
  cardAction,
  defaultValue,
  register,
  launch,
  ...rest
}) => {
  const selectStyle = {
    background: "red",
    container: (base, state) => ({
      ...base,
      width: "100%",
    }),
    control: (base, state) => ({
      ...base,
      boxShadow: "none",
      borderRadius: 10,
      height: 48,
      paddingInline: 20,
      fontSize: launch && 14,
      outline: "none",
      "&:hover": {
        borderColor: "none",
      },
      border: `1px solid ${
        state.isFocused ? "#00A2D4" : errorMessage ? "red" : "#ECECEC"
      }`,
      outlineColor: "#00A2D4",
    }),
    placeholder: (base, state) => ({
      ...base,
      fontSize: 14,
    }),
    input: (provided, state) => ({
      ...provided,
      height: 46,
      borderRadius: 15,
      margin: 0,
      padding: 0,
      outlineColor: "#00A2D4",
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      padding: 20,
      fontSize: 14,
    }),
  };
  return (
    <Wrapper
      // className={containerStyle}
      key="DropDown"
      style={containerStyle && containerStyle}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Top>
        {label && <Label className={labelStyle}>{label}</Label>}

        {errorMessage ? <ErrMsg>{errorMessage}</ErrMsg> : null}
      </Top>

      <Select
        onChange={onChange}
        options={options}
        styles={selectStyle}
        defaultValue={{
          value: cardAction === "edit" && defaultValue && defaultValue,
          label: cardAction === "edit" && defaultValue && defaultValue,
        }}
      />
    </Wrapper>
  );
};

export default DropDown;
