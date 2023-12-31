import React from "react";
import { InputWrapper, Wrapper, Label, ErrMsg, Top, Select } from "./styled";

const DropDownInput = ({
  label,
  labelStyle,
  containerStyle,
  edit,
  error,
  errorMessage,
  OptionValues,
  onSelectedChange = () => {},
  container,
  placeholder,
  secureTextEntry,
  type,
  name,
  register,
  ...rest
}) => {
  const handleChange = (e) => {
    let selectedValue = e.target.value;
    onSelectedChange(selectedValue);
  };
  let options = OptionValues.map((data) => (
    <option key={data.id} value={data.value} style={{ color: "red" }}>
      {data.value}
    </option>
  ));
  return (
    <Wrapper
      key="DropDownInput"
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

      <InputWrapper>
        <Select onChange={handleChange} {...register(name)}>
          <option style={{ backgroundColor: "red" }} value="">
            Select
          </option>
          {options}
        </Select>
      </InputWrapper>
    </Wrapper>
  );
};

export default DropDownInput;
