import { RewardCard, SummaryCard } from "components/cards";
import React, { useEffect, useRef, useState } from "react";
import {
  Body,
  BodyLeft,
  BodyCenter,
  BodyRight,
  Container,
  Footer,
  Loading,
} from "./styled";
import { useNavigate, useSearchParams } from "react-router-dom";
import { store } from "redux/Store";
import { setMyClaimedRewards, setRewardsPageHeader } from "redux/Slices";
import { useGetUserRewardQuery } from "services/RewardService";
import { Puff } from "react-loading-icons";

// const rewardsCategories = ["All", "Human Resources", "Productivity"];

const MyRewards = () => {
  const [myRewards, setMyRewards] = useState([]);
  const [filteredReward, setFilteredReward] = useState([]);
  const [rewardsCategories, setRewardscategories] = useState(["All"]);

  const [category, setCategory] = useSearchParams();

  const { data, isLoading, isError, isSuccess } = useGetUserRewardQuery({
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  const navigate = useNavigate();

  // This displays rewards header for this page
  useEffect(() => {
    store.dispatch(setRewardsPageHeader(true));
  }, []);

  const handleRewardClick = (rewardID) => {
    navigate(`/dashboard/rewards/details/${rewardID}`);
  };

  const handleCategory = (category) => {
    setCategory({ category }); // converting category to object and category is the key
  };

  useEffect(() => {
    setMyRewards(data);
    setRewardscategories((prev) => {
      const categories = data ? data.map((element) => element.rewardCategory) : [];

      return [...new Set([...prev, ...categories])];
    });
    store.dispatch(setMyClaimedRewards(data));
  }, [data]);

  // handles the rewards by category
  useEffect(() => {
    let selectedCategory = category.get("category");

    switch (selectedCategory) {
      case null:
      case "All":
        setFilteredReward(myRewards);
        break;
      default:
        let filtered = myRewards?.filter((reward) => reward?.rewardCategory === selectedCategory);
        setFilteredReward(filtered);
        break;
    }
  }, [category, myRewards]);

  return (
    <Container>
      <Body>
        {isLoading ? (
          <Loading height="300px">
            <Puff stroke="#00A2D4" fill="white" width={60} />
          </Loading>
        ) : (
          filteredReward?.length > 0 ? (
            <>
              <BodyLeft>
                {/* <h3>Categories</h3> */}
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
                    title={reward?.rewardPartner}
                    body={reward?.rewardName}
                    image={reward?.rewardImage}
                    action={() => handleRewardClick(reward.rewardID)}
                    rewardspage
                  />
                ))}
              </BodyRight>
            </>
          ) : (
            <BodyCenter>No rewards added yet!</BodyCenter>
          )
        )}
      </Body>
      {/* <AppFeedback subProject="My rewards" /> */}
      <Footer></Footer>
    </Container>
  );
};

export default MyRewards;
