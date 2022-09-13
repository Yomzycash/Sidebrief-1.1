import React from "react";
import { DonutMultiple, DonutElement, DonutLabel } from "react-donut-component";
import { Label } from "./styled";

const Chart = ({ label, analytics, user, staff }) => {
  const total =
    analytics?.status1.total + analytics?.status2.total + user
      ? analytics?.status3.total
      : 0;

  return (
    <DonutMultiple linecap="round" size={196} strokeWidth={4}>
      <DonutElement color={analytics.status1.color || "#00A2D4"}>
        {analytics.status1.total}
      </DonutElement>
      <DonutElement color={analytics.status2.color || "#55D7FF"}>
        {analytics.status2.total}
      </DonutElement>
      {user ? (
        <DonutElement color="#CCF3FF">{analytics.status3.total}</DonutElement>
      ) : (
        <div />
      )}
      <DonutLabel>
        {analytics.label && (
          <Label>
            <p>{total}</p>
            <div>{analytics.label}</div>
          </Label>
        )}
      </DonutLabel>
    </DonutMultiple>
  );
};

export default Chart;
