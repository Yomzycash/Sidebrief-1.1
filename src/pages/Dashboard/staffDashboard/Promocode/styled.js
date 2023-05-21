import styled from "styled-components";

export const PromoContainer = styled.div`
  margin-inline: 40px;

  .header-action-button {
    path {
      fill: #fff;
    }
  }
`;

export const PromoHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 40px 24px;
  gap: 32px;
  height: 134px;
`;
export const PromoBody = styled.div`
  border: 1px solid #edf1f7;
`;

export const Status = styled.div`
  position: relative;
  left: -10px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  padding: 10px 20px;
  max-width: max-content;

  color: ${({ active }) => (active ? "#00D448" : "#ED4E3A")};
  background-color: ${({ active }) =>
    active ? "rgba(0, 212, 72, 0.05)" : "rgba(237, 78, 58, 0.05)"};
  border-radius: 12px;
`;

export const Action = styled.div`
  position: relative;
  left: -5px;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  padding: 5px;
  border-radius: 8px;
  background-color: #fafcff;
  max-width: max-content;

  > div {
    cursor: pointer;

    :nth-of-type(1) {
      color: #00a2d4;
      border-right: 1px solid #f1f1f1;
      padding-right: 10px;
    }
    :nth-of-type(2) {
      color: #c54130;
    }
  }
`;

// ------------------------------------------------------------------------------

export const PromoDetailsContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 24px;
  margin: 20px 40px;
`;

export const PromoDetailsHeader = styled.div`
  padding: 10px 24px;
  font-weight: 600;
  font-size: clamp(20px, 2vw, 24px);
  line-height: 24px;
  color: #242627;
  border-inline: 1px solid #edf1f7;
  border-radius: 16px;
`;

export const PromoDetailsBody = styled.div`
  display: flex;
  gap: clamp(30px, 3.5vw, 46px);
`;

export const PromoDetailsLeft = styled.div`
  display: flex;
  flex: 1.3;
`;

export const PromoForm = styled.form`
  display: flex;
  flex-flow: column;
  width: 100%;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
  border-radius: 16px;
  padding: 24px;
`;

export const FormSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
`;

export const PromoCodeIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: #4e5152;
`;

export const FormButton = styled.div`
  display: flex;
  gap: 64px;

  button {
    justify-content: center;
    width: 100%;
    max-width: 100%;
  }
`;

export const PromoDetailsRight = styled.div`
  display: flex;
  flex: 1;
`;

export const RecentPromoCodes = styled.div`
  padding: 32px 35px;
  border: 1px solid #edf1f7;
  border-radius: 16px;
  width: 100%;
`;

export const RecentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: clamp(14px, 1.4vw, 16px);
  font-size: clamp(14px, 1.4vw, 16px);

  a {
    font-weight: 500;
    line-height: 21px;
    color: #00a2d4;
  }
`;

export const RecentBody = styled.div``;

export const Divider = styled.div`
  background-color: #edf1f7;
  width: 2px;
  height: 100%;
  max-height: 75px;
`;

export const deleteButtonStyle = {
  color: "#fff",
  backgroundColor: "#ED4E3A",
};
