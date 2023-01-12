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
import { analyticsData } from "utils/config";
import { ChartContainer, TopContent } from "./styled";

const AnalyticsChart = () => {
	const options = [
		"Last Week",
		"Last Day",
		"Last Hour",
		"Last Minute",
		"Last Second",
	];

	return (
		<ChartContainer>
			<TopContent>
				<h3>Registration Analytics</h3>
				<select name="time">
					{options.map((option, index) => (
						<option value={option} key={index}>
							{option}
						</option>
					))}
				</select>
			</TopContent>
			<ResponsiveContainer width="100%" height="75%">
				<AreaChart
					data={analyticsData}
					margin={{
						top: 10,
						right: 0,
						left: 0,
						bottom: 0,
					}}
				>
					<defs>
						<linearGradient
							id="colorUv"
							x1="0"
							y1="0"
							x2="0"
							y2="1"
						>
							<stop
								offset="0%"
								stopColor="#00a2d4"
								stopOpacity={0.8}
							/>
							<stop
								offset="100%"
								stopColor="#00a2d4"
								stopOpacity={0.1}
							/>
						</linearGradient>
					</defs>

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
