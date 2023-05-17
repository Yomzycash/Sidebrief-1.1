import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { DonutContainer, Label } from "./styled";

ChartJS.register(ArcElement, Tooltip);

export const Donut = ({ analytics, staff, noTotal }) => {
  const label = analytics.label;
  const total = analytics.data
    .map((el) => el.total)
    .reduce((a, b) => {
      return a + b;
    }, 0);

  const data = {
    labels: analytics.data.map((element) => element.text),
    datasets: [
      {
        label: label,
        data: analytics.data.map((element) => element.total),
        backgroundColor: analytics.data.map((element) => element.color),
        borderColor: analytics.data.map((element) => element.color),
        borderWidth: 1,
        // borderRadius: 10,
        cutout: !staff ? "25%" : "60%",
        borderJoinStyle: "bevel",
        // borderAlign: "center",
        // weight: 10,
      },
    ],
  };

  return (
    <DonutContainer>
      <Doughnut data={data} height={128} width={128} />
      <Label>
        {!noTotal && <p>{total}</p>}
        <div>{analytics.label}</div>
      </Label>
    </DonutContainer>
  );
};
