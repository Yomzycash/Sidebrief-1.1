import { PrimaryText, SecondaryText } from "components/text/text";
import React from "react";
import Select from "react-select";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { staffAnalyticsData } from "utils/config";
import {
  ButtonContainer,
  ChartContainer,
  Container,
  TopContent,
  Button,
  Number,
  BtnText,
} from "./style";

const StaffRewardAnalytics = () => {
  const options = [
    "Last Week",
    "Last Day",
    "Last Hour",
    "Last Minute",
    "Last Second",
  ];

  const buttonStyle = [
    {
      id: 1,
      color: "#00a2d4",
      border: "1px solid#00a2d4",
      title: "Reward Views",
      number: 24,
    },
    {
      id: 2,
      color: "#D400CC",
      border: "1px solid#D400CC",
      title: "Reward Clicks",
      number: 58,
    },
    {
      id: 3,
      color: "#FFBF29",
      border: "1px solid#FFBF29",
      title: "Reward Claims",
      number: 32,
    },
  ];
  return (
    <Container>
      <TopContent>
        <select name="time">
          {options.map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>
          ))}
        </select>
      </TopContent>
      <ChartContainer>
        <ResponsiveContainer width="68%" height="75%">
          <AreaChart
            data={staffAnalyticsData}
            margin={{
              top: 10,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            {/* <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00a2d4" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#00a2d4" stopOpacity={0.1} />
            </linearGradient>
          </defs> */}

            <XAxis
              dataKey="name"
              tickLine={{ stroke: "white" }}
              axisLine={{ stroke: "white" }}
              dy={10}
              dx={15}
            />
            <YAxis
              domain={[0, 8]}
              tickLine={{ stroke: "white", top: "40px" }}
              axisLine={{ stroke: "white", top: "40px" }}
              dx={-8}
            >
              <Label position="left" />
            </YAxis>
            <Tooltip />
            <Area
              type="monotone"
              dataKey="views"
              stroke="#D400CC"
              fill="url(#colorUv)"
              fillOpacity={1}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="clicks"
              stroke="#00a2d4"
              fill="url(#colorUv)"
              fillOpacity={1}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="claims"
              stroke="#FFBF29"
              fill="url(#colorUv)"
              fillOpacity={1}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
        <ButtonContainer>
          {buttonStyle.map((button) => (
            <Button border={button.border} key={button.id}>
              <Number color={button.color}>{button.number}</Number>
              <BtnText>{button.title}</BtnText>
            </Button>
          ))}
        </ButtonContainer>
      </ChartContainer>
    </Container>
  );
};

export default StaffRewardAnalytics;

// import { PrimaryText, SecondaryText } from "components/text/text";
// import React from "react";
// import Select from "react-select";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Label,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { analyticsData } from "utils/config";
// import { ChartContainer, TopContent } from "./style";

// const StaffRewardAnalytics = () => {
//   const options = [
//     "Last Week",
//     "Last Day",
//     "Last Hour",
//     "Last Minute",
//     "Last Second",
//   ];

//   return (
//     <ChartContainer>
//       <TopContent>
//         <h3>Payment Analytics</h3>
//         <select name="time">
//           {options.map((option, index) => (
//             <option value={option} key={index}>
//               {option}
//             </option>
//           ))}
//         </select>
//       </TopContent>
//       <ResponsiveContainer width="100%" height="75%">
//         <AreaChart
//           data={analyticsData}
//           margin={{
//             top: 10,
//             right: 0,
//             left: 0,
//             bottom: 0,
//           }}
//         >
//           <defs>
//             <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="0%" stopColor="#00a2d4" stopOpacity={0.8} />
//               <stop offset="100%" stopColor="#00a2d4" stopOpacity={0.1} />
//             </linearGradient>
//           </defs>

//           <XAxis
//             dataKey="name"
//             tickLine={{ stroke: "white" }}
//             axisLine={{ stroke: "white" }}
//             dy={10}
//             dx={15}
//           />
//           <YAxis
//             domain={[0, 8]}
//             tickLine={{ stroke: "white", top: "40px" }}
//             axisLine={{ stroke: "white", top: "40px" }}
//             dx={-8}
//           >
//             <Label position="left" />
//           </YAxis>
//           <Tooltip />
//           <Area
//             type="monotone"
//             dataKey="uv"
//             stroke="#00a2d4"
//             fill="url(#colorUv)"
//             fillOpacity={1}
//             strokeWidth={3}
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </ChartContainer>
//   );
// };

// export default StaffRewardAnalytics;
