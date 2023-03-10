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
export const Header = styled.div``;

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

export const Inputs = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(350px, 1fr));
  gap: 20px;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const buttonStyles = {
  maxWidth: "197px",
  width: "20%",
  height: "clamp(45px, 6vw, 56px)",
  padding: "0",
  minWidth: "100px",
};
