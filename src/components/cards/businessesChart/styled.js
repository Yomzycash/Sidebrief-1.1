import styled from "styled-components";

// BusinessChart component's styles (index)
export const BusinessesChart = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  flex: 1;
  min-width: clamp(350px, 25vw, 700px);
  min-height: 264px;
  border-radius: 16px;
  padding: 24px;
  background-color: white;
  border: 1px solid #edf1f6;
  box-shadow: 0 10px 10px -5px #95969714;
  background-color: ${({ staff }) => (staff ? "#00A2D4" : "")};

  @media screen and (max-width: 760px) {
    min-width: 300px;
  }
`;

export const Title = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: ${({ staff }) => (staff ? "white" : "#626262")};

  font-size: clamp(20px, 1.5vw, 24px);
  font-weight: 600;

  select {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
    padding: 4px 8px;
    color: ${({ staff }) => (staff ? "white" : "#626262")};
    background-color: #ffffff34;
    border-radius: 20px;
    outline: none;
    border: none;
  }

  option {
    display: flex;
    justify-content: center;
    color: #151717;
    background-color: #ffffff34;
  }
`;

export const Indicator = styled.div`
  display: flex;
  justify-content: center;
`;
export const Bottom = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
`;

// Status component's styles
export const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
`;
export const Left = styled.div`
  > div {
    margin-top: 3px;
    width: 12px;
    height: 12px;
    background-color: ${(props) => (props.color ? props.color : "#00a2d4")};
    border-radius: 50%;
  }
`;
export const Right = styled.div`
  display: flex;
  flex-flow: column;
  > p {
    color: #151717;
    font-size: clamp(14px, 2vw, 18px);
    font-weight: 700;
    color: white;
    color: ${({ staff }) => (staff ? "white" : "#151717")};
  }
  > div {
    color: #727474;
    font-size: clamp(10px, 1.5vw, 12px);
    color: ${({ staff }) => (staff ? "white" : "#727474")};
  }
`;

export const ChartContainer = styled.div`
  background: #ffffff;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px #9596970a;
  border-radius: 16px;
  padding-top: 24px;
  padding-right: 24px;
  padding-bottom: 24px;

  width: 65%;
  height: 320px;
  min-height: 271px;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const TopContent = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
  margin-bottom: 22px;

  h3 {
    font-size: 20px;
    margin-left: 35px;
    color: #151717;
  }

  select {
    font-size: 12px;
    color: #4e5152;
    background-color: none;
    border: none;
    outline: none;
  }
`;

export const Loader = styled(Indicator)`
  width: 100%;
`;

export const DonutContainer = styled.div`
  position: relative;
`;

// Chart comoponent's styles
export const Label = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: clamp(10px, 2vw, 12px);
  color: #727474;
  gap: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  > p {
    color: #00a2d4;
    font-weight: 700;
    font-size: clamp(20px, 2vw, 24px);
  }
`;
