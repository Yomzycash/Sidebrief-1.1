import React from "react";
import Status from "./Status";
import { BusinessesChart, Indicator, Bottom, Loader } from "./styled";
import { Title } from "./styled";
import { Puff } from "react-loading-icons";
import { Donut } from "./Donut";

const BusinessesChartCard = ({ staff, user, analytics, loading, noTotal }) => {
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
          <Donut analytics={analytics} staff={staff} noTotal={noTotal} />
        )}
      </Indicator>
      <Bottom>
        {analytics.data.map((status, i) => (
          <Status
            key={i}
            number={status.total}
            text={status.text}
            color={status.color}
            staff={staff}
          />
        ))}
      </Bottom>
    </BusinessesChart>
  );
};

export default BusinessesChartCard;
