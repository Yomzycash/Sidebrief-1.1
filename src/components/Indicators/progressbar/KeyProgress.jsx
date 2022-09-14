import React from "react";
import { GiCheckMark } from "react-icons/gi";
import { Circle, Container, Text } from "./styled";

const KeyProgress = ({
  text, // a string
  color, // a string with value of: active
}) => {
  return (
    <Container>
      <Circle color={color}>
        <GiCheckMark size={10} style={{ color: "white" }} />
      </Circle>
      <Text color={color}>{text}</Text>
    </Container>
  );
};

export default KeyProgress;
