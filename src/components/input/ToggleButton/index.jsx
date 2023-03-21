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

const ToggleButton = ({ leftText, rightText, error, name, onChange }) => {
  let checkboxRef = document.getElementById("toggle-input");

  const [checkedStatus, setCheckedStatus] = useState(checkboxRef?.checked || false);

  const handleToggles = () => {
    setCheckedStatus(checkboxRef?.checked);
  };

  useEffect(() => {}, [checkboxRef]);

  return (
    <Container>
      <Top>
        <ErrMsg>{error}</ErrMsg>
      </Top>
      <ToggleWrapper htmlFor="toggle-input" onClick={handleToggles}>
        {leftText && <LeftText>{leftText}</LeftText>}
        <ToggleContainer $checkedStatus={checkboxRef?.checked}>
          <Indicator $checkedStatus={checkboxRef?.checked} />
          <input
            type="checkbox"
            id="toggle-input"
            name={name}
            onChange={onChange}
            // checked={checkedStatus}
          />
        </ToggleContainer>
        {rightText && <RightText>{rightText}</RightText>}
      </ToggleWrapper>
    </Container>
  );
};

export default ToggleButton;
