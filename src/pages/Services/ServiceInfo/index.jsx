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
import { useGetAllCountriesQuery } from "services/launchService";
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
} from "services/complyService";
import numeral from "numeral";

const ServiceInfo = () => {
  const [selectedResource, setselectedResource] = useState({});
  const [countries, setCountries] = useState([]);
  const [serviceResources, setServiceresources] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");

  const [servicesByCountry, getServicesState] = useLazyGetServicesByCountryQuery();
  const [createCompliance, createComplianceState] = useCreateComplianceMutation();
  const { data, isLoading } = useGetAllCountriesQuery();
  const navigate = useNavigate();

  const handleNext = async () => {
    const response = await createCompliance(selectedResource.serviceId);
    localStorage.setItem(
      "complyData",
      JSON.stringify({
        complyCode: response.data.complyCode,
        serviceId: response.data.serviceId,
      })
    );
    navigate("/services/payment");
  };
  console.log(getServicesState)
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
        setSelectedCountry(value);
      }
    },
    [data]
  );

  const selectCountry = async (value) => {
    setSelectedCountry(value);
    // get country ISO
    const countryISO = data?.find((el) => el.countryName === value)?.countryISO || "";
    const response = countryISO && (await servicesByCountry(countryISO));
    setServiceresources(response.data);
  };

  // Update the supported countries when data changes
  useEffect(() => {
    handleCountry();
  }, [handleCountry]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleResourceSelect = (valuesSelected) => {
    setselectedResource(
      getServicesState?.data?.find((el) => el.serviceName === valuesSelected) || {}
    );
  };

  // Set the progress of the application
  useEffect(() => {
    store.dispatch(setServiceCheckoutProgress({ total: 4, current: 0.01 })); // total- total pages and current - current page
  }, []);

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
                list={serviceResources?.map((el) => el.serviceName) || []}
                getValue={handleResourceSelect}
                initialValue={selectedResource.serviceName || "--"}
                MatchError="Please select resource from the list"
                EmptyError="Please select at least one resources"
                suggestionLoading={getServicesState.isLoading || getServicesState.isFetching}
                fetchingText={"Fetching resources..."}
              />
            </LaunchFormContainer>
            {selectedResource.serviceName && (
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
                    <BigContent>{selectedResource.serviceTimeline} days</BigContent>
                  </Bullet>
                </InfoFrame>
                <InfoFrame>
                  <InfoFrameHead>Pricing</InfoFrameHead>
                  <Bullet>
                    <FaMoneyCheckAlt />
                    <BigContent>
                      {selectedResource.serviceCurrency || "--"}{" "}
                      {numeral(selectedResource.servicePrice).format("0,0")}
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
                forwardDisable={!selectedResource.serviceName}
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
