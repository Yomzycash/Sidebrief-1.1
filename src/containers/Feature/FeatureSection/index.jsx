import { searchIcon } from "asset/images";
import CommonButton from "components/button/commonButton";
import NoBackgroundButton from "components/button/NoBackgroundButton";
import React from "react";
import { useMediaQuery } from "@mui/material";
import {
  Content,
  Input,
  SectionContainer,
  Top,
  TopLeft,
  TopRight,
  SubText,
} from "./styled";

const FeatureSection = ({
  children,
  title,
  subText,
  btnText,
  LeftbtnText,
  btnLeftIcon,
  btnRightIcon,
  LeftbtnLeftIcon,
  RightbtnRightIcon,
  btnAction,
  anotherBtnAction,
  searchPlaceholder,
  extraComponentLeft,
  extraComponentRight,
}) => {
  const matches = useMediaQuery("(max-width:700px)");
  return (
    <SectionContainer>
      <Top>
        <TopLeft>
          {extraComponentLeft}
          <p>{title}</p>
          <SubText>{subText}</SubText>
        </TopLeft>
        <TopRight>
          {extraComponentRight}
          {searchPlaceholder && (
            <Input>
              <img src={searchIcon} alt="" />
              <input type="text" placeholder={searchPlaceholder} />
            </Input>
          )}
          <NoBackgroundButton
            LeftIcon={!matches && LeftbtnLeftIcon}
            RightIcon={!matches && RightbtnRightIcon}
            text={LeftbtnText}
            action={anotherBtnAction}
          />

         {/* {!matches ? (  */}
           <CommonButton
              LeftIcon={btnLeftIcon}
              RightIcon={btnRightIcon}
              btnText2={btnText}
              text={btnText}
              action={btnAction}
         />
         {/* ): (
          <NoBackgroundButton
            text={btnText}
            action={btnAction}
        />
         )} */}
        </TopRight>
      </Top>
      <Content>{children}</Content>
    </SectionContainer>
  );
};

export default FeatureSection;
