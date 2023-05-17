import styled from "styled-components";

export const CompanyName = styled.h2`
  font-weight: 400;
  font-size: 18px;
  line-height: 40px;

  display: flex;
  align-items: center;

  color: #242627;
`;

export const LHS = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const StatusType = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const RHS = styled.div`
  .transbutton {
    background-color: #00a2d4;
    color: #fff;
    font-family: "BR Firma";

    svg {
      /* transform: scale(1.5); */
      width: 20px;
      height: 20px;
      path {
        fill: #fff;
      }
    }
  }
`;

export const MessageCount = styled.div`
  width: 22px;
  height: 22px;
  left: 146px;
  top: 13px;
  background: #ed4e3a;
  border-radius: 6px;
  color: #fff;
  display: grid;
  place-items: center;
  margin-left: 16px;
`;

export const BottomInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UserName = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;

  text-decoration-line: underline;

  color: #00a2d4;
`;

export const DotSeperator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #959697;
`;

export const DateText = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #242627;
`;

export const DeleteButton = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  gap: 16px;

  cursor: pointer;

  p {
    font-family: "BR Firma";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.02em;
    color: #ed4e3a;
  }
`;
export const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 40px 0px;
  flex-flow: column;
`;

export const ModalButton = styled.div`
  display: flex;
  width: 80%;
`;

export const Question = styled.p`
  font-size: clamp(16px, 1.5vw, 20px);
  margin-bottom: 20px;
`;
export const TopContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 80%;
`;

export const CloseWrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  padding: 10px;
  border-radius: 100%;
  background-color: #d7d7d7;
  margin-bottom: 20px;
`;
