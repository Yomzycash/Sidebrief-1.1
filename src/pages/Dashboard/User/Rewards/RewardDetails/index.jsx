import { RewardCard } from "components/cards";

import DashboardSection from "layout/DashboardSection";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import React, { useEffect, useState } from "react";
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

import Button from "components/button";
import { GladeLogo, lendhaLogo, OkraLogo, SterlingLogo } from "asset/images";
import { ScrollBox } from "containers";
import { IoArrowForward } from "react-icons/io5";
import { useSelector } from "react-redux";
import { store } from "redux/Store";
import { setRewardsPageHeader } from "redux/Slices";
import { useNavigate, useParams } from "react-router-dom";
import { allRewards } from "utils/config";
import Dialog from "@mui/material/Dialog";
import RewardModal from "components/modal/RewardModal";
import { useGetUserRewardQuery } from "services/RewardService";

const RewardDetails = (props) => {
  const [open, setOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState({});

  const { data, isLoading, isError, isSuccess } = useGetUserRewardQuery();

  const layoutInfo = useSelector((store) => store.LayoutInfo);
  const { sidebarWidth } = layoutInfo;

  const navigate = useNavigate();

  useEffect(() => {
    store.dispatch(setRewardsPageHeader(false));
  }, []);

  const { rewardID } = useParams();

  useEffect(() => {
    const responseData = data === undefined ? [] : [...data];

    const rewardDetails = responseData.find(
      (reward) => reward.rewardID === rewardID
    );
    setSelectedReward(rewardDetails);
    console.log(rewardDetails);

    console.log(rewardID);
  }, [data]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StaffContainer sidebarWidth={sidebarWidth}>
      <NavigationWrapper
        onClick={() => navigate("/dashboard/rewards/all-rewards")}
      >
        <HiArrowNarrowLeft />
        <p>Back to Rewards</p>
      </NavigationWrapper>
      <RewardShortDetails>
        <ImageWrapper>
          <Image src={selectedReward?.rewardImage} alt="" />
          <TextWrapper>
            <Badge>
              <BadgeText>{selectedReward?.rewardCategory}</BadgeText>
            </Badge>
            <h4>{selectedReward?.rewardPartner}</h4>
            <RewardShortText>{selectedReward?.rewardName}</RewardShortText>
          </TextWrapper>
        </ImageWrapper>
        <ButtonWrapper>
          <Button title="Claim Reward" onClick={handleClickOpen} />
          <Dialog onClose={handleClose} open={open}>
            <RewardModal handleClose={handleClose} />
          </Dialog>
        </ButtonWrapper>
      </RewardShortDetails>
      <RewardDescription>
        <TextDes>
          {" "}
          <div>{selectedReward?.rewardDescription}</div>
        </TextDes>
        <VisitLink to="">
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
