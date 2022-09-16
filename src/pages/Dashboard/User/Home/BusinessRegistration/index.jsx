import React from "react";
import { Registration, Body, Main, Recently } from "./styled";
import TabNavBar from "components/TabNavBar/TabNavBar";
import {
  BusinessesChartCard,
  LongCard,
  RewardCard,
  StatusCard,
} from "components/cards";
import DashboardSection from "layout/DashboardSection";
import { IoArrowForward } from "react-icons/io5";
import { GladeLogo, lendhaLogo, OkraLogo, SterlingLogo } from "asset/images";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { ScrollBox } from "containers";

const BusinessRegistration = (props) => {
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
    navigate("/launch");
  };

  return (
    <Registration>
      <TabNavBar />
      <Body>
        <Main>
          <DashboardSection
            title="Welcome back, Ayomide"
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
              to: "/dashboard",
              icon: <IoArrowForward />,
            }}
          >
            <ScrollBox>
              <RewardCard
                image={lendhaLogo}
                title="Lendha Africa"
                body="Get credit to register your business & pay later."
              />
              <RewardCard
                image={SterlingLogo}
                title="Sterling Bank PLC"
                body="Get credit to register your business & pay later."
              />
              <RewardCard
                image={GladeLogo}
                title="Glade"
                body="Get credit to register your business & pay later."
              />
              <RewardCard
                image={OkraLogo}
                title="Okra"
                body="Get credit to register your business & pay later."
              />
              <RewardCard
                image={SterlingLogo}
                title="Sterling Bank PLC"
                body="Get credit to register your business & pay later."
              />
              <RewardCard
                image={GladeLogo}
                title="Glade"
                body="Get credit to register your business & pay later."
              />
              <RewardCard
                image={OkraLogo}
                title="Okra"
                body="Get credit to register your business & pay later."
              />
            </ScrollBox>
          </DashboardSection>
        </Main>
      </Body>
    </Registration>
  );
};

export default BusinessRegistration;
