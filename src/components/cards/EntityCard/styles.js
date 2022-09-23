import styled from "styled-components";

export const Container = styled.div`
  max-width: 550px;
  width: 100;
  min-width: 350px;
  height: 340px;
  background: #ffffff;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
  border-radius: 16px;

  padding: 48px 24px 16px 24px;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;

  z-index: 0;
  overflow: hidden;

  transition: all 0.2s;

  &:hover {
    background: #00a2d4;
  }
`;

export const Corner = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: rotateX(180deg);

  svg {
    ellipse {
      fill: rgba(204, 243, 255, 0.48);
      fill-opacity: 1;
    }
  }

  ${Container}:hover & {
    svg {
      ellipse {
        fill: rgba(255, 255, 255, 0.64);
      }
    }
  }
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.h4`
  font-family: "BR Firma";
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #242627;

  ${Container}:hover & {
    color: #ffffff;
  }
`;

export const TimeLine = styled.p`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #4e5152;
  margin: 0;

  ${Container}:hover & {
    color: #ffffff;
  }
`;

export const Mid = styled.div``;

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Price = styled.p`
  font-family: "BR Firma";
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: #00a2d4;

  ${Container}:hover & {
    color: #ffffff;
  }
`;

export const Bullet = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  ${Container}:hover & {
    svg {
      path {
        fill: #ffffff;
      }
    }
  }
`;

export const Content = styled.p`
  text-transform: capitalize;
  font-family: "BR Firma";
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #4e5152;

  ${Container}:hover & {
    color: #ffffff;
  }
`;
