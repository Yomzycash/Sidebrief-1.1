import styled from "styled-components";

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

export const Bottom = styled.div`
  display: flex;
  width: 100%;
  padding: 32px clamp(24px, 3.4vw, 40px);
`;
export const ContentWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(350px, 1fr));
  row-gap: 24px;
  column-gap: 20px;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
export const DownLoadText = styled.p`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  margin-top: 48px;
  margin-bottom: 32px;
  color: #242627;
`;

export const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  margin-bottom: 20px;
`;
