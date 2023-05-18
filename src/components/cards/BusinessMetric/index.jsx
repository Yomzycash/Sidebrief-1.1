import React from "react";
import Status from "./Status";
import { BusinessesChart, Indicator, Bottom, Loader } from "./styled";
import { Title } from "./styled";
import { Puff } from "react-loading-icons";
import { Donut } from "./Donut";

const BusinessMetricCard = ({ staff, user, analytics, loading, noTotal, total }) => {

  return (
    <BusinessesChart staff={staff}>
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
          {analytics.totalLength && <p>{analytics.totalLength}</p>}
          {analytics.title && <div>{analytics.title}</div>}
      </Bottom>
    </BusinessesChart>
  );
};

export default BusinessMetricCard;
