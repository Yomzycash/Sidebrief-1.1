// import React, { useEffect, useRef } from 'react';
// import styled from "styled-components";
// import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
// import { Doughnut } from "react-chartjs-2";


// ChartJS.register(ArcElement, Tooltip);

// export const CircleChart = ({analytics, staff, noTotal, totalApplications, draftApplications, pendingApplications }) => {
//     // const label = analytics.label;
//     // const noLabelAnalytics = { ...analytics };
//     // delete noLabelAnalytics.label;
//     // delete noLabelAnalytics.title;
//     // delete noLabelAnalytics.options;
//     const total = analytics.data
//         .map((el) => el.total)
//         .reduce((a, b) => {
//         return a + b;
//         }, 0);

//     const data = {
//         labels: analytics.data.map((element) => element.text),
//         datasets: [
//         {
//             // label: label,
//             data: analytics.data.map((element) => element.total),
//             backgroundColor: analytics.data.map((element) => element.color),
//             borderColor: analytics.data.map((element) => element.color),
//             borderWidth: 1,
//             // borderRadius: 10,
//             cutout: !staff ? "85%" : "90%",
//             borderJoinStyle: "bevel",
//             // borderAlign: "center",
//             // weight: 10,
//         },
//         ],
//     };
//         return (
//             <DonutContainer>
//                  <Doughnut data={data} height={100} width={100} />
//                  {/* <Label>
//                     {!noTotal && <p>{total}</p>}
//                     <div>{analytics.label}</div>
//                 </Label> */}
//             </DonutContainer>
//         )
// };

// export default CircleChart;

// const DonutContainer = styled.div`
//   position: relative;
// `;

// // Chart comoponent's styles
// const Label = styled.div`
//   display: flex;
//   flex-flow: column;
//   align-items: center;
//   justify-content: center;
//   font-weight: 500;
//   font-size: clamp(10px, 2vw, 12px);
//   color: #727474;
//   gap: 5px;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);

//   > p {
//     color: #00a2d4;
//     font-weight: 700;
//     font-size: clamp(20px, 2vw, 24px);
//   }
// `;

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
// import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

const CircleChart = ({ totalApplications, rejectedApplications, drafts, pendingApplications, }) => {
  const data = {
    labels: ['Total Applications', 'Rejected Applications'],
    datasets: [
      {
        data: [totalApplications, rejectedApplications],
        backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
      },
    ],
  };

  const options = {
    cutoutPercentage: 50,
    rotation: -0.5 * Math.PI,
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
  };

  return <Doughnut data={data} height={150} width={150}/>;
};

export default CircleChart;
