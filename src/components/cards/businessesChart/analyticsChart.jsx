import React, { useState, useCallback } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, TopContent } from "./styled";
import { getLastWeekData, getLastMonthData } from "utils/staffHelper";
import { useEffect } from "react";
import {
  eachDayOfInterval,
  subWeeks,
  subMonths,
  format,
  isSameDay,
  isSameWeek,
  parseJSON,
  eachWeekOfInterval,
} from "date-fns";

const AnalyticsChart = ({ data }) => {
  const [filterBy, setFilter] = useState("week");
  const [graphdata, setGraphData] = useState([]);

  const options = [
    {
      value: "week",
      name: "Last Week",
    },
    {
      value: "month",
      name: "Last Month",
    },
  ];

  const getWeekData = useCallback(() => {
    const today = new Date();
    const lastWeek = subWeeks(today, 1);
    const lastWeekData = getLastWeekData(data);
    const everyday = eachDayOfInterval({ start: lastWeek, end: today });
    return everyday.map((date) => {
      return {
        name: format(date, "E"),
        registrations: lastWeekData.filter((data) =>
          isSameDay(parseJSON(data.createdAt), date)
        ).length,
      };
    });
  }, [data]);

  const getMonthData = useCallback(() => {
    const today = new Date();
    const lastMonth = subMonths(today, 1);
    const lastMonthData = getLastMonthData(data);
    const everyweek = eachWeekOfInterval({ start: lastMonth, end: today });
    return everyweek.map((date) => {
      return {
        name: format(date, "MMM d"),
        registrations: lastMonthData.filter((data) =>
          isSameWeek(parseJSON(data.createdAt), date)
        ).length,
      };
    });
  }, [data]);

  console.log(graphdata);

  useEffect(() => {
    switch (filterBy) {
      case "week":
        setGraphData(getWeekData);
        break;
      case "month":
        setGraphData(getMonthData);
        break;
      default:
        break;
    }
  }, [filterBy, getWeekData, getMonthData]);

  return (
    <ChartContainer>
      <TopContent>
        <h3>Registration Analytics</h3>
        <select
          name="time"
          onChange={(event) => setFilter(event.target.value)}
          value={filterBy}
        >
          {options.map((option, index) => (
            <option value={option.value} key={index}>
              {option.name}
            </option>
          ))}
        </select>
      </TopContent>
      <ResponsiveContainer width="100%" height="75%">
        <AreaChart
          data={graphdata}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00a2d4" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#00a2d4" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="name"
            tickLine={{ stroke: "white" }}
            axisLine={{ stroke: "white" }}
            dy={10}
            dx={15}
            interval={"preserveStartEnd"}
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
            dataKey="registrations"
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
