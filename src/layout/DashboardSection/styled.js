import { Link } from "react-router-dom";
import styled from "styled-components";

export const Section = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 32px;
  margin: 38px clamp(20px, 5vw, 40px);
  margin-right: ${(props) => props.MarginRight};
`;
export const Header = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 14px;
  width: 100%;
`;
export const HeaderTop = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  gap: 4px;
  width: 100%;
  > p {
    font-weight: 600;
    font-size: ${(props) =>
      props.BigTitle === "true"
        ? "clamp(20px, 2vw, 24px)"
        : "clamp(17px, 2vw, 20px)"};
    color: #151717;
  }
`;
export const Right = styled(Link)`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  gap: 6px;
  color: #00a2d4;
  font-size: clamp(13px, 1.5vw, 16px);
  transition: 0.3s all ease;
  > p,
  div {
    transition: 0.2s all ease;
  }
  &:hover {
    opacity: 0.8;
  }
`;
export const HeaderBody = styled.div`
  display: flex;
  p {
    font-weight: 400;
    font-size: clamp(12px, 1.5vw, 14px);
    color: #727474;
  }
`;
export const Body = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 24px;
  width: 100%;
  max-width: 100vw;
  @media screen and (max-width: 700px) {
    flex-flow: ${(props) => (props.nowrap ? "row" : "column")};

    /* flex-flow: column; */
  }
`;
