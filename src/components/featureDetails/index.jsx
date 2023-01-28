import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiArrowNarrowLeft } from "react-icons/hi";
import Button from "components/button";
import DashboardSection from "layout/DashboardSection";
import { IoArrowForward } from "react-icons/io5";
import CommonButton from "components/button/commonButton";

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
  const [open, setOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState({});

  const layoutInfo = useSelector((store) => store.LayoutInfo);
  const { sidebarWidth } = layoutInfo;

  return (
    <StaffContainer sidebarWidth={sidebarWidth}>
      <NavigationWrapper>
        <Back to={backLink}>
          <HiArrowNarrowLeft />
          <p>{backText}</p>
        </Back>
        <span>{pageTitle}</span>
      </NavigationWrapper>
      <RewardShortDetails>
        <ImageWrapper>
          <Image src={image} alt="" />
          <TextWrapper>
            {topText && (
              <Badge>
                <BadgeText>{topText}</BadgeText>
              </Badge>
            )}
            <h4>{title}</h4>
            <RewardShortText>{subText}</RewardShortText>
          </TextWrapper>
        </ImageWrapper>
        <ButtonWrapper>
          <CommonButton text={btnText} RightIcon={btnIcon} action={btnAction} />
        </ButtonWrapper>
      </RewardShortDetails>
      <RewardDescription>
        <TextDes>
          <div>{detailText}</div>
        </TextDes>
      </RewardDescription>
      <MobileButtonWrapper>
        <CommonButton text={btnText} RightIcon={btnIcon} action={btnAction} />
      </MobileButtonWrapper>
      <RewardsScroll>
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
      </RewardsScroll>
    </StaffContainer>
  );
};

export default FeatureDetails;

export const StaffContainer = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  max-width: calc(99vw - ${({ sidebarWidth }) => sidebarWidth});

  @media screen and (max-width: 700px) {
    max-width: 100%;
    min-height: calc(100vh - 71px);
  }

  h3 {
    font-size: 24px;
    margin-left: 40px;
  }
`;

export const Back = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  margin-left: 8px;
  width: max-content;
`;

export const NavigationWrapper = styled.div`
  padding: 24px clamp(24px, 2.5vw, 40px);
  border-bottom: 1px solid #edf1f6;
  display: flex;
  align-items: center;
  width: 100%;

  p {
    margin-left: 5px;

    @media screen and (max-width: 700px) {
      display: none;
    }
  }

  span {
    position: relative;
    left: -16px;
    margin: auto;

    @media screen and (min-width: 701px) {
      display: none;
    }
  }
`;

export const RewardShortDetails = styled.div`
  width: inherit;
  padding: 40px clamp(24px, 2.5vw, 40px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 30px;
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const Image = styled.img`
  width: 55px;
  object-fit: contain;
`;
export const TextWrapper = styled.div`
  padding-left: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  div {
  }
  h4 {
    font-size: 24px;
    color: #151717;
  }
`;

export const Badge = styled.div`
  background-color: rgba(212, 0, 204, 0.05);
  padding: 4px 16px;
  margin-bottom: 20px;
  border-radius: 12px;
  /* width: 170px; */
`;
export const BadgeText = styled.p`
  color: #d400cc;
  font-size: 12px;
  font-weight: 400;
`;

export const ButtonWrapper = styled.div`
  width: 200px;

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export const MobileButtonWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-end;
  width: calc(100% - 48px);
  margin: 24px;

  @media screen and (min-width: 701px) {
    display: none;
  }
`;

export const RewardShortText = styled.p`
  font-size: 16px;
  color: #4e5152;
  line-height: 24px;
`;

export const RewardDescription = styled.div`
  margin-top: 40px;
  padding-inline: 40px;
`;

export const TextDes = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;
  font-size: 18px;
  color: #4e5152;
  font-size: 16px;
  line-height: 24px;
  align-items: justify;
`;

export const TextLink = styled.p`
  color: #00a2d4;
`;

export const VisitLink = styled(Link)`
  color: #00a2d4;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  margin-top: 32px;
`;

export const rewardModalStyle = {
  padding: 0,
  backgroundColor: "white",
  width: "max-width",
  borderRadius: "16px",
  boxShadow:
    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
};

export const RewardsScroll = styled.div`
  @media screen and (max-width: 700px) {
    display: none;
  }
`;