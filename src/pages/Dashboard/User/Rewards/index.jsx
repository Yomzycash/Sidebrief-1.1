import { SummaryCard } from "components/cards";
import ActiveNav from "components/navbar/ActiveNav";
import Search from "components/navbar/Search";
import React, { useEffect, useRef, useState } from "react";
import { Container, Drop, Header, MainHeader, MobileHeader, SubHeader } from "./styled";
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAllRewardsQuery, useGetUserRewardQuery } from "services/RewardService";
import { setRewardsShown } from "redux/Slices";
import { store } from "redux/Store";
import { useMediaQuery } from "@mui/material";
import HeaderSearch from "components/HeaderSearch";
import MobileBusiness from "layout/MobileBusiness";

const searchStyle = {
  borderRadius: "12px",
  backgroundColor: "white",
  maxWidth: "384px",
};

const Rewards = () => {
  const rewardsShown = useSelector((store) => store.RewardReducer.rewardsShown);
  const [rewardsCategories, setRewardscategories] = useState(["All"]);
  const [category, setCategory] = useSearchParams();
  const { data } = useGetAllRewardsQuery();
  const userReward = useGetUserRewardQuery();

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
  const rewardsPageHeader = useSelector((store) => store.LayoutInfo.rewardsPageHeader);

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
  const selectedRewards =
    location.pathname === "/dashboard/rewards/my-rewards " ? userReward?.data : data;

  // This sets the shown of all rewards
  useEffect(() => {
    if (location.pathname === "/dashboard/rewards/all-rewards")
      store.dispatch(setRewardsShown({ total: allRewardsTotal, shown: allRewardsTotal }));
    if (location.pathname === "/dashboard/rewards/my-rewards")
      store.dispatch(setRewardsShown({ total: myRewardsTotal, shown: myRewardsTotal }));
  }, [location.pathname]);

  useEffect(() => {
    allRewardsResponse.refetch();
    myRewardsResponse.refetch();

    setRewardscategories((prev) => {
      const categories = selectedRewards
        ? selectedRewards.map((element) => element.rewardCategory)
        : [];

      return [...new Set([...prev, ...categories])];
    });
  }, [location.pathname, data, userReward, selectedRewards]);

  const matches = useMediaQuery("(max-width:700px)");

  const newOptions = rewardsCategories;

  const navigate = useNavigate();
  let pathNavigation = {
    "All Rewards": "all-rewards",
    "My rewards": "my-rewards",
  };
  const selectedValue = (option) => {
    console.log(option);
    navigate(`/dashboard/rewards/${pathNavigation[option?.title]}`);
    //console.log(pathNavigation[option]);
  };
  let options = [
    {
      title: "All Rewards",
      totalLength: allRewardsTotal,
    },
    {
      title: "My rewards",
      totalLength: myRewardsTotal,
    },
  ];
  const handleCategory = (category) => {
    setCategory({ category }); // Set category as an object to the searchParams
  };
  const details = location.pathname.includes("details");
  console.log(rewardsCategories);
  return (
    <Container>
      {rewardsPageHeader && !matches && (
        <Header>
          <MainHeader ref={mainHeaderRef}>
            <p>Rewards</p>
            <div>
              <SummaryCard shown={rewardsShown.shown} total={rewardsShown.total} />
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
      {matches && !details && (
        <MobileBusiness
          realSelectedValue={selectedValue}
          options={newOptions}
          mobile
          initialTitle={"All Reward"}
          initialLength={allRewardsTotal}
          newSelectedValue={handleCategory}
          originalOptions={options}
          reward
          title={"Rewards "}
        />
      )}
      <Outlet />
    </Container>
  );
};

export default Rewards;
