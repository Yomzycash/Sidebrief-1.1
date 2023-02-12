import styled from "styled-components";

export const Container = styled.button`
  padding-inline: 50px;
  height: 60px;
  background: #00a2d4;
  border-radius: 8px;
  border: 1px solid #00a2d4;
  outline: none;
  color: #ffffff;
  cursor: pointer;
  transition: 0.3s all ease;

  display: ${({ $hide }) => ($hide ? "none" : "")};

  :hover {
    opacity: 0.8;
  }

  :active {
    transform: scale(0.95);
  }

  :focus {
    opacity: 0.7;
  }

  :disabled {
    opacity: 0.7;
    transform: scale(1);
  }

  ${({ isBack }) =>
    isBack &&
    `
        background: #ffffff;
        color: #00a2d4;
    `}
  span {
    font-family: "BR Firma";
    font-weight: 500;
    font-size: clamp(16px, 1.6vw, 18px);
    line-height: 150%;
    letter-spacing: -0.5px;

    color: inherit;
  }
`;
