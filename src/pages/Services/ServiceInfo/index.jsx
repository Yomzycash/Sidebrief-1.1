import { useState, useEffect, useCallback } from "react";
// import HeaderCheckout from "components/Header/HeaderCheckout";
import { Container, Body, Bottom } from "./style";
import { CheckoutController, CheckoutSection } from "containers";
import TagInputWithSearch from "components/input/TagInputWithSearch";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import { useNavigate } from "react-router-dom";
import { store } from "redux/Store";
import ServicesCheckoutHeader from "components/Header/ServicesCheckoutHeader";
import { setServiceCheckoutProgress } from "redux/Slices";
import {
  useGetAllCountriesQuery,
  useLazyGetServicesByCountryQuery,
  useGetSingleServiceQuery,
} from "services/staffService";
import { useCreateComplyMutation } from "services/complyService";
import { InfoContainer } from "containers/Services";

const ServiceInfo = () => {
  const complyCodeData = JSON.parse(localStorage.getItem("complyData"));
  let serviceId = complyCodeData?.serviceId;
  const viewService = useGetSingleServiceQuery(serviceId);
  const countriesData = useGetAllCountriesQuery();

  const [selectedResource, setselectedResource] = useState({});
  const [countries, setCountries] = useState([]);
  const [serviceResources, setServiceresources] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  const [servicesByCountry, getServicesState] = useLazyGetServicesByCountryQuery();
  const [createCompliance, createComplianceState] = useCreateComplyMutation();
  const { data, isLoading } = useGetAllCountriesQuery();

  const navigate = useNavigate();

  const handleNext = async () => {
    const servicePaymentDetails = JSON.parse(localStorage.getItem("servicePaymentDetails"));
    if (servicePaymentDetails) {
      navigate("/services/form");
    } else {
      if (serviceId !== selectedResource.serviceId) {
        const response = await createCompliance(selectedResource.serviceId);
        localStorage.setItem(
          "complyData",
          JSON.stringify({
            complyCode: response.data.complyCode,
            serviceId: response.data.serviceId,
          })
        );
      }
      // localStorage.setItem("serviceData", JSON.stringify(selectedResource));
      navigate("/services/payment");
    }
  };
  console.log(getServicesState);
  // Handle supported countries fetch
  const handleCountry = useCallback(
    async (value) => {
      let responseData = data;
      let countries = [];
      responseData?.forEach((data) => {
        countries = [...countries, data?.countryName];
      });
      if (responseData) {
        setCountries([...countries]);
        value && setSelectedCountry(value);
      }
    },
    [data]
  );

  const selectCountry = useCallback(
    async (value) => {
      setSelectedCountry(value);
      setServiceresources([]);
      // get country ISO
      const countryISO = data?.find((el) => el.countryName === value)?.countryISO || "";
      const response = countryISO && (await servicesByCountry(countryISO));
      setServiceresources(response.data);
    },
    [data, servicesByCountry]
  );

  // Update the supported countries when data changes
  useEffect(() => {
    handleCountry();
  }, [handleCountry]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleResourceSelect = (valuesSelected) => {
    let serviceData =
      getServicesState?.data?.find((el) => el?.serviceName === valuesSelected) || {};
    setselectedResource(serviceData);
  };

  // Set the progress of the application
  useEffect(() => {
    store.dispatch(setServiceCheckoutProgress({ total: 4, current: 0.01 })); // total- total pages and current - current page
  }, []);

  // populate

  useEffect(() => {
    if (viewService?.data !== {}) {
      let getCountry = countriesData?.data?.find(
        (country) => country?.countryISO === viewService?.data?.serviceCountry
      );
      setSelectedCountry(getCountry?.countryName);

      setselectedResource(viewService?.data);
    } else {
      console.log("empty");
    }
  }, [countriesData, viewService]);

  // console.log(selectedResource);

  return (
    <>
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
                  list={countries}
                  getValue={selectCountry}
                  initialValue={selectedCountry}
                  suggestionLoading={isLoading}
                  fetchingText={"Fetching countries..."}
                />
              </div>
              <TagInputWithSearch
                label="Resource"
                list={serviceResources?.map((el) => el?.serviceName) || []}
                getValue={handleResourceSelect}
                initialValue={
                  viewService?.data
                    ? viewService?.data?.serviceName
                    : selectedResource?.serviceName || "--"
                }
                MatchError="Please select resource from the list"
                EmptyError="Please select at least one resources"
                suggestionLoading={getServicesState.isLoading || getServicesState.isFetching}
                fetchingText={"Fetching resources..."}
              />
            </LaunchFormContainer>
            {selectedResource?.serviceName && (
              <InfoContainer
                country={data?.find((el) => el.countryName === selectedCountry) || {}}
                requiredDocuments={selectedResource.serviceRequirements}
                amount={selectedResource.servicePrice}
                currency={selectedResource.serviceCurrency}
                timeline={selectedResource.serviceTimeline}
              />
            )}
            <Bottom>
              <CheckoutController
                forwardText={"Next"}
                forwardSubmit
                hidePrev
                forwardAction={handleNext}
                forwardDisable={!selectedResource?.serviceName}
                forwardLoading={createComplianceState.isLoading}
              />
            </Bottom>
          </LaunchPrimaryContainer>
        </Body>
      </Container>
    </>
  );
};

export default ServiceInfo;
