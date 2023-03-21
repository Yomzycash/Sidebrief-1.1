import styled from "styled-components";

export const DocumentForm = styled.form`
  display: flex;
  flex-flow: column;
  gap: 33px;
  padding: 20px;
  border: 1px solid #edf1f7;
  border-radius: 8px;
  background-color: #fff;
`;

export const DocumentInfoWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 24px;
  padding-bottom: 33px;
  border-bottom: 1px solid #edf1f7; ;
`;

export const DocumentTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 30px;
`;

export const Document = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 32px;

  .input-container-class {
    margin: 0;
    max-width: 633px;
  }

  @media screen and (max-width: 600px) {
    flex-flow: row wrap;
  }
`;

export const DocumentType = styled.div`
  display: flex;
  gap: 10px;

  .button__effect {
    background-color: #fff;
    border: 1px solid #edf1f7;
    border-radius: 8px;
    color: #0082aa;

    :hover {
      background-color: #0082aa;
      color: #fff;
    }
  }
`;

export const DocumentOptions = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;
`;

export const SubmitButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  max-width: 400px;

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

  #addnew-submit {
    background-color: transparent;
    padding: 0;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

//

//

// Reivew component styles
export const ReviewContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 19px;
  padding: 20px;
  border: 1px solid #edf1f7;
  border-radius: 8px;
  background-color: #fff;

  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #4e5152;
`;

export const ReviewTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
`;

export const ReviewTopLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    :nth-of-type(2) {
      font-size: 8px;
      color: #242627;
      background: #2acdff;
      opacity: 0.5;
      border-radius: 10px;
      padding-inline: 5px;
      line-height: 12px;
    }
  }
`;

export const ReviewTopRight = styled.div`
  display: flex;
  gap: 30px;

  background: #ffffff;
  border: 1px solid #edf1f7;
  border-radius: 12px;
  padding: 4px 12px;

  button {
    background-color: transparent;
    padding: 0;
    gap: 10px;
    line-height: 18px;

    span {
      font-size: 12px;
    }

    :nth-of-type(1) {
      color: #0082aa;
    }
    :nth-of-type(2) {
      color: #ed4e3a;
      gap: 5px;
    }
  }

  svg {
    width: 13px;
    height: 13px;
  }
`;

export const DeleteWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  input {
    border: none;
    outline: none;
    height: 21px;

    ::placeholder {
      font-size: 10px;
    }
  }
`;

export const ReviewDocumentName = styled.div`
  display: flex;
  gap: 8px;

  color: #242627;
  font-size: 14px;
  line-height: 27px;

  ::first-letter {
    text-transform: capitalize;
  }

  span {
    font-size: 12px;
    line-height: 27px;
    font-style: italic;
    opacity: 0.7;

    ::first-letter {
      text-transform: capitalize;
    }
  }
`;

export const ReviewDocumentDescription = styled.div`
  color: #242627aa;
  font-size: 12px;
  line-height: 27px;
  font-style: italic;

  ::first-letter {
    text-transform: capitalize;
  }
`;
