import { RewardCard } from "components/cards";

import DashboardSection from "layout/DashboardSection";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import React from "react";
import {
  StaffContainer,
  NavigationWrapper,
  RewardShortDetails,
  ImageWrapper,
  ButtonWrapper,
  Image,
  Badge,
  RewardShortText,
  RewardDescription,
  BadgeText,
  VisitLink,
  TextDes,
  TextLink,
  TextWrapper,
} from "./styled";

import rewardImage from "../../../asset/images/re.png";
import Button from "components/button";
import { GladeLogo, lendhaLogo, OkraLogo, SterlingLogo } from "asset/images";
import { ScrollBox } from "containers";
import { IoArrowForward } from "react-icons/io5";

const RewardDetails = (props) => {
  return (
    <StaffContainer>
      <NavigationWrapper>
        <HiArrowNarrowLeft />
        <p>Back to Rewards</p>
      </NavigationWrapper>
      <RewardShortDetails>
        <ImageWrapper>
          <Image src={rewardImage} alt="" />
          <TextWrapper>
            <Badge>
              <BadgeText> Expense Management</BadgeText>
            </Badge>
            <h4>Lendha Africa</h4>
            <RewardShortText>
              $200 off 1st-month subscription for payroll compliance
            </RewardShortText>
          </TextWrapper>
        </ImageWrapper>
        <ButtonWrapper>
          <Button title="Claim Reward" />
        </ButtonWrapper>
      </RewardShortDetails>
      <RewardDescription>
        <TextDes>
          {" "}
          Glade is a financial technology company that powers bordeless
          financial services for businesses across Africa to perform
          cross-border transactions, move and manage money globally, while
          having access to other tools they need to have a global reach. Their
          services are centered around providing financial services for SME’s,
          freelancers and startups, bridging the gap to make financial services
          a lot easier and more accessible with domestic and international
          accounts, cross-border payments, capital and API infrastructure.
        </TextDes>
        <VisitLink to="/">
          <TextLink>Visit Guide's website</TextLink>
          <HiArrowNarrowRight />
        </VisitLink>
      </RewardDescription>
      <DashboardSection
        title="Rewards"
        body="Accept offers and rewards when you register your business with Sidebrief"
        carousel
        link={{
          text: "View all",
          to: "/dashboard",
          icon: <IoArrowForward />,
        }}
      >
        <ScrollBox>
          <RewardCard
            image={lendhaLogo}
            title="Lendha Africa"
            body="Get credit to register your business & pay later."
          />
          <RewardCard
            image={SterlingLogo}
            title="Sterling Bank PLC"
            body="Get credit to register your business & pay later."
          />
          <RewardCard
            image={GladeLogo}
            title="Glade"
            body="Get credit to register your business & pay later."
          />
          <RewardCard
            image={OkraLogo}
            title="Okra"
            body="Get credit to register your business & pay later."
          />
          <RewardCard
            image={SterlingLogo}
            title="Sterling Bank PLC"
            body="Get credit to register your business & pay later."
          />
          <RewardCard
            image={GladeLogo}
            title="Glade"
            body="Get credit to register your business & pay later."
          />
          <RewardCard
            image={OkraLogo}
            title="Okra"
            body="Get credit to register your business & pay later."
          />
        </ScrollBox>
      </DashboardSection>
    </StaffContainer>
  );
};

export default RewardDetails;
