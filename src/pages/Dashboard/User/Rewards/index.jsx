import { RewardSummaryCard } from "components/cards";
import ActiveNav from "components/navbar/ActiveNav";
import Search from "components/navbar/Search";
import React, { useEffect, useRef, useState } from "react";
import { Container, Header, MainHeader, SubHeader } from "./styled";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetAllRewardsQuery,
  useGetUserRewardQuery,
} from "services/RewardService";
import AppFeedback from "components/AppFeedback";

const searchStyle = {
  borderRadius: "12px",
  backgroundColor: "white",
  maxWidth: "384px",
};

const Rewards = () => {
  const [boxshadow, setBoxShadow] = useState("false");
  const [rewardsShown, setRewardsShown] = useState({ total: 0, shown: 0 });

  const allRewardsResponse = useGetAllRewardsQuery();
  const myRewardsResponse = useGetUserRewardQuery();

  let allRewardsTotal = allRewardsResponse.data?.length;
  let myRewardsTotal = myRewardsResponse.data?.length;

  const location = useLocation();

  const mainHeaderRef = useRef();

  // rewardsPageHeader controls whether or not to display the header
  const rewardsPageHeader = useSelector(
    (store) => store.LayoutInfo.rewardsPageHeader
  );

  useEffect(() => {
    rewardsPageHeader &&
      window.addEventListener("scroll", () => {
        setBoxShadow(window.pageYOffset > 0 ? "true" : "false");
      });
  }, []);

  // This reduces the header's height when scrolled
  useEffect(() => {
    if (rewardsPageHeader && boxshadow === "true") {
      mainHeaderRef.current.style.height = "80px";
    } else if (rewardsPageHeader) {
      mainHeaderRef.current.style.height = "clamp(80px,10vw,120px)";
    }
  }, [boxshadow]);

  useEffect(() => {
    if (location.pathname === "/dashboard/rewards/all-rewards")
      setRewardsShown({ total: allRewardsTotal, shown: allRewardsTotal });
    if (location.pathname === "/dashboard/rewards/my-rewards")
      setRewardsShown({ total: myRewardsTotal, shown: myRewardsTotal });
  }, [location.pathname]);

  return (
    <Container>
      {rewardsPageHeader && (
        <Header boxshadow={boxshadow}>
          <MainHeader ref={mainHeaderRef}>
            <p>Rewards</p>
            <div>
              <RewardSummaryCard
                shown={rewardsShown.shown}
                total={rewardsShown.total}
              />
              <Search style={searchStyle} />
            </div>
          </MainHeader>
          <SubHeader>
            <ActiveNav
              text="All Rewards"
              total={allRewardsTotal}
              path={"/dashboard/rewards/all-rewards"}
            />
            <ActiveNav
              text="My Rewards"
              total={myRewardsTotal}
              path="/dashboard/rewards/my-rewards"
            />
          </SubHeader>
          <AppFeedback subProject="Rewards" />
        </Header>
      )}
      <Outlet />
    </Container>
  );
};

export default Rewards;
