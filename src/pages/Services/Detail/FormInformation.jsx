import { StepBar } from "components/Indicators";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useLazyViewComplyQuery } from "services/complyService";
import { Puff } from "react-loading-icons";
import styled from "styled-components";
import FormContainer from "containers/FormContainer";

const FormInformation = () => {
  const { complycode } = useParams();
  const viewComply = useOutletContext();

  // const [viewServiceDocument, viewServiceDocumentState] = useLazyViewComplyQuery();
  // const [questionContainer, setQuestionContainer] = useState([]);

  // const handleViewDocument = useCallback(async () => {
  //   const requiredData = {
  //     complyCode: complycode,
  //   };
  //   const response = await viewServiceDocument(requiredData);
  //   if (Array.isArray(response?.data?.complyData)) {
  //     setQuestionContainer(response?.data?.complyData);
  //   }
  // }, [complycode, viewServiceDocument]);

  // useEffect(() => {
  //   handleViewDocument();
  // }, [handleViewDocument]);
  // console.log(questionContainer)

  return (
    <Wrapper>
      {viewComply?.isLoading && (
        <Loading height="50vh">
          <Puff stroke="#00A2D4" fill="white" />
        </Loading>
      )}
      <DocumentWrapper>
        {viewComply?.data?.complyData?.map((el, index) => (
          <div key={index}>
            <FormContainer
              number={index + 1}
              question={el?.complyQuestion}
              answerArray={el?.complyAnswer}
              answer={el?.complyAnswer}
            />
          </div>
        ))}
      </DocumentWrapper>
      <StepBar applied={viewComply?.data?.createdAt} />
    </Wrapper>
  );
};

export default FormInformation;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const DocumentWrapper = styled.div`
  max-width: 825px;
  width: 100%;
  background: #ffffff;
  border: 1px solid #edf1f7;
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
