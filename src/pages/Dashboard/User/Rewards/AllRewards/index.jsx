import { RewardCard } from "components/cards";
import React, { useEffect, useRef, useState } from "react";
import { GladeLogo, lendhaLogo, OkraLogo, SterlingLogo } from "asset/images";
import { Body, BodyLeft, BodyRight, Container, Footer } from "./styled";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { store } from "redux/Store";
import { setRewardsPageHeader } from "redux/Slices";
import { allRewards } from "utils/config";

const rewardsCategories = [
  "Insurance",
  "Legal Services",
  "Employee Management",
  "Expense Management",
  "Bookkeeping & Accounting",
  "Data Analysis",
  "Channel Support",
  "Ad Management",
  "KYC Verification",
];

// Temporary rewards - to be used pending the time we'll start pulling the actual ones from the backend

const AllRewards = () => {
  // const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleRewardClick = (title) => {
    // const params = { reward };
    // setSearchParams(params);
    // console.log(searchParams);
    navigate(`/dashboard/rewards/${title}`);
  };

  // This displays rewards header for this page
  useEffect(() => {
    store.dispatch(setRewardsPageHeader(true));
  }, []);

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
          {allRewards.map((reward, index) => (
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
      <Outlet />
    </Container>
  );
};

export default AllRewards;
