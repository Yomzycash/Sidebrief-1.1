import styled from "styled-components";

export const ProgressContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 355px;
  height: 45px;
  background-color: #ffffff;
`;
export const ProgressLine = styled.div`
  position: absolute;
  top: 11px;
  left: 13%;
  background-color: #d7d7d7;
  width: 100%;
  max-width: 80%;
  height: 1.5px;
  z-index: 10;
  @media screen and (max-width: 300px) {
    left: 19%;
    max-width: 70%;
  }
`;
export const Progress = styled.div`
  height: inherit;
  width: ${({ progress }) => `${progress}%`};
  background-color: #00a2d4;
  transition: 0.4s all ease;
`;
export const Container = styled.div`
  left: 50%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  z-index: 11;
`;
export const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ color }) =>
    color === "active" ? "#00a2d4" : "#D7D7D7"};
`;
export const Text = styled.p`
  font-weight: 400;
  font-size: clamp(12px, 1.5vw, 14px);
  color: ${({ color }) => (color === "active" ? "#00a2d4" : "#D7D7D7")}; ;
`;
