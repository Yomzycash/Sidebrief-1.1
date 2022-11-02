import FileLoading from "components/FileUpload/FileLoading";
import React from "react";
import {
  Audio,
  BallTriangle,
  Bars,
  Circles,
  Grid,
  Hearts,
  Oval,
  Puff,
  Rings,
  SpinningCircles,
  TailSpin,
  ThreeDots,
} from "react-loading-icons";
const Test = () => {
  return (
    <>
      {/* <Audio stroke="#00A2D4" fill="white" />
      <br />
      <BallTriangle stroke="#00A2D4" fill="white" />
      <br />
      <Bars stroke="#00A2D4" fill="white" />
      <br />
      <Circles stroke="#00A2D4" fill="white" />
      <br />
      <Grid stroke="#00A2D4" fill="white" />
      <br />
      <Hearts stroke="#00A2D4" fill="white" />
      <br />
      <Oval stroke="#00A2D4" fill="white" />
      <br />
      <Puff stroke="#00A2D4" fill="white" />
      <br />
      <Rings stroke="#00A2D4" fill="white" />
      <br />
      <SpinningCircles stroke="#00A2D4" fill="white" />
      <br />
      <TailSpin stroke="#00A2D4" fill="white" />
      <br />
      <ThreeDots stroke="#00A2D4" fill="white" />
      <br /> */}
      <FileLoading />
    </>
  );
};

export default Test;
