import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

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

export const Body = styled.div`
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

export const Top = styled.div`
  padding: 14px 40px;
  border-bottom: 1px solid ${({ theme }) => theme.white1};
  display: flex;
  gap: 40px;
`;

export const LHS = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const LHSHead = styled.h6`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 40px;

  color: ${({ theme }) => theme.grey1};

  span {
    font-style: italic;
    font-size: 14px;
    line-height: 21px;
  }
`;

export const RHS = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 16px;
  row-gap: 24px;
`;

export const Vline = styled.div`
  width: 1px;
  height: 139px;
  background: #edf1f7;
`;

export const Charges = styled.div`
  display: flex;
  gap: 40px;
`;

export const Charge = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ChargeHeadText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.grey2};
  text-transform: uppercase;
`;

export const Price = styled.p`
  font-weight: 400;
  font-size: 32px;
  line-height: 40px;
  color: ${({ theme }) => theme.grey2};

  ${({ actual, theme, loading }) =>
    actual
      ? loading
        ? css`
            text-decoration: none;
          `
        : css`
            text-decoration: line-through;
          `
      : css`
          color: ${theme.statusGreen};
        `}
`;

export const Text = styled.p`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;

  color: #4e5152;

  span {
    font-style: italic;
    color: #242627;
    font-weight: bold;
  }
`;

export const LinkText = styled(Link)`
  grid-column: 2 / 2;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: ${({ theme }) => theme.blue2};
`;

export const Bottom = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 100%;
  height: 200px;
`;
