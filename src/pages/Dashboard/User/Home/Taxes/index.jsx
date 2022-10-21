import React, { useState } from "react";
import { Container, Body, Main } from "./styled";
import TabNavBar from "components/TabNavBar/TabNavBar";
import CommingSoon from "components/ComingSoon";
import CountryCard from "components/cards/CountryCard";
import Stepbar from "components/Indicators/Stepbar";
import Files from "react-butterfiles";
import FileUpload from "components/FileUpload";

const Taxes = () => {
  const [test, setTest] = useState();

  console.log("Testing", test);
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
