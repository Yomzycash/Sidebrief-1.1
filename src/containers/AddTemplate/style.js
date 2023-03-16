import styled from "styled-components";

export const Wrapper = styled.form`
  width: 100%;
  height: max-content;
  padding: 20px;
  
`;
export const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  gap: 8px;
  width: 100%;

`;

export const Label = styled.h4`
  width: 100%;
  position:relative;
  top:5px;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #4e5152;
`;
export const LowerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
  width: 100%;
  margin-bottom: 33px;
`;
export const InputTagWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 13px;
  width: 100%;
`;
export const TagWrapper = styled.div`
  display: flex;

  align-items: center;
  padding: 0px;
  gap: 8px;
  width: 100%;
`;
export const TagTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  padding: 4px 8px;
  gap: 8px;

  width: fit-content;
  height: 32px;

  background: #0082aa;
  border-radius: 8px;
`;
export const TagText = styled.h4`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;

  display: flex;
  align-items: flex-end;

  color: #fafafa;
`;
export const CancelWrapper = styled.div`
  width: 20px;
  height: 20px;
  color: #fafafa;
  display: flex;
  cursor: pointer;

  align-items: center;
`;
export const InputWrapper = styled.div`
  max-width: 793px;
  width: 100%;
`;

export const TextBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 24px;
`;

export const TextWrapper = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 27px;

  display: flex;
  align-items: center;

  color: #4e5152;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
`;
export const FileButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;

  width: 81px;
  height: 37px;

  background: #0082aa;

  border: 1px solid #edf1f7;
  border-radius: 8px;
  cursor: pointer;
  color: #ffffff;
  :disabled {
    background: #0082aa;
    opacity: 0.3;
    cursor: not-allowed;

    border: 1px solid #edf1f7;
  }
`;
export const Text = styled.h3`
  font-weight: 400;
  font-size: 14px;
  line-height: 27px;

  display: flex;
  align-items: center;
`;


export const AddWrapper = styled.div`
  max-width: 410px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 33px;
`;
export const Addcontainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;
  cursor: pointer;
`;
export const ImgContainer = styled.div``;
export const TextContainer = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 27px;

  display: flex;
  align-items: center;

  color: #00a2d4;
`;
export const DeleteWrapper = styled.div`
  justify-content: flex-end;
  position:relative;
  bottom:20px;
  
`

export const DeleteEachContainer = styled.button`
  display: flex;
  justify-content:center;
  align-items:center;
  border:transparent;
  background:none;
  float: right;
  cursor:pointer;
  // margin: 5px;
`

export const IconWrapper = styled.div`
  margin-right: 5px;
`;

export const DeleteText = styled.div`
  float:right;
  font-size: 14px;
  font-weight:light;
  color: #ED4E3A;
`;

export const DoneWrapper = styled.button`
  width: 132px;
  height: 34px;
  left: 278px;
  top: 249px;

  background: #f8f8f8;
  /* Blue 2 */

  border: 1px dashed #00a2d4;
  border-radius: 5px;

  
`;


