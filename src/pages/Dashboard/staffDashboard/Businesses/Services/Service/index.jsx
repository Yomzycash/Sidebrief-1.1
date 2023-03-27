import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Puff } from "react-loading-icons";
import { ReactComponent as ArrowLeftIcon } from "asset/Icons/ArrowLeftIcon.svg";
import { ReactComponent as AddIcon } from "asset/Icons/AddIcon.svg";
import Search from "components/navbar/Search";
import { useDeleteServiceMutation, useGetAllServicesQuery } from "services/staffService";
import FeatureSection from "containers/Feature/FeatureSection";
import { toast } from "react-hot-toast";
// import lookup from "country-code-lookup"
import PetalsCard from "components/cards/ServiceCard/PetalsCard";
import { ScrollBox } from "containers";
import {
  Container,
  Header,
  Loading,
  MainHeader,
  PageTitle,
  searchStyle,
  SearchWrapper,
  TopContent,
} from "./styled";
import ServicesModal from "components/modal/ServicesModal";
import { handleError } from "utils/globalFunctions";
import { GeneralTable } from "components/Tables";
import { columns } from "./table";
import { useViewAllComplyQuery } from "services/complyService";

const iconStyle = { width: "17px", height: "17px" };

const ServicePage = () => {
  // const [open, setOpen] = useState(false);
  // const [cardAction, setCardAction] = useState("");
  const [clickedService, setClickedService] = useState({});
  const { data, isLoading, refetch } = useGetAllServicesQuery();
  const allComply = useViewAllComplyQuery();
  const [deleteService, deleteState] = useDeleteServiceMutation();
  const [servicesEnquiry, setServicesEnquiry] = useState([]);

  const [dialog, setDialog] = useState({ serviceId: "", mode: "", progress: 0 });

  const navigate = useNavigate();

  // This runs when add service button is clicked
  const handleAddButton = () => {
    setOpen("add");
  };

  // const servicesNotifications = data?.filter((service) => {
  //   let serviceNots = notifications.data?.filter((not) => not?.serviceId === service?.serviceId);
  //   return serviceNots?.length > 0;
  // });

  useEffect(() => {
    setServicesEnquiry(data);
  }, [data]);

  const handleViewAllServices = () => {
    navigate("/staff-dashboard/businesses/services/all");
  };

  const handleViewAllNotifications = () => {
    navigate("/staff-dashboard/businesses/services/chats");
  };

  let totalServices = servicesEnquiry?.length > 0 ? servicesEnquiry.length : 0;

  const handleServiceClick = (clickedInfo) => {
    setOpen("edit", clickedInfo.serviceId);
    setClickedService(clickedInfo);
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

  const setOpen = (mode, serviceId, progress) => {
    if (!mode) setDialog({});
    else
      setDialog({
        mode: mode,
        serviceId: serviceId || "",
        progress: (dialog.progress > progress ? dialog.progress : progress) || dialog.progress,
      });
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
                    clickHandle={() => handleServiceClick(service)}
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
        {allComply.isLoading ? (
          <Loading height="300px">
            <Puff stroke="#00A2D4" fill="white" width={60} />
          </Loading>
        ) : (
          <GeneralTable
            columns={columns}
            data={allComply.data?.map((comply) => ({
              complyCode: comply.complyCode,
              serviceId: comply.serviceId,
              meta: comply.meta,
              date: comply.updatedAt,
            }))}
            normalLastRow
          />
        )}

        <ServicesModal
          disableAll={dialog.mode === "edit" ? true : false}
          clickedService={clickedService}
          deleteState={deleteState}
          handleServiceDelete={handleServiceDelete}
          refetch={refetch}
          setOpen={setOpen}
          dialog={dialog}
        />
      </FeatureSection>
    </Container>
  );
};

export default ServicePage;
