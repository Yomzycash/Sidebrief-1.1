import styled from "styled-components";

export const Container = styled.button`
  padding-inline: 50px;
  height: 60px;
  background: #00a2d4;
  border-radius: 8px;
  border: none;
  outline: none;
  color: #ffffff;
  cursor: pointer;
  transition: 0.3s all ease;

  display: ${({ $hide }) => ($hide ? "none" : "")};

  :hover {
    background-color: ${(props) =>
      props.hover_bg_color ? props.hover_bg_color : "#0082AA"};
    color: ${(props) => (props.hv_color ? props.hv_color : "#fff")};
  }

  :active {
    transform: scale(0.98);
  }

  :focus {
    background-color: ${(props) =>
      props.focus_bg_color ? props.focus_bg_color : "#5bc3e3"};
    color: ${(props) => (props.fc_color ? props.fc_color : "")};
  }

  :disabled {
    background-color: #79c7df;
    color: #fff;
    transform: scale(1);
  }

  ${({ isBack }) =>
    isBack &&
    `
        background: #ffffff;
        color: #00a2d4;
        outline: 1px solid #00a2d4;
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
