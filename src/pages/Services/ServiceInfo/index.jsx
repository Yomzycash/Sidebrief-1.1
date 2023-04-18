import React, { useCallback, useEffect, useState } from "react";
import { Container, Body, Bottom } from "./style";
import { CheckoutController, CheckoutSection } from "containers";
import TagInputWithSearch from "components/input/TagInputWithSearch";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import { useNavigate } from "react-router-dom";
import ServicesCheckoutHeader from "components/Header/ServicesCheckoutHeader";
import { InfoContainer } from "containers/Services";
import { useCreateComplyMutation, useUpdateComplyMutation } from "services/complyService";
import { useGetAllCountriesQuery, useGetServicesByCountryQuery } from "services/staffService";
import { useActions } from "./actions";

const ServiceInfo = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedService, setSelectedService] = useState({});
  const [countryISO, setcountryISO] = useState("");

  const countries = useGetAllCountriesQuery();
  const services = useGetServicesByCountryQuery(countryISO);
  const [createComply, createState] = useCreateComplyMutation();
  const [updateComply, updateState] = useUpdateComplyMutation();

  let navigate = useNavigate();

  let countriesArray = countries?.data?.map((el) => el?.countryName) || [];
  let servicesArray = services.data?.map((el) => el?.serviceName) || [];

  let complyInfo = JSON.parse(localStorage.getItem("complyInfo"));

  const { handleSubmit } = useActions({
    selectedCountry,
    selectedService,
    complyInfo,
    services,
    createComply,
    updateComply,
    navigate,
  });

  //   When country is selected
  const handleCountrySelect = useCallback(
    async (value) => {
      setSelectedCountry(value);
    },
    [selectedCountry]
  );

  // When a service is selected
  const handleServiceSelect = (valueSelected) => {
    let serviceData = services.data?.find((el) => el?.serviceName === valueSelected) || {};
    setSelectedService(serviceData);
  };

  const handleServices = async () => {
    const countryISO =
      countries.data?.find((el) => el.countryName === selectedCountry)?.countryISO || "";
    setcountryISO(countryISO);
  };

  //

  // Fetches services when country is selected
  useEffect(() => {
    handleServices();
  }, [selectedCountry]);

  //

  // Populates country information, if available
  useEffect(() => {
    let complyInfo = JSON.parse(localStorage.getItem("complyInfo"));
    let serviceCountry = complyInfo?.serviceCountry;

    setSelectedCountry(serviceCountry);
    handleServices();
  }, [countries]);

  //

  // Populates service information, if available
  useEffect(() => {
    let complyInfo = JSON.parse(localStorage.getItem("complyInfo"));
    let serviceName = complyInfo?.serviceName;
    handleServiceSelect(serviceName);
  }, [services.data]);

  return (
    <Container>
      <ServicesCheckoutHeader />

      <Body onSubmit={handleSubmit}>
        <CheckoutSection
          title="Manage your business"
          HeaderParagraph="Make changes to already registered companies"
        />
        <LaunchPrimaryContainer>
          <LaunchFormContainer>
            <div style={{ maxWidth: "450px" }}>
              <TagInputWithSearch
                label="Operational Country"
                list={countriesArray}
                getValue={handleCountrySelect}
                initialValue={selectedCountry}
                suggestionLoading={countries.isLoading}
                fetchingText={"Fetching countries..."}
              />
            </div>
            <TagInputWithSearch
              label="Products"
              list={servicesArray}
              getValue={handleServiceSelect}
              initialValue={selectedService?.serviceName || "--"}
              MatchError="Please select resource from the list"
              EmptyError="Please select at least one service"
              suggestionLoading={services.isLoading || services.isFetching}
              fetchingText={"Fetching products..."}
            />
          </LaunchFormContainer>
          {selectedService?.serviceName && (
            <InfoContainer
              country={countries?.data?.find((el) => el.countryName === selectedCountry) || ""}
              service={selectedService}
            />
          )}
          <Bottom>
            <CheckoutController
              forwardText={"Next"}
              forwardSubmit
              hidePrev
              forwardLoading={createState.isLoading || updateState.isLoading}
            />
          </Bottom>
        </LaunchPrimaryContainer>
      </Body>
    </Container>
  );
};

export default ServiceInfo;
