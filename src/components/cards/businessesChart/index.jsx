import React from "react";
import Chart from "./Chart";
import Status from "./Status";
import { BusinessesChart, Indicator, Bottom } from "./styled";

const BusinessesChartCard = ({ completed, pending, awaiting }) => {
  const total = completed + pending + awaiting;

  return (
    <BusinessesChart>
      <Indicator>
        <Chart
          approved={completed}
          pending={pending}
          awaiting={awaiting}
          total={total}
          label="Registrations"
        />
      </Indicator>
      <Bottom>
        <Status number={completed} text="Completed" color="#55D7FF" />
        <Status number={pending} text="Pending" color="#00A2D4" />
        <Status number={awaiting} text="Awaiting Approval" color="#CCF3FF" />
      </Bottom>
    </BusinessesChart>
  );
};

export default BusinessesChartCard;
