import { SummaryCard } from "components/cards";
import ActiveNav from "components/navbar/ActiveNav";
import Search from "components/navbar/Search";
import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Drop,
  Header,
  MainHeader,
  MobileHeader,
  SubHeader,
} from "./styled";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetAllRewardsQuery,
  useGetUserRewardQuery,
} from "services/RewardService";
import AppFeedback from "components/AppFeedback";
import { setRefreshApp, setRewardsShown } from "redux/Slices";
import { store } from "redux/Store";

const searchStyle = {
  borderRadius: "12px",
  backgroundColor: "white",
  maxWidth: "384px",
};

const Rewards = () => {
  const { refreshApp } = useSelector((store) => store.UserDataReducer);

  const rewardsShown = useSelector((store) => store.RewardReducer.rewardsShown);

  const location = useLocation();

  const allRewardsResponse = useGetAllRewardsQuery({
    refetchOnMountOrArgChange: true,
  });
  const myRewardsResponse = useGetUserRewardQuery({
    refetchOnMountOrArgChange: true,
  });

  let allRewardsTotal = allRewardsResponse.data?.length;
  let myRewardsTotal = myRewardsResponse.data?.length;

  const mainHeaderRef = useRef();

  // rewardsPageHeader controls whether or not to display the header
  const rewardsPageHeader = useSelector(
    (store) => store.LayoutInfo.rewardsPageHeader
  );

  // useEffect(() => {
  //   rewardsPageHeader &&
  //     window.addEventListener("scroll", () => {
  //       setBoxShadow(window.pageYOffset > 0 ? "true" : "false");
  //     });
  // }, []);

  // This reduces the header's height when scrolled
  // useEffect(() => {
  //   if (rewardsPageHeader && boxshadow === "true") {
  //     mainHeaderRef.current.style.height = "80px";
  //   } else if (rewardsPageHeader) {
  //     mainHeaderRef.current.style.height = "clamp(80px,10vw,120px)";
  //   }
  // }, [boxshadow]);

  // This sets the shown of all rewards
  useEffect(() => {
    if (location.pathname === "/dashboard/rewards/all-rewards")
      store.dispatch(
        setRewardsShown({ total: allRewardsTotal, shown: allRewardsTotal })
      );
    if (location.pathname === "/dashboard/rewards/my-rewards")
      store.dispatch(
        setRewardsShown({ total: myRewardsTotal, shown: myRewardsTotal })
      );
    store.dispatch(setRefreshApp(!refreshApp));
  }, [location.pathname]);

  useEffect(() => {
    allRewardsResponse.refetch();
    myRewardsResponse.refetch();
  }, [location.pathname]);

  return (
    <Container>
      {rewardsPageHeader && (
        <Header>
          <MainHeader ref={mainHeaderRef}>
            <p>Rewards</p>
            <div>
              <SummaryCard
                shown={rewardsShown.shown}
                total={rewardsShown.total}
              />
              <Search style={searchStyle} placeholder={"Search for a reward"} />
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
          <MobileHeader>
            <Search
              style={{
                ...searchStyle,
                maxWidth: "100%",
                minWidth: "140px",
                padding: "10px",
              }}
            />
            <Drop>
              <select>
                <option value="Sort">Sort</option>
                <option value="All">All</option>
              </select>
            </Drop>
          </MobileHeader>
          {/* <AppFeedback subProject="Rewards" /> */}
        </Header>
      )}
      <Outlet />
    </Container>
  );
};

export default Rewards;
