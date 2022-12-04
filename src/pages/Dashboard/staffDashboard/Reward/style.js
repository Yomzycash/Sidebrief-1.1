import styled from "styled-components";

export const RewardContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  flex: 1;
`;

export const Body = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;
export const BodyLeft = styled.div``;
export const BodyRight = styled.div`
  display: flex;
  flex-flow: row;
  width: calc(100% - ${({ SidebarWidth }) => SidebarWidth});
  padding: 0px 0px 0px 40px;
  gap: 40px;
  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  margin: 0 40px;

  @media screen and (max-width: 1050px) {
    margin: 0;
  }
`;
