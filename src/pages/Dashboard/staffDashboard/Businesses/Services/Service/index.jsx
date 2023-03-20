import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ChatIcon } from "asset/Icons/ChatIcon.svg";
import { Puff } from "react-loading-icons";
import { ReactComponent as ArrowLeftIcon } from "asset/Icons/ArrowLeftIcon.svg";
import { ReactComponent as AddIcon } from "asset/Icons/AddIcon.svg";
import Search from "components/navbar/Search";

import {
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetAllServicesQuery,
} from "services/staffService";

import FeatureSection from "containers/Feature/FeatureSection";
import FeatureTable from "components/Tables/FeatureTable";
import { toast } from "react-hot-toast";
// import lookup from "country-code-lookup"
import PetalsCard from "components/cards/ServiceCard/PetalsCard";
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
// import ServicesModal from "components/modal/ServicesModal";
import ServicesModal from "components/modal/StaffServiceModal";
import { getUsersMessages } from "containers/ServiceChat/Chats/actions";
import { handleError } from "utils/globalFunctions";

const iconStyle = { width: "17px", height: "17px" };

const ServicePage = () => {
  const [open, setOpen] = useState(false);
  const [cardAction, setCardAction] = useState("");
  const [clickedService, setClickedService] = useState({});
  const { data, isLoading, refetch } = useGetAllServicesQuery();
  const notifications = useGetAllNotificationsQuery();
  const [addService, addState] = useAddServiceMutation();
  const [updateService, updateState] = useUpdateServiceMutation();
  const [deleteService, deleteState] = useDeleteServiceMutation();
  const [servicesEnquiry, setServicesEnquiry] = useState([]);

  const navigate = useNavigate();

  // Add Service
  const handleAddButton = () => {
    setCardAction("add");
    setOpen(true);
  };

  const servicesNotifications = data?.filter((service) => {
    let serviceNots = notifications.data?.filter((not) => not?.serviceId === service?.serviceId);
    return serviceNots?.length > 0;
  });

  // All users messages
  const usersMessages = getUsersMessages(notifications.data);

  let lastNotification = servicesNotifications?.map((nots) => nots[nots?.length - 1]);

  // Table header information
  const header = ["Sender Id", "Notification ID", "Status", "Date", "Time"];

  // Table body information
  const dataBody = usersMessages?.map((notifications) => [
    notifications?.senderId,
    notifications?.servicesMessages[0]?.serviceNotifications[0]?.notificationId,
    <Status $read={notifications?.servicesMessages[0]?.serviceNotifications[0]?.messageIsRead}>
      {notifications?.servicesMessages[0]?.serviceNotifications[0]?.messageIsRead === true
        ? "Read"
        : "New"}
    </Status>,
    <div>
      {notifications?.servicesMessages[0]?.serviceNotifications[0]?.updatedAt?.split("T")[0]}
    </div>,
    <div>
      {notifications?.servicesMessages[0]?.serviceNotifications[0]?.updatedAt
        ?.split("T")[1]
        ?.slice(0, 8)}
    </div>,
    <div
      onClick={(e) =>
        handleChat(notifications?.servicesMessages[0]?.serviceNotifications[0]?.serviceId)
      }
      style={{ cursor: "pointer" }}
    >
      <ChatIcon size={20} />
      <span style={{ color: "#00A2D4" }}>Resolve</span>
    </div>,
  ]);

  // // Table body information
  // const dataBody = notifications.data?.map((notification) => [
  //   notification?.notificationId,
  //   <Status $read={notification?.messageIsRead}>
  //     {notification?.messageIsRead === true ? "In Progress" : "New Request"}
  //   </Status>,
  //   <div>{notification?.updatedAt?.split("T")[0]}</div>,
  //   <div>{notification?.updatedAt?.split("T")[1]?.slice(0, 8)}</div>,
  //   <div
  //     onClick={(e) => handleChat(notification?.serviceId)}
  //     style={{ cursor: "pointer" }}
  //   >
  //     <ChatIcon size={20} />
  //     <span style={{ color: "#00A2D4" }}>Resolve</span>
  //   </div>,
  // ]);

  useEffect(() => {
    setServicesEnquiry(data);
  }, [data]);

  const handleChat = (serviceId) => {
    console.log(serviceId);
    navigate(`/staff-dashboard/businesses/services/chats?serviceId=${serviceId}`);
  };

  const handleViewAllServices = () => {
    navigate("/staff-dashboard/businesses/services/all");
  };

  const handleViewAllNotifications = () => {
    navigate("/staff-dashboard/businesses/services/chats");
  };

  let totalServices = servicesEnquiry?.length > 0 ? servicesEnquiry.length : 0;

  const getRequired = (formData) => {
    return {
      serviceName: formData.name,
      serviceDescription: formData.description,
      serviceCategory: formData.category,
      serviceCountry: formData.country,
      servicePrice: formData.price,
      serviceTimeline: formData.timeline,
      serviceCurrency: formData.currency,
    };
  };

  const handleClickEachService = (servicesvalue) => {
    setCardAction("edit");
    setOpen(true);
    setClickedService(servicesvalue);
  };

  const handleServiceAdd = async (formData) => {
    let requiredService = getRequired(formData);
    let response = await addService(requiredService);
    let data = response?.data;
    let error = response?.error;

    if (data) {
      toast.success("Service added successfully");
      setOpen(false);
    } else {
      handleError(error);
    }
    refetch();
  };

  // Update service
  const handleServiceUpdate = async (formData) => {
    let requiredService = getRequired(formData);
    let response = await updateService({ ...requiredService, serviceId: clickedService.serviceId });
    let data = response?.data;
    let error = response?.error;

    if (data) {
      toast.success("Service updated successfully");
      setOpen(false);
    } else {
      handleError(error);
    }
    refetch();
  };

  // delete service
  const handleServiceDelete = async () => {
    let response = await deleteService(clickedService.serviceId);
    let data = response?.data;
    let error = response?.error;

    if (data) {
      toast.success("Service deleted successfully");
      setOpen(false);
    } else {
      handleError(error);
    }
    refetch();
  };

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
        LeftbtnLeftIcon={AddIcon}
        LeftbtnText="Add Service"
        btnText="View all"
        anotherBtnAction={handleAddButton}
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
                    title={service.serviceName}
                    subText={service.serviceCountry}
                    categoryName={service.serviceCategory}
                    service
                    clickHandle={() => handleClickEachService(service)}
                    //action = {() => handleAddButton(service)}
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

        <ServicesModal
          disableAll={cardAction === "edit" ? true : false}
          open={open}
          title={cardAction === "edit" ? "Update Service" : "Add New Service"}
          loading={updateState.isLoading || addState.isLoading}
          setOpen={setOpen}
          cardAction={cardAction}
          submitAction={cardAction === "edit" ? handleServiceUpdate : handleServiceAdd}
          serviceInfo={clickedService}
          deleteState={deleteState}
          handleServiceDelete={handleServiceDelete}
        />
      </FeatureSection>
    </Container>
  );
};

export default ServicePage;
