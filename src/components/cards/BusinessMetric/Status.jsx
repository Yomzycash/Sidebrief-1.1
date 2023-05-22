import React from "react";
import { Container, Left, Right } from "./styled";

const Status = ({ color, number, text, staff }) => {
  return (
    <Container>
      <Right staff={staff}>
        {/* <p>{number}</p>
        <p>{text}</p> */}
      </Right>
    </Container>
  );
};

export default Status;
