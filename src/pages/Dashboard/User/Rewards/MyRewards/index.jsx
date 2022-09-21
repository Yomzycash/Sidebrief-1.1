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
import { useNavigate, useSearchParams } from "react-router-dom";
import { store } from "redux/Store";
import { setMyClaimedRewards, setRewardsPageHeader } from "redux/Slices";
import { useGetUserRewardQuery } from "services/RewardService";

const rewardsCategories = ["All", "Human Resources", "Productivity"];

const MyRewards = () => {
  const [myRewards, setMyRewards] = useState([]);
  const [filteredReward, setFilteredReward] = useState([]);

  const [category, setCategory] = useSearchParams();

  const { data, isLoading, isError, isSuccess } = useGetUserRewardQuery();

  const navigate = useNavigate();

  // This displays rewards header for this page
  useEffect(() => {
    store.dispatch(setRewardsPageHeader(true));
  }, []);

  const handleRewardClick = (rewardID) => {
    navigate(`/dashboard/rewards/${rewardID}`);
  };

  const handleCategory = (category) => {
    setCategory({ category }); // converting category to object and category is the key
  };

  useEffect(() => {
    setMyRewards(data);
    store.dispatch(setMyClaimedRewards(data));
  }, [data]);

  let selectedCategory = category.get("category");

  // handles the rewards by category
  useEffect(() => {
    if (selectedCategory === "Productivity") {
      let filtered = myRewards?.filter(
        (reward) => reward.rewardCategory === "Productivity"
      );
      setFilteredReward(filtered);
    } else if (selectedCategory === "Human Resources") {
      let filtered = myRewards?.filter(
        (reward) => reward?.rewardCategory === "Human Resources"
      );
      setFilteredReward(filtered);
    } else {
      setFilteredReward(myRewards);
    }
  }, [category, myRewards]);

  return (
    <Container>
      <Body>
        <BodyLeft>
          <h3>Categories</h3>
          <ul>
            {rewardsCategories?.map((cat, index) => (
              <li
                key={index}
                onClick={() => handleCategory(cat)}
                style={{
                  color: cat === category.get("category") ? "#00A2D4" : "",
                }}
              >
                {cat}
              </li>
            ))}
          </ul>
        </BodyLeft>
        <BodyRight>
          {filteredReward?.map((reward, index) => (
            <RewardCard
              key={index}
              title={reward?.rewardName}
              body={reward?.rewardDescription}
              image={reward?.rewardImage}
              action={() => handleRewardClick(reward.rewardID)}
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
