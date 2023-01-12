import StaffRewardHeader from "components/Header/StaffRewardHeader";
import Navbar from "components/navbar";
import StaffSidebar from "components/sidebar/StaffSidebar";
import React, { useState, useEffect } from "react";
import {
  Body,
  BodyLeft,
  BodyRight,
  Container,
  ListItem,
  ListItems,
  ListItemsContainer,
  RewardContainer,
  Loading,
} from "./style";
import { useSelector } from "react-redux";
import { RewardCard } from "components/cards";
import { myRewards } from "utils/config";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetAllRewardsQuery } from "services/RewardService";
import { Puff } from "react-loading-icons";
import StaffRewardModal from "components/modal/StaffRewardModal";

const StaffAllRewards = () => {
  const layoutInfo = useSelector((store) => store.LayoutInfo);
  const { sidebarWidth } = layoutInfo;
  const navigate = useNavigate();
  const [allRewards, setAllRewards] = useState([]);
  const [rewardsCategories, setRewardscategories] = useState(["All"]);
  const [filteredReward, setFilteredReward] = useState([]);
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError, isSuccess } = useGetAllRewardsQuery();
  const [category, setCategory] = useSearchParams();

  useEffect(() => {
    setAllRewards(data);
    setRewardscategories((prev) => {
      const categories = data
        ? data.map((element) => element.rewardCategory)
        : [];

      return [...new Set([...prev, ...categories])];
    });
    const total = data?.length;
    localStorage.setItem("totalStaffRewards", JSON.stringify(total));
  }, [data]);

  useEffect(() => {
    let selectedCategory = category.get("category");
    switch (selectedCategory) {
      case null:
      case "All":
        setFilteredReward(allRewards);
        break;
      default:
        let filtered = allRewards?.filter(
          (reward) => reward?.rewardCategory === selectedCategory
        );
        setFilteredReward(filtered);
        break;
    }
  }, [category, allRewards]);

  const handleRewardClick = (rewardID) => {
    navigate("/staff-dashboard/all-rewards/reward/details");
    localStorage.setItem("rewardId", JSON.stringify(rewardID));
  };

  const handleCategory = (category) => {
    setCategory({ category });
  };

  return (
    <BodyRight SidebarWidth={sidebarWidth}>
      <StaffRewardHeader setOpen={setOpen} />
      <ListItemsContainer>
        <ListItems>
          <h3>Categories</h3>
          {rewardsCategories?.map((cat, index) => (
            <ListItem
              key={index}
              onClick={() => handleCategory(cat)}
              style={{
                color: cat === category.get("category") ? "#00A2D4" : "",
              }}
            >
              {cat}
            </ListItem>
          ))}
        </ListItems>
      </ListItemsContainer>

      {isLoading ? (
        <Loading height="300px">
          <Puff stroke="#00A2D4" fill="white" width={60} />
        </Loading>
      ) : (
        <RewardContainer>
          {filteredReward &&
            filteredReward?.map((reward, index) => (
              <RewardCard
                key={index}
                title={reward?.rewardPartner}
                body={reward?.rewardName}
                rewardspage
                action={() => handleRewardClick(reward.rewardID)}
                image={reward?.rewardImage}
              />
            ))}
        </RewardContainer>
      )}
      <StaffRewardModal setOpen={setOpen} open={open} />
    </BodyRight>
  );
};

export default StaffAllRewards;
