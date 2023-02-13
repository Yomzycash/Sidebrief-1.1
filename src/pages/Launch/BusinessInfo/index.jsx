import React, { useEffect, useState, useCallback } from "react";
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
  useUpdateBusinessNamesMutation,
  useUpdateBusinessObjectivesMutation,
  useViewBusinessNamesMutation,
  useViewBusinessObjectivesMutation,
  useViewPayLaunchMutation,
} from "services/launchService";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import AppFeedback from "components/AppFeedback";
import { set } from "date-fns";
import { handleBusinessInfo } from "./actions";

const BusinessInfo = () => {
  const LaunchInfo = useSelector((store) => store.LaunchReducer);
  const { launchResponse } = LaunchInfo;

  const [businessNames, setBusinessNames] = useState([]);
  const [selectedCountry, setselectedCountry] = useState("");
  const [selectedObjectives, setselectedObjectives] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countriesData, setCountriesData] = useState([]);
  const [selectedCountryISO, setselectedCountryISO] = useState("");
  // const [paid, setPaid] = useState(false);

  const { data, isLoading } = useGetAllCountriesQuery();
  const [viewBusinessNames, viewNamesState] = useViewBusinessNamesMutation();
  const [viewBusinessObjectives, viewObjectivesState] =
    useViewBusinessObjectivesMutation();
  const [updateBusinessNames, updateNamesState] =
    useUpdateBusinessNamesMutation();
  const [updateBusinessObjectives, updateObjectivesState] =
    useUpdateBusinessObjectivesMutation();
  const [viewPayLaunch] = useViewPayLaunchMutation();

  const navigate = useNavigate();

  let navigatedFrom = localStorage.getItem("navigatedFrom");

  // Get payment information from the local storage
  const paymentDetails = JSON.parse(localStorage.getItem("paymentDetails"));
  let paidStatus =
    paymentDetails?.paymentStatus === "successful" ? true : false;

  // This runs when next button is clicked
  const handleNext = async () => {
    store.dispatch(setCountry(selectedCountry));
    store.dispatch(setCountryISO(selectedCountryISO));
    localStorage.setItem("countryISO", selectedCountryISO);
    // store.dispatch(setCountryISO(selectedCountryISO));
    let resultToReturn = false;
    // call some function with callback function as argument
    resultToReturn = businessNames.some((element, index) => {
      return businessNames.indexOf(element) !== index;
    });
    if (businessNames.length === 4 && !resultToReturn) {
      store.dispatch(setSelectedBusinessNames(businessNames));
    } else if (businessNames.length !== 4) {
      toast.error("Please add exactly 4 business names");
      return;
    } else if (resultToReturn) {
      toast.error("Please input unique business names");
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

    if (navigatedFrom) {
      const actionInfo = {
        navigate: navigate,
        businessNames: businessNames,
        selectedObjectives: selectedObjectives,
        responseData: launchResponse,
        updateBusinessNames: updateBusinessNames,
        updateBusinessObjectives: updateBusinessObjectives,
        viewBusinessNames: viewBusinessNames,
        viewBusinessObjectives: viewBusinessObjectives,
        addBusinessNames: () => {},
        addBusinessObjectives: () => {},
      };
      await handleBusinessInfo(actionInfo);
      navigate(navigatedFrom);
      localStorage.removeItem("navigatedFrom");
    } else {
      if (paidStatus) navigate("/launch/address");
      else navigate("/launch/entity");
    }
  };

  const handlePrev = () => {
    navigate(-1);
  };
  const handleBusinessNames = (valuesSelected) => {
    setBusinessNames(valuesSelected);
  };

  // Handle supported countries fetch
  const handleCountry = useCallback(
    async (value) => {
      let countries = data?.map((el) => el?.countryName);
      if (data) {
        setCountriesData(data);
        setCountries(countries);
        setselectedCountry(value);
      }
      // else if (isError) {
      //   let count = 0;
      //   var intervalId = setInterval(() => {
      //     if (isSuccess) {
      //       clearInterval(intervalId);
      //       return;
      //     } else if (count <= 10) {
      //       refetch();
      //       count++;
      //     }
      //   }, 10000);
      // }
    },
    [data]
  );

  const handleObjectives = (valuesSelected) => {
    setselectedObjectives(valuesSelected);
  };

  // Update the supported countries when data changes
  useEffect(() => {
    handleCountry();
    if (launchResponse && data) {
      let countrySelected = data?.filter(
        (country) => country.countryISO === launchResponse.registrationCountry
      );
      setselectedCountry(countrySelected[0]?.countryName);
    }
  }, [data, handleCountry, launchResponse]);

  // This calls the view endpoint and set the recieved data to the respective states
  const viewDraft = useCallback(async () => {
    if (Object.keys(launchResponse).length === 0) return;
    const namesData = await viewBusinessNames(launchResponse);
    const objectivesData = await viewBusinessObjectives(launchResponse);
    if (namesData.data)
      setBusinessNames(Object.values(namesData.data.businessNames));
    if (objectivesData.data) {
      let objectives = Object.values(objectivesData.data.businessObjects);
      let filtered = objectives.filter((objective) => objective !== "null");
      setselectedObjectives(filtered);
    }
  }, [launchResponse, viewBusinessNames, viewBusinessObjectives]);

  //

  //
  // // Check the payment status of the
  // const handlePaymentStatus = async () => {
  //   let actionInfo = {
  //     ...launchResponse,
  //     viewPayLaunch: viewPayLaunch,
  //   };
  //   setPaid(await checkPaymentStatus(actionInfo));
  // };

  // Set the selected country's ISO
  useEffect(() => {
    viewDraft();
    const countryData = countriesData.filter(
      (data) => data.countryName === selectedCountry
    );
    let selectedCountryObj = { ...countryData[0] };
    setselectedCountryISO(selectedCountryObj.countryISO);
  }, [selectedCountry, countriesData, viewDraft]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  // Set the progress of the application
  useEffect(() => {
    let review = localStorage.getItem("navigatedFrom");

    let filled =
      selectedObjectives?.length > 0 &&
      businessNames?.length === 4 &&
      selectedCountry;

    store.dispatch(
      setCheckoutProgress({
        total: 13,
        current: review ? 13 : filled ? 0.1 : 0,
      })
    ); // total- total pages and current - current page
  }, [selectedObjectives.length, businessNames.length, selectedCountry]);

  useEffect(() => {
    viewDraft();
  }, [viewDraft]);

  return (
    <>
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
                initialValues={businessNames}
                getSelectedValues={handleBusinessNames}
              />

              <TagInputWithSearch
                label="Business Objectives"
                list={BusinessObjectives.sort()}
                getValue={handleObjectives}
                initialValues={selectedObjectives}
                MultiSelect
                ExistsError="Objective has already been selected"
                MatchError="Please select objectives from the list"
                EmptyError="Please select at least one objective"
                MaxError="You cannot select more than 4 objectives"
                noSuggestionText="Objective doesn't exist"
              />
              <div style={{ maxWidth: "430px" }}>
                <TagInputWithSearch
                  label="Operational Country"
                  list={countries}
                  getValue={handleCountry}
                  initialValue={selectedCountry}
                  suggestionLoading={isLoading}
                  fetchingText="Fetching Countries..."
                  fetchFailedText="Could not fetch Countries"
                  disabled={paidStatus}
                />
              </div>
            </LaunchFormContainer>
            <Bottom>
              <CheckoutController
                forwardAction={handleNext}
                backAction={handlePrev}
                backText={"Previous"}
                forwardText={"Next"}
                forwardLoading={
                  updateNamesState.isLoading || updateObjectivesState.isLoading
                }
                hidePrev
              />
            </Bottom>
          </LaunchPrimaryContainer>
        </Body>
      </Container>
      {/* <AppFeedback subProject="Business information" /> */}
    </>
  );
};

export default BusinessInfo;
