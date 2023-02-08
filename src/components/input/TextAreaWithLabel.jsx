import React from "react";
import {
  BottomText,
  ErrMsg,
  InputWrapper,
  Label,
  TextArea,
  Top,
  Wrapper,
} from "./styled";

const TextAreaWithLabel = ({
  label,
  labelStyle,
  containerStyle,
  text,
  errorMessage,
  placeholder,
  name,
  register,
  bottomText,
  bottomTextClass,
  disable,
  onChange = () => {},
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
      {register ? (
        <TextArea
          placeholder={placeholder}
          name={name}
          disabled={disable}
          $error={errorMessage}
          {...register(name)}
        />
      ) : (
        <TextArea
          placeholder={placeholder}
          name={name}
          disabled={disable}
          $error={errorMessage}
          onChange={onChange}
          value={text}
        />
      )}

      {bottomText ? (
        <BottomText className={bottomTextClass}>{bottomText}</BottomText>
      ) : null}
    </Wrapper>
  );
};

export default TextAreaWithLabel;
