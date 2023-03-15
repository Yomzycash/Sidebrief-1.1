import { useState, useEffect, useCallback } from "react";
// import HeaderCheckout from "components/Header/HeaderCheckout";
import {
  Container,
  Body,
  Bottom,
  InfoContainer,
  Bullet,
  Content,
  InfoFrame,
  InfoFrameHead,
  BigContent,
} from "./style";
import { CheckoutController, CheckoutSection } from "containers";
import TagInputWithSearch from "components/input/TagInputWithSearch";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import { useGetAllCountriesQuery } from "services/complyService";
import { useNavigate } from "react-router-dom";
import { store } from "redux/Store";
import { ReactComponent as Mark } from "asset/svg/mark.svg";
import { FiClock } from "react-icons/fi";
import { FaMoneyCheckAlt } from "react-icons/fa";
import ServicesCheckoutHeader from "components/Header/ServicesCheckoutHeader";
import { setServiceCheckoutProgress } from "redux/Slices";
import {
  useLazyGetServicesByCountryQuery,
  useCreateComplianceMutation,
  useViewServiceQuery,
} from "services/complyService";
import numeral from "numeral";

const ServiceInfo = () => {
  const complyCodeData = JSON.parse(localStorage.getItem("complyData"));
  let serviceId = complyCodeData.serviceId;
  const viewService = useViewServiceQuery(serviceId);
  const countriesData = useGetAllCountriesQuery();

  const [selectedResource, setselectedResource] = useState({});
  const [countries, setCountries] = useState([]);
  const [serviceResources, setServiceresources] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  const [servicesByCountry, getServicesState] = useLazyGetServicesByCountryQuery();
  const [createCompliance, createComplianceState] = useCreateComplianceMutation();
  const { data, isLoading } = useGetAllCountriesQuery();

  const navigate = useNavigate();

  const handleNext = async () => {
    const servicePaymentDetails = JSON.parse(localStorage.getItem("servicePaymentDetails"));
    if (servicePaymentDetails) {
      navigate("/services/form");
    } else {
      const response = await createCompliance(selectedResource.serviceId);
      localStorage.setItem(
        "complyData",
        JSON.stringify({
          complyCode: response.data.complyCode,
          serviceId: response.data.serviceId,
        })
      );
      localStorage.setItem("serviceData", JSON.stringify(selectedResource));
      navigate("/services/payment");
    }
  };
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
              <div style={{ maxWidth: "450px" }}>
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
              </div>
            </LaunchFormContainer>
            {selectedResource?.serviceName && (
              <InfoContainer>
                <InfoFrame space>
                  <InfoFrameHead>Requirements</InfoFrameHead>
                  {selectedResource.serviceRequirements.length < 1 ? (
                    <Content>{`--`}</Content>
                  ) : (
                    selectedResource.serviceRequirements.map((el, index) => (
                      <Bullet key={index}>
                        <Mark />
                        <Content>{el.requirementName}</Content>
                      </Bullet>
                    ))
                  )}
                </InfoFrame>
                <InfoFrame>
                  <InfoFrameHead>Timeline</InfoFrameHead>
                  <Bullet>
                    <FiClock />
                    <BigContent>{selectedResource?.serviceTimeline} days</BigContent>
                  </Bullet>
                </InfoFrame>
                <InfoFrame>
                  <InfoFrameHead>Pricing</InfoFrameHead>
                  <Bullet>
                    <FaMoneyCheckAlt />
                    <BigContent>
                      {selectedResource?.serviceCurrency || "--"}{" "}
                      {numeral(selectedResource?.servicePrice).format("0,0")}
                    </BigContent>
                  </Bullet>
                </InfoFrame>
              </InfoContainer>
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
