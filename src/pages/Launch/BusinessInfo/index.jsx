import React, { useEffect, useState } from "react";
import HeaderCheckout from "components/Header/HeaderCheckout";
// import DropDownWithSearch from "components/input/DropDownWithSearch";
import TagInput from "components/input/TagInput";
import { CheckoutController, CheckoutSection } from "containers";
import { Body, Bottom, Container } from "../styled";
import { useNavigate } from "react-router-dom";
import { store } from "redux/Store";
import {
  setCheckoutProgress,
  setCountryISO,
  setCountry,
  setSelectedBusinessNames,
  setBusinessObjectives,
} from "redux/Slices";
import TagInputWithSearch from "components/input/TagInputWithSearch";
import { BusinessObjectives } from "utils/config";
import {
  useGetAllCountriesQuery,
  useViewBusinessNamesMutation,
  useViewBusinessObjectivesMutation,
} from "services/launchService";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const BusinessInfo = () => {
  const LaunchInfo = useSelector((store) => store.LaunchReducer);

  const [businessNames, setBusinessNames] = useState([]);
  const [selectedCountry, setselectedCountry] = useState(
    LaunchInfo.selectedCountry
  );
  const [selectedObjectives, setselectedObjectives] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countriesData, setCountriesData] = useState([]);
  const [selectedCountryISO, setselectedCountryISO] = useState("");

  const { data, error, isLoading, isSuccess } = useGetAllCountriesQuery();
  const [viewBusinessNames, viewNamesState] = useViewBusinessNamesMutation();
  const [viewBusinessObjectives, viewObjectivesState] =
    useViewBusinessObjectivesMutation();

  const navigate = useNavigate();

  // This runs when next button is clicked
  const handleNext = () => {
    store.dispatch(setCountry(selectedCountry));
    store.dispatch(setCountryISO(selectedCountryISO));

    if (businessNames.length === 4) {
      store.dispatch(setSelectedBusinessNames(businessNames));
    } else {
      toast.error("Please add exactly 4 business names");
      return;
    }
    if (selectedObjectives.length >= 1) {
      store.dispatch(setBusinessObjectives(selectedObjectives));
    } else {
      toast.error("Please add at least one objective");
      return;
    }
    if (!selectedCountry) {
      toast.error("Please select an operational country");
      return;
    }

    navigate("/launch/entity");
  };

  const handlePrev = () => {
    navigate(-1);
  };

  const handleBusinessNames = (valuesSelected) => {
    setBusinessNames(valuesSelected);
  };

  // Handle supported countries fetch
  const handleCountry = async (value) => {
    let responseData = await data;
    let countries = [];
    responseData?.forEach((data) => {
      countries = [...countries, data?.countryName];
    });
    if (responseData) {
      setCountriesData([...responseData]);
      setCountries([...countries]);
      setselectedCountry(value);
    }
  };

  const handleObjectives = (valuesSelected) => {
    setselectedObjectives(valuesSelected);
  };

  // Update the supported countries when data changes
  useEffect(() => {
    handleCountry();
  }, [data]);

  // Set the selected country's ISO
  useEffect(() => {
    const countryData = countriesData.filter(
      (data) => data.countryName === selectedCountry
    );
    let selectedCountryObj = { ...countryData[0] };
    setselectedCountryISO(selectedCountryObj.countryISO);
  }, [selectedCountry]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  // Set the progress of the application
  useEffect(() => {
    store.dispatch(setCheckoutProgress({ total: 13, current: 0 })); // total- total pages and current - current page
  }, []);

  return (
    <Container onClick={handleSubmit}>
      <HeaderCheckout getStarted />

      <Body>
        <CheckoutSection
          title="Business Information"
          HeaderParagraph="Let's sail you through, take this swift walk with us."
        />
        <LaunchPrimaryContainer>
          <LaunchFormContainer>
            <TagInput
              initialValues={LaunchInfo.businessNames}
              getSelectedValues={handleBusinessNames}
            />

            <TagInputWithSearch
              label="Business Objectives"
              list={BusinessObjectives}
              getValue={handleObjectives}
              initialValues={LaunchInfo.selectedObjectives}
              MultiSelect
              ExistsError="Objective has already been selected"
              MatchError="Please select objectives from the list"
              EmptyError="Please select at least one objective"
              MaxError="You cannot select more than 4"
            />
            <div style={{ maxWidth: "430px" }}>
              <TagInputWithSearch
                label="Operational Country"
                list={countries}
                getValue={handleCountry}
                initialValue={LaunchInfo.selectedCountry}
              />
            </div>
          </LaunchFormContainer>
          <Bottom>
            <CheckoutController
              forwardAction={handleNext}
              backAction={handlePrev}
              backText={"Previous"}
              forwardText={"Next"}
              forwardDisable={
                businessNames.length !== 4 ||
                selectedObjectives.length < 1 ||
                !selectedCountry
              }
              hidePrev
            />
          </Bottom>
        </LaunchPrimaryContainer>
      </Body>
    </Container>
  );
};

export default BusinessInfo;
