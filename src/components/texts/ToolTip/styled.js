import styled from "styled-components";

export const TipsContainer = styled.div`
  display: ${({ $display }) => ($display ? "" : "none")};
  position: absolute;
  width: 100vw;
  max-width: max-content;
  background-color: #0082aa;
  border-radius: 10px;
  padding: 10px;
  z-index: 10;
  color: #ffffff;
  filter: drop-shadow(0 -10px 30px #c3c2c245);
  word-spacing: 2px;
  animation: tip 0.5s ease;

  ::after {
    content: " ";
    position: absolute;
    border: 10px solid #f4f4f4;
  }

  @keyframes tip {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  ${({ place, parentHeight, parentWidth }) =>
    place === "top" &&
    `
      bottom: ${parentHeight * 1.7 + "px"};
      left: ${parentWidth / 2 + "px"};
      transform: translateX(-50%);

      ::after {
        top: 100%;
        left: calc(50% - 10px);
        border-color: #0082aa transparent transparent transparent;
      }
  `}

  ${({ place, parentHeight, parentWidth }) =>
    place === "bottom" &&
    `
      top: ${parentHeight * 1.7 + "px"};
      left: ${parentWidth / 2 + "px"};
      transform: translateX(-50%);

      ::after {
        bottom: 100%;
        left: calc(50% - 10px);
        border-color:  transparent transparent #0082aa transparent;
  `}

  ${({ place, parentHeight, parentWidth }) =>
    place === "right" &&
    `
      top: ${parentHeight / 2 + "px"};
      left: ${parentWidth + 20 + "px"};
      transform: translateY(-50%);

      ::after {
        right: 100%;
        top: calc(50% - 10px);
        border-color:  transparent  #0082aa transparent transparent;
    
  `}

  ${({ place, parentHeight, parentWidth }) =>
    place === "left" &&
    `
      top: ${parentHeight / 2 + "px"};
      right: ${parentWidth + 20 + "px"};
      transform: translateY(-50%);

      ::after {
        left: 100%;
        top: calc(50% - 10px);
        border-color:  transparent transparent transparent #0082aa ;
    
  `}
`;
