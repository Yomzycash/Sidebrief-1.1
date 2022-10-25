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
  top: 57.1px;
  display: flex;
  flex-flow: column;
  background-color: white;
  z-index: 2;
  box-shadow: ${(props) =>
    props.boxshadow === "true" ? "0px 10px 15px -5px #9596971a" : ""};

  @media screen and (max-width: 700px) {
    top: 76px;
  }
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

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export const SubHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  border: 1px solid #edf1f7;
  border-top: none;
  padding-left: 24px;
  max-width: 100%;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 700px) {
    padding-inline: 24px;
  }
`;

export const MobileHeader = styled.div`
  display: none;
  @media screen and (max-width: 700px) {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 24px;
  }
`;

export const Drop = styled.div`
  display: flex;
  border: 1px solid #f1f1f1;
  border-radius: 12px;
  background-color: #f1f1f1;
  padding: 8px clamp(8px, 1vw, 16px);
  font-size: clamp(14px, 1.4vw, 16px);

  select {
    border: none;
    outline: none;
    gap: clamp(8px, 1vw, 16px);
    background: none;
  }
`;
