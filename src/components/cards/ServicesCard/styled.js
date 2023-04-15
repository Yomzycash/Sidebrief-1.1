import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled(Link)`
  display: flex;
  flex-flow: column;
  flex: 1;
  min-height: 300px;
  min-width: 200px;
  background-color: #fff;
  border: 1px solid #b0b0b055;
  text-decoration: none;
  color: inherit;
  border-radius: 16px;
  transition: 0.3s ease all;

  :hover {
    background-color: #00a2d455;
    box-shadow: 0 5px 15px #b0b0b055;
  }
`;

export const Top = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 80px;
  background-color: ${({ color }) => color || "#00A2D4"};
  border-radius: 16px 16px 0 0;
`;
export const ContentWrapper = styled.div`
  position: relative;
  top: -40px;
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 16px;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 90px;
  background-color: #00a2d4;
  border: 3px solid #fff;
  border-radius: 50%;

  box-shadow: 0 0 10px 2px #5a5a5a22;

  * {
    width: 50%;
    height: 50%;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;
  align-items: center;
  padding-inline: 16px;
`;

export const ContentTitle = styled.p`
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: capitalize;
`;
export const ContentBody = styled.p`
  text-align: center;
  font-size: 14px;
`;
