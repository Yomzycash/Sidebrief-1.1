import React from "react";
import styled from "styled-components";

const ScrollableDiv = ({ maxHeight, maxWidth, thumbColor, containerStyle, children }) => {
  return (
    <OuterContainer thumbColor={thumbColor} maxHeight={maxHeight} maxWidth={maxWidth}>
      <InnerContainer style={{ ...containerStyle }}>{children}</InnerContainer>
    </OuterContainer>
  );
};

export default ScrollableDiv;

export const OuterContainer = styled.div`
  overflow: auto;
  background-color: ${({ thumbColor }) => thumbColor || "#dededec3"};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "")};
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : "")};
  transition: 0.3s all ease;

  :hover {
    background-color: #c0c0c0;
  }

  ::-webkit-scrollbar {
    width: 5px;
    border-radius: 55px;
    background-color: #f8f8f8;
  }

  ::-webkit-scrollbar-thumb {
    width: 5px;
    border-radius: 55px;
    background-color: inherit;
  }
`;

export const InnerContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  padding-inline: 14px;
`;
