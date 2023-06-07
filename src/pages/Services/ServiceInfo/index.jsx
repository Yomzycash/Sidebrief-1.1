import React, { useCallback, useEffect, useState } from "react";
import { Container, Body, Bottom, PromoCheck } from "./style";
import { CheckoutController, CheckoutSection } from "containers";
import TagInputWithSearch from "components/input/TagInputWithSearch";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import { useNavigate, useParams } from "react-router-dom";
import ServicesCheckoutHeader from "components/Header/ServicesCheckoutHeader";
import { InfoContainer } from "containers/Services";
import { useCreateComplyMutation, useUpdateComplyMutation } from "services/complyService";
import { useGetAllCountriesQuery, useGetServicesByCountryQuery } from "services/staffService";
import { useActions, usePromoActions } from "./actions";
import { InputWithLabel } from "components/input";
import { MdError } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { getPromoPrice, getPromoWarn } from "../actions";

const ServiceInfo = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedService, setSelectedService] = useState({});
  const [countryISO, setCountryISO] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [fetchPromo, setFetchPromo] = useState(false);

  const countries = useGetAllCountriesQuery();
  const services = useGetServicesByCountryQuery(countryISO, { skip: !countryISO });
  const [createComply, createState] = useCreateComplyMutation();
  const [updateComply, updateState] = useUpdateComplyMutation();

  let navigate = useNavigate();
  let { option } = useParams();

  let complyInfo = JSON.parse(localStorage.getItem("complyInfo"));
  const { has_used_referral_code, isPartner } = JSON.parse(localStorage.getItem("userInfo"));

  const { promoResponse, handlePromoKeyDown, handlePromo, savePromo } = usePromoActions({
    promoCode,
    setPromoCode,
    fetchPromo,
    setFetchPromo,
  });

  const { handleSubmit, normalize, getHeaderText } = useActions({
    selectedCountry,
    selectedService,
    complyInfo,
    services,
    createComply,
    updateComply,
    navigate,
    promoResponse,
    savePromo,
  });

  let paramsIsValid =
    normalize(option) === "onboard" ||
    normalize(option) === "manage" ||
    normalize(option) === "intellectual-property" ||
    normalize(option) === "tax" ||
    normalize(option) === "compliance";

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

  //Save promo info to localStorage
  useEffect(() => {
    savePromo();
  }, [promoResponse.isError, promoResponse.isSuccess]);

  const { title, titleSubText } = getHeaderText(option);

  const isManageorOnboard = normalize(option) === "manage" || normalize(option) === "onboard";
  const hidePrev = complyInfo?.paid || !isManageorOnboard;

  const promoPrice = getPromoPrice(selectedService);
  const promoError = promoResponse.error?.data?.message;
  const promoWarn = getPromoWarn(selectedService);

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
                {(!has_used_referral_code || isPartner) && (
                  <div style={{ maxWidth: "430px" }}>
                    <InputWithLabel
                      label="Promo Code (Optional)"
                      labelStyle="input-label"
                      placeholder="Enter promo code if you have one"
                      type="text"
                      inputClass="input-class"
                      containerStyle="input-container-class"
                      errorMessage={promoError}
                      warningMessage={!promoError && promoWarn}
                      onChange={handlePromo}
                      onKeyDown={handlePromoKeyDown}
                      onBlur={() => setFetchPromo(true)}
                      value={promoCode}
                      overlayComponent={
                        promoResponse.error || promoWarn ? (
                          <MdError color={promoWarn ? "#D77000" : "red"} />
                        ) : (
                          promoResponse.isSuccess && (
                            <PromoCheck>
                              <IoIosCheckmarkCircle color={"green"} />
                            </PromoCheck>
                          )
                        )
                      }
                    />
                  </div>
                )}
              </LaunchFormContainer>
              {selectedService?.serviceName && (
                <InfoContainer
                  country={countries?.data?.find((el) => el.countryName === selectedCountry) || ""}
                  service={selectedService}
                  promoPrice={!promoError && !promoWarn && promoPrice}
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
