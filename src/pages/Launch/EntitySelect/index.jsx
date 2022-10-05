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
} from "services/launchService";
import { Puff } from "react-loading-icons";
import toast from "react-hot-toast";

const EntitySelect = () => {
  const navigate = useNavigate();
  const [entities, setEntities] = useState([]);

  // Get necessary information from store
  const countryISO = useSelector((store) => store.LaunchReducer.countryISO);
  const selectCountry = useSelector(
    (store) => store.LaunchReducer.selectedCountry
  );

  const LaunchInfo = useSelector((store) => store.LaunchReducer);
  const { selectedObjectives, generatedLaunchCode, businessNames } = LaunchInfo;

  const { data, error, isLoading, isSuccess } =
    useGetAllEntitiesQuery(countryISO);

  const [getStarted] = useGetStartedMutation();
  const [updateLaunch] = useUpdateLaunchMutation();
  const [addBusinessNames] = useAddBusinessNamesMutation();
  const [updateBusinessNames] = useUpdateBusinessNamesMutation();
  const [addBusinessObjectives] = useAddBusinessObjectivesMutation();
  const [updateBusinessObjectives] = useUpdateBusinessObjectivesMutation();

  // Set to state all entities of the specified country
  useEffect(() => {
    setEntities(data);
    if (error?.status === "FETCH_ERROR") {
      toast.error("Please check your internet connection");
    }
  }, [data]);
  // This fires off when the next button is clicked
  const handleNext = async (selectedItem) => {
    store.dispatch(setCheckoutProgress({ total: 13, current: 2 })); // total- total pages and current - current page
    store.dispatch(setSelectedEntity(selectedItem));

    // To be sent to the backend to create a launch
    const requiredLaunchData = {
      registrationCountry: countryISO,
      registrationType: selectedItem.entityCode,
    };

    // To be sent to the backend to update a launch
    const requiredLaunchUpdateData = {
      launchCode: generatedLaunchCode,
      registrationCountry: countryISO,
      registrationType: selectedItem.entityCode,
    };

    let launchResponse = generatedLaunchCode
      ? await updateLaunch(requiredLaunchUpdateData)
      : await getStarted(requiredLaunchData);

    console.log(launchResponse);

    if (launchResponse.data) {
      const launchCode = generatedLaunchCode
        ? await launchResponse.data[0].launchCode
        : await launchResponse.data.launchCode;

      if (!generatedLaunchCode) {
        store.dispatch(setGeneratedLaunchCode(launchCode));
      }

      console.log(launchCode);

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
      const businessNamesResponse = generatedLaunchCode
        ? await updateBusinessNames(requiredBusinessNamesData)
        : await addBusinessNames(requiredBusinessNamesData);

      const businessObjectivesResponse = generatedLaunchCode
        ? await updateBusinessObjectives(requiredBusinessObjectives)
        : await addBusinessObjectives(requiredBusinessObjectives);

      console.log(businessNamesResponse);

      let error = businessNamesResponse?.error;
      if (error) {
        toast.error(error.data.message);
      }
      console.log(businessObjectivesResponse);

      navigate("/launch/payment");
    } else {
      let error = launchResponse.error;
      console.log(error);
    }
  };

  const handlePrev = () => {
    navigate(-1);
    store.dispatch(setCheckoutProgress({ total: 13, current: 2 })); // total- total pages and current - current page
  };

  return (
    <Container>
      <Header>
        <HeaderCheckout />
      </Header>
      <Body style={{ maxWidth: "100%" }}>
        <CheckoutSection title={"Operational Country: " + selectCountry}>
          {isLoading && (
            <Loading>
              <Puff stroke="#00A2D4" fill="white" width={60} />
            </Loading>
          )}
          <EntityCardsWrapper>
            {entities?.map((item, index) => (
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
    </Container>
  );
};

export default EntitySelect;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//   .eyJpZCI6IjYzMjM5MjlhNDdkZjU3MjdlNWQzZTg4ZSIsImlhdCI6MTY2MzI3NTY3NCwiZXhwIjoyNTI3Mjc1Njc0fQ
//   .Ny2kvYtiUImSx6jmVHIhYp3MWWhlB9h2KrcZ1Sj10JI;
