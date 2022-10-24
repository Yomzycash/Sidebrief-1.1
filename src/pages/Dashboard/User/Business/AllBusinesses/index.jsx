import { BusinessTable } from "components/Tables";
import React from "react";
import { Body, Container } from "./styled";

const AllBusinesses = () => {
  return (
    <Container>
      <Body>
        {/* <BusinessTable
          data={
            [
              {
                name: 'Sidebrief Africa',
                type: 'c-corporation',
                country: 'Nigeria',
                date: '28/09/2022',
              },
              {
                name: 'Ayomide technologies',
                type: 'limited liablity company',
                country: 'Kenya',
                date: '28/09/2022',
              },
              {
                name: 'Sidebrief Africa',
                type: 'c-corporation',
                country: 'Nigeria',
                date: '28/09/2022',
              },
              {
                name: 'Ayomide technologies',
                type: 'limited liablity company',
                country: 'Kenya',
                date: '28/09/202',
              },
            ]
          }
        /> */}
      </Body>
    </Container>
  );
};

export default AllBusinesses;
