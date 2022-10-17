import React from "react";
import { Container, Body, Main } from "./styled";
import TabNavBar from "components/TabNavBar/TabNavBar";
import CommingSoon from "components/ComingSoon";

const Taxes = () => {
  return (
    <Container>
      <TabNavBar />
      <Body>
        <CommingSoon />
      </Body>
    </Container>
  );
};

export default Taxes;
