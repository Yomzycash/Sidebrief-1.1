import styled from "styled-components";

import { Link } from "react-router-dom";
export const StaffContainer = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  max-width: calc(99vw - ${({ sidebarWidth }) => sidebarWidth});
  h3 {
    font-size: 24px;
    margin-left: 40px;
  }
`;

export const NavigationWrapper = styled.div`
  padding: 24px;
  border-bottom: 1px solid #edf1f6;
  display: flex;
  align-items: center;
  width: max-content;
  cursor: pointer;

  p {
    margin-left: 8px;
  }
`;

export const RewardShortDetails = styled.div`
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  div {
  }
  h4 {
    font-size: 24px;
    color: #151717;
  }
`;

export const Badge = styled.div`
  background-color: rgba(212, 0, 204, 0.05);
  padding: 4px 16px;
  margin-bottom: 20px;
  border-radius: 12px;
  width: 170px;
`;
export const BadgeText = styled.p`
  color: #d400cc;
  font-size: 12px;
  font-weight: 400;
`;
export const ButtonWrapper = styled.div`
  width: 200px;
`;
export const RewardShortText = styled.p`
  font-size: 16px;
  color: #4e5152;
  line-height: 24px;
`;

export const RewardDescription = styled.div`
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

export const rewardModalStyle = {
  padding: 0,
  backgroundColor: "white",
  width: "max-width",
  borderRadius: "16px",
  boxShadow:
    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
};
