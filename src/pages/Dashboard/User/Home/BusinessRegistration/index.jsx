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
import { useLocation, useNavigate } from "react-router-dom";
import { ScrollBox } from "containers";
import { useSelector } from "react-redux";
import { useGetAllRewardsQuery } from "services/RewardService";
import {
  useGetUserDraftQuery,
  useGetUserSubmittedQuery,
} from "services/launchService";
import { store } from "redux/Store";
import {
  setGeneratedLaunchCode,
  setLaunchResponse,
  setRefreshApp,
} from "redux/Slices";
import { compareDesc } from "date-fns";
// import AppFeedback from "components/AppFeedback";
import { LaunchRocket, ManageSpanner } from "asset/svg";
import { useEffect } from "react";
import { useState } from "react";

const BusinessRegistration = (props) => {
  const [allLaunchContainer, setAllLaunchContainer] = useState([]);
  // Get user data information
  const { userInfo, refreshApp } = useSelector(
    (store) => store.UserDataReducer
  );

  useEffect(() => {
    store.dispatch(setRefreshApp(!refreshApp));
  }, []);

  let firstName_raw = userInfo?.first_name;
  let firstName =
    firstName_raw?.charAt(0)?.toUpperCase() + firstName_raw?.slice(1);
  const { state } = useLocation();
  let alreadyUser = state;

  const allRewardsResponse = useGetAllRewardsQuery();
  const drafts = useGetUserDraftQuery();
  const submitted = useGetUserSubmittedQuery();

  const handleRewardClick = (rewardID) => {
    navigate(`/dashboard/rewards/${rewardID}`);
  };

  useEffect(() => {
    let allLaunch = [];

    if (drafts.isSuccess && submitted.isSuccess) {
      allLaunch = [...drafts?.currentData, ...submitted?.currentData];
      allLaunch.sort((launch1, launch2) =>
        compareDesc(new Date(launch1.updatedAt), new Date(launch2.updatedAt))
      );
      // console.log(allLaunch);
    }
    setAllLaunchContainer(allLaunch);
  }, [drafts, submitted]);

  useEffect(() => {
    drafts.refetch();
    submitted.refetch();
  }, []);

  const analytics = {
    label: "Registrations",
    status1: {
      text: "Completed",
      total: 0,
      color: "#00A2D4",
    },
    status2: {
      text: "Pending",
      total: submitted.isSuccess ? submitted?.currentData.length : 0,
      color: " #55D7FF",
    },
    status3: {
      text: "In Draft",
      total: drafts.isSuccess ? drafts?.currentData.length : 0,
      color: " #CCF3FF",
    },
  };

  const getStatus = (regStatus) => {
    switch (regStatus) {
      case "pending":
        return {
          text: "draft",
          color: "#00A2D4",
        };
      case "submitted":
        return {
          text: "pending",
          color: "#D400CC",
        };
      default:
        return {
          text: "unknown",
          color: "black",
        };
    }
  };

  const navigate = useNavigate();

  const handleLaunch = () => {
    store.dispatch(setGeneratedLaunchCode(""));
    store.dispatch(setLaunchResponse({}));
    localStorage.removeItem("launchInfo");
    localStorage.removeItem("countryISO");
    localStorage.removeItem("paymentDetails");
    // window.open("/launch", "_blank");
    navigate("/launch");
  };

  const handleManage = () => {
    navigate("/manage");
  };

  return (
    <Container>
      <TabNavBar />
      <Body>
        <Main>
          <DashboardSection
            title={
              alreadyUser
                ? `Welcome back${firstName ? ", " + firstName : ""}`
                : `Welcome to Sidebrief${firstName ? ", " + firstName : ""}`
            }
            nowrap
          >
            <LongCard
              Icon={LaunchRocket}
              title="Launch"
              body="Start your business registration process with no paperwork"
              action={handleLaunch}
            />
            <LongCard
              Icon={ManageSpanner}
              title="Manage"
              body="Make changes to already registered companies"
              // notready="false"
              buttonText="Manage Business"
              action={handleManage}
            />
          </DashboardSection>
          {allLaunchContainer.length > 0 ? (
            <DashboardSection
              title="Businesses"
              body="Manage all your business registration in one place"
              link={{
                text: "View all",
                to: "/dashboard/businesses",
                icon: <IoArrowForward />,
              }}
            >
              <BusinessesChartCard
                analytics={analytics}
                user
                loading={submitted.isLoading || drafts.isLoading}
              />
              <Recently>
                {allLaunchContainer.slice(0, 3).map((el) => {
                  return (
                    <StatusCard
                      key={el.launchCode}
                      name={`${
                        el.businessNames?.businessName1
                          ? el.businessNames.businessName1
                          : "No name"
                      }`}
                      type={el?.registrationType}
                      code={el?.launchCode}
                      countryISO={el?.registrationCountry}
                      status={getStatus(el.registrationStatus)}
                      ShortDescription={`${el.launchCode}`}
                      launchInfo={{
                        launchCode: el.launchCode,
                        registrationCountry: el.registrationCountry,
                        registrationType: el.registrationType,
                      }}
                    />
                  );
                })}
              </Recently>
            </DashboardSection>
          ) : null}
          <DashboardSection
            title="Rewards"
            body="Accept offers and rewards when you register your business with Sidebrief"
            carousel
            link={{
              text: "View all",
              to: "/dashboard/rewards/all-rewards",
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
          {/* <AppFeedback subProject="Dashboard" /> */}
        </Main>
      </Body>
    </Container>
  );
};

export default BusinessRegistration;
