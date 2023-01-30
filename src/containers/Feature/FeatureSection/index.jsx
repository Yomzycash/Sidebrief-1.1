import { searchIcon } from "asset/images";
import CommonButton from "components/button/commonButton";
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
  btnLeftIcon,
  btnRightIcon,
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
          <CommonButton
            LeftIcon={btnLeftIcon}
            RightIcon={btnRightIcon}
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
