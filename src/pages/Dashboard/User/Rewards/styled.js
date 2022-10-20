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
  box-shadow: ${(props) =>
    props.boxshadow === "true" ? "0px 10px 15px -5px #9596971a" : ""};
`;
export const MainHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;
  width: 100%;
  height: clamp(80px, 10vw, 120px);
  padding-inline: 24px;
  border: 1px solid #edf1f7;
  border-top: none;
  transition: 0.2s all ease;

  > p {
    display: flex;
    align-items: center;
    font-size: clamp(20px, 1.5vw, 24px);
    font-weight: 700;
    color: #151717;
  }

  > div {
    display: flex;
    gap: 48px;
    flex: 1;
    justify-content: space-between;
  }

  @media screen and (max-width: 600px) {
    border: solid red;
    display: none;
  }
`;

export const SubHeader = styled.div`
  display: flex;
  gap: 24px;
  border: 1px solid #edf1f7;
  border-top: none;

  @media screen and (max-width: 600px) {
    padding-inline: 24px;
  }
`;

export const MobileHeader = styled.div`
  display: none;
  @media screen and (max-width: 600px) {
    display: flex;
    gap: 16px;
    padding: 16px 24px;
  }
`;

export const Drop = styled.div`
  display: flex;
  border: 1px solid #f1f1f1;
  border-radius: 12px;
  background-color: #f1f1f1;
  padding: 8px 16px;

  select {
    border: none;
    outline: none;
    width: 60px;
    background: none;
  }
`;
