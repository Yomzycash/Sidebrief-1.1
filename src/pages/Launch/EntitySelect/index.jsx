import React, { useEffect, useState } from "react";
import { CheckoutController, CheckoutSection } from "containers";
import { Body, Bottom, Container, Header, EntityCardsWrapper } from "../styled";
import { EntityCard } from "components/cards";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { Entities } from "utils/config";
import { setCheckoutProgress } from "redux/Slices";
import { store } from "redux/Store";
import { useSelector } from "react-redux";
import { useGetAllEntitiesQuery } from "services/launchService";

const EntitySelect = () => {
  const navigate = useNavigate();
  const [entities, setEntities] = useState([]);

  const countryISO = useSelector((store) => store.LaunchReducer.countryISO);

  const { data, error, isLoading, isSuccess } =
    useGetAllEntitiesQuery(countryISO);

  useEffect(() => {
    console.log(data);
  }, []);

  const handleNext = () => {
    navigate("/checkout/address");
    store.dispatch(setCheckoutProgress({ total: 10, current: 2 })); // total- total pages and current - current page
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
        <CheckoutSection title="Operational Country: Nigeria">
          <EntityCardsWrapper>
            {Entities.map((entity, index) => (
              <EntityCard
                key={index}
                name={entity?.name}
                shortname={entity?.shortname}
                price={entity?.price}
                company={entity?.company}
                timeline={entity?.timeline}
                shareholder={entity?.shareholder}
                shares={entity?.shares}
                type={entity?.type}
                action={handleNext}
              />
            ))}
          </EntityCardsWrapper>
        </CheckoutSection>
      </Body>
      {/* <Bottom>
        <CheckoutController
          forwardText={"Proceed"}
          backText={"Previous"}
          forwardAction={handleNext}
          backAction={handlePrev}
        />
      </Bottom> */}
    </Container>
  );
};

export default EntitySelect;
