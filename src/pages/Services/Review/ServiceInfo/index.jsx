import InfoCard from "components/cards/InfoCard";
import { CheckoutController } from "containers";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useLazyViewComplyQuery } from "services/complyService";
import { useGetAllCountriesQuery, useGetSingleServiceQuery } from "services/staffService";
import { Bottom } from "../style";
import { Container,CountryInput, EditWrapper, FilledContainer, InnerContainer, Label, Loading, TopFlex, Wrapper } from "./style";
import { Puff } from "react-loading-icons";



const ServiceInfoReview = () => {
  const viewComply = useOutletContext();
  console.log(viewComply)

  
  const viewService = useGetSingleServiceQuery(viewComply?.data?.serviceId);

  const countries = useGetAllCountriesQuery();

  console.log(viewService);
  let getCountry = countries?.data?.find(
    (country) => country?.countryISO === viewService?.data?.serviceCountry
  )?.countryName;

  const navigate = useNavigate();

  const handlePrev = () => {
    navigate(-1);
  };

  const handleNext = async () => {
    navigate("/services/review/form");
  };
  return (
    <Wrapper>
      {viewComply?.isLoading && (
          <Loading height="50vh">
            <Puff stroke="#00A2D4" fill="white" />
          </Loading>
      )}
      <Container>
        <InnerContainer>
          <TopFlex>
            <Label>Operational Country</Label>
            <EditWrapper></EditWrapper>
          </TopFlex>
          <FilledContainer>
            <CountryInput>{getCountry}</CountryInput>
          </FilledContainer>
        </InnerContainer>
        <InnerContainer>
          <Label>Service Required</Label>

          <FilledContainer>
            <CountryInput>{viewService?.data?.serviceName}</CountryInput>
          </FilledContainer>
        </InnerContainer>
      </Container>

      <Bottom>
        <CheckoutController
          backText={"Previous"}
          forwardSubmit
          backAction={handlePrev}
          forwardAction={handleNext}
          forwardText="Next"
        />
      </Bottom>
    </Wrapper>
  );
};

export default ServiceInfoReview;

