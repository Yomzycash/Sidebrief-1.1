import { RewardCard, RewardSummaryCard } from "components/cards";
import ActiveNav from "components/navbar/ActiveNav";
import Search from "components/navbar/Search";
import React, { useEffect, useRef, useState } from "react";
import { GladeLogo, lendhaLogo, OkraLogo, SterlingLogo } from "asset/images";
import {
  Body,
  BodyLeft,
  BodyRight,
  Container,
  Footer,
  Header,
  MainHeader,
  SubHeader,
} from "./styled";
import { useNavigate } from "react-router-dom";
import { store } from "redux/Store";
import { setRewardsPageHeader } from "redux/Slices";
import { myRewards } from "utils/config";

const rewardsCategories = [
  "Insurance",
  "Legal Services",
  "Employee Management",
];

const MyRewards = () => {
  const navigate = useNavigate();

  // This displays rewards header for this page
  useEffect(() => {
    store.dispatch(setRewardsPageHeader(true));
  }, []);

  const handleRewardClick = (title) => {
    navigate(`/dashboard/rewards/${title}`);
  };

  return (
    <Container>
      <Body>
        <BodyLeft>
          <h3>Categories</h3>
          <h4>All</h4>
          <ul>
            {rewardsCategories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </BodyLeft>
        <BodyRight>
          {myRewards.map((reward, index) => (
            <RewardCard
              key={index}
              title={reward.title}
              body={reward.body}
              image={reward.image}
              imageAlt={reward.alt}
              action={() => handleRewardClick(reward.title)}
              rewardspage
            />
          ))}
        </BodyRight>
      </Body>
      <Footer></Footer>
    </Container>
  );
};

export default MyRewards;
