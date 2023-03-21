import React from "react";
import { GiCheckMark } from "react-icons/gi";
import { Circle, Container, Text } from "./styled";

const KeyProgress = ({
  text, // a string
  color, // a string with value of: active
  style,
  hideCheck,
  sameOnMobile,
}) => {
  return (
    <Container $sameOnMobile={sameOnMobile}>
      <Circle color={color} style={style}>
        {!hideCheck && <GiCheckMark size={10} style={{ color: "white" }} />}
      </Circle>
      <Text color={color} $sameOnMobile={sameOnMobile}>
        {text}
      </Text>
    </Container>
  );
};

export default KeyProgress;
