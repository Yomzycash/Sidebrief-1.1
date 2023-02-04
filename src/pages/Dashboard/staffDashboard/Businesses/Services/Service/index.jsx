import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ChatIcon } from "asset/Icons/ChatIcon.svg";
import { Puff } from "react-loading-icons";
import { ReactComponent as ArrowLeftIcon } from "asset/Icons/ArrowLeftIcon.svg";
import Search from "components/navbar/Search";

import { useGetAllServicesQuery } from "services/staffService";

import FeatureSection from "containers/Feature/FeatureSection";
import FeatureTable from "components/Tables/FeatureTable";

// import lookup from "country-code-lookup"
import PetalsCard from "components/cards/RewardCard/PetalsCard";
import { ScrollBox } from "containers";
import { useGetAllNotificationsQuery } from "services/chatService";
import {
  Container,
  Header,
  Loading,
  MainHeader,
  PageTitle,
  searchStyle,
  SearchWrapper,
  Status,
  TopContent,
} from "./styled";

// const countryCodes = {
//   KEN: "Kenya",
//   NGN: "Nigeria",
// };

// const DisplayCountry = ({ shortcode }) => {
//   return <p>{countryCodes[shortcode]} </p>;
// };
const iconStyle = { width: "17px", height: "17px" };

//

//

const ServicePage = () => {
  const { data, isLoading } = useGetAllServicesQuery();
  const notifications = useGetAllNotificationsQuery();

  const [servicesEnquiry, setServicesEnquiry] = useState([]);

  const navigate = useNavigate();

  // const itemStyles = {
  //   item1: { color: "red", backgroundColor: "yellow", category: "TAX" },
  //   item2: { color: "blue", backgroundColor: "green", category: "MANAGE" },
  // };

  // Table header information
  const header = ["Notification ID", "Status", "Date", "Time"];

  // Table body information
  const dataBody = notifications.data?.map((notification) => [
    notification?.notificationId,
    <Status $read={notification.messageIsRead}>
      {notification.messageIsRead === true ? "In Progress" : "New Request"}
    </Status>,
    <div>{notification.updatedAt.split("T")[0]}</div>,
    <div>{notification.updatedAt.split("T")[1].slice(0, 8)}</div>,
    <div
      onClick={(e) => handleChat(notification.notificationId)}
      style={{ cursor: "pointer" }}
    >
      <ChatIcon size={20} />
      <span style={{ color: "#00A2D4" }}>Resolve</span>
    </div>,
  ]);

  useEffect(() => {
    setServicesEnquiry(data);
  }, [data]);

  const handleChat = (notificationId) => {
    navigate(`/staff-dashboard/businesses/services/chats?id=${notificationId}`);
  };

  const handleViewAllServices = () => {
    navigate("/staff-dashboard/businesses/services/all");
  };

  const handleViewAllNotifications = () => {
    navigate("/staff-dashboard/businesses/services/chats");
  };

  let totalServices = servicesEnquiry?.length > 0 ? servicesEnquiry.length : 0;

  return (
    <Container>
      <Header>
        <MainHeader>
          <TopContent>
            <div>
              <PageTitle>Services</PageTitle>
            </div>
            <SearchWrapper>
              <Search
                style={searchStyle}
                iconStyle={iconStyle}
                placeholder="Search for a service"
              />
            </SearchWrapper>
          </TopContent>
        </MainHeader>
      </Header>

      <FeatureSection
        title={`Services (${totalServices}) available`}
        subText="Select all available banks to create an account with"
        btnText="View all"
        btnAction={handleViewAllServices}
        btnRightIcon={ArrowLeftIcon}
      >
        <div style={{ padding: "34px 25px 34px 24px" }}>
          {isLoading ? (
            <Loading height="300px">
              <Puff stroke="#00A2D4" fill="white" width={60} />
            </Loading>
          ) : (
            <ScrollBox>
              {servicesEnquiry &&
                servicesEnquiry.map((service, index) => (
                  <PetalsCard
                    key={index}
                    service
                    message={service?.serviceName}
                    badge={service?.serviceCategory}
                    subText={service?.serviceCountry}
                    // subText={lookup.byIso.name("NGN")}
                  />
                ))}
            </ScrollBox>
          )}
        </div>
      </FeatureSection>
      <br />
      <br />

      <FeatureSection
        title="Service Requests"
        subText="View recent registered businesses service request"
        btnText="View all"
        btnRightIcon={ArrowLeftIcon}
        btnAction={handleViewAllNotifications}
      >
        <FeatureTable header={header} body={dataBody} />
      </FeatureSection>
    </Container>
  );
};

export default ServicePage;
