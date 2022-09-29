import React, { useEffect, useState } from "react";
import { CheckoutController, CheckoutSection } from "containers";
import { Body, Bottom, Container, Header, EntityCardsWrapper } from "../styled";
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
} from "services/launchService";

import toast from "react-hot-toast";

const EntitySelect = () => {
  const navigate = useNavigate();
  const [entities, setEntities] = useState([]);
  const [launchCode, setLaunchCode] = useState();

  // Get necessary information from store
  const countryISO = useSelector((store) => store.LaunchReducer.countryISO);
  const selectCountry = useSelector(
    (store) => store.LaunchReducer.selectedCountry
  );
  const businessNames = useSelector(
    (store) => store.LaunchReducer.businessNames
  );
  const selectedObjectives = useSelector(
    (store) => store.LaunchReducer.selectedObjectives
  );

  const { data, error, isLoading, isSuccess } =
    useGetAllEntitiesQuery(countryISO);

  const [getStarted] = useGetStartedMutation();
  const [addBusinessNames] = useAddBusinessNamesMutation();
  const [addBusinessObjectives] = useAddBusinessObjectivesMutation();

  // Set to state all entities of the specified country
  useEffect(() => {
    setEntities(data);
  }, [data]);

  // This fires off when the next button is clicked
  const handleNext = async (selectedItem) => {
    store.dispatch(setCheckoutProgress({ total: 13, current: 2 })); // total- total pages and current - current page
    store.dispatch(setSelectedEntity(selectedItem));

    // To be sent to the backend
    const requiredLaunchData = {
      registrationCountry: countryISO,
      registrationType: selectedItem.entityCode,
    };
    let launchResponse = await getStarted(requiredLaunchData);
    if (launchResponse.data) {
      const launchCode = await launchResponse.data.launchCode;
      store.dispatch(setGeneratedLaunchCode(launchCode));
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
          businessObject2: selectedObjectives[1],
          businessObject3: selectedObjectives[2],
          businessObject4: selectedObjectives[3],
        },
      };

      const businessNamesResponse = await addBusinessNames(
        requiredBusinessNamesData
      );

      const businessObjectivesResponse = await addBusinessObjectives(
        requiredBusinessObjectives
      );

      console.log(businessNamesResponse);

      // let data = businessNamesResponse?.data;

      let error = businessNamesResponse?.error;
      if (error) {
        toast.error(error.data.message);
      }

      console.log(businessObjectivesResponse);

      navigate("/launch/address");
    }
  };

  return (
    <Container>
      <Header>
        <HeaderCheckout />
      </Header>
      <Body style={{ maxWidth: "100%" }}>
        <CheckoutSection title={"Operational Country: " + selectCountry}>
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
      </Body>
    </Container>
  );
};

export default EntitySelect;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//   .eyJpZCI6IjYzMjM5MjlhNDdkZjU3MjdlNWQzZTg4ZSIsImlhdCI6MTY2MzI3NTY3NCwiZXhwIjoyNTI3Mjc1Njc0fQ
//   .Ny2kvYtiUImSx6jmVHIhYp3MWWhlB9h2KrcZ1Sj10JI;
