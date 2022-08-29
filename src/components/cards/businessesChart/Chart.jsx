import React from "react";
import { DonutMultiple, DonutElement, DonutLabel } from "react-donut-component";
import { Label } from "./styled";

const Chart = ({ approved, pending, awaiting, total, label }) => {
  return (
    <DonutMultiple linecap="round" size={196} strokeWidth={4}>
      <DonutElement color="#55D7FF">{pending}</DonutElement>
      <DonutElement color="#00A2D4">{approved}</DonutElement>
      <DonutElement color="#CCF3FF">{awaiting}</DonutElement>
      <DonutLabel>
        <Label>
          <p>{total}</p>
          <div>{label}</div>
        </Label>
      </DonutLabel>
    </DonutMultiple>
  );
};

export default Chart;
