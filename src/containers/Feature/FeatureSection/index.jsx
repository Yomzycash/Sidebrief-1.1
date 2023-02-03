import { searchIcon } from "asset/images";
import CommonButton from "components/button/commonButton";
import NoBackgroundButton from "components/button/NoBackgroundButton";
import React from "react";
import {
  Content,
  Input,
  SectionContainer,
  Top,
  TopLeft,
  TopRight,
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
  searchPlaceholder,
  extraComponentLeft,
  extraComponentRight,
}) => {
  return (
    <SectionContainer>
      <Top>
        <TopLeft>
          {extraComponentLeft}
          <p>{title}</p>
          <p>{subText}</p>
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
            LeftIcon={LeftbtnLeftIcon}
            RightIcon={RightbtnRightIcon}
            text={LeftbtnText}
            action={btnAction}
          />
          <CommonButton
            LeftIcon={btnLeftIcon}
            RightIcon={btnRightIcon}
            btnText2={btnText}
            text={btnText}
            action={btnAction}
          />
        </TopRight>
      </Top>
      <Content>{children}</Content>
    </SectionContainer>
  );
};

export default FeatureSection;
