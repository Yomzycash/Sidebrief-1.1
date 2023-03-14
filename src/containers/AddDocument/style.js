import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: max-content;
  padding: 20px;
  
`;
export const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;

`;

export const Label = styled.h4`
  width: 100%;

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
