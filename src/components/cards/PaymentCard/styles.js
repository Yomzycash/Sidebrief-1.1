import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: max-content;

  /* @media screen and (max-width: 1050px) {
    padding-inline: 0;
  } */

  /* @media screen and (max-width: 700px) {
    padding-inline: 0;
    gap: 24px;
  } */
`;
export const DarkContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: max-content;
  background: #edf1f6;
  padding: 18px 14px;
  border: 1px solid #edf1f6;

  /* @media screen and (max-width: 1050px) {
    padding-inline: 0;
  } */

  /* @media screen and (max-width: 700px) {
    padding-inline: 0;
    gap: 24px;
  } */
`;
export const LeftTextContainer = styled.p`
  width: 50%;
  font-size: 14px;
`;
export const RightTextContainer = styled.p`
  width: 50%;
`;
export const LightContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: max-content;
  background-color: white;
  padding: 18px 14px;
  border: 1px solid #edf1f6;

  /* @media screen and (max-width: 1050px) {
    padding-inline: 0;
  } */

  /* @media screen and (max-width: 700px) {
    padding-inline: 0;
    gap: 24px;
  } */
`;
