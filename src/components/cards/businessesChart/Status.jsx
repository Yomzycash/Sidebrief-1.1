import React from "react";
import { Container, Left, Right } from "./styled";

const Status = ({ color, number, text }) => {
  return (
    <Container>
      <Left color={color}>
        <div />
      </Left>
      <Right>
        <p>{number}</p>
        <div>{text}</div>
      </Right>
    </Container>
  );
};

export default Status;
