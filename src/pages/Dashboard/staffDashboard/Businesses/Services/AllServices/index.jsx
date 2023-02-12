import StaffRewardHeader from "components/Header/StaffRewardHeader";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Puff } from "react-loading-icons";
import { BodyRight, Loading, ServiceContainer } from "./style";
import PetalsCard from "components/cards/RewardCard/PetalsCard";
import { useGetAllServicesQuery } from "services/productService";
import Paginator from "components/Paginator";
import { store } from "redux/Store";
import { setRefreshApp } from "redux/Slices";

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
  const [allServices, setAllServices] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;

  const { refreshApp } = useSelector((store) => store.UserDataReducer);

  const { data, isLoading } = useGetAllServicesQuery();

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % data?.length;
    setItemOffset(newOffset);
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


  return (
    <BodyRight SidebarWidth={sidebarWidth}>
      <StaffRewardHeader
        setOpen={setOpen}
        Description="Add Service"
        title="Services"
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
      {allServices?.length > itemsPerPage && (
        <Paginator handlePageClick={handlePageClick} pageCount={pageCount} />
      )}
    </BodyRight>
  );
};

export default AllServices;
