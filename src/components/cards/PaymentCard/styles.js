import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: max-content;
  gap: 30px;
  background: #ffffff;
  /* Border Color */
  padding: 60px 50px;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
  border-radius: 16px;

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
  font-size: 14px;
  padding: 4px 10px;
  border-radius: 16px;
  background-color: ${(props) => (props.background ? props.background : "")};
`;
export const LightContainer = styled.div`
  display: flex;
  flex-direction: row;
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

export const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BottomContainer = styled.div``;

export const Title = styled.p`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  text-transform: capitalize;
  color: #242627;
`;

export const SubDowwn = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
export const Name = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-decoration-line: underline;
  color: #00a2d4;
`;

export const Date = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #4e5152;
`;
