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
import EmptyContent from "components/EmptyContent";

const AllServices = () => {
  const [clickedService, setClickedService] = useState({});

  const [countrySelected, setCountrySelected] = useState("All");
  const [categorySelected, setCategorySelected] = useState("All");
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [dialog, setDialog] = useState({ serviceId: "", mode: "", progress: 0 });

  const { data, isLoading, refetch } = useGetAllServicesQuery({ refetchOnMountOrArgChange: true });
  const [deleteService, deleteState] = useDeleteServiceMutation({
    refetchOnMountOrArgChange: true,
  });
  const countries = useGetAllCountriesQuery();
  const selectedCountryInfo = countries?.data?.find((el) => el?.countryName === countrySelected);
  const selectedCountryISO = selectedCountryInfo?.countryISO;

  const layoutInfo = useSelector((store) => store.LayoutInfo);
  const { sidebarWidth } = layoutInfo;

  // Filters by selected category and selected country
  useEffect(() => {
    let dataCopy = data;

    dataCopy = dataCopy?.filter((el) =>
      normalizeText(categorySelected) === "all"
        ? el
        : normalizeText(el?.serviceCategory) === normalizeText(categorySelected)
    );

    dataCopy = dataCopy?.filter((el) =>
      normalizeText(countrySelected) === "all"
        ? el
        : normalizeText(el?.serviceCountry) === normalizeText(selectedCountryISO)
    );

    setFilteredData(dataCopy);
  }, [data, categorySelected, countrySelected]);

  const normalizeText = (text) => text?.toLowerCase()?.trim();

  // This runs when add service button is clicked
  const handleAddButton = () => {
    setOpen("add");
  };

  const handleServiceClick = (clickedInfo) => {
    setOpen("edit", clickedInfo.serviceId);
    setClickedService(clickedInfo);
  };

  const handleSearch = (e) => {
    let value = e.target.value;
    setSearchValue(value);
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

  let searchFiltered = filteredData?.filter(
    (el) =>
      normalizeText(el?.serviceName)?.includes(normalizeText(searchValue)) ||
      normalizeText(el?.serviceCategory)?.includes(normalizeText(searchValue)) ||
      normalizeText(el?.serviceCountry)?.includes(normalizeText(searchValue)) ||
      normalizeText(el?.serviceDescription)?.includes(normalizeText(searchValue))
  );

  return (
    <BodyRight SidebarWidth={sidebarWidth}>
      <StaffRewardHeader
        Description="Add New Service"
        title="Products"
        handleButton={handleAddButton}
        placeholder="Search for a product..."
        totalShown={filteredData?.length}
        categorySelected={setCategorySelected}
        countrySelected={setCountrySelected}
        onSearchChange={handleSearch}
      />
      {isLoading && (
        <Loading height="300px">
          <Puff stroke="#00A2D4" fill="white" width={60} />
        </Loading>
      )}
      {filteredData?.length <= 0 && <EmptyContent emptyText="Not available" />}

      <ServiceContainer>
        {searchFiltered?.length > 0 &&
          searchFiltered?.map((service, index) => (
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
