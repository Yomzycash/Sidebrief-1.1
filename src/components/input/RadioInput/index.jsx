import React from "react";
import { ErrMsg, Label, Top, Wrapper } from "../styled";
import { Radio, RadioWrapper } from "./styled";

const RadioInput = ({
  containerStyle,
  label,
  labelStyle,
  errorMessage,
  radioOptions,
  name,
  register,
}) => {
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
      <RadioWrapper>
        {register
          ? radioOptions?.map((el, i) => (
              <Radio key={i}>
                <input type="radio" id={el + i} name={name} value={el} {...register(name)} />
                <label htmlFor={el + i}>{el}</label>
              </Radio>
            ))
          : radioOptions?.map((el, i) => (
              <Radio key={i}>
                <input type="radio" id={el + i} name={name} />
                <label htmlFor={el + i}>{el}</label>
              </Radio>
            ))}
      </RadioWrapper>
    </Wrapper>
  );
};

export default RadioInput;
