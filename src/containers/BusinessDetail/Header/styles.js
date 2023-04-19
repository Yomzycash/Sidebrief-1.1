import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.header`
  width: 100%;
  border: 1px solid #edf1f7;

  border-top: none;
  @media screen and (max-width: 700px) {
    border: 0;
  }
`;

export const Top = styled.div`
  padding-inline: 40px;
  padding-block: 40px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media screen and (max-width: 700px) {
    padding-block: 0;
    padding-inline: 0px;
  }
`;

export const BackContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  align-self: flex-start;

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export const Text = styled.p`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #151717;
`;

export const TitleContainer = styled.div`
  padding-block: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
`;

export const TopInfo = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;

  .transbutton {
    background-color: #00a2d4;
    color: #fff;
    font-family: "BR Firma";

    svg {
      /* transform: scale(1.5); */
      width: 20px;
      height: 20px;
      path {
        fill: #fff;
      }
    }
  }
`;

export const CompanyName = styled.h2`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: ${({ theme }) => theme.grey1};
  @media screen and (max-width: 700px) {
    font-weight: 600;
    font-size: 16px;
  }
`;

export const LHS = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media screen and (max-width: 700px) {
    gap: 16px;
    padding-inline: 24px;
  }
`;
export const StatusType = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export const RHS = styled.div`
  @media screen and (max-width: 700px) {
    display: none;
  }

  .transbutton {
    background-color: #00a2d4;
    color: #242627;
    font-family: "BR Firma";

    svg {
      /* transform: scale(1.5); */
      width: 20px;
      height: 20px;
      path {
        fill: #242627;
      }
    }
  }
`;

export const MessageCount = styled.div`
  width: 22px;
  height: 22px;
  left: 146px;
  top: 13px;
  background: #ed4e3a;
  border-radius: 6px;
  color: #fff;
  display: grid;
  place-items: center;
  margin-left: 16px;
`;

export const BottomInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  @media screen and (max-width: 700px) {
    gap: 16px;
    font-size: 14px;
  }
`;

export const UserName = styled.p`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-decoration-line: underline;
  color: #00a2d4;
  text-transform: capitalize;
  @media screen and (max-width: 700px) {
    font-weight: 500;
    font-size: 14px;
  }
`;

export const DotSeperator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #959697;
`;

export const DateText = styled.p`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #4e5152;
  @media screen and (max-width: 700px) {
    font-weight: 400;
    font-size: 14px;
  }
`;

export const DeleteButton = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px;
  cursor: pointer;

  p {
    font-family: "BR Firma";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.02em;
    color: #ed4e3a;
  }
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

export const SearchAndSort = styled.div`
  padding: clamp(20px, 2vw, 40px) 24px;
  display: flex;
  gap: 24px;
`;
