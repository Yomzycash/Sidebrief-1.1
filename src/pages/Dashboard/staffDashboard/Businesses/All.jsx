import { BusinessHomeTable } from "components/Staff/Tables";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useGetSubmittedLaunchQuery } from "services/staffService";
import { sortTableData } from "utils/staffHelper";

const AllBusinessesSummary = () => {
  const [submitted, setSubmitted] = useState([]);

  const { data } = useGetSubmittedLaunchQuery();

  let sortArr = [...data];
  let sortedArr = sortArr?.sort(sortTableData);

  useEffect(() => {
    setSubmitted(
      sortedArr &&
        sortedArr.map((reg) => {
          return {
            name: reg.businessNames?.businessName1,
            country: reg?.registrationCountry,
            date: reg?.updatedAt.slice(0, 10),
          };
        })
    );
  }, [sortedArr]);

  return (
    <BusinessHomeTable
      data={submitted}
      link="/staff-dashboard/businesses/registration"
    />
  );
};

export default AllBusinessesSummary;
