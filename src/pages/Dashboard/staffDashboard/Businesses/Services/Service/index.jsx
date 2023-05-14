import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Puff } from "react-loading-icons";
import { ReactComponent as ArrowLeftIcon } from "asset/Icons/ArrowLeftIcon.svg";
import { ReactComponent as AddIcon } from "asset/Icons/AddIcon.svg";
import Search from "components/navbar/Search";
import { useDeleteServiceMutation, useGetAllServicesQuery } from "services/staffService";
import FeatureSection from "containers/Feature/FeatureSection";
import { toast } from "react-hot-toast";
import PetalsCard from "components/cards/ServiceCard/PetalsCard";
import { ScrollBox } from "containers";
import { useMediaQuery } from "@mui/material";
import { format } from "date-fns";
import {
  Container,
  Header,
  Loading,
  MainHeader,
  PageTitle,
  searchStyle,
  SearchWrapper,
  TopContent,
  MobileContainer,
} from "./styled";
import StaffServicesModal from "components/modal/StaffServicesModal";
import { handleError } from "utils/globalFunctions";
import { GeneralTable } from "components/Tables";
import { columns } from "./table";
import { useViewAllComplyQuery } from "services/complyService";
import { compareAsc } from "date-fns";
import Accordion from "components/Accordion";
const iconStyle = { width: "17px", height: "17px" };

const ServicePage = () => {
  const [clickedService, setClickedService] = useState({});
  const { data, isLoading, refetch } = useGetAllServicesQuery();
  const allComply = useViewAllComplyQuery();
  // const dataComply = allComply !== null && allComply?.data.slice(0, 10)
  // console.log("dataComply", dataComply)
  const [deleteService, deleteState] = useDeleteServiceMutation();

  const [dialog, setDialog] = useState({ serviceId: "", mode: "", progress: 0 });

  const navigate = useNavigate();

  // This runs when add service button is clicked
  const handleAddButton = () => {
    setOpen("add");
  };

  const handleViewAllServices = () => {
    navigate("/staff-dashboard/businesses/services/all");
  };

  const handleViewAllComply = () => {
    navigate("/staff-dashboard/businesses/services/allcomply/all");
  };

  const matches = useMediaQuery("(max-width:700px)");
  let totalServices = data?.length > 0 ? data?.length : 0;

  const handleServiceClick = (clickedInfo) => {
    setOpen("edit", clickedInfo.serviceId);
    setClickedService(clickedInfo);
  };

  // delete service
  const handleServiceDelete = async () => {
    let payload = {
      serviceId: clickedService.serviceId,
      serviceName: clickedService.serviceName,
    };

    let response = await deleteService(payload);
    let data = response?.data;
    let error = response?.error;

    if (data) {
      toast.success("Product deleted successfully");
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
    if (mode === "add") setClickedService({});
  };

  useEffect(() => {
    allComply.refetch();
  }, []);

  // const complyData = [...allComply.data]?.sort((a, b) => compareAsc(new Date(b?.createdAt), new Date(a?.createdAt)))?.slice(0, 10);
  const sortedData = allComply?.data != null ?  
    [...allComply?.data]?.sort((a, b) => compareAsc(
      new Date(b?.createdAt), 
      new Date(a?.createdAt)))?.
    slice(0, 10).map((comply) => ({
      complyCode: comply.complyCode,
      serviceId: comply.serviceId,
      meta: comply.meta,
      date: comply.updatedAt,
    })) : [];

 


  return (
    <Container>
      <Header>
        <MainHeader>
          <TopContent>
            <div>
              <PageTitle>Products</PageTitle>
            </div>
            <SearchWrapper>
              <Search
                style={searchStyle}
                iconStyle={iconStyle}
                placeholder="Search for a product..."
              />
            </SearchWrapper>
          </TopContent>
        </MainHeader>
      </Header>

      <FeatureSection
        title={`Products (${totalServices}) available`}
        subText="Select all available banks to create an account with"
        LeftbtnLeftIcon={AddIcon}
        LeftbtnText="Add Product"
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
              {data &&
                data?.map((service, index) => (
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
        title="Product Requests"
        subText="View recent service requests"
        btnText="View all"
        btnRightIcon={ArrowLeftIcon}
        btnAction={handleViewAllComply}
      >
        {allComply.isLoading && (
            <Loading height="300px">
              <Puff stroke="#00A2D4" fill="white" width={60} />
            </Loading>
        )}
        {!matches && allComply?.data?.length > 0 ? (
            <GeneralTable
              columns={columns}
              data={sortedData}
              normalLastRow
            />
        ) : (
          <MobileContainer>
            {/* {allComply.data?.map((element) => {
                return (
                  <Accordion
                    key={element?.complyCode}
                    // date={format(new Date(element?.date), "dd/MM/yyyy")}
                    date={sortedData.length < 1 ? '--': format(new Date(element?.date), "dd/MM/yyyy")}
                  
                  />
                )
            })} */}
            {/* {dataComply.map((element) => {
              return (
                <Accordion
                  key={element?.complyCode}
                  date={dataComply.length < 1 ? '--': format(new Date(element?.updatedAt), "dd/MM/yyyy")}
              />
              );
            })} */}
            data here
          </MobileContainer>
        )}

        <StaffServicesModal
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
