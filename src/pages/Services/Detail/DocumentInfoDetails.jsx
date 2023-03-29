import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyViewComplyQuery } from "services/complyService";
import { Puff } from "react-loading-icons";
import ServiceReviewCard from "components/cards/ServiceReviewCard";
import { StepBar } from "components/Indicators";

import styled from "styled-components";

const DocumentInfoDetails = () => {
  const { complycode } = useParams();

  const [viewServiceDocument, viewServiceDocumentState] = useLazyViewComplyQuery();
  const [documentContainer, setDocumentContainer] = useState([]);

  const handleViewDocument = useCallback(async () => {
    const requiredData = {
      complyCode: complycode,
    };
    const response = await viewServiceDocument(requiredData);
    console.log(response);
    setDocumentContainer(response?.data?.complyDocuments);
  }, [complycode, viewServiceDocument]);

  useEffect(() => {
    handleViewDocument();
  }, [handleViewDocument]);

  return (
    <Wrapper>
      {viewServiceDocumentState?.isLoading && (
        <Loading height="50vh">
          <Puff stroke="#00A2D4" fill="white" />
        </Loading>
      )}
      <DocumentWrapper>
        <ServiceReviewCard DocContent={documentContainer} />
      </DocumentWrapper>
      {/* <StepBar /> */}
    </Wrapper>
  );
};

export default DocumentInfoDetails;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const DocumentWrapper = styled.div`
  max-width: 825px;
  width: 100%;
  background: #ffffff;
  border: 1px solid #eff2f3;
  box-shadow: 0px 10px 10px -5px #9596970a;
  border-radius: 16px;
`;
const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 40px;
  height: ${({ height }) => height && height};
`;
