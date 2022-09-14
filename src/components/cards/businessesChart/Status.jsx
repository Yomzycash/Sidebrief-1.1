import React from "react";
import { Container, Left, Right } from "./styled";

const Status = ({ color, number, text, staff }) => {
  return (
    <Container>
      <Left color={color} text={text} staff={staff}>
        <div />
      </Left>
      <Right staff={staff}>
        <p>{number}</p>
        <div>{text}</div>
      </Right>
    </Container>
  );
};

export default Status;
