import { BusinessHomeTable } from "components/Staff/Tables";
import React from "react";

const CompletedBusinessesSummary = () => {
  return (
    <BusinessHomeTable
      data={[]}
      link="/staff-dashboard/businesses/registration/completed"
    />
  );
};

export default CompletedBusinessesSummary;
