import { RewardCard, RewardSummaryCard } from "components/cards";
import ActiveNav from "components/navbar/ActiveNav";
import Search from "components/navbar/Search";
import React, { useEffect, useState } from "react";
import { lendhaLogo } from "asset/images";
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

const searchStyle = {
  borderRadius: "12px",
  backgroundColor: "white",
  maxWidth: "384px",
};

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

const allRewards = [
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
  {
    title: "Lendha Africa",
    body: "Get 25% off you first year of using Landha Africa",
    alt: "Lendha",
    image: lendhaLogo,
  },
];

const AllRewards = () => {
  const [boxshadow, setBoxShadow] = useState("false");

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setBoxShadow(window.pageYOffset > 0 ? "true" : "false");
    });
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/rewards/all-rewards");
  }, []);

  return (
    <Container>
      <Header boxshadow={boxshadow}>
        <MainHeader>
          <p>Rewards</p>
          <div>
            <RewardSummaryCard shown={9} total={323} />
            <Search style={searchStyle} />
          </div>
        </MainHeader>
        <SubHeader>
          <ActiveNav
            text="All Rewards"
            total={64}
            path={"/rewards/all-rewards"}
          />
          <ActiveNav text="My Rewards" total={8} path="/rewards/my-rewards" />
        </SubHeader>
      </Header>
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
            />
          ))}
        </BodyRight>
      </Body>
      <Footer></Footer>
    </Container>
  );
};

export default AllRewards;
