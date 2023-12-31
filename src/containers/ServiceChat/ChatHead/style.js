import styled from "styled-components";
import tinycolor from "tinycolor2";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-inline: 24px;
  align-items: center;
  border-bottom: 1px solid #edf1f7;
  background-color: #fff;
  filter: drop-shadow(-20px 5px 15px #c4c4c466);
`;

export const TextAndImage = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const UserImageContainer = styled.div`
  height: 64px;
  width: 64px;
  position: relative;

  svg {
    height: 64px;
    width: 64px;
  }
`;

export const OnlineIndicator = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  top: 44px;
  right: 0;
  background: #00d448;
  border-radius: 50%;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Name = styled.h6`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.grey1};
`;

export const ServiceID = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.02em;
  color: #727474;

  span {
    color: #d400cc;
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  position: relative;

  svg {
    path {
      fill: white;
    }
  }

  div:last-of-type {
    left: 0;
    top: 40px;
  }
`;

export const StatusButton = styled.button`
  padding: 4px 16px;
  border-radius: 12px;
  border: none;
  background: ${({ color }) =>
    color ? tinycolor(color).setAlpha(0.1) : `#000`};
  color: ${({ color }) => color};

  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;
