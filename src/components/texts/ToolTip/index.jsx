import React from "react";
import { TipsContainer } from "./styled";

const ToolTip = ({ message, disabled, style, parentRef }) => {
  let { offsetWidth, offsetHeight } = parentRef.current;

  return (
    <>
      {message && (
        <TipsContainer
          style={style}
          parentWidth={offsetWidth}
          parentHeight={offsetHeight}
          place={style?.place || "top"}
          $display={!disabled}
        >
          {message}
        </TipsContainer>
      )}
    </>
  );
};

export default ToolTip;
