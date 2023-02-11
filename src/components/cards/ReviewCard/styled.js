import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 8px;
  padding: 40px 24px;
  width: 100%;
  border: 1px solid #edf1f7;
  border-radius: 16px;

  > div:nth-of-type(2),
  div:nth-of-type(3) {
    font-size: clamp(14px, 1.5vw, 18px);
    font-weight: 500;
    color: #4e5152;
    margin-left: 14px;
  }
`;
export const Top = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 24px;
  color: #151717;
  font-weight: 600;
  font-size: clamp(15px, 1.5vw, 18px);
  color: "#151717";
  @media screen and (max-width: 600px) {
    flex-flow: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 12px;
  }
`;
export const SharesWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  flex: 1;
  font-weight: 500;
  gap: 20px;
  @media screen and (max-width: 600px) {
    margin-bottom: 12px;
  }

  > div:nth-of-type(1) {
    border-radius: 12px;
    padding: 4px 16px;
    color: ${({ shares }) =>
      shares === "Preference Shares" ? "#D400CC" : "#00A2D4"};

    background-color: ${({ shares }) =>
      shares === "Preference Shares"
        ? "#d400cc0c"
        : "#00a2d40c"};
  }
`;
export const IconWrapper = styled.div`
  display: flex;
  flex-flow: row;
  gap: 27px;
  color: #00a2d4;

  div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;
