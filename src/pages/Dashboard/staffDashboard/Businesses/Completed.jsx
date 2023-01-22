import { BusinessHomeTable } from "components/Staff/Tables";
import React, { useEffect, useState } from "react";
import { useGetRejectedLaunchQuery } from "services/staffService";
import { sortTableData } from "utils/staffHelper";

const CompletedBusinessesSummary = () => {
  const [completed, setCompleted] = useState([]);

  const { data, isLoading, isSuccess } = useGetRejectedLaunchQuery();

  let sortArr = [...data];
  let sortedArr = sortArr?.sort(sortTableData);

  useEffect(() => {
    setCompleted(
      sortedArr &&
        sortedArr.map((reg) => {
          return {
            name: reg.businessNames?.businessName1,
            country: reg?.registrationCountry,
            date: reg?.updatedAt.slice(0, 10),
          };
        })
    );
  }, []);

  return (
    <BusinessHomeTable
      data={[completed]}
      link="/staff-dashboard/businesses/registration/completed"
    />
  );
};

export default CompletedBusinessesSummary;
