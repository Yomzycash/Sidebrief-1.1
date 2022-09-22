import React from "react";

const LaunchFormContainer = ({ children }) => {
  return (
    <div
      style={{
        borderTop: "solid 1px #EDF1F6",
        padding: "40px",
        gap: "24px",
        display: "flex",
        flexFlow: "column",
      }}
    >
      {children}
    </div>
  );
};

export default LaunchFormContainer;
