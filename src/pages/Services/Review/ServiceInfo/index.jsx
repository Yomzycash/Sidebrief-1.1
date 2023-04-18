import InfoCard from "components/cards/InfoCard";
import { CheckoutController } from "containers";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useUpdateComplyMutation } from "services/complyService";
import { useGetAllCountriesQuery, useGetSingleServiceQuery } from "services/staffService";
import { Bottom } from "../style";
import {
  Container,
  CountryInput,
  EditWrapper,
  FilledContainer,
  InnerContainer,
  Label,
  Loading,
  TopFlex,
  Wrapper,
} from "./style";
import { Puff } from "react-loading-icons";
import { useActions } from "../actions";

const ServiceInfoReview = () => {
  const viewComply = useOutletContext();
  const serviceId = viewComply?.data?.serviceId;
  const form = viewComply?.data?.complyData;
  const documents = viewComply?.data?.complyDocuments;

  let noForm = form?.length < 1;
  let noDocument = documents?.length < 1;
  let done = noForm && noDocument;

  const countries = useGetAllCountriesQuery();
  const viewService = useGetSingleServiceQuery(serviceId);
  const [updateComply, updateState] = useUpdateComplyMutation();

  const { handleStatusUpdate } = useActions({
    serviceId,
    complyInfo: viewComply?.data,
    updateComply,
  });

  let getCountry = countries?.data?.find(
    (country) => country?.countryISO === viewService?.data?.serviceCountry
  )?.countryName;

  const navigate = useNavigate();
  let { option } = useParams();

  const handlePrev = () => {
    navigate(-1);
  };

  const handleNext = async (e) => {
    let link = `/services/${option}/review/form`;
    link = noForm ? `/services/${option}/review/documents` : link;
    link = done ? `/services/${option}/success` : link;

    if (done) {
      let response = await handleStatusUpdate();
      response.data && navigate(link);
    } else {
      navigate(link);
    }
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
          backAction={handlePrev}
          forwardAction={handleNext}
          forwardText={done ? "Done" : "Next"}
          forwardLoading={updateState.isLoading}
        />
      </Bottom>
    </Wrapper>
  );
};

export default ServiceInfoReview;
