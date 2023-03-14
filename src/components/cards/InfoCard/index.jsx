import React, { useEffect, useState } from "react";
import { useGetAllCountriesQuery, useViewServiceQuery } from "services/complyService";
import { Answer, Heading, LowerContainer, Span, SubContainer } from "./style";

const InfoCard = () => {
  const complyCodeData = JSON.parse(localStorage.getItem("complyData"));

  let serviceId = complyCodeData.serviceId;
  const viewService = useViewServiceQuery(serviceId);

  const countries = useGetAllCountriesQuery();

  console.log(countries);
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
        {/* <Heading>Why do online reviews matter?</Heading>
        <Answer>
          {' '}
          on a personal, cyber, and financial level. The types of reviews posted
          about your business influence the opinions of potential customers,
          current customers, employees and even business owners. While the words
          shared by customers online usually don’t make or break businesses,
          they can alter the trajectory in significant ways. Because of how
          search engines like Google are constructed, online reviews influence
          where a business appears in the results when consumers research local
          businesses. Consistently positive reviews from review sites push
          businesses up the search queue, while negative reviews drop them down
          the list and make it increasingly unlikely that customers will contact
          or visit the company. More website traffic and more general exposure
          yield greater profits for smartly run businesses. Those who think
          online reviews don’t matter are doomed to less traffic and smaller
          profits.
        </Answer> */}
      </SubContainer>
    </LowerContainer>
  );
};

export default InfoCard;
