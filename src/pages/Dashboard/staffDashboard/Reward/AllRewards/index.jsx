import StaffRewardHeader from "components/Header/StaffRewardHeader";
import Navbar from "components/navbar";
import StaffSidebar from "components/sidebar/StaffSidebar";
import React from "react";
import {
  Body,
  BodyLeft,
  BodyRight,
  Container,
  ListItem,
  ListItems,
  ListItemsContainer,
  RewardContainer,
} from "./style";
import { useSelector } from "react-redux";
import { RewardCard } from "components/cards";
import { myRewards } from "utils/config";
import { useNavigate } from "react-router-dom";

const StaffAllRewards = () => {
  const layoutInfo = useSelector((store) => store.LayoutInfo);
  const { sidebarWidth } = layoutInfo;
  const navigate = useNavigate();

  const rewardsCategories = [
    {
      id: 1,
      category: "All",
    },
    {
      id: 2,
      category: "Insurance",
    },
    {
      id: 3,
      category: "Legal Services",
    },
    {
      id: 4,
      category: "Employement management",
    },
    {
      id: 5,
      category: "Expense management",
    },
    {
      id: 6,
      category: "Bookkeeping & Accounting",
    },
    {
      id: 7,
      category: "Channel Support",
    },
    {
      id: 8,
      category: "Data Analysis",
    },
    {
      id: 9,
      category: "Ad Management",
    },
    {
      id: 10,
      category: "KYC Verification",
    },
  ];

  const handleRewardClick = () => {
    navigate("/staff-dashboard/all-rewards/reward/details");
  };
  return (
    <Container>
      <Navbar
        dashboard
        imgStyles={{ maxWidth: "100px" }}
        style={{ padding: "12px 24px" }}
      />
      <Body>
        <BodyLeft>
          <StaffSidebar />
        </BodyLeft>
        <BodyRight SidebarWidth={sidebarWidth}>
          <StaffRewardHeader />
          <ListItemsContainer>
            <ListItems>
              <h3>Categories</h3>
              {rewardsCategories.map((cat, index) => (
                <ListItem
                  key={index}
                  // onClick={() => handleCategory(cat)}
                  style={{
                    color: cat.category === "All" ? "#00A2D4" : "",
                  }}
                >
                  {cat.category}
                </ListItem>
              ))}
            </ListItems>
          </ListItemsContainer>

          <RewardContainer>
            {myRewards.map((reward, index) => (
              <RewardCard
                key={index}
                title={reward.title}
                body={reward.body}
                rewardspage
                action={() => handleRewardClick()}
                image={reward?.image}
              />
            ))}
          </RewardContainer>
        </BodyRight>
      </Body>
    </Container>
  );
};

export default StaffAllRewards;
