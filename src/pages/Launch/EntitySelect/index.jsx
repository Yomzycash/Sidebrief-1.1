import React, { useEffect, useState } from "react";
import { CheckoutController, CheckoutSection } from "containers";
import {
  Body,
  Bottom,
  Container,
  Header,
  EntityCardsWrapper,
  Loading,
  EntityTitle,
} from "../styled";
import { EntityCard } from "components/cards";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { useNavigate } from "react-router-dom";
import {
  setCheckoutProgress,
  setGeneratedLaunchCode,
  setSelectedEntity,
  setLaunchResponse,
} from "redux/Slices";
import { store } from "redux/Store";
import { useSelector } from "react-redux";
import {
  useAddBusinessNamesMutation,
  useAddBusinessObjectivesMutation,
  useGetAllEntitiesQuery,
  useGetStartedMutation,
  useUpdateBusinessNamesMutation,
  useUpdateBusinessObjectivesMutation,
  useUpdateLaunchMutation,
  useViewBusinessNamesMutation,
  useViewBusinessObjectivesMutation,
} from "services/launchService";
import { Puff } from "react-loading-icons";
import toast from "react-hot-toast";
import { Dialog, DialogContent } from "@mui/material";
import AppFeedback from "components/AppFeedback";
import { checkIsString } from "components/Indicators/status/actions";
import { handleBusinessInfo } from "./actions";

const EntitySelect = () => {
  const navigate = useNavigate();
  const [entities, setEntities] = useState([]);

  // Get necessary information from store
  // const countryISO = useSelector((store) => store.LaunchReducer.countryISO);
  // const selectCountry = useSelector(
  //   (store) => store.LaunchReducer.selectedCountry
  // );

  const LaunchInfo = useSelector((store) => store.LaunchReducer);
  const {
    selectedObjectives,
    generatedLaunchCode,
    businessNames,
    countryISO,
    selectedCountry,
    launchResponse,
  } = LaunchInfo;

  const countryISOView = launchResponse.registrationCountry;
  const launchCodeView = launchResponse.launchCode;
  const registrationTypeView = launchResponse.registrationType;

  const { data, error, isLoading, isSuccess } = useGetAllEntitiesQuery(
    countryISO ? countryISO : countryISOView
  );

  const [getStarted, launchState] = useGetStartedMutation();
  const [updateLaunch, launchUpdateState] = useUpdateLaunchMutation();
  const [addBusinessNames] = useAddBusinessNamesMutation();
  const [updateBusinessNames] = useUpdateBusinessNamesMutation();
  const [addBusinessObjectives] = useAddBusinessObjectivesMutation();
  const [updateBusinessObjectives] = useUpdateBusinessObjectivesMutation();
  const [viewBusinessNames] = useViewBusinessNamesMutation();
  const [viewBusinessObjectives] = useViewBusinessObjectivesMutation();

  // Set to state all entities of the specified country
  useEffect(() => {
    setEntities(data);

    if (error?.status === "FETCH_ERROR") {
      toast.error("Please check your internet connection");
    }
  }, [data, error?.status]);

  console.log("checking entities", data);
  //
  // This fires off when an entity is selected
  const handleNext = async (selectedItem) => {
    store.dispatch(setSelectedEntity(selectedItem));
    // console.log(checkIsString(entities.entityFee) ? 'true' : 'false')
    console.log(selectedItem);

    localStorage.setItem(
      "entityTimeline",
      JSON.stringify(selectedItem.entityTimeline)
    );

    // To be sent to the backend to create a launch
    const requiredLaunchData = {
      registrationCountry: selectedItem.entityCountry,
      registrationType: selectedItem.entityCode,
    };

    // To be sent to the backend to update a launch
    const requiredLaunchUpdateData = {
      launchCode: generatedLaunchCode,
      registrationCountry: selectedItem.entityCountry,
      registrationType: selectedItem.entityCode,
    };

    // If generatedLaunchCode exists in store, then it runs update endpoint. If otherwise, it runs get started endpoint.
    const launchResponse = generatedLaunchCode
      ? await updateLaunch(requiredLaunchUpdateData)
      : await getStarted(requiredLaunchData);
    console.log(generatedLaunchCode);
    console.log(launchResponse);

    // Set the launch response to local storage
    if (generatedLaunchCode) {
      // An array is returned, if update response
      store.dispatch(setLaunchResponse(launchResponse.data[0])); // !important DO NOT DELETE
      console.log(launchResponse);
      localStorage.setItem(
        "launchInfo",
        JSON.stringify(launchResponse.data[0])
      );
    } else {
      // An object is returned, if getStarted response
      store.dispatch(setLaunchResponse(launchResponse.data)); // !important DO NOT DELETE
      localStorage.setItem("launchInfo", JSON.stringify(launchResponse.data));
    }

    handleResponse(launchResponse, requiredLaunchUpdateData);
  };

  //
  // Handle launch response
  const handleResponse = (launchResponse, requiredLaunchInfo) => {
    if (launchResponse.data) {
      // Get launchCode from the launch response
      const launchCode = generatedLaunchCode
        ? launchResponse.data[0].launchCode
        : launchResponse.data.launchCode;

      // If launchCode does not exist, store the launch code gotten from the launch response
      if (!generatedLaunchCode) {
        store.dispatch(setGeneratedLaunchCode(launchCode));
      }

      // Navigate if business names and objectives exist in the store
      if (businessNames.length > 0 && selectedObjectives.length > 0)
        navigate("/launch/payment");

      const info = {
        navigate: navigate,
        businessNames: businessNames,
        selectedObjectives: selectedObjectives,
        viewBusinessNames: viewBusinessNames,
        viewBusinessObjectives: viewBusinessObjectives,
        updateBusinessNames: updateBusinessNames,
        addBusinessNames: addBusinessNames,
        updateBusinessObjectives: updateBusinessObjectives,
        addBusinessObjectives: addBusinessObjectives,
      };
      let businessResponse = handleBusinessInfo(
        requiredLaunchInfo,
        launchCode,
        info
      );
      if (businessResponse) navigate("/launch/payment");
    } else {
      if (launchResponse?.error?.status === "FETCH_ERROR") {
        toast.error("Please check your internet connection");
      } else {
        toast.error(launchResponse?.error?.error);
      }
    }
  };

  //

  // Navigate to the previous page
  const handlePrev = () => {
    navigate(-1);
  };

  // Launch loading state
  let loading = launchState.isLoading || launchUpdateState.isLoading;

  // Set the progress of the application
  useEffect(() => {
    store.dispatch(setCheckoutProgress({ total: 13, current: 1 })); // total- total pages and current - current page
  }, []);

  return (
    <Container>
      <Header>
        <HeaderCheckout />
      </Header>
      <Body style={{ maxWidth: "100%" }}>
        <CheckoutSection
        // title={`${selectedCountry.toUpperCase()}: Please select a business type to get started`}
        // titleStyles={{
        //   fontWeight: 600,
        // }}
        >
          {selectedCountry && (
            <EntityTitle>
              {selectedCountry}:
              <span> Please select a business type to get started</span>{" "}
            </EntityTitle>
          )}
          {isLoading && (
            <Loading height="300px">
              <Puff stroke="#00A2D4" fill="white" />
            </Loading>
          )}

          <EntityCardsWrapper>
            {entities &&
              [...entities]
                ?.sort((a, b) => a?.entityFee - b?.entityFee)
                .map((item, index) => (
                  <EntityCard
                    key={index}
                    name={item?.entityName}
                    shares={parseInt(item?.entityShares).toLocaleString(
                      "en-US"
                    )}
                    description={item?.entityDescription}
                    type={item?.entityType}
                    timeline={item?.entityTimeline}
                    country={countryISO === "NGA" ? "NGA" : ""}
                    features={countryISO === "NGA" && item?.entityFeatures}
                    requirement={item?.entityRequirements}
                    price={parseInt(item?.entityFee).toLocaleString("en-US")}
                    currency={item?.entityCurrency}
                    action={() => handleNext(item)}
                  />
                ))}
          </EntityCardsWrapper>
        </CheckoutSection>

        <Bottom>
          <CheckoutController
            backText={"Previous"}
            backAction={handlePrev}
            forwardSubmit={true}
            entity
          />
        </Bottom>
      </Body>
      {loading && (
        <Dialog open={true}>
          <DialogContent>
            <Puff stroke="#ffffff" fill="#ffffff" width={60} />
          </DialogContent>
        </Dialog>
      )}
      {/* <AppFeedback subProject="Entity select" /> */}
    </Container>
  );
};

export default EntitySelect;
