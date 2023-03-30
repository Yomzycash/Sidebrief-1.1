import styled from "styled-components";

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

export const Loading = styled.div`
  max-width: 671px;
  width: 100%;
  height: 200px;
  background: #ffffff;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px #9596970a;
  border-radius: 16px;
  margin: auto;

  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;

  @media screen and (max-width: 600px) {
    border-radius: 0;
    border-inline: none;
  }
`;
