import StaffRewardHeader from "components/Header/StaffRewardHeader";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Puff } from "react-loading-icons";
import { BodyRight, Loading, ServiceContainer } from "./style";
import PetalsCard from "components/cards/ServiceCard/PetalsCard";
import { useDeleteServiceMutation, useGetAllServicesQuery } from "services/staffService";
import StaffServicesModal from "components/modal/StaffServicesModal";
import { toast } from "react-hot-toast";
import { handleError } from "utils/globalFunctions";
import { useGetAllCountriesQuery } from "services/launchService";

const AllServices = () => {
  const [clickedService, setClickedService] = useState({});

  const [countrySelect, setCountrySelect] = useState("All");
  const [categorySelect, setCategorySelect] = useState("All");
  const [filteredData, seFilteredData] = useState([]);

  const [dialog, setDialog] = useState({ serviceId: "", mode: "", progress: 0 });

  const { data, isLoading, refetch } = useGetAllServicesQuery({ refetchOnMountOrArgChange: true });
  const [deleteService, deleteState] = useDeleteServiceMutation({
    refetchOnMountOrArgChange: true,
  });
  const countries = useGetAllCountriesQuery();
  const countriesCategory = countries?.data?.find((el) => el?.countryName === countrySelect);

  console.log(countriesCategory?.countryISO);

  const layoutInfo = useSelector((store) => store.LayoutInfo);
  const { sidebarWidth } = layoutInfo;

  useEffect(() => {
    let dataSet = [];
    data?.forEach((el) => {
      if (el?.serviceCategory.trim().toLowerCase() === categorySelect.trim().toLowerCase()) {
        dataSet.push(el);
        seFilteredData(dataSet);
      } else if (categorySelect.trim()=== "All") {
        seFilteredData(data);
      }
      else {
        
        seFilteredData(dataSet);
      }
 
    });
  }, [categorySelect, data]);
  useEffect(() => {
    let dataSet = [];
    data?.forEach((el) => {
      if (el?.serviceCountry === countriesCategory?.countryISO) {
        dataSet.push(el);
        seFilteredData(dataSet);
      }
      else if (countriesCategory?.countryISO === undefined) {
        seFilteredData(data);
      }
      else {
        
        seFilteredData(dataSet);
      }
    });
  }, [countriesCategory?.countryISO, data]);

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
 

  // const filteredData= data?.filter((el)=>)

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

  return (
    <BodyRight SidebarWidth={sidebarWidth}>
      <StaffRewardHeader
        Description="Add New Service"
        title="Products"
        handleButton={handleAddButton}
        placeholder="Search for a product..."
        totalShown={filteredData?.length}
        categorySelected={setCategorySelect}
        countrySelected={setCountrySelect}
      />
      {isLoading && (
        <Loading height="300px">
          <Puff stroke="#00A2D4" fill="white" width={60} />
        </Loading>
      )}
      {filteredData?.length <= 0 && ( 
        <p> no data found </p>
      )}
        <ServiceContainer>
          {filteredData?.length > 0 && filteredData?.map((service, index) => (
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
      
    
      <StaffServicesModal
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