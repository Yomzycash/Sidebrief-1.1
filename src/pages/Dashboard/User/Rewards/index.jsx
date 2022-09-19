import { RewardSummaryCard } from "components/cards";
import ActiveNav from "components/navbar/ActiveNav";
import Search from "components/navbar/Search";
import React, { useEffect, useRef, useState } from "react";
import { Container, Header, MainHeader, SubHeader } from "./styled";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const searchStyle = {
  borderRadius: "12px",
  backgroundColor: "white",
  maxWidth: "384px",
};

const Rewards = () => {
  const [boxshadow, setBoxShadow] = useState("false");

  const mainHeaderRef = useRef();

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

  return (
    <Container>
      {rewardsPageHeader && (
        <Header boxshadow={boxshadow}>
          <MainHeader ref={mainHeaderRef}>
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
              path={"/dashboard/rewards/all-rewards"}
            />
            <ActiveNav
              text="My Rewards"
              total={8}
              path="/dashboard/rewards/my-rewards"
            />
          </SubHeader>
        </Header>
      )}
      <Outlet />
    </Container>
  );
};

export default Rewards;
