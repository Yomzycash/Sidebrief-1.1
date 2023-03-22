import StaffRewardHeader from "components/Header/StaffRewardHeader";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Puff } from "react-loading-icons";
import { BodyRight, Loading, ServiceContainer } from "./style";
import PetalsCard from "components/cards/ServiceCard/PetalsCard";
import {
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetAllServicesQuery,
} from "services/staffService";
import Paginator from "components/Paginator";
import { store } from "redux/Store";
import { setRefreshApp } from "redux/Slices";
import ServicesModal from "components/modal/ServicesModal";
import { toast } from "react-hot-toast";
import { handleError } from "utils/globalFunctions";
import { useSearchParams } from "react-router-dom";

const AllServices = () => {
  const [clickedService, setClickedService] = useState({});

  const [dialog, setDialog] = useState({ serviceId: "", mode: "", progress: 0 });

  const { data, isLoading, isError, error, refetch } = useGetAllServicesQuery();
  const [deleteService, deleteState] = useDeleteServiceMutation();

  const { refreshApp } = useSelector((store) => store.UserDataReducer);
  const layoutInfo = useSelector((store) => store.LayoutInfo);
  const { sidebarWidth } = layoutInfo;

  // This runs when add service button is clicked
  const handleAddButton = () => {
    setOpen("add");
  };

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
      toast.success("Service deleted successfully.");
      setOpen("");
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
        progress: dialog.progress > progress ? dialog.progress : progress,
      });
  };

  return (
    <BodyRight SidebarWidth={sidebarWidth}>
      <StaffRewardHeader
        Description="Add New Service"
        title="Services"
        handleButton={handleAddButton}
        placeholder="Search for a service"
        totalShown={data?.length}
      />
      {isLoading ? (
        <Loading height="300px">
          <Puff stroke="#00A2D4" fill="white" width={60} />
        </Loading>
      ) : (
        <ServiceContainer>
          {data?.map((service, index) => (
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
        </ServiceContainer>
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
      {/* {data?.length > itemsPerPage && (
        <Paginator handlePageClick={handlePageClick} pageCount={pageCount} />
      )} */}
    </BodyRight>
  );
};

export default AllServices;

// const [currentItems, setCurrentItems] = useState([]);
// const [pageCount, setPageCount] = useState(0);
// const [itemOffset, setItemOffset] = useState(0);

// const itemsPerPage = 12;

// useEffect(() => {
//   const endOffset = itemOffset + itemsPerPage;
//   setCurrentItems(allServices?.slice(itemOffset, endOffset));
//   setPageCount(Math.ceil(allServices?.length / itemsPerPage));
//   store.dispatch(setRefreshApp(!refreshApp));
// }, [itemOffset, itemsPerPage, allServices]);

// const handlePageClick = (e) => {
//   const newOffset = (e.selected * itemsPerPage) % data?.length;
//   setItemOffset(newOffset);
// };
