import styled from "styled-components";

export const Container = styled.div`
  padding-inline: clamp(0px, 2vw, 40px);
  /* padding-inline: 40px; */
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-bottom: 40px;
  height: max-content;

  /* @media screen and (max-width: 1050px) {
    padding-inline: 0;
  } */

  @media screen and (max-width: 700px) {
    padding-inline: 0;
    gap: 24px;
  }
`;

export const Body = styled.div`
  @media screen and (max-width: 700px) {
    padding-inline: 24px;
  }
`;

export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  width: 100%;

  & > div:first-of-type {
    flex: 1;
  }
`;
export const DetailContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  width: 100%;

  & > div:first-of-type {
    flex: 2;
  }
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
`;

export const Loader = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100px;
`;
