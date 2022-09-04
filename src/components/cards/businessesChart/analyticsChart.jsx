import { PrimaryText, SecondaryText } from "components/text/text";
import React from "react";
import Select from "react-select";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { analyticsData } from "utils/config";
import { ChartContainer, TopContent } from "./styled";

const AnalyticsChart = () => {
  const selectStyle = {
    control: (provided) => ({
      ...provided,
      height: 7,
      width: 150,
      padding: 5,
      margin: 0,
      marginLeft: 0,
      border: "0px solid black",
      fontSize: 13,
      backgroundColor: "white",
      outline: "none",
      boxShadow: "none",
    }),

    option: (provided, state) => ({
      ...provided,
      padding: 5,
    }),
  };

  const options = [
    { value: "Last Week", label: "Last Week" },
    { value: "Last Day", label: "Last Day" },
    { value: "Last Hour", label: "Last Hour" },
    { value: "Last Minutes", label: "Last Minutes" },
  ];

  return (
    <ChartContainer>
      <TopContent>
        <h3>Payment Analytics</h3>
        <Select options={options} styles={selectStyle} />
      </TopContent>
      <ResponsiveContainer width="100%" height="75%">
        <AreaChart
          data={analyticsData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00a2d4" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00a2d4" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="name"
            tickLine={{ stroke: "white" }}
            axisLine={{ stroke: "white" }}
          />
          <YAxis
            domain={[0, 8]}
            tickLine={{ stroke: "white" }}
            axisLine={{ stroke: "white" }}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#00a2d4"
            fill="url(#colorUv)"
            fillOpacity={1}
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default AnalyticsChart;
