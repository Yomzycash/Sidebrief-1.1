import React from "react";
import { Container } from "./styled";

export const RewardSummaryCard = ({ shown, total }) => {
  console.log(typeof shown);
  return (
    <Container>
      Showing {shown !== "undefined" ? shown : 0} of{" "}
      {total !== "undefined" ? total : 0} results
    </Container>
  );
};
