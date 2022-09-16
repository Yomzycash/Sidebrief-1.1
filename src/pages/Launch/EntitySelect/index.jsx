import React, { useEffect, useState } from "react";
import { CheckoutController, CheckoutSection } from "containers";
import { Body, Bottom, Container, Header, EntityCardsWrapper } from "../styled";
import { EntityCard } from "components/cards";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { Entities } from "utils/config";
import { setCheckoutProgress, selectedEntity } from "redux/Slices";
import { store } from "redux/Store";
import { useSelector } from "react-redux";
import {
  useGetAllEntitiesQuery,
  useGetStartedMutation,
} from "services/launchService";

const EntitySelect = () => {
  const navigate = useNavigate();
  const [entities, setEntities] = useState([]);

  const countryISO = useSelector((store) => store.LaunchReducer.countryISO);
  const selectCountry = useSelector(
    (store) => store.LaunchReducer.selectedCountry
  );

  const { data, error, isLoading, isSuccess } =
    useGetAllEntitiesQuery(countryISO);

  const [getStarted] = useGetStartedMutation();

  useEffect(() => {
    setEntities(data);
  }, [data]);

  const handleNext = async (selectedItem) => {
    navigate("/checkout/address");
    store.dispatch(setCheckoutProgress({ total: 10, current: 2 })); // total- total pages and current - current page
    store.dispatch(selectedEntity(selectedItem));

    const data = {
      registrationcountry: countryISO,
      registrationType: selectedItem.entityCode,
    };

    const response = await getStarted(JSON.stringify(data));
    let error = response?.error;

    // if (response) {
    //   store.dispatch;
    // }
  };

  const handlePrev = () => {
    navigate(-1);
    store.dispatch(setCheckoutProgress({ total: 10, current: 1 })); // total- total pages and current - current page
  };

  return (
    <Container>
      <Header>
        <HeaderCheckout />
      </Header>
      <Body>
        <CheckoutSection title={"Operational Country: " + selectCountry}>
          <EntityCardsWrapper>
            {entities?.map((item, index) => (
              <div>
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
              </div>
            ))}
          </EntityCardsWrapper>
        </CheckoutSection>
      </Body>
    </Container>
  );
};

export default EntitySelect;
