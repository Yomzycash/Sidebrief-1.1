import TabNavBar from "components/TabNavBar/TabNavBar";
import React from "react";
import {
  Body,
  BoldText,
  ComingBtn,
  Container,
  Image,
  Main,
  ParagraphText,
} from "./styled";
import image from "../../../../asset/images/coming.png";
const BankAccount = () => {
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
          <ComingBtn>Back to Dashboard</ComingBtn>
        </Main>
      </Body>
    </Container>
  );
};

export default BankAccount;
