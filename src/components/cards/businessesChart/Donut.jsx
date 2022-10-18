import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { DonutContainer, Label } from "./styled";

ChartJS.register(ArcElement);

export const Donut = ({ analytics }) => {
  const label = analytics.label;
  const noLabelAnalytics = { ...analytics };
  delete noLabelAnalytics.label;
  const total = Object.values(noLabelAnalytics)
    .map((el) => el.total)
    .reduce((a, b) => {
      return a + b;
    }, 0);

  const data = {
    labels: Object.values(noLabelAnalytics).map((element) => element.text),
    datasets: [
      {
        label: label,
        data: Object.values(noLabelAnalytics).map((element) => element.total),
        backgroundColor: Object.values(noLabelAnalytics).map(
          (element) => element.color
        ),
        borderColor: Object.values(noLabelAnalytics).map(
          (element) => element.color
        ),
        borderWidth: 1,
        borderRadius: 10,
        cutout: "85%",
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
        <p>{total}</p>
        <div>{analytics.label}</div>
      </Label>
    </DonutContainer>
  );
};
