import { BusinessHomeTable } from "components/Staff/Tables";
import React, { useEffect, useState } from "react";
import { useGetSubmittedLaunchQuery } from "services/staffService";

const AwaitingBusinessesSummary = () => {
  const [submitted, setSubmitted] = useState([]);

  const { data, isLoading, isSuccess } = useGetSubmittedLaunchQuery();

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
