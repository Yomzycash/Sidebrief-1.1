import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  margin: 0 40px;
  

  @media screen and (max-width: 1050px) {
    margin: 0;
  }
  @media screen and (max-width: 700px) {
    flex: none;
    height : 100vh;
  }
`;

export const Header = styled.div`
  position: sticky;
  top: 57.1px;
  display: flex;
  flex-flow: column;
  background-color: white;
  z-index: 2;

  @media screen and (max-width: 700px) {
    flex-flow: column-reverse;
  }
`;

export const MainHeader = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  padding: 40px 0px;
  gap: 24px;
  /* height: clamp(80px, 10vw, 150px); */
  border: 1px solid #edf1f7;
  border-top: none;
  transition: 0.2s all ease;
  @media screen and (max-width: 700px) {
    padding: 16px 24px 32px 24px !important;
  }
`;

export const SubHeader = styled.div`
  display: flex;
  height: clamp(48px, 10vw, 58px);
  gap: 24px;
  border: 1px solid #edf1f7;
  border-top: none;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding-inline: 24px;

  //TODO: maybe hide scroll bar
`;

export const TopContent = styled.div`
  display: flex;
  /* gap: 48px; */
  align-items: center;
  padding-inline: 24px;
  flex: 1;
  justify-content: space-between;

  > div {
    display: flex;
    gap: 48px;
    justify-content: space-between;
  }
  @media screen and (max-width: 700px) {
    display: none;
  }
`;
export const PageTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: clamp(20px, 2vw, 24px);
  font-weight: 700;
  color: #151717;
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export const BottomContent = styled.div`
  display: flex;
  align-items: center;
  padding-inline: 24px;
  gap: 60px;
  flex: 1;
  justify-content: space-between;

  @media screen and (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    width: 100%;
    padding-inline: 0px !important;
  }
`;

export const Drop = styled.div`
  display: flex;
  border: 1px solid #f1f1f1;
  border-radius: 12px;
  background-color: #fafafa;
  padding: 8px 16px;

  select {
    border: none;
    outline: none;
    width: 60px;
    background: none;
  }
`;
export const ButtonWrapper = styled.div`
  width: 200px;
  @media screen and (max-width: 700px) {
    width: 100%;
  }

  button {
    width: 100%;
    height: 100%;
    background-color: #00a2d4;
    border-radius: 8px;
    border: none;
    outline: none;
    color: #ffffff;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    padding: 10px 24px;
    display: flex;
    align-items: center;
    @media screen and (max-width: 700px) {
      width: 100%;
      display: flex;
      align-items: center !important;
      justify-content: center !important;
    }
  }
`;

export const SearchWrapper = styled.div`
  max-width: 384px;
  height: 40px;
  width: 100%;
  position: relative;

  @media screen and (max-width: 700px) {
    max-width: 100%;
    width: 100%;
  }

  .searchbox {
    position: absolute;
    z-index: 5;
  }
`;

export const searchStyle = styled.div`
  border-radius: 12px;
  background-color: "white";
  max-width: 384px;
  height: 40px;
  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;

export const HeadText = styled.h5`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 131%;
  letter-spacing: 0.02em;
  padding-inline: ${({ nopadding }) => (nopadding ? `0` : `24px`)};

  color: #151717;
`;

export const BodyText = styled.p`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 131%;
  letter-spacing: 0.02em;
  /* padding-inline: 24px; */

  color: #151717;
`;

export const Checkbox = styled.input`
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-right: 30px;
`;

export const Clickable = styled.button`
  height: 56px;
  width: 100%;
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
`;

export const LastWrapper = styled.div`
  position: sticky;
  bottom: 0px;
  padding: 24px;
  z-index: 1000;
  background-color: #ffffff;
`;

export const ButtonContainer = styled.div`
  width: 200px;
  @media screen and (max-width: 700px) {
    width: 100%;
  }

  button {
    width: 100%;
    height: 100%;
    background-color: #00a2d4;
    border-radius: 8px;
    border: none;
    outline: none;
    color: #ffffff;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    padding: 10px 24px;
    display: flex;
    align-items: center;
    @media screen and (max-width: 700px) {
      width: 100%;
      display: flex;
      align-items: center !important;
      justify-content: center !important;
    }
  }
`;