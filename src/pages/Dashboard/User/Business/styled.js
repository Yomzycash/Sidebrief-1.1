import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  margin: 0 40px;
  @media screen and (max-width: 1050px) {
    margin: 0;
  }
`;

export const Header = styled.div`
  position: sticky;
  top: 65px;
  display: flex;
  flex-flow: column;
  background-color: white;
  z-index: 2;
  box-shadow: 0px 10px 15px -5px #9596971a;
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
`;

export const SubHeader = styled.div`
  display: flex;
  height: clamp(48px, 10vw, 58px);
  gap: 24px;
  border: 1px solid #edf1f7;
  border-top: none;
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
`;
export const PageTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: clamp(20px, 1.5vw, 24px);
  font-weight: 700;
  color: #151717;
`;

export const BottomContent = styled.div`
  display: flex;
  align-items: center;
  padding-inline: 24px;
  gap: 60px;
  flex: 1;
  justify-content: space-between;
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
  }
`;
