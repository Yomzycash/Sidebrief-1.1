import React, { useEffect, useState } from "react";
import {
  Indicator,
  LeftText,
  RightText,
  Container,
  ToggleWrapper,
  Top,
  ToggleContainer,
} from "./styled";
import { ErrMsg } from "../styled";

const ToggleButton = ({ leftText, rightText, error, checked, onChange }) => {
  let checkboxRef = document.getElementById("toggle-input");

  return (
    <Container>
      <Top>
        <ErrMsg>{error}</ErrMsg>
      </Top>
      <ToggleWrapper onClick={() => onChange(checkboxRef)}>
        {leftText && <LeftText>{leftText}</LeftText>}

        <ToggleContainer $checkedStatus={checked}>
          <Indicator $checkedStatus={checked} />
          <input type="checkbox" id="toggle-input" onChange={onChange} checked={checked} />
        </ToggleContainer>

        {rightText && <RightText>{rightText}</RightText>}
      </ToggleWrapper>
    </Container>
  );
};

export default ToggleButton;
