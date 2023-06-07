import React from "react";
import { BottomText, Number, StyledWrapper, TopText } from "./styled";

const MetricCard = ({ number, topText, bottomText, onClick = () => {} }) => {
  return (
    <StyledWrapper tabIndex={0} className="button__effect" onClick={() => onClick(topText)}>
      <TopText>{topText}</TopText>
      <Number>{number}</Number>
      <BottomText>{bottomText}</BottomText>
    </StyledWrapper>
  );
};

export default MetricCard;
