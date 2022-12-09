import { BusinessHomeTable } from "components/Staff/Tables";
import React, { useEffect, useState } from "react";
import { useGetAllSubmittedLaunchesQuery } from "services/launchService";

const AwaitingBusinessesSummary = () => {
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

  return (
    <BusinessHomeTable
      data={submitted}
      link="/staff-dashboard/businesses/registration/awating-approval"
    />
  );
};

export default AwaitingBusinessesSummary;
