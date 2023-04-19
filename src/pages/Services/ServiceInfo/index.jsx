import React, { useCallback, useEffect, useState } from "react";
import { Container, Body, Bottom } from "./style";
import { CheckoutController, CheckoutSection } from "containers";
import TagInputWithSearch from "components/input/TagInputWithSearch";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import { useNavigate, useParams } from "react-router-dom";
import ServicesCheckoutHeader from "components/Header/ServicesCheckoutHeader";
import { InfoContainer } from "containers/Services";
import { useCreateComplyMutation, useUpdateComplyMutation } from "services/complyService";
import { useGetAllCountriesQuery, useGetServicesByCountryQuery } from "services/staffService";
import { useActions } from "./actions";

const ServiceInfo = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedService, setSelectedService] = useState({});
  const [countryISO, setCountryISO] = useState("");

  const countries = useGetAllCountriesQuery();
  const services = useGetServicesByCountryQuery(countryISO);
  const [createComply, createState] = useCreateComplyMutation();
  const [updateComply, updateState] = useUpdateComplyMutation();

  let navigate = useNavigate();
  let { option } = useParams();

  let complyInfo = JSON.parse(localStorage.getItem("complyInfo"));

  const { handleSubmit, normalize, getHeaderText } = useActions({
    selectedCountry,
    selectedService,
    complyInfo,
    services,
    createComply,
    updateComply,
    navigate,
  });

  let paramsIsValid =
    normalize(option) === "onboard" ||
    normalize(option) === "manage" ||
    normalize(option) === "intellectual-property" ||
    normalize(option) === "tax";

  let countriesArray = countries?.data?.map((el) => el?.countryName) || [];
  let servicesArray =
    services.isError || services.isLoading || services.isFetching
      ? []
      : services.data
          ?.filter((el) => normalize(el?.serviceCategory) === normalize(option))
          ?.map((el) => el?.serviceName) || [];

  //   When country is selected
  const handleCountrySelect = useCallback(
    async (value) => {
      setSelectedCountry(value);
      setSelectedService("");
      services.refetch();
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
    setCountryISO(countryISO);
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

  const { title, titleSubText } = getHeaderText(option);

  const isManageorOnboard = normalize(option) === "manage" || normalize(option) === "onboard";
  const hidePrev = complyInfo?.paid || !isManageorOnboard;

  return (
    <>
      {paramsIsValid ? (
        <Container>
          <ServicesCheckoutHeader
            getStarted={!complyInfo ? true : false}
            backToDashBoard={!complyInfo ? true : false}
          />

          <Body onSubmit={handleSubmit}>
            <CheckoutSection title={title} HeaderParagraph={titleSubText} />
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
                    fetchFailedText="Couldn't fetch countries"
                    disabled={complyInfo?.paid}
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
                  fetchingText="Fetching products..."
                  fetchFailedText="Couldn't fetch products"
                  disabled={complyInfo?.paid}
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
                  backText="Previous"
                  backAction={() => navigate("/services")}
                  hidePrev={hidePrev}
                  forwardLoading={createState.isLoading || updateState.isLoading}
                />
              </Bottom>
            </LaunchPrimaryContainer>
          </Body>
        </Container>
      ) : (
        <>Invalid URL</>
      )}
    </>
  );
};

export default ServiceInfo;
