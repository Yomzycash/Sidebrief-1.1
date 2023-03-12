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

const AllServices = () => {
  const layoutInfo = useSelector((store) => store.LayoutInfo);
  const { sidebarWidth } = layoutInfo;
  const [cardAction, setCardAction] = useState("");
  const [clickedService, setClickedService] = useState({});
  const [allServices, setAllServices] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const [searchParams, setSearchParams] = useState(false);

  let open = searchParams.get("openDialog");

  const itemsPerPage = 12;

  const { refreshApp } = useSelector((store) => store.UserDataReducer);

  const { data, isLoading, isError, error, refetch } = useGetAllServicesQuery();

  const [deleteService, deleteState] = useDeleteServiceMutation();

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % data?.length;
    setItemOffset(newOffset);
  };

  // This runs when add service button is clicked
  const handleAddButton = () => {
    // setCardAction("add");
    setOpen(true, "add");
  };

  useEffect(() => {
    setAllServices(data);
  }, [data]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(allServices?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(allServices?.length / itemsPerPage));
    store.dispatch(setRefreshApp(!refreshApp));
  }, [itemOffset, itemsPerPage, allServices]);

  const handleClickEachService = (servicesvalue) => {
    // setCardAction("edit");
    setOpen(true, "edit");
    setClickedService(servicesvalue);
  };

  // delete service
  const handleServiceDelete = async () => {
    let response = await deleteService(clickedService.serviceId);
    let data = response?.data;
    let error = response?.error;

    if (data) {
      toast.success("Service deleted successfully.");
      setOpen(false);
    } else {
      handleError(error);
    }
    refetch();
  };

  const setOpen = (value, mode) => {
    // if (value === false) setSearchParams({});
    // else
    //   setSearchParams({
    //     openDialog: value,
    //     mode: mode || "",
    //   });
  };

  return (
    <BodyRight SidebarWidth={sidebarWidth}>
      <StaffRewardHeader
        setOpen={setOpen}
        Description="Add New Service"
        title="Services"
        handleButton={handleAddButton}
        placeholder="Search for a service"
      />
      {isLoading ? (
        <Loading height="300px">
          <Puff stroke="#00A2D4" fill="white" width={60} />
        </Loading>
      ) : (
        <ServiceContainer>
          {currentItems &&
            currentItems?.map((service, index) => (
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
        </ServiceContainer>
      )}
      <ServicesModal
        disableAll={cardAction === "edit" ? true : false}
        open={open}
        setOpen={setOpen}
        title={cardAction === "edit" ? "Update Service" : "Add New Service"}
        // loading={updateState.isLoading || addState.isLoading}
        cardAction={cardAction}
        // submitAction={cardAction === "edit" ? handleServiceUpdate : handleServiceAdd}
        serviceInfo={clickedService}
        deleteState={deleteState}
        handleServiceDelete={handleServiceDelete}
      />
      {allServices?.length > itemsPerPage && (
        <Paginator handlePageClick={handlePageClick} pageCount={pageCount} />
      )}
    </BodyRight>
  );
};

export default AllServices;
