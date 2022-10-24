import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 8px;
  padding: 40px 24px;
  padding: clamp(20px, 3vw, 40px) clamp(20px, 2vw, 24px);
  width: 100%;
  border: 1px solid #edf1f7;
  border-radius: 16px;
`;
export const Top = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  color: #151717;
  font-weight: 600;
  font-size: clamp(15px, 1.5vw, 18px);
  color: "#151717";
`;

export const InfoDesktop = styled.div`
  border-radius: 12px;
  padding: 4px 16px;
  font-size: clamp(14px, 1.4vw, 16px);
  color: ${({ shares }) =>
    shares === "Preference Shares" ? "#D400CC" : "#00A2D4"};

  background-color: ${({ shares }) =>
    shares === "Preference Shares"
      ? "rgba(212, 0, 204, 0.05)"
      : "rgba(0, 162, 212, 0.05)"};

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export const InfoMobile = styled.div`
  border-radius: 12px;
  padding: 4px 16px;
  width: max-content;
  font-size: clamp(14px, 1.4vw, 16px);
  color: ${({ shares }) =>
    shares === "Preference Shares" ? "#D400CC" : "#00A2D4"};

  background-color: ${({ shares }) =>
    shares === "Preference Shares"
      ? "rgba(212, 0, 204, 0.05)"
      : "rgba(0, 162, 212, 0.05)"};

  @media screen and (min-width: 601px) {
    display: none;
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
    flex: 0;
  }
`;
export const IconWrapper = styled.div`
  display: flex;
  flex-flow: row;
  gap: 27px;
`;

export const Phone = styled.div`
  font-size: clamp(14px, 1.4vw, 16px);
  font-weight: 500;
  color: #4e5152;
  margin-left: 14px;
`;

export const Email = styled.div`
  font-size: clamp(14px, 1.4vw, 14px);
  font-weight: 500;
  color: #4e5152;
  margin-left: 14px;
`;
