import React from "react";
import { Container } from "./styles";

export const TypeIndicator = ({ type, color }) => {
  return <Container color={color}>{type}</Container>;
};
