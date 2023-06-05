import styled from "styled-components";

export const DocumentForm = styled.form`
  display: flex;
  flex-flow: column;
  gap: 33px;
  padding: 20px;
  border: 1px solid #edf1f7;
  border-radius: 8px;
  background-color: #fff;
  max-width: 500px;
`;

export const SubmitButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  max-width: 350px;

  button {
    font-weight: 500;
    font-size: 16px;
    line-height: 27px;
    color: #00a2d4;
  }

  #review-submit,
  #done-submit {
    background-color: #f8f8f8;
    border: 1px dashed #00a2d4;
    border-radius: 5px;
    height: 34px;
    width: 132px;
  }

  #addnew-submit,
  #cancel-submit {
    background-color: transparent;
    padding: 0;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const FieldsWrapper = styled.div``;

export const documentStyle = {
  padding: " 0",
  margin: "0",
  minHeight: "max-content",
  minWidth: "70%",
  maxWidth: "300px",
  border: "none",
};

export const DocumentFile = styled.div``;

export const DocumentErrorLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: red;
  font-size: 12px;
  max-width: 300px;
  margin-bottom: 5px;
`;

//

//

//
export const DocumentActions = styled.div`
  position: absolute;
  right: -40px;
  top: -40px;
  transition: 0.5s ease all;
`;

export const DocumentDownload = styled.div`
  position: absolute;
  right: -40px;
  bottom: -40px;
  transition: 0.5s ease all;
`;

// Reivew component styles
export const ReviewContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  gap: 19px;
  padding: 20px 20px 20px;
  border: 1px solid #edf1f7;
  border-radius: 8px;
  background-color: #fff;
  max-width: 500px;
  min-height: 150px;
  overflow: hidden;
  box-shadow: 0 0 15px #cccccc55;

  :hover {
    ${DocumentDownload} {
      right: 20px;
      bottom: 20px;
    }
    ${DocumentActions} {
      right: 20px;
      top: 20px;
    }
  }
`;

export const DocumentDescription = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #4e5152;
  flex: 1;
  border-top: 1px solid #edf1f7;
  padding-block: 20px;
  border-radius: 16px;
`;

export const ErrMsg = styled.div`
  position: relative;
  color: red;
  font-size: 12px;
  justify-content: center;
  align-items: center;
`;

export const DocumentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;

  p {
    font-weight: 500;
    font-size: clamp(18px, 2vw, 22px);
    line-height: 20px;
    padding-block: 4px;
  }
`;
