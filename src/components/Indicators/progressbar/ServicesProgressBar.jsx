import React from "react";
import KeyProgress from "./KeyProgress";
import { Progress, ProgressContainer, ProgressLine } from "./styled";

const ServicesProgressBar = ({
  progress, // should range from 0 to 100
}) => {
  return (
    <ProgressContainer>
      <ProgressLine>
        <Progress progress={progress} />
      </ProgressLine>
      <KeyProgress text="Services Info" color={progress > 0 ? "active" : ""} />
      <KeyProgress text="Payment" color={progress >= 25 ? "active" : ""} />
      <KeyProgress text="Form" color={progress >= 50 ? "active" : ""} />
      <KeyProgress text="Documents" color={progress >= 75 ? "active" : ""} />
      <KeyProgress text="Review" color={progress >= 100 ? "active" : ""} />
    </ProgressContainer>
  );
};

export default ServicesProgressBar;
