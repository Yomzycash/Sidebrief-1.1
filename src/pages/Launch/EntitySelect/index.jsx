import React, { useEffect, useState } from "react";
import { CheckoutController, CheckoutSection } from "containers";
import {
  Body,
  Bottom,
  Container,
  Header,
  EntityCardsWrapper,
  Loading,
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

  console.log(countryISO);

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

  //
  // This fires off when an entity is selected
  const handleNext = async (selectedItem) => {
    store.dispatch(setSelectedEntity(selectedItem));

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

    console.log(launchResponse);

    // Set the launch response to local storage
    if (generatedLaunchCode) {
      // An array is returned, if update response
      store.dispatch(setLaunchResponse(launchResponse.data[0])); // !important DO NOT DELETE
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

      handleBusinessInfo(requiredLaunchInfo, launchCode);

      console.log(launchCode);
    } else {
      if (launchResponse?.error?.status === "FETCH_ERROR") {
        toast.error("Please check your internet connection");
      } else {
        toast.error(launchResponse?.error?.error);
      }
    }
  };

  //
  // Send business information to the backend
  const handleBusinessInfo = async (requiredLaunchInfo, launchCode) => {
    // Check if business names or objectives exists
    let existingNames = await viewBusinessNames(requiredLaunchInfo);
    let existingObjectives = await viewBusinessObjectives(requiredLaunchInfo);

    let namesExists = existingNames?.data?.businessNames;
    let objectivesExists = existingObjectives?.data?.businessObjects;

    // Navigate if business names and objectives exist
    if (namesExists && objectivesExists) navigate("/launch/payment");

    const requiredBusinessNamesData = {
      launchCode: launchCode,
      businessNames: {
        businessName1: businessNames[0],
        businessName2: businessNames[1],
        businessName3: businessNames[2],
        businessName4: businessNames[3],
      },
    };

    const requiredBusinessObjectives = {
      launchCode: launchCode,
      businessObjects: {
        businessObject1: selectedObjectives[0],
        businessObject2: selectedObjectives[1] || "null",
        businessObject3: selectedObjectives[2] || "null",
        businessObject4: selectedObjectives[3] || "null",
      },
    };

    // Update if business names exist, add if otherwise
    const businessNamesResponse = namesExists
      ? await updateBusinessNames(requiredBusinessNamesData)
      : await addBusinessNames(requiredBusinessNamesData);

    // Update if business objectives exist, add if otherwise
    const businessObjectivesResponse = objectivesExists
      ? await updateBusinessObjectives(requiredBusinessObjectives)
      : await addBusinessObjectives(requiredBusinessObjectives);

    let error = businessNamesResponse?.error;
    let error2 = businessObjectivesResponse?.error;

    if (error) {
      console.log(error, error2);
      toast.error(error.data.message);
      toast.error(error2.data.message);
    }
  };

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
          title={`${selectedCountry.toUpperCase()}: Please select a business type to get started`}
          titleStyles={{
            fontWeight: 600,
          }}
        >
          {console.log(entities)}
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
                    shares={item?.entityShares}
                    type={item?.entityType}
                    timeline={item?.entityTimeline}
                    requirement={item?.entityRequirements}
                    price={item?.entityFee}
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
      <AppFeedback subProject="Entity select" />
    </Container>
  );
};

export default EntitySelect;
