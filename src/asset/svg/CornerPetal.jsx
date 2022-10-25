import React from "react";

export const CornerPetal = ({ viewBox }) => {
  return (
    <div>
      <svg
        width="116"
        height="115"
        viewBox={viewBox || "0 0 116 115"}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="71.8869"
          cy="-7.20432"
          rx="57.2328"
          ry="42.563"
          transform="rotate(-42.6161 71.8869 -7.20432)"
          fill="#CCF3FF"
          fillOpacity="0.24"
        />
        <ellipse
          cx="119.235"
          cy="48.201"
          rx="57.2447"
          ry="42.7246"
          transform="rotate(-32.5179 119.235 48.201)"
          fill="#CCF3FF"
          fillOpacity="0.24"
        />
      </svg>
    </div>
  );
};
