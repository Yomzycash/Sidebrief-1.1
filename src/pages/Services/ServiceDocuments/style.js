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
export const UploadWrapper = styled.div`
width: 100%;
padding-inline-start: 40px;
padding-block:45px 20px;

`
export const TextWrapper = styled.p`
font-weight: 500;
font-size: 14px;
line-height: 21px;


display: flex;
align-items: center;



color: #242627;`
export const Bottom = styled.div`
display: flex;
width: 100%;
padding: 32px clamp(24px, 3.4vw, 40px);
`;