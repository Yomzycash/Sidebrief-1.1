import React from "react";

const LaunchPrimaryContainer = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexFlow: "column",
        flex: 1,
      }}
    >
      {children}
    </div>
  );
};

export default LaunchPrimaryContainer;
