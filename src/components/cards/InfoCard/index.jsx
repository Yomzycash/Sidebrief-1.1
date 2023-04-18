import React, { useEffect, useState } from "react";
import { useGetAllCountriesQuery, useGetSingleServiceQuery } from "services/staffService";
import { Answer, Heading, LowerContainer, Span, SubContainer } from "./style";

const InfoCard = () => {
  const complyCodeData = JSON.parse(localStorage.getItem("complyData"));

  let serviceId = complyCodeData.serviceId;
  const viewService = useGetSingleServiceQuery(serviceId);

  const countries = useGetAllCountriesQuery();

  let getCountry = countries?.data?.find(
    (country) => country?.countryISO === viewService?.data?.serviceCountry
  );

  return (
    <LowerContainer>
      <SubContainer>
        <Heading>
          Company's Location :<Span> {getCountry?.countryName}</Span>
        </Heading>
        <Heading>
          {" "}
          Resource : <Span>{viewService?.data?.serviceName}</Span>
        </Heading>
      </SubContainer>
      <SubContainer>
        
      </SubContainer>
    </LowerContainer>
  );
};

export default InfoCard;
