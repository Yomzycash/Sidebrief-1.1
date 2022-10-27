import styled from "styled-components";
import { InputWrapper, Input } from "components/input/styled";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  background-color: #fcfcfc;
  width: 100%;
  flex: 1;
  min-height: 100vh;

  .css-1t1j96h-MuiPaper-root-MuiDialog-paper {
    border-radius: 16px !important;
    /* width: 100% !important;
  max-width: 962px !important; */
    max-width: max-content !important;
    background-color: transparent !important;
    box-shadow: none !important;
  }
`;
export const Header = styled.div``;

export const Body = styled.form`
  display: flex;
  flex-flow: column;
  height: 100%;
  margin: auto;
  width: 100%;
  max-width: 962px;
  background-color: white;
  border: 1px solid #edf1f6;
  border-top: none;
  flex: 1;
  padding-bottom: 100px;
  border-top: none;
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 40px;
  height: ${({ height }) => height && height};
`;

export const AddMore = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 17px;
  width: max-content;
  cursor: pointer;
  font-size: clamp(16px, 1.5vw, 18px);
  color: #00a2d4;
`;

export const Bottom = styled.div`
  display: flex;
  width: 100%;
  padding: 32px clamp(24px, 3.4vw, 40px);
`;
export const EntityCardsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: stretch;
  width: 100%;
  gap: 24px;
  margin-top: 24px;
`;

export const CountryItem = styled.span`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const Page = styled.div`
  padding-block: 32px;
  padding-inline: 8%;
  margin-bottom: 40px;
`;

export const Inputs = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(350px, 1fr));
  gap: 20px;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .checkoutInput {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 0;

    ${InputWrapper} {
      margin-top: 0;
      height: 48px;

      ${Input} {
        height: 100%;
        width: 100%;
      }
    }
  }

  .checkoutInputLabel {
    font-family: "BR Firma";
    font-weight: 500;
    font-size: clamp(13px, 1.5vw, 14px);
    line-height: 21px;
    color: #4e5152;
  }
`;

export const EntityTitle = styled.p`
  font-weight: 600;
  font-size: clamp(18px, 1.8vw, 20px);

  span {
    font-weight: 400;
    font-size: clamp(14px, 1.2vw, 16px);
  }
`;

export const modalStyle = {
  padding: 0,
  backgroundColor: "white",
  width: "100%",
  maxWidth: "962px",
  borderRadius: "16px",
  boxShadow:
    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
};
