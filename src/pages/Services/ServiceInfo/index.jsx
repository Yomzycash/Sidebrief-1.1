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
import { useGetAllCountriesQuery, useLazyGetServicesByCountryQuery } from "services/staffService";
import { toast } from "react-hot-toast";
import { handleError } from "utils/globalFunctions";

const ServiceInfo = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState({});

  const countries = useGetAllCountriesQuery();
  const [servicesByCountry, servicesState] = useLazyGetServicesByCountryQuery(selectedCountry);
  const [createComply, createState] = useCreateComplyMutation();
  const [updateComply, updateState] = useUpdateComplyMutation();

  let navigate = useNavigate();

  let countriesArray = countries?.data?.map((el) => el?.countryName) || [];
  let servicesArray = services?.map((el) => el?.serviceName) || [];

  let complyInfo = JSON.parse(localStorage.getItem("complyInfo"));

  //   When country is selected
  const handleCountrySelect = useCallback(
    async (value) => {
      setSelectedCountry(value);
    },
    [selectedCountry]
  );

  // When resource is selected
  const handleServiceSelect = (valueSelected) => {
    let serviceData = services?.find((el) => el?.serviceName === valueSelected) || {};
    console.log(services);
    setSelectedService(serviceData);
  };

  const handleServices = async () => {
    const countryISO =
      countries.data?.find((el) => el.countryName === selectedCountry)?.countryISO || "";
    const response = countryISO && (await servicesByCountry(countryISO));
    console.log(countries.data, selectedCountry);
    setServices(response.data);
  };

  // Fetches services when country is selected
  useEffect(() => {
    handleServices();
  }, [selectedCountry]);

  // Submits form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCountry) {
      toast.error("Select service country");
      return;
    } else if (!selectedService?.serviceId) {
      toast.error("Select service");
      return;
    }

    let payload = { serviceId: selectedService.serviceId };
    let response = complyInfo?.complyCode
      ? await updateComply(payload)
      : await createComply(payload);
    let data = response?.data;
    let error = response?.error;

    if (data) {
      let info = {
        ...data,
        serviceCountry: selectedCountry,
        serviceName: selectedService?.serviceName,
      };
      localStorage.setItem("complyInfo", JSON.stringify(info));
      const paymentDetails = JSON.parse(localStorage.getItem("paymentDetails"));

      if (paymentDetails?.paymentStatus === "successful") {
        navigate("/services/form");
      } else {
        navigate("/services/payment");
      }
    } else handleError(error);
  };

  // Populates service information, if available
  useEffect(() => {
    let complyInfo = JSON.parse(localStorage.getItem("complyInfo"));
    let serviceCountry = complyInfo?.serviceCountry;
    let serviceName = complyInfo?.serviceName;

    if (serviceCountry && serviceName) {
      setSelectedCountry(serviceCountry);
      handleServiceSelect(serviceName);
    }
  }, [services, countries.data]);

  console.log(selectedService);
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
              label="Services"
              list={servicesArray}
              getValue={handleServiceSelect}
              initialValue={selectedService?.serviceName || "--"}
              MatchError="Please select resource from the list"
              EmptyError="Please select at least one service"
              suggestionLoading={servicesState.isLoading || servicesState.isFetching}
              fetchingText={"Fetching services..."}
            />
          </LaunchFormContainer>
          {selectedService?.serviceName && (
            <InfoContainer
              country={countriesArray?.find((el) => el.countryName === selectedCountry) || {}}
              service={selectedService}
            />
          )}
          <Bottom>
            <CheckoutController
              forwardText={"Next"}
              forwardSubmit
              hidePrev
              // forwardAction={handleNext}
              // forwardDisable={!selectedService?.serviceName}
              forwardLoading={createState.isLoading}
            />
          </Bottom>
        </LaunchPrimaryContainer>
      </Body>
    </Container>
  );
};

export default ServiceInfo;
