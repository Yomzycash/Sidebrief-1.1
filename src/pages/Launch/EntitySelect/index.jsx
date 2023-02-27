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
import { handleBusinessInfo } from "../BusinessInfo/actions";

const EntitySelect = () => {
  const navigate = useNavigate();
  const [entities, setEntities] = useState([]);

  // Get necessary information from store
  // const countryISO = useSelector((store) => store.LaunchReducer.countryISO);
  // const selectCountry = useSelector(
  //   (store) => store.LaunchReducer.selectedCountry
  // );
  const [getStarted, launchState] = useGetStartedMutation();
  const [updateLaunch, launchUpdateState] = useUpdateLaunchMutation();
  const [addBusinessNames] = useAddBusinessNamesMutation();
  const [updateBusinessNames] = useUpdateBusinessNamesMutation();
  const [addBusinessObjectives] = useAddBusinessObjectivesMutation();
  const [updateBusinessObjectives] = useUpdateBusinessObjectivesMutation();
  const [viewBusinessNames] = useViewBusinessNamesMutation();
  const [viewBusinessObjectives] = useViewBusinessObjectivesMutation();

  const LaunchInfo = useSelector((store) => store.LaunchReducer);
  const {
    selectedObjectives,
    generatedLaunchCode,
    businessNames,
    // countryISO,
    selectedCountry,
    launchResponse,
  } = LaunchInfo;

  let countryISO = localStorage.getItem("countryISO");

  const countryISOView = launchResponse.registrationCountry;

  const { data, error, isLoading, isSuccess } = useGetAllEntitiesQuery(
    countryISO ? countryISO : countryISOView
  );

  let existingLaunchInfo = JSON.parse(localStorage.getItem("launchInfo"));

  // Set to state all entities of the specified country
  useEffect(() => {
    if (data)
      setEntities(
        data.map((el) => ({
          ...el,
          usdRate:
            currencyRate?.filter(
              (each) => each?.currency === el?.entityCurrency
            )[0]?.usdRate * el?.entityFee,
        }))
      );

    if (error?.status === "FETCH_ERROR") {
      toast.error("Connection error");
    }
  }, [data, error?.status]);

  //
  console.log(entities);
  //

  // This fires off when an entity is selected
  const handleNext = async (selectedItem) => {
    store.dispatch(setSelectedEntity(selectedItem));
    // console.log(checkIsString(entities.entityFee) ? 'true' : 'false')
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
      launchCode: existingLaunchInfo?.launchCode,
      registrationCountry: selectedItem.entityCountry,
      registrationType: selectedItem.entityCode,
    };
    // If generatedLaunchCode exists in store, then it runs update endpoint. If otherwise, it runs get started endpoint.
    const launchResponse = existingLaunchInfo
      ? await updateLaunch(requiredLaunchUpdateData)
      : await getStarted(requiredLaunchData);

    // Set the launch response to local storage
    if (existingLaunchInfo) {
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

    let responseData = existingLaunchInfo
      ? launchResponse?.data[0]
      : launchResponse?.data;

    handleResponse(responseData, requiredLaunchUpdateData);
  };

  //
  // Handle launch response
  const handleResponse = async (responseData) => {
    if (responseData) {
      // Get launchCode from the launch response
      const launchCode = responseData?.launchCode;

      // If launchCode does not exist, store the launch code gotten from the launch response
      if (!generatedLaunchCode) {
        store.dispatch(setGeneratedLaunchCode(launchCode));
      }

      // Navigate if business names and objectives exist in the store
      if (businessNames.length > 0 && selectedObjectives.length > 0)
        navigate("/launch/payment");

      const info = {
        businessNames: businessNames,
        selectedObjectives: selectedObjectives,
        responseData: responseData,
        viewBusinessNames: viewBusinessNames,
        viewBusinessObjectives: viewBusinessObjectives,
        updateBusinessNames: updateBusinessNames,
        addBusinessNames: addBusinessNames,
        updateBusinessObjectives: updateBusinessObjectives,
        addBusinessObjectives: addBusinessObjectives,
      };
      console.log(info);
      await handleBusinessInfo(info);
    } else {
      if (launchResponse?.error?.status === "FETCH_ERROR") {
        toast.error("Connection error");
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
    store.dispatch(setCheckoutProgress({ total: 13, current: 2 })); // total- total pages and current - current page
  }, []);

  return (
    <Container>
      <Header>
        <HeaderCheckout />
      </Header>
      <Body style={{ maxWidth: "100%" }}>
        <CheckoutSection>
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
                ?.sort((a, b) => a?.usdRate - b?.usdRate)
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
                    features={item?.entityFeatures}
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
    </Container>
  );
};

export default EntitySelect;

const currencyRate = [
  { currency: "NGN", usdRate: 0.002171323 },
  { currency: "KES", usdRate: 0.0079684653 },
  { currency: "ZAR", usdRate: 0.055761334 },
  { currency: "USD", usdRate: 1 },
];
