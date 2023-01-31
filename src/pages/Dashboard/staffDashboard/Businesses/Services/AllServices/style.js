import styled from "styled-components";

export const BodyRight = styled.div`
  display: flex;
  flex-flow: column;
  /* width: calc(100% - ${({ SidebarWidth }) => SidebarWidth}); */
  padding: 0px 0px 0px 40px;
  margin-bottom: 40px;
  gap: 40px;
  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;
export const ServiceContainer = styled.div`
  display: grid;
  padding-right: 24px;
  padding-bottom: 24px;
  grid-template-columns: auto auto auto auto;
  gap: clamp(16px, 1.6vw, 24px);
  width: 100%;
  max-width: 1300px;

  @media screen and (max-width: 1250px) {
    grid-template-columns: auto auto auto;
    max-width: 1000px;
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: auto auto;
  }

  @media screen and (max-width: 430px) {
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 16px;
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 40px;
  height: ${({ height }) => height && height};
`;
