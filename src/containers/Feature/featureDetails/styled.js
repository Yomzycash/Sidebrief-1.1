import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  max-width: calc(99vw - ${({ sidebarWidth }) => sidebarWidth});

  @media screen and (max-width: 700px) {
    max-width: 100%;
    min-height: calc(100vh - 71px);
  }

  h3 {
    font-size: 24px;
    margin-left: 40px;
  }
`;

export const Back = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  margin-left: 8px;
  width: max-content;
`;

export const NavigationWrapper = styled.div`
  padding: 24px clamp(24px, 2.5vw, 40px);
  border-bottom: 1px solid #edf1f6;
  display: flex;
  align-items: center;
  width: 100%;

  p {
    margin-left: 5px;

    @media screen and (max-width: 700px) {
      display: none;
    }
  }

  span {
    position: relative;
    left: -16px;
    margin: auto;

    @media screen and (min-width: 701px) {
      display: none;
    }
  }
`;

export const ShortDetails = styled.div`
  width: inherit;
  padding: 40px clamp(24px, 2.5vw, 40px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 30px;
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const Image = styled.img`
  width: 55px;
  object-fit: contain;
`;
export const TextWrapper = styled.div`
  padding-left: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  div {
  }
  h4 {
    font-size: 24px;
    color: #151717;
  }
`;

export const Badge = styled.div`
  background-color: #d400cc0c;
  padding: 4px 16px;
  margin-bottom: 20px;
  border-radius: 12px;
  /* width: 170px; */
`;
export const BadgeText = styled.p`
  color: #d400cc;
  font-size: 12px;
  font-weight: 400;
`;

export const ButtonWrapper = styled.div`
  width: 200px;

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export const MobileButtonWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-end;
  width: calc(100% - 48px);
  margin: 24px;

  @media screen and (min-width: 701px) {
    display: none;
  }
`;

export const ShortText = styled.p`
  font-size: 16px;
  color: #4e5152;
  line-height: 24px;
`;

export const Description = styled.div`
  margin-top: 40px;
  padding-inline: 40px;
`;

export const TextDes = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;
  font-size: 18px;
  color: #4e5152;
  font-size: 16px;
  line-height: 24px;
  align-items: justify;
`;

export const TextLink = styled.p`
  color: #00a2d4;
`;

export const VisitLink = styled(Link)`
  color: #00a2d4;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  margin-top: 32px;
`;

export const Scroll = styled.div`
  @media screen and (max-width: 700px) {
    display: none;
  }
`;
