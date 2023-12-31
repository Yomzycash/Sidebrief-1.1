import styled from "styled-components";

export const QuestionForm = styled.form`
  display: flex;
  flex-flow: column;
  gap: 33px;
  padding: 20px;
  border: 1px solid #edf1f7;
  border-radius: 8px;
  background-color: #fff;
`;

export const QuestionInfoWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 24px;
  padding-bottom: 33px;
  border-bottom: 1px solid #edf1f7; ;
`;

export const Question = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 32px;

  .input-container-class {
    margin: 0;
    max-width: 633px;
  }
`;

export const ToggleWrapper = styled.div`
  margin-bottom: 13px;
`;

export const QuestionType = styled.div`
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

export const QuestionOptions = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;
`;

export const AddOption = styled.div`
  margin-top: -8px;
  padding-left: 24px;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #4e5152;

  opacity: ${({ $disable }) => ($disable ? 0.7 : 1)};
`;

export const AddOptionButton = styled.button`
  cursor: pointer;
  outline: none;
  border: none;
  color: #0082aa;
  background-color: #fff;
  transition: 0.3s ease opacity;

  :hover {
    opacity: 0.8;
  }

  :disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
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

    :nth-of-type(1) {
      background-color: transparent;
      padding: 0;
    }
    :nth-of-type(2) {
      background-color: #f8f8f8;
      border: 1px dashed #00a2d4;
      border-radius: 5px;
      height: 34px;
      width: 132px;
    }
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const OptionContainer = styled.div`
  position: relative;
  display: flex;
  gap: 8px;
  align-items: center;
  color: #4e5152;

  svg {
    color: #4e5152;
    width: 14px;
    cursor: pointer;
    transition: 0.3s ease all;
    border-radius: 4px;
    padding-inline: 3px;
    box-sizing: content-box;

    :hover {
      background-color: #f2f2f2;
    }
  }
`;

export const CheckBullet = styled.div`
  width: 16px;
  height: 16px;
  background: #f2f2f2;
  border: 1px solid #cccccc;
  border-radius: 4px;
`;

export const RadioBullet = styled.div`
  width: 16px;
  height: 16px;
  background: #f2f2f2;
  border: 1px solid #cccccc;
  border-radius: 50%;
`;

export const OptionText = styled.input`
  font-weight: 400;
  font-size: 14px;
  outline: none;
  border: none;
  padding-block: 2px;
  color: #4e5152;

  :focus {
    box-shadow: 0 1px 1px #cccccc;
  }

  ::placeholder {
    font-size: 14px;
    opacity: 0.7;
  }

  :disabled {
    background-color: #fff;
  }
`;

export const OtherSelect = styled.div`
  position: absolute;
  left: 24px;
  top: 25px;

  display: flex;
  flex-flow: column;

  font-size: 12px;
  padding: 10px 15px 10px 5px;
  border-radius: 5px;
  border: 1px solid #cccccc44;
  background-color: #fff;
  box-shadow: 0 5px 5px 5px #cccccc22;
  z-index: 1;
`;

export const OtherOption = styled.div`
  cursor: pointer;
  z-index: 4;
  padding: 4px;

  :hover {
    background-color: #cccccc22;
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
  gap: 8px;

  span {
    :nth-of-type(2) {
      font-size: 8px;
      color: black;
      background: #2acdff;
      opacity: 0.3;
      border-radius: 10px;
      padding-inline: 5px;
      height: max-content;
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

    ::placeholder {
      font-size: 10px;
    }
  }
`;

export const ReviewQuestion = styled.div`
  color: #242627;
  font-size: 14px;
  line-height: 27px;
`;
