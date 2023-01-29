import React, { useState } from "react";
import { useSelector } from "react-redux";
import { HiArrowNarrowLeft } from "react-icons/hi";
import Button from "components/button";
import DashboardSection from "layout/DashboardSection";
import { IoArrowForward } from "react-icons/io5";
import CommonButton from "components/button/commonButton";
import {
  Back,
  Badge,
  BadgeText,
  ButtonWrapper,
  Image,
  ImageWrapper,
  MobileButtonWrapper,
  NavigationWrapper,
  Container,
  TextDes,
  TextWrapper,
  ShortDetails,
  ShortText,
  Description,
  Scroll,
} from "./styled";

const FeatureDetails = ({
  backText,
  backLink,
  image,
  topText,
  title,
  subText,
  detailText,
  btnText,
  pageTitle,
  btnIcon,
  btnAction,
  title2,
  subText2,
  viewAllLink,
  children,
}) => {
  const layoutInfo = useSelector((store) => store.LayoutInfo);
  const { sidebarWidth } = layoutInfo;

  return (
    <Container sidebarWidth={sidebarWidth}>
      <NavigationWrapper>
        <Back to={backLink}>
          <HiArrowNarrowLeft />
          <p>{backText}</p>
        </Back>
        <span>{pageTitle}</span>
      </NavigationWrapper>
      <ShortDetails>
        <ImageWrapper>
          <Image src={image} alt="" />
          <TextWrapper>
            {topText && (
              <Badge>
                <BadgeText>{topText}</BadgeText>
              </Badge>
            )}
            <h4>{title}</h4>
            <ShortText>{subText}</ShortText>
          </TextWrapper>
        </ImageWrapper>
        <ButtonWrapper>
          <CommonButton text={btnText} RightIcon={btnIcon} action={btnAction} />
        </ButtonWrapper>
      </ShortDetails>
      <Description>
        <TextDes>
          <div>{detailText}</div>
        </TextDes>
      </Description>
      <MobileButtonWrapper>
        <CommonButton text={btnText} RightIcon={btnIcon} action={btnAction} />
      </MobileButtonWrapper>
      <Scroll>
        <DashboardSection
          title={title2}
          body={subText2}
          carousel
          link={{
            text: "View all",
            to: { viewAllLink },
            image: <IoArrowForward />,
          }}
        >
          {children}
        </DashboardSection>
      </Scroll>
    </Container>
  );
};

export default FeatureDetails;
