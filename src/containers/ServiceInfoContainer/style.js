import styled from "styled-components";

export const AllContainer = styled.div`
  max-width: 825px;
  background: #ffffff;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px #9596970a;
  border-radius: 16px;
  padding-block: 40px;
  padding-inline: 24px;

  @media screen and (max-width: 700px) {
    padding-inline-end: 0;
    padding-inline-start: 0px;
    border: 0;
    padding-block: 0;
    width: 100%;
  }
`;
export const AllWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  max-width: 800px;
  width: 100%;
  @media screen and (min-width: 701px) {
    max-width: 544px;
  }
  @media screen and (max-width: 850px) {
    max-width: 700px;
    width: 100%;
  }
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  max-width: 800px;
  width: 100%;
  @media screen and (min-width: 701px) {
    max-width: 544px;
  }
`;
export const TitleWrapper = styled.h3`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #4e5152;
`;
export const SingleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 24px;
  gap: 16px;
  width: 100%;
  height: 48px;
  background: #fafafa;
  border: 1px solid #edf1f7;
  border-radius: 8px;
`;
export const LastWrapper = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;
