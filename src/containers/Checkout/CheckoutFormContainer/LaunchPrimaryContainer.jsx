import React from "react";

const LaunchPrimaryContainer = ({ children, style }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexFlow: "column",
        flex: 1,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default LaunchPrimaryContainer;
