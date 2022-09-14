import React, { useState } from "react";
import styled from "styled-components";

const Checkbox = (
  {text1="Click here to use ",
  styledSpan="Sidebrief",
  text2="shareholders until you sustain your own",
  styledSpan2}
) => {
  const [check, setCheck] = useState(false);

  const handleCheck = () => {
    setCheck(!check);
  };

  return (
    <Wrapper>
      <CheckboxInput type="checkbox" checked={check} onChange={handleCheck} />
      <Text onClick={handleCheck}>{text1}
        <Span>{styledSpan}</Span> {text2}
        <Span>{styledSpan2}</Span>  . </Text>
    </Wrapper>
  );
};

export default Checkbox;

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  flex: 1;
  gap: 16px;
  width: 100%;
`;
const CheckboxInput = styled.input`
  height: 20px;
  width: 20px;
  min-width: 15px;
  background: #ffffff;
  border: 1px solid #edf1f7;
  border-radius: 4px;
`;
const Text = styled.label`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #4e5152;
`;

const Span = styled.span`
  color: #0082aa;
  // cursor: pointer;
`;
