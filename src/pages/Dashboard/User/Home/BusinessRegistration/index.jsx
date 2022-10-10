import React from "react";
import { Container, Body, Main, Recently } from "./styled";
import TabNavBar from "components/TabNavBar/TabNavBar";
import {
  BusinessesChartCard,
  LongCard,
  RewardCard,
  StatusCard,
} from "components/cards";
import DashboardSection from "layout/DashboardSection";
import { IoArrowForward } from "react-icons/io5";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { ScrollBox } from "containers";
import { useSelector } from "react-redux";
import { useGetAllRewardsQuery } from "services/RewardService";
import { store } from "redux/Store";
import { setGeneratedLaunchCode } from "redux/Slices";

const BusinessRegistration = (props) => {
  // Get user data information
  const userInfo = useSelector((store) => store.UserDataReducer.userInfo);
  let firstName_raw = userInfo?.first_name;
  let firstName =
    firstName_raw?.charAt(0)?.toUpperCase() + firstName_raw?.slice(1);
  let newUser = userInfo?.newUser;

  const allRewardsResponse = useGetAllRewardsQuery();

  const handleRewardClick = (rewardID) => {
    navigate(`/dashboard/rewards/${rewardID}`);
  };

  const analytics = {
    label: "Registrations",
    status1: {
      text: "Completed",
      total: 5,
      color: "#00A2D4",
    },
    status2: {
      text: "Pending",
      total: 1,
      color: " #55D7FF",
    },
    status3: {
      text: "Approval",
      total: 1,
      color: " #CCF3FF",
    },
  };

  const navigate = useNavigate();

  const handleLaunch = () => {
    store.dispatch(setGeneratedLaunchCode(""));
    navigate("/launch");
  };

  return (
    <Container>
      <TabNavBar />
      <Body>
        <Main>
          <DashboardSection
            title={
              newUser
                ? `Welcome to Sidebrief${firstName ? ", " + firstName : ""}`
                : `Welcome back${firstName ? ", " + firstName : ""}`
            }
            BigTitle="true"
            nowrap
          >
            <LongCard
              title="Launch"
              body="Start your business registration process with no paperwork"
              action={handleLaunch}
            />
            <LongCard
              title="Shelf"
              body="Get pre-registered company in local markets"
              notready="true"
            />
          </DashboardSection>
          <DashboardSection
            title="Businesses"
            body="Manage all your business registration in one place"
            link={{
              text: "View all",
              to: "/dashboard",
              icon: <IoArrowForward />,
            }}
          >
            <BusinessesChartCard analytics={analytics} user />
            <Recently>
              <StatusCard
                name="Ayomide Construction and Husband's - LLC"
                status="completed"
                ShortDescription="Start your business registration process with no paperwork. Start your business registration process with no paperwork"
              />
              <StatusCard
                name="Ayomide Construction and Husband's - LLC"
                status="awaiting"
                ShortDescription="Start your business registration process with no paperwork. Start your business registration process with no paperwork"
              />
              <StatusCard
                name="Ayomide Construction and Husband's - LLC"
                status="progress"
                ShortDescription="Start your business registration process with no paperwork. Start your business registration process with no paperwork"
              />
            </Recently>
          </DashboardSection>
          <DashboardSection
            title="Rewards"
            body="Accept offers and rewards when you register your business with Sidebrief"
            carousel
            link={{
              text: "View all",
              to: "/rewards",
              icon: <IoArrowForward />,
            }}
          >
            <ScrollBox>
              {allRewardsResponse.data?.slice(0, 8).map((reward, index) => (
                <RewardCard
                  key={index}
                  title={reward?.rewardPartner}
                  body={reward?.rewardName}
                  image={reward?.rewardImage}
                  action={() => handleRewardClick(reward.rewardID)}
                />
              ))}
            </ScrollBox>
          </DashboardSection>
        </Main>
      </Body>
    </Container>
  );
};

export default BusinessRegistration;
