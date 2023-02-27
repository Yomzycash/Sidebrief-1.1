import StaffRewardHeader from "components/Header/StaffRewardHeader";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Puff } from "react-loading-icons";
import { BodyRight, Loading, ServiceContainer } from "./style";
import PetalsCard from "components/cards/RewardCard/PetalsCard";
import { 
  useAddServiceMutation,
	useUpdateServiceMutation,
	useDeleteServiceMutation,
  useGetAllServicesQuery 
 } from "services/staffService";
import Paginator from "components/Paginator";
import { store } from "redux/Store";
import { setRefreshApp } from "redux/Slices";
import ServicesModal from "components/modal/ServicesModal";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import { handleError } from "utils/globalFunctions";
const AllServices = () => {
  const serviceCategory = [
    {
      id: 1,
      category: "TAX",
      backgroundColor: "#00d4480c",
      color: "#00D448",
    },
    {
      id: 2,
      category: "MANAGE",
      backgroundColor: "#00a2d40c",
      color: "#00A2D4",
    },
  ];
  const layoutInfo = useSelector((store) => store.LayoutInfo);
  const { sidebarWidth } = layoutInfo;
  const [open, setOpen] = useState(false);
  const [cardAction, setCardAction] = useState("");
  const [allServices, setAllServices] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;

  const { refreshApp } = useSelector((store) => store.UserDataReducer);

  const { data, isLoading, isError, error, refetch } = useGetAllServicesQuery();
  const [ addService, addState ] = useAddServiceMutation();
  //const [ deleteService, deleteState] = useDeleteServiceMutation();
  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % data?.length;
    setItemOffset(newOffset);
  };

  // This runs when add service button is clicked
  const handleAddButton = () => {
    setOpen(true);
    setCardAction("add");
  };

  let errorRef = useRef(true)

  useEffect(() => {
    setAllServices(data);
  }, [data]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(allServices?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(allServices?.length / itemsPerPage));
    store.dispatch(setRefreshApp(!refreshApp));
  }, [itemOffset, itemsPerPage, allServices]);

  const getRequired = (formData) => {
    return {
      serviceName: formData.name,
      serviceDescription: formData.description,
      serviceId: formData.id,
      serviceCategory: formData.category,
      serviceCountry: formData.country,
      servicePrice: formData.price, 
      serviceTimeline: formData.timeline, 
    }
  }


  const handleServiceAdd = async (formData) => {
    let requiredService = getRequired(formData);
    let response = await addService(requiredService);
    let data = response?.data;
    let error = response?.error;
    
    if (data) {
      toast.success("Service addedd successfully");
    } else {
      handleError(error)
    }
    refetch()
    console.log("required service", requiredService)
  }

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
              />
            ))}
        </ServiceContainer>
      )}
      {/* <StaffRewardModal
      setOpen={setOpen}
      open={open}
      submitAction={submitAction}
      loading={addState.isLoading}
      
    /> */}
    <ServicesModal
      disableAll={false}
      open={open} 
      setOpen={setOpen} 
      cardAction={cardAction} 
      submitAction={handleServiceAdd}

    />
      {allServices?.length > itemsPerPage && (
        <Paginator handlePageClick={handlePageClick} pageCount={pageCount} />
      )}
    </BodyRight>
  );
};

export default AllServices;
