import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  background-color: #fcfcfc;
  flex: 1;
  min-height: 100vh;
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
  padding-bottom: 50px;
  border-top: none;
`;

export const Nav = styled.nav`
  background: #ffffff;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  border-color: #edf1f7;
  padding: 20px 40px 0px 40px;
  display: flex;
  align-items: center;
  gap: 150px;
  overflow-x: auto;
  overflow-y: hidden;
`;

export const ReviweTabWrapper = styled.div`
  display: flex;
  flex: 1;

  > a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    padding: 7px 10px;
    transition: 0.3s all ease;
    padding-bottom: 20px;

    border: none;

    margin: 0;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #959697;
    white-space: nowrap;
  }
`;

export const Bottom = styled.div`
  display: flex;
  width: 100%;

  padding-block: 70px;
`;
export const SubHeader = styled.div`
border-top: 1px solid #edf1f7;
display: flex;
gap: 24px;
padding-inline: 24px;
width: 100%;
overflow-x: auto;
overflow-y: hidden;
scroll-behavior: smooth;

&::-webkit-scrollbar {
  height: 5px;
  background: ${({ $hovered }) => ($hovered ? "#aaaaaa33" : "#fff")};
}
&::-webkit-scrollbar-thumb {
  background: ${({ $hovered }) => ($hovered ? "#aaaaaa" : "#fff")};
  border-radius: 15px;
}

@media screen and (max-width: 700px) {
  /* border-width: 1px 0px;
  border-style: solid; */
  border-bottom: 1px solid #edf1f7;
  /* border-color: #edf1f7; */
}
`;