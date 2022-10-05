import { BusinessTable } from "components/Tables";
import React from "react";
import { Body, Container } from "./styled";

const PendingApplications = () => {
  return (
    <Container>
      <Body>
        <BusinessTable
          data={[
            {
              name: "Ayomide Constructions and Husbands",
              type: "limited liablity company",
              country: "Nigeria",
              date: "28/09/2022",
            },
          ]}
        />
      </Body>
    </Container>
  );
};

export default PendingApplications;
