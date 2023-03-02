import styled from "styled-components";
export const Wrap = styled.div`
  /* display: flex;
  flex-flow: column; */
  max-width: 550px;
`;
export const Container = styled.div`
  min-width: 350px;
  /* height: clamp(400px, 30vw, 450px); */
  height: ${(props) =>
    props.height ? props.height : "clamp(284px, 30vw, 340px)"};
  background: #ffffff;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px #9596970a;
  border-radius: 16px;

  padding: clamp(24px, 2.7vw, 48px) 24px 16px;

  position: relative;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  justify-content: ${(props) => props.content};
  gap: ${(props) => (props.gap ? props.gap : "")};
  /* gap: 24px; */
  flex: 1;

  /* z-index: 0; */
  overflow: hidden;

  transition: all 0.2s;

  cursor: pointer;

  &:hover {
    background: #00a2d4;
  }
`;
export const TopTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TopText = styled.p`
  background-color: ${({ theme }) => theme.blue2};
  color: white;
  font-size: 24px;
  padding: 5px 14px;
  border-radius: 10px;
  font-weight: 700;
  position: absolute;
  z-index: 999;
  left: auto;
  right: auto;
`;

export const Corner = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: rotateX(180deg);

  svg {
    ellipse {
      fill: #ccf3ff7a;

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

export const Description = styled.div`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 400;
  font-size: clamp(12px, 1.2vw, 15px);
  color: #4e5152;

  ${Container}:hover & {
    color: #ffffff;
  }
`;
export const Title = styled.h4`
  font-family: "BR Firma";
  font-weight: 600;
  font-size: clamp(14px, 1.4vw, 18px);
  line-height: 24px;
  color: ${({ theme }) => theme.grey1};

  ${Container}:hover & {
    color: #ffffff;
  }
`;

export const TimeLine = styled.p`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 400;
  font-size: clamp(12px, 1.2vw, 14px);
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
  font-size: clamp(18px, 1.8vw, 24px);
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
  flex-flow: ${(props) => (props.flow ? props.flow : "")};

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
  font-size: clamp(12px, 1.2vw, 14px);
  line-height: 21px;
  color: #4e5152;

  ${Container}:hover & {
    color: #ffffff;
  }
`;

//new entity card
export const EntityCardContainer = styled.div`
  display: flex;
`;

export const FeatureList = styled.ul`
  border: solid red;
`;
export const FeatureListItem = styled.li`
  display: flex;
`;
