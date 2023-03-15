import React from "react";
import KeyProgress from "./KeyProgress";
import { Progress, ProgressContainer, ProgressLine } from "./styled";

const StaffServicesModalProgressBar = ({
  progress, // should range from 0 to 100
  style,
  lineStyle,
  circleStyle,
}) => {
  return (
    <ProgressContainer style={{ ...containerStyle, ...style }}>
      <ProgressLine style={{ ...progressLineStyle, ...lineStyle }} $sameOnMobile>
        <Progress progress={progress} />
      </ProgressLine>
      <KeyProgress
        text="Info"
        color={progress > 0 ? "active" : ""}
        style={{ ...progressCircleStyle, ...circleStyle }}
        hideCheck
        sameOnMobile
      />
      <KeyProgress
        text="Form"
        color={progress >= 50 ? "active" : ""}
        style={{ ...progressCircleStyle, ...circleStyle }}
        hideCheck
        sameOnMobile
      />
      <KeyProgress
        text="Documents"
        color={progress >= 100 ? "active" : ""}
        style={{ ...progressCircleStyle, ...circleStyle }}
        hideCheck
        sameOnMobile
      />
    </ProgressContainer>
  );
};

export default StaffServicesModalProgressBar;

const containerStyle = {
  maxWidth: "100%",
};

const progressLineStyle = {
  left: "2%",
  top: "5px",
  maxWidth: "93%",
};

const progressCircleStyle = {
  width: "12px",
  height: "12px",
};
