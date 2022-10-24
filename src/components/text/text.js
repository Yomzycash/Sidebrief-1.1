import styled from "styled-components";

export const PrimaryText = styled.h3`
  color: #151717;
  font-size: 28px;
  font-weight: 700;
  text-align: ${(props) => props.align};
  margin-top: ${(props) => props.top};
  margin-bottom: ${(props) => props.bottom};
  margin-right: ${(props) => props.right};
  margin-left: ${(props) => props.left};

  @media screen and (max-width: 550px) {
    font-size: 20px;
  }
`;

export const SecondaryText = styled.p`
  color: ${(props) => (props.clickColor ? "#00a2d4" : "#4E5152")};
  font-size: clamp(14px, 1.5vw, 18px);
  font-weight: 400;
  text-align: ${(props) => props.align};
  margin-top: ${(props) => props.top};
  margin-bottom: ${(props) => props.bottom};
  margin-right: ${(props) => props.right};
  margin-left: ${(props) => props.left};
  width: ${(props) => props.width};
  cursor: ${(props) => props.$cursor && "pointer"};
`;
