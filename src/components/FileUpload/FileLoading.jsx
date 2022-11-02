import React from "react";
import styled from "styled-components";

const FileLoading = () => {
  return (
    <LoadingContainer>
      <Loading />
    </LoadingContainer>
  );
};

export default FileLoading;

const LoadingContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 4px;
  border-radius: 20px;
`;
const Loading = styled.div`
  background-color: blue;
  height: inherit;
  animation: file 15s ease;
  border-radius: 20px;

  @keyframes file {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
`;
