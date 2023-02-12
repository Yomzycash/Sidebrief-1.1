import React from "react";
import {
  Body,
  BoldText,
  ComingBtn,
  Container,
  Image,
  Main,
  ParagraphText,
} from "./Settings/styled";
import image from "asset/images/coming.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { store } from "redux/Store";
import { setRefreshApp } from "redux/Slices";
import { useSelector } from "react-redux";
const Settings = () => {
  const navigate = useNavigate();
  const { refreshApp } = useSelector((store) => store.UserDataReducer);

  useEffect(() => {
    store.dispatch(setRefreshApp(!refreshApp));
  }, []);
  return (
    <Container>
      {/* <TabNavBar /> */}
      <Body>
        <Main>
          <Image src={image} alt="" />
          <BoldText>Coming Soon...</BoldText>
          <ParagraphText align="center">
            Uh oh, our apologies. The page you’re looking for is unavailable at
            the moment. However once it’s live, you’ll be the first to know.
          </ParagraphText>
          <ComingBtn
            onClick={() => navigate("/staff-dashboard/business-registration")}
          >
            Back to Dashboard
          </ComingBtn>
        </Main>
      </Body>
    </Container>
  );
};

export default Settings;
