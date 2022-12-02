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
import { useNavigate } from "react-router-dom";
import ProfileDetails from "components/profileDetails";
const StaffSettings = () => {
  const navigate = useNavigate();
  return (
    <Container>
      {/* <TabNavBar /> */}
      <Body>
        <Main>
          <ProfileDetails />
        </Main>
      </Body>
    </Container>
  );
};

export default StaffSettings;
