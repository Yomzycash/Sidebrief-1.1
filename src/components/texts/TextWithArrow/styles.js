import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease-out;

  ${({ hover }) => hover && `gap: 16px;`}
`;

export const Text = styled.p`
  font-family: "BR Firma";
  font-weight: 500;
  font-size: clamp(12px, 1.5vw, 14px);
  line-height: 21px;
  letter-spacing: -0.5px;
  color: #ffffff;
  text-transform: capitalize;

  ${({ isBlue }) =>
    isBlue
      ? `
                color: #00a2d4 
            `
      : null}
`;
