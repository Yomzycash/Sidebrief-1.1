import React, { useState } from "react";
import TabNavBar from "components/TabNavBar/TabNavBar";
import CommingSoon from "components/ComingSoon";
import CountryCard from "components/cards/CountryCard";
import Stepbar from "components/Indicators/Stepbar";
import FileUpload from "components/FileUpload";
import {
  Body,
  BoldText,
  ComingBtn,
  Container,
  Image,
  Main,
  ParagraphText,
} from "./styled";
import image from "../../../../../asset/images/coming.png";
import { useNavigate } from "react-router-dom";

const Taxes = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <TabNavBar />
      <Body>
        <Main>
          <Image src={image} alt="" />
          <BoldText>Coming Soon...</BoldText>
          <ParagraphText align="center">
            Uh oh, our apologies. The page you’re looking for is unavailable at
            the moment. However once it’s live, you’ll be the first to know.
          </ParagraphText>
          <ComingBtn
            onClick={() => navigate("/dashboard/business-registration")}
          >
            Back to Dashboard
          </ComingBtn>
        </Main>
      </Body>
    </Container>
  );
};

export default Taxes;
