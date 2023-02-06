import { BusinessHomeTable } from "components/Staff/Tables";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useGetApprovedLaunchQuery } from "services/staffService";

const InProgressBusinessesSummary = () => {
  const [approved, setApproved] = useState([]);

  const { data } = useGetApprovedLaunchQuery();

  useEffect(() => {
    setApproved(
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
      data={approved}
      link="/staff-dashboard/businesses/registration/in-progress"
    />
  );
};

export default InProgressBusinessesSummary;
