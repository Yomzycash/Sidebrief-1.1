import React from "react";
import { Container } from "./styled";

export const RewardSummaryCard = ({ shown, total }) => {
  return (
    <Container>
      Showing {shown} of {total}
    </Container>
  );
};
