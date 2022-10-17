import React from "react";
import Chart from "./Chart";
import Status from "./Status";
import { BusinessesChart, Indicator, Bottom, Loader } from "./styled";
import { Title } from "./styled";
import { Puff } from "react-loading-icons";

const BusinessesChartCard = ({ staff, user, analytics, loading }) => {
	// const total = completed + pending + awaiting;

	return (
		<BusinessesChart staff={staff}>
			{analytics.title && (
				<Title staff={staff}>
					<div>{analytics.title}</div>
					{analytics.options && (
						<select name="date" id="">
							{analytics.options.map((option, index) => (
								<option value={option} key={index}>
									{option}
								</option>
							))}
						</select>
					)}
				</Title>
			)}
			<Indicator>
				{loading ? (
					<Loader>
						<Puff stroke="#00A2D4" />
					</Loader>
				) : (
					<Chart
						analytics={analytics}
						label={analytics.label}
						staff={staff}
						user={user}
					/>
				)}
			</Indicator>
			<Bottom>
				{analytics.status1 && (
					<Status
						number={analytics.status1.total}
						text={analytics.status1.text}
						color={analytics.status1.color}
						staff={staff}
					/>
				)}
				{analytics.status2 && (
					<Status
						number={analytics.status2.total}
						text={analytics.status2.text}
						color={analytics.status2.color}
						staff={staff}
					/>
				)}
				{analytics.status3 && (
					<Status
						number={analytics.status3.total}
						text={analytics.status3.text}
						color={analytics.status3.color}
						staff={staff}
					/>
				)}
			</Bottom>
		</BusinessesChart>
	);
};

export default BusinessesChartCard;
