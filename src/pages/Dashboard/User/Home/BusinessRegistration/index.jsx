import React from "react";
import { Registration, Top, Body, Main, Recently } from "./styled";
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
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";

const BusinessRegistration = (props) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1400 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1400, min: 900 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 900, min: 400 },
      items: 2,
    },
    mbile: {
      breakpoint: { max: 400, min: 0 },
      items: 1,
    },
  };

  const navigate = useNavigate();

  const handleLaunch = () => {
    navigate("/checkout");
  };

  return (
    <Registration>
      <TabNavBar />
      <Body>
        <Main>
          <DashboardSection
            title="Welcome To SideBrief, Ayomide"
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
            <BusinessesChartCard completed={5} pending={3} awaiting={1} />
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
            <Carousel
              responsive={responsive}
              swipeable={true}
              draggable={true}
              keyBoardControl={true}
            >
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
            </Carousel>
          </DashboardSection>
        </Main>
      </Body>
    </Registration>
  );
};

export default BusinessRegistration;

// swipeable={true}
// draggable={true}
// showDots={true}
// responsive={responsive}
// ssr={true} // means to render carousel on server-side.
// infinite={true}
// autoPlay={true}
// autoPlaySpeed={1000}
// keyBoardControl={true}
// customTransition="all .5"
// transitionDuration={500}
// containerClass="carousel-container"
// removeArrowOnDeviceType={["tablet", "mobile"]}
// deviceType={props.deviceType}
// dotListClass="custom-dot-list-style"
// itemClass="carousel-item-padding-40-px"
// maxWidth="200px"
// style={{ maxWidth: "300px" }}
// {...sliderParams}
