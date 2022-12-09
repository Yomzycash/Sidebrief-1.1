import { BusinessHomeTable } from "components/Staff/Tables";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useGetAllSubmittedLaunchesQuery } from "services/launchService";

const AllBusinessesSummary = () => {
  const [submitted, setSubmitted] = useState([]);

  const { data, isLoading, isSuccess } = useGetAllSubmittedLaunchesQuery();

  useEffect(() => {
    setSubmitted(
      data &&
        data.map((reg) => {
          return {
            name: reg.businessNames?.businessName1,
            country: reg?.registrationCountry,
            date: reg?.updatedAt.slice(0, 10),
          };
        })
    );
  }, [data]);

  return <BusinessHomeTable data={submitted} />;
};

export default AllBusinessesSummary;
