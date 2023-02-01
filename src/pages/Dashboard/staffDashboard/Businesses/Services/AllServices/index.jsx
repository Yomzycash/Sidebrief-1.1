import StaffRewardHeader from "components/Header/StaffRewardHeader";
import StaffRewardModal from "components/modal/StaffRewardModal";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Puff } from "react-loading-icons";
import { BodyRight, Loading, ServiceContainer } from "./style";
import { useNavigate } from "react-router-dom";
import PetalsCard from "components/cards/RewardCard/PetalsCard";
import { useGetAllServicesQuery } from "services/productService";
import Paginator from "components/Paginator";

const AllServices = () => {
  const serviceCategory = [
    {
      id: 1,
      category: "TAX",
      backgroundColor: "rgba(0, 212, 72, 0.05)",
      color: "#00D448",
    },
    {
      id: 2,
      category: "MANAGE",
      backgroundColor: "rgba(0, 162, 212, 0.05)",
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
  const itemsPerPage = 3;

  const { data, isLoading, isError, error, refetch } = useGetAllServicesQuery();

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
  }, [itemOffset, itemsPerPage, allServices]);

  console.log("yy", data);

  return (
    <BodyRight SidebarWidth={sidebarWidth}>
      <StaffRewardHeader setOpen={setOpen} Description="Add Service" />
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
      <Paginator handlePageClick={handlePageClick} pageCount={pageCount} />
    </BodyRight>
  );
};

export default AllServices;
